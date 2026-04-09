// EMS Monitor — content script
// Ponte Zabbix: dashboard (nova aba) → content.js → background.js → Zabbix

window.addEventListener('message', event => {
  if (!event.data || event.data.type !== 'EMS_ZABBIX_REQUEST') return;

  console.log('[EMS content.js] Recebeu EMS_ZABBIX_REQUEST:', event.data);

  const { requestId, ciName, ciIp, ciHostname } = event.data;
  const source = event.source;

  chrome.runtime.sendMessage(
    { type: 'ZABBIX_FETCH', ciName, ciIp, ciHostname },
    response => {
      if (chrome.runtime.lastError) {
        console.error('[EMS content.js] chrome.runtime.lastError:', chrome.runtime.lastError.message);
        response = { ok: false, error: chrome.runtime.lastError.message };
      }

      console.log('[EMS content.js] Resposta do background, enviando de volta:', response);

      try {
        source.postMessage({
          type: 'EMS_ZABBIX_RESPONSE',
          requestId,
          response
        }, '*');
        console.log('[EMS content.js] postMessage enviado com sucesso');
      } catch(e) {
        console.error('[EMS content.js] Erro no postMessage de volta:', e.message);
      }
    }
  );
});
