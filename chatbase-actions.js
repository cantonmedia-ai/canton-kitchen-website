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

  function sendToChatbase(message) {
    if (!message || typeof window.chatbase !== "function") return false;

    const commandAttempts = [
      ["sendMessage", message],
      ["sendMessage", { message }],
      ["send", message],
      ["send", { message }],
      ["message", message],
      ["setMessage", message],
      ["setInput", message],
      ["query", message],
      ["query", { message }]
    ];

    let sent = false;
    commandAttempts.forEach((args) => {
      try {
        window.chatbase(...args);
        sent = true;
      } catch (_) {}
    });

    document.querySelectorAll('iframe[src*="chatbase"]').forEach((frame) => {
      try {
        frame.contentWindow.postMessage(
          {
            type: "chatbase-send-message",
            event: "sendMessage",
            message
          },
          "*"
        );
        sent = true;
      } catch (_) {}
    });

    return sent;
  }

  function showFallback(message) {
    const fallback = document.querySelector("[data-chatbase-fallback]");
    if (!fallback) return;
    fallback.textContent = `已为您准备问题：${message}`;
    fallback.hidden = false;
    window.setTimeout(() => {
      fallback.hidden = true;
    }, 5000);
  }

  function handleQuickAction(event) {
    const trigger = event.target.closest("[data-chatbase-message]");
    if (!trigger) return;
    event.preventDefault();

    const message = trigger.dataset.chatbaseMessage;
    openChatbase();

    window.setTimeout(() => {
      const sent = sendToChatbase(message);
      if (!sent && navigator.clipboard) {
        navigator.clipboard.writeText(message).catch(() => {});
      }
      if (!sent) showFallback(message);
    }, 650);
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
      openChatbase();
      window.setTimeout(() => sendToChatbase(message), 650);
    }
  };
})();
