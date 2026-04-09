// ── Background Service Worker — Zabbix Proxy ─────────────────────────────
// Faz chamadas ao Zabbix sem restrição de CORS, pois service workers
// não estão sujeitos à política de Same-Origin do browser.

const ZABBIX_URL   = 'https://monbr1.equinix.com.br/api_jsonrpc.php';
const ZABBIX_TOKEN = 'd888495a0fd1c258205c7c78bd4d941e5d63aa63621fb74cd01a2d1caa611c7b';
const ZABBIX_HTTP_TIMEOUT_MS = 12000;

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

  // 1. Busca exata pelo nome
  for (const term of searchTerms) {
    if (!term || term === '—') continue;
    try {
      const exactStartedAt = Date.now();
      hosts = await zabbixCall('host.get', {
        filter: { host: [term] },
        output: ['hostid', 'host', 'name', 'status'],
        limit: 5
      });
      debug.attempts.push({
        mode: 'exact',
        term,
        ms: Date.now() - exactStartedAt,
        found: hosts.length
      });
      if (hosts.length) break;

      // 2. Busca parcial (LIKE) se exata não encontrou
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
    } catch(e) {
      debug.attempts.push({
        mode: 'error',
        term,
        error: e.message
      });
      // Continua para o próximo termo
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

  fetchZabbixAlertsForCI(ciName, ciIp, ciHostname)
    .then(result => sendResponse({ ok: true, data: result }))
    .catch(err  => sendResponse({
      ok: false,
      error: err.message,
      debug: { source: 'background', at: new Date().toISOString() }
    }));

  return true; // mantém o canal aberto para resposta assíncrona
});
