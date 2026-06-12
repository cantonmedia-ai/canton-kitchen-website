(function () {
  const actions = window.CK_CHATBASE_ACTIONS || {};

  function getPageActions(pageKey) {
    return actions.pages?.[pageKey] || actions.default || [];
  }

  function renderActionGrid(container) {
    const pageKey = container.dataset.chatbaseActions || "default";
    const pageActions = getPageActions(pageKey);
    container.innerHTML = pageActions
      .map(
        (action) => `
          <button class="ai-action-card" type="button" data-chatbase-message="${escapeHtml(action.message)}">
            <strong>${escapeHtml(action.label)}</strong>
            <small>${escapeHtml(action.hint || action.message)}</small>
          </button>
        `
      )
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function openChatbase() {
    if (typeof window.chatbase !== "function") return;
    try {
      window.chatbase("open");
    } catch (error) {
      try {
        window.chatbase("toggle");
      } catch (_) {}
    }
  }

  function ensurePromptPanel() {
    let panel = document.getElementById("chatbase-prompt-panel");
    if (panel) return panel;

    panel = document.createElement("div");
    panel.id = "chatbase-prompt-panel";
    panel.className = "chatbase-prompt-panel";
    panel.hidden = true;
    panel.innerHTML = `
      <div class="chatbase-prompt-card" role="dialog" aria-modal="false" aria-labelledby="chatbase-prompt-title">
        <button class="chatbase-prompt-close" type="button" aria-label="关闭">×</button>
        <p class="chatbase-prompt-kicker">AI 快速问题</p>
        <h2 id="chatbase-prompt-title">已为您准备好问题</h2>
        <p class="chatbase-prompt-message"></p>
        <div class="chatbase-prompt-actions">
          <button class="btn btn-green" type="button" data-chatbase-copy-open>复制并打开 AI</button>
          <button class="btn btn-outline" type="button" data-chatbase-copy>只复制问题</button>
        </div>
        <small>Chatbase 打开后，直接贴上并发送即可。</small>
      </div>
    `;
    document.body.appendChild(panel);

    panel.querySelector(".chatbase-prompt-close").addEventListener("click", () => {
      panel.hidden = true;
    });
    panel.addEventListener("click", (event) => {
      if (event.target === panel) panel.hidden = true;
    });
    panel.querySelector("[data-chatbase-copy-open]").addEventListener("click", () => {
      copyMessage(panel.dataset.message || "");
      openChatbase();
      panel.hidden = true;
    });
    panel.querySelector("[data-chatbase-copy]").addEventListener("click", () => {
      copyMessage(panel.dataset.message || "");
      panel.querySelector("small").textContent = "问题已复制，可以贴到 Chatbase 聊天框。";
    });

    return panel;
  }

  function copyMessage(message) {
    if (!message) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).catch(() => {});
    }
  }

  function showPromptPanel(message) {
    const panel = ensurePromptPanel();
    panel.dataset.message = message;
    panel.querySelector(".chatbase-prompt-message").textContent = message;
    panel.querySelector("small").textContent = "Chatbase 打开后，直接贴上并发送即可。";
    panel.hidden = false;
  }

  function handleQuickAction(event) {
    const trigger = event.target.closest("[data-chatbase-message]");
    if (!trigger) return;
    event.preventDefault();

    const message = trigger.dataset.chatbaseMessage;
    showPromptPanel(message);
  }

  document.querySelectorAll("[data-chatbase-actions]").forEach(renderActionGrid);
  document.addEventListener("click", handleQuickAction);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!event.target.closest('[role="button"][data-chatbase-message]')) return;
    handleQuickAction(event);
  });

  window.CKChatbase = {
    open: openChatbase,
    send: function (message) {
      showPromptPanel(message);
    }
  };
})();
