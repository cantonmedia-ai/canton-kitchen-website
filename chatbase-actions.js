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

    // Chatbase's public embed reliably supports opening the widget.
    // Dynamic outside-the-iframe auto-send is not documented and may be ignored,
    // so these attempts are best-effort only. We keep the visible fallback below.
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

    commandAttempts.forEach((args) => {
      try {
        window.chatbase(...args);
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
      } catch (_) {}
    });

    return false;
  }

  function showFallback(message) {
    let fallback = document.getElementById("chatbase-fallback-toast");
    if (!fallback) {
      fallback = document.createElement("p");
      fallback.className = "chatbase-fallback";
      fallback.id = "chatbase-fallback-toast";
      document.body.appendChild(fallback);
    }
    if (!fallback) return;
    fallback.textContent = `Chatbase 已打开。问题已复制，请贴到聊天框发送：${message}`;
    fallback.hidden = false;
    window.setTimeout(() => {
      fallback.hidden = true;
    }, 10000);
  }

  function handleQuickAction(event) {
    const trigger = event.target.closest("[data-chatbase-message]");
    if (!trigger) return;
    event.preventDefault();

    const message = trigger.dataset.chatbaseMessage;
    openChatbase();

    window.setTimeout(() => {
      const sent = sendToChatbase(message);
      if (navigator.clipboard) {
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
