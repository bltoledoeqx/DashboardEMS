// ── Background Service Worker — Zabbix Proxy ─────────────────────────────
// Faz chamadas ao Zabbix sem restrição de CORS, pois service workers
// não estão sujeitos à política de Same-Origin do browser.

const ZABBIX_URL   = 'https://monbr1.equinix.com.br/api_jsonrpc.php';
const ZABBIX_TOKEN = 'd888495a0fd1c258205c7c78bd4d941e5d63aa63621fb74cd01a2d1caa611c7b';
const ZABBIX_CHART_BASE_URL = 'https://monbr1.equinix.com.br/chart.php';
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
  const normalize = value => String(value || '').trim();
  const normalizedName = normalize(ciName);
  const normalizedHostname = normalize(ciHostname); // mantido para debug
  const normalizedIp = normalize(ciIp); // mantido para debug
  const searchTerms = [normalizedName, normalizedHostname, normalizedIp].filter(Boolean);

  let hosts = [];
  const debug = {
    attempts: [],
    totalMs: 0
  };

  // Busca por nome visível do host no Zabbix (campo "name")
  for (const term of [...new Set(searchTerms)]) {
    if (!term || term === '—') continue;
    try {
      const started = Date.now();
      hosts = await zabbixCall('host.get', {
        search: { name: term },
        output: ['hostid', 'name'],
        limit: 10
      });
      debug.attempts.push({
        mode: 'search-name',
        term,
        ms: Date.now() - started,
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

  if (!hosts.length) {
    debug.totalMs = Date.now() - startedAt;
    return {
      ciName: normalizedName || normalizedHostname || normalizedIp || '',
      hostFound: false,
      hasAlert: false,
      alerts: [],
      searchedTerms: searchTerms,
      debug
    };
  }

  const host = hosts[0];
  const hostids = [host.hostid];

  // Busca problemas ativos
  const problems = await zabbixCall('problem.get', {
    hostids,
    output: ['eventid', 'name', 'severity', 'clock', 'objectid'],
    sortfield: 'eventid',
    sortorder: 'DESC',
    limit: 30
  });
  const classifiedProblems = (problems || []).filter(p => parseInt(p.severity || 0, 10) > 0);
  const topProblems = [...classifiedProblems]
    .sort((a, b) => (parseInt(b.severity || 0, 10) - parseInt(a.severity || 0, 10)))
    .slice(0, 3);

  const triggerIds = [...new Set(topProblems.map(p => p.objectid).filter(Boolean))];
  let triggerToItem = {};
  let triggerExpressions = {};
  if (triggerIds.length) {
    const triggers = await zabbixCall('trigger.get', {
      triggerids: triggerIds,
      output: ['triggerid', 'expression', 'recovery_expression'],
      selectItems: ['itemid', 'name', 'units', 'value_type']
    });
    triggerToItem = (triggers || []).reduce((acc, trg) => {
      const firstItem = Array.isArray(trg.items) && trg.items.length ? trg.items[0] : null;
      if (trg.triggerid && firstItem && firstItem.itemid) acc[trg.triggerid] = firstItem;
      return acc;
    }, {});
    triggerExpressions = (triggers || []).reduce((acc, trg) => {
      acc[trg.triggerid] = { expression: trg.expression || '', recovery: trg.recovery_expression || '' };
      return acc;
    }, {});
  }

  // Busca histórico de valores para o primeiro alerta (última 1h) para o gráfico SVG
  const primaryTriggerId = topProblems[0]?.objectid;
  const primaryItem = primaryTriggerId ? triggerToItem[primaryTriggerId] : null;
  let historyValues = [];
  if (primaryItem?.itemid) {
    const vtype = parseInt(primaryItem.value_type || '0');
    const htype = (vtype === 0 || vtype === 3) ? 0 : 1; 
    try {
      historyValues = await zabbixCall('history.get', {
        itemids: [primaryItem.itemid],
        history: htype,
        sortfield: 'clock',
        sortorder: 'ASC',
        time_from: Math.floor(Date.now() / 1000) - 3600,
        limit: 200
      });
    } catch (_) {}
  }

  const parseThreshold = expr => {
    const m = expr.match(/[<>]=?\s*(\d+(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : null;
  };

  const historyEvents = await zabbixCall('event.get', {
    hostids: hostids[0],
    output: ['eventid', 'name', 'severity', 'clock', 'value'],
    sortfield: 'clock',
    sortorder: 'DESC',
    limit: 10
  });
  debug.totalMs = Date.now() - startedAt;

  const alerts = topProblems.map(p => {
    const item = p.objectid ? triggerToItem[p.objectid] : null;
    const itemid = item?.itemid;
    const expr = triggerExpressions[p.objectid] || {};
    const graph = itemid ? `${ZABBIX_CHART_BASE_URL}?itemids[]=${encodeURIComponent(itemid)}&period=86400&width=1200&height=500&legend=1&showworkperiod=1&showtriggers=1` : undefined;
    return {
      severity: parseInt(p.severity || 0, 10),
      description: p.name || '',
      time: p.clock ? new Date(Number(p.clock) * 1000).toISOString() : '',
      itemid,
      itemName: item?.name || '',
      itemUnits: item?.units || '',
      thresholdAlarm: parseThreshold(expr.expression || ''),
      thresholdRecover: parseThreshold(expr.recovery || ''),
      historyValues: p.objectid === primaryTriggerId ? historyValues : [],
      ...(graph ? { graph } : {})
    };
  });

  const history = (historyEvents || []).map(ev => ({
    severity: parseInt(ev.severity || 0, 10),
    description: ev.name || '',
    time: ev.clock ? new Date(Number(ev.clock) * 1000).toISOString() : '',
    status: String(ev.value) === '1' ? 'PROBLEM' : 'RESOLVED'
  }));

  return {
    ciName: host.name || normalizedName || '',
    hostFound: true,
    hasAlert: alerts.length > 0,
    alerts,
    history,
    hosts: [host], // compatibilidade UI legada
    problems,      // compatibilidade UI legada
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

// ── Busca imagem do gráfico como base64 (sem CORS) ────────────────────────
async function fetchChartAsBase64(url) {
  const res = await fetch(url, {
    headers: { 'Authorization': 'Bearer ' + ZABBIX_TOKEN }
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const buf = await res.arrayBuffer();
  const b64 = btoa(new Uint8Array(buf).reduce((s, b) => s + String.fromCharCode(b), ''));
  return 'data:image/png;base64,' + b64;
}

// Aceita mensagens externas (do dashboard em nova aba via extensionId)
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type !== 'ZABBIX_FETCH_IMAGE') return false;
  fetchChartAsBase64(message.url)
    .then(dataUrl => sendResponse({ ok: true, dataUrl }))
    .catch(err   => sendResponse({ ok: false, error: err.message }));
  return true;
});
