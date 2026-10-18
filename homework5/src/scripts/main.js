import "../scss/styles.scss";
import { pages } from "./pages/pages";
import { logout } from "./auth";
import { showToast } from "./components/toast";
import { handleLoginSubmit } from "./pages/login";
import { handleSignupSubmit } from "./pages/signup";
const app = document.getElementById("app");

function getRoute() {
  // location.hash includes the leading "#" (e.g. "#about"), so strip it.
  // Default to "home" when there's no hash at all (e.g. "/" or "/index.html").
  return location.hash.slice(1) || "home";
}

function render() {
  const route = getRoute();
  const page = pages[route] ?? pages["home"];
  app.innerHTML = page();
}

window.addEventListener("hashchange", render);

// Delegated click handling for actions that don't map to a route change
// (e.g. logging out), since app.innerHTML is replaced on every render.
app.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;

  const { action } = trigger.dataset;

  if (action === "logout") {
    event.preventDefault();
    logout();
    render();
    showToast("You have logged out successfully.", "success");
  }
});

// Delegated submit handling for the login/signup forms, since they're
// injected dynamically and re-created on every render.
app.addEventListener("submit", (event) => {
  const form = event.target;

  if (form.dataset.form === "login") {
    event.preventDefault();
    handleLoginSubmit(form);
  } else if (form.dataset.form === "signup") {
    event.preventDefault();
    handleSignupSubmit(form);
  }
});

render();

