// ── Background Service Worker — Zabbix Proxy ─────────────────────────────
// Faz chamadas ao Zabbix sem restrição de CORS, pois service workers
// não estão sujeitos à política de Same-Origin do browser.

const ZABBIX_URL   = 'https://monbr1.equinix.com.br/api_jsonrpc.php';
const ZABBIX_TOKEN = 'd888495a0fd1c258205c7c78bd4d941e5d63aa63621fb74cd01a2d1caa611c7b';

async function zabbixCall(method, params) {
  const response = await fetch(ZABBIX_URL, {
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
    })
  });

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
  // Tenta encontrar o host por nome, hostname ou IP — na ordem
  const searchTerms = [ciName, ciHostname, ciIp].filter(Boolean);

  let hosts = [];

  // 1. Busca exata pelo nome
  for (const term of searchTerms) {
    if (!term || term === '—') continue;
    try {
      hosts = await zabbixCall('host.get', {
        filter: { host: [term] },
        output: ['hostid', 'host', 'name', 'status'],
        limit: 5
      });
      if (hosts.length) break;

      // 2. Busca parcial (LIKE) se exata não encontrou
      hosts = await zabbixCall('host.get', {
        search: { host: term, name: term },
        searchByAny: true,
        output: ['hostid', 'host', 'name', 'status'],
        limit: 5
      });
      if (hosts.length) break;
    } catch(e) {
      // Continua para o próximo termo
    }
  }

  if (!hosts.length) {
    return { hostFound: false, searchedTerms: searchTerms };
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

  return {
    hostFound: true,
    hosts,
    problems
  };
}

// ── Message listener ──────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== 'ZABBIX_FETCH') return false;

  const { ciName, ciIp, ciHostname } = message;

  fetchZabbixAlertsForCI(ciName, ciIp, ciHostname)
    .then(result => sendResponse({ ok: true, data: result }))
    .catch(err  => sendResponse({ ok: false, error: err.message }));

  return true; // mantém o canal aberto para resposta assíncrona
});
