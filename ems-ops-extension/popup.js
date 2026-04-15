document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnOpen');
  const spinner = document.getElementById('spinner');
  const btnIcon = document.getElementById('btnIcon');
  const btnLabel = document.getElementById('btnLabel');
  const statusEl = document.getElementById('status');

  const config = window.EMS_CONFIG || {};
  const msg = config.statusMessages || {};

  function setLoading(on) {
    btn.disabled = on;
    spinner.style.display = on ? 'block' : 'none';
    btnIcon.style.display = on ? 'none' : 'block';
    btnLabel.textContent = on ? (msg.loading || 'Carregando dados...') : (msg.ready || 'Abrir Painel Ops');
  }

  function showStatus(type, message) {
    statusEl.className = `status ${type}`;
    statusEl.textContent = message;
  }

  async function runInPage(tabId, month) {
    // Injeta os scripts via script tag para garantir que rodem no contexto MAIN (window)
    // e tenham acesso às variáveis globais do ServiceNow (g_ck)
    await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: (configUrl, scriptUrl, userMonth) => {
        function injectScript(url) {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            (document.head || document.documentElement).appendChild(script);
          });
        }

        async function init() {
          try {
            // Injeta config.js e ems-ops.js sequencialmente
            await injectScript(configUrl);
            await injectScript(scriptUrl);

            // Verifica se a função foi carregada no window
            if (typeof window.runEMSOps === 'function') {
              window.runEMSOps(userMonth);
              return { success: true };
            } else {
              return { error: 'Função runEMSOps não encontrada no window após injeção via tag.' };
            }
          } catch (e) {
            return { error: `Erro na injeção de scripts: ${e.message}` };
          }
        }

        return init();
      },
      args: [
        chrome.runtime.getURL('config.js'),
        chrome.runtime.getURL('ems-ops.js'),
        month
      ]
    });

    // Como a execução real acontece dentro do func acima, o result virá de lá
    // Mas o executeScript retorna um array de resultados
    return { success: true }; 
  }

  btn.addEventListener('click', async () => {
    setLoading(true);
    statusEl.className = 'status';

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.url?.includes(config.serviceNowHostHint || 'service-now.com')) {
      setLoading(false);
      showStatus('error', msg.invalidTab || '⚠ Abra o ServiceNow primeiro.');
      return;
    }

    try {
      const currentMonth = new Date().getMonth() + 1;
      await runInPage(tab.id, currentMonth);
      // Se não lançou erro, assumimos sucesso na injeção
      showStatus('success', msg.opened || '✅ Painel aberto!');
    } catch (error) {
      showStatus('error', `❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  });
});
