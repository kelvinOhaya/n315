import home from "./pages/home";
import login from "./pages/login";
import browse from "./pages/browse";
import createRecipie from "./pages/createRecipie";
import "./styles/styles.scss";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const app = document.getElementById("app");
window.isAuthenticated = false;

onAuthStateChanged(auth, (user) => {
  window.isAuthenticated = Boolean(user);
  window.dispatchEvent(new CustomEvent("authstatechange", { detail: window.isAuthenticated }));
});

const routes = {
  "": home,
  home: home,
  login: login,
  auth: login,
  browse: browse,
  "create-recipie": createRecipie,
};

function changeRoute() {
  const hashTag = window.location.hash.replace(/^[#/]+/, "").trim().toLowerCase();
  const page = routes[hashTag] || home;

  if (app) {
    app.innerHTML = typeof page === "function" ? page() : page;
  }
}

window.addEventListener("hashchange", changeRoute);
window.addEventListener("load", changeRoute);

changeRoute();
