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

  async function runInPage(tabId, token, month) {
    await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      files: ['config.js', 'ems-ops.js']
    });

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: (userToken, userMonth) => {
        if (typeof window.runEMSOps !== 'function') {
          return { error: 'Função runEMSOps não disponível na página.' };
        }
        return window.runEMSOps(userToken, userMonth);
      },
      args: [token, month]
    });

    return result;
  }

  async function fetchTokenFromPage(tabId) {
    await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      files: ['config.js', 'ems-ops.js']
    });

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: () => {
        if (typeof window.fetchSnToken !== 'function') {
          return { error: 'Função fetchSnToken não disponível na página.' };
        }
        return window.fetchSnToken();
      }
    });

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
      const tokenData = await fetchTokenFromPage(tab.id);

      if (tokenData?.error) {
        showStatus('error', `❌ ${tokenData.error}`);
        return;
      }

      if (!tokenData?.token) {
        showStatus('error', msg.tokenMissing || '❌ Token não encontrado. Recarregue o ServiceNow (F5).');
        return;
      }

      const currentMonth = new Date().getMonth() + 1;
      const result = await runInPage(tab.id, tokenData.token, currentMonth);

      if (result?.error) {
        showStatus('error', `❌ ${result.error}`);
      } else {
        showStatus('success', msg.opened || '✅ Painel aberto!');
      }
    } catch (error) {
      showStatus('error', `❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  });
});
