const WHATSAPP_NUMBER = "60162786288";

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

window.createWhatsAppLink = createWhatsAppLink;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-whatsapp-message]").forEach((el) => {
    const message = el.getAttribute("data-whatsapp-message");
    if (!message) return;
    el.setAttribute("href", createWhatsAppLink(message));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
});
