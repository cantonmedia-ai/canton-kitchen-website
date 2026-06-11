const menuButton = document.querySelector(".menu-button");
const navPanel = document.querySelector(".nav-panel");

menuButton?.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navPanel?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navPanel.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});
