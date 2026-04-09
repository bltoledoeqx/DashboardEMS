// ── Background Service Worker — Zabbix Proxy ─────────────────────────────
// Faz chamadas ao Zabbix sem restrição de CORS, pois service workers
// não estão sujeitos à política de Same-Origin do browser.

const ZABBIX_URL   = 'https://monbr1.equinix.com.br/api_jsonrpc.php';
const ZABBIX_TOKEN = 'd888495a0fd1c258205c7c78bd4d941e5d63aa63621fb74cd01a2d1caa611c7b';
const ZABBIX_HTTP_TIMEOUT_MS = 7000;
const ZABBIX_FLOW_TIMEOUT_MS = 17000;

function withTimeout(promiseFactory, timeoutMs, timeoutMessage) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return promiseFactory(controller.signal)
    .catch(err => {
      if (err && err.name === 'AbortError') {
        throw new Error(timeoutMessage);
      }
      throw err;
    })
    .finally(() => clearTimeout(timer));
}

async function zabbixCall(method, params) {
  const response = await withTimeout(
    signal => fetch(ZABBIX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ZABBIX_TOKEN
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params,
        id: 1
      }),
      signal
    }),
    ZABBIX_HTTP_TIMEOUT_MS,
    `Zabbix ${method}: timeout HTTP após ${Math.round(ZABBIX_HTTP_TIMEOUT_MS / 1000)}s`
  );

  if (!response.ok) {
    throw new Error('Zabbix HTTP ' + response.status);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error('Zabbix API: ' + (data.error.data || data.error.message || JSON.stringify(data.error)));
  }

  return data.result;
}

async function fetchZabbixAlertsForCI(ciName, ciIp, ciHostname) {
  const startedAt = Date.now();
  // Tenta encontrar o host por nome, hostname ou IP — na ordem
  const searchTerms = [ciName, ciHostname, ciIp].filter(Boolean);

  let hosts = [];
  const debug = {
    attempts: [],
    totalMs: 0
  };

  // 1) Uma busca exata com todos os termos (mais barata que 1 request por termo)
  const exactTerms = searchTerms.filter(term => term && term !== '—');
  if (exactTerms.length) {
    try {
      const exactStartedAt = Date.now();
      hosts = await zabbixCall('host.get', {
        filter: { host: exactTerms },
        output: ['hostid', 'host', 'name', 'status'],
        limit: 5
      });
      debug.attempts.push({
        mode: 'exact-batch',
        term: exactTerms.join(','),
        ms: Date.now() - exactStartedAt,
        found: hosts.length
      });
    } catch (e) {
      debug.attempts.push({
        mode: 'error',
        term: exactTerms.join(','),
        error: e.message
      });
    }
  }

  // 2) Fallback parcial com no máximo 2 termos para evitar estourar o bridge timeout
  if (!hosts.length) {
    const fallbackTerms = [];
    if (ciName && ciName !== '—') fallbackTerms.push(ciName);
    if (ciHostname && ciHostname !== '—' && ciHostname !== ciName) fallbackTerms.push(ciHostname);
    if (!fallbackTerms.length && ciIp && ciIp !== '—') fallbackTerms.push(ciIp);

    for (const term of fallbackTerms.slice(0, 2)) {
      try {
        const likeStartedAt = Date.now();
        hosts = await zabbixCall('host.get', {
          search: { host: term, name: term },
          searchByAny: true,
          output: ['hostid', 'host', 'name', 'status'],
          limit: 5
        });
        debug.attempts.push({
          mode: 'like',
          term,
          ms: Date.now() - likeStartedAt,
          found: hosts.length
        });
        if (hosts.length) break;
      } catch (e) {
        debug.attempts.push({
          mode: 'error',
          term,
          error: e.message
        });
      }
    }
  }

  if (!hosts.length) {
    debug.totalMs = Date.now() - startedAt;
    return { hostFound: false, searchedTerms: searchTerms, debug };
  }

  const hostids = hosts.map(h => h.hostid);

  // 3. Busca problemas ativos
  const problems = await zabbixCall('problem.get', {
    hostids,
    output: ['eventid', 'name', 'severity', 'clock', 'acknowledged', 'objectid'],
    sortfield: 'severity',
    sortorder: 'DESC',
    recent: true,
    limit: 30
  });
  debug.totalMs = Date.now() - startedAt;

  return {
    hostFound: true,
    hosts,
    problems,
    debug
  };
}

// ── Message listener ──────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== 'ZABBIX_FETCH') return false;

  const { ciName, ciIp, ciHostname } = message;
  let responded = false;
  const safeSend = payload => {
    if (responded) return;
    responded = true;
    sendResponse(payload);
  };

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Fluxo Zabbix: timeout após ${Math.round(ZABBIX_FLOW_TIMEOUT_MS / 1000)}s`)), ZABBIX_FLOW_TIMEOUT_MS);
  });

  Promise.race([fetchZabbixAlertsForCI(ciName, ciIp, ciHostname), timeoutPromise])
    .then(result => safeSend({ ok: true, data: result }))
    .catch(err  => safeSend({
      ok: false,
      error: err.message,
      debug: { source: 'background', at: new Date().toISOString(), timeoutMs: ZABBIX_FLOW_TIMEOUT_MS }
    }));

  return true; // mantém o canal aberto para resposta assíncrona
});
