// EMS Monitor — content script
// Ponte: dashboard (blob URL) → content.js → background.js

window.addEventListener('message', event => {
  if (!event.data) return;
  const source = event.source;
  const { type, requestId } = event.data;

  // Alertas Zabbix
  if (type === 'EMS_ZABBIX_REQUEST') {
    const { ciName, ciIp, ciHostname } = event.data;
    chrome.runtime.sendMessage({ type: 'ZABBIX_FETCH', ciName, ciIp, ciHostname }, response => {
      const resp = response || { ok: false, error: chrome.runtime.lastError?.message || 'Sem resposta' };
      try { source.postMessage({ type: 'EMS_ZABBIX_RESPONSE', requestId, response: resp }, '*'); } catch(_) {}
    });
  }

  // Imagem do gráfico Zabbix
  if (type === 'EMS_IMG_REQUEST') {
    const { url } = event.data;
    chrome.runtime.sendMessage({ type: 'ZABBIX_FETCH_IMAGE', url }, response => {
      const dataUrl = response?.ok ? response.dataUrl : null;
      const error   = response?.ok ? null : (response?.error || 'Erro');
      try { source.postMessage({ type: 'EMS_IMG_RESPONSE', requestId, dataUrl, error }, '*'); } catch(_) {}
    });
  }
});
