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
    const configUrl = chrome.runtime.getURL('config.js');
    const emsGroupsUrl = chrome.runtime.getURL('ems-groups.js');
    const emsOpsUrl = chrome.runtime.getURL('ems-ops.js');

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: async (cfgUrl, groupsUrl, opsUrl, userMonth) => {
        const loadScriptFromText = async (url, globalName, forceReload = false) => {
          if (!forceReload && globalName && typeof window[globalName] === 'function') {
            return;
          }

          if (forceReload && globalName && window[globalName]) {
            try {
              delete window[globalName];
            } catch (_) {
              window[globalName] = undefined;
            }
          }

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Falha ao carregar ${url} (HTTP ${response.status})`);
          }

          const code = await response.text();
          (0, eval)(code);
        };

        try {
          await loadScriptFromText(cfgUrl);
          await loadScriptFromText(groupsUrl);
          await loadScriptFromText(opsUrl, 'runEMSOps', true);

          if (typeof window.runEMSOps !== 'function') {
            return {
              error: `Função runEMSOps não encontrada no window. typeof=${typeof window.runEMSOps}`
            };
          }

          const runResult = await Promise.resolve(window.runEMSOps(userMonth));

          if (runResult?.error) {
            return { error: runResult.error };
          }

          if (runResult?.success === false || runResult?.ok === false) {
            return { error: 'runEMSOps retornou falha ao iniciar o painel.' };
          }

          return { success: true };
        } catch (e) {
          return { error: `Erro ao executar runEMSOps: ${e.message}` };
        }
      },
      args: [configUrl, emsGroupsUrl, emsOpsUrl, month]
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    if (!result?.success) {
      throw new Error('Não foi possível abrir o painel EMS Ops.');
    }

    return result;
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
      showStatus('success', msg.opened || '✅ Painel aberto!');
    } catch (error) {
      showStatus('error', `❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  });
});
