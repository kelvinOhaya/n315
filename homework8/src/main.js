import "./styles/styles.scss";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const pages = import.meta.glob("./pages/*.js");

const app = document.getElementById("app");
window.isAuthenticated = false;

onAuthStateChanged(auth, (user) => {
  window.isAuthenticated = Boolean(user);
  window.dispatchEvent(
    new CustomEvent("authstatechange", { detail: window.isAuthenticated }),
  );
});

async function changeRoute() {
  const hashTag = window.location.hash
    .replace(/^[#/]+/, "")
    .trim()
    .toLowerCase();
  // "auth" is an alias for the login page; kebab-case hashes map to camelCase filenames
  const pageName = (hashTag === "auth" ? "login" : hashTag || "home").replace(
    /-([a-z])/g,
    (_, c) => c.toUpperCase(),
  );
  const path = `./pages/${pageName}.js`;

  if (!app) return;

  try {
    const module = await (pages[path] || pages["./pages/home.js"])();
    app.innerHTML = module.default();
    if (typeof module.init === "function") {
      module.init();
    }
  } catch (error) {
    console.error("Error loading the page: ", error);
    app.innerHTML = `<h1>404 - Page Not Found</h1>`;
  }
}

window.addEventListener("hashchange", changeRoute);
window.addEventListener("load", changeRoute);

changeRoute();
