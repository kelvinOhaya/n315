import titleImage from "../assets/title.png";
import menuIcon from "../assets/menuIcon.svg";
import showLogoutModal from "./logoutModal";

const breakpoint = window.matchMedia("(max-width: 900px)");
let dropdownIsOpen = false;
let dropdownBgColor = "#F25C54";

function getActiveHash() {
  return window.location.hash.replace(/^[#/]+/, "").trim().toLowerCase();
}

function authLinkContent(isAuthenticated) {
  if (isAuthenticated) {
    return `<a href="#" id="logoutBtn" class="button"><span>Logout</span></a>`;
  }
  return `<a href="#login" class="button"><span class="${getActiveHash() === "login" || getActiveHash() === "auth" ? "underline" : ""}">Login</span></a>`;
}

function navbarContent(mediaQuery, isAuthenticated) {
  if (mediaQuery.matches) {
    return `
    <div class="mobile-links">
      <button id="menuBtn" aria-label="Toggle navigation menu">
        <img src="${menuIcon}" alt="Menu" />
      </button>
    </div>`;
  }
  return `
  <div class="links">
    <a href="#home"><span class="${getActiveHash() === "home" || getActiveHash() === "" ? "underline" : ""}">Home</span></a>
    <a href="#browse"><span class="${getActiveHash() === "browse" ? "underline" : ""}">Browse</span></a>
    ${isAuthenticated ? `<a href="#create-recipie"><span class="${getActiveHash() === "create-recipie" ? "underline" : ""}">Create Recipie</span></a>` : ""}
    ${authLinkContent(isAuthenticated)}
  </div>`;
}

function mobileDropdownContent(mediaQuery, isAuthenticated) {
  if (mediaQuery.matches && dropdownIsOpen) {
    return `
    <div class="mobile-navbar-dropdown elevation-3" style="background-color: ${dropdownBgColor};">
      <a href="#home"><span class="${getActiveHash() === "home" || getActiveHash() === "" ? "underline" : ""}">Home</span></a>
      <a href="#browse"><span class="${getActiveHash() === "browse" ? "underline" : ""}">Browse</span></a>
      ${isAuthenticated ? `<a href="#create-recipie"><span class="${getActiveHash() === "create-recipie" ? "underline" : ""}">Create Recipie</span></a>` : ""}
      ${authLinkContent(isAuthenticated)}
    </div>`;
  }
  return "";
}

let authenticated = false;

function renderNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileDropdown = document.getElementById("mobileDropdown");

  if (navbar) {
    navbar.innerHTML = `
      <img src="${titleImage}" alt="Logo" class="title" />
      ${navbarContent(breakpoint, authenticated)}
    `;
  }

  if (mobileDropdown) {
    mobileDropdown.innerHTML = mobileDropdownContent(breakpoint, authenticated);
  }
}

document.addEventListener("click", (e) => {
  const menuBtn = e.target.closest("#menuBtn");
  const navLink = e.target.closest("#mobileDropdown a");
  const logoutBtn = e.target.closest("#logoutBtn");

  if (logoutBtn) {
    e.preventDefault();
    showLogoutModal();
    if (dropdownIsOpen) {
      dropdownIsOpen = false;
      renderNavbar();
    }
    return;
  }

  if (menuBtn) {
    dropdownIsOpen = !dropdownIsOpen;
    renderNavbar();
    return;
  }

  if (
    dropdownIsOpen &&
    (navLink || !e.target.closest("#navbar, #mobileDropdown"))
  ) {
    dropdownIsOpen = false;
    renderNavbar();
  }
});

breakpoint.addEventListener("change", () => {
  if (!breakpoint.matches) {
    dropdownIsOpen = false;
  }
  renderNavbar();
});

// Re-render navbar on hash change to update active state
window.addEventListener("hashchange", () => {
  renderNavbar();
});

window.addEventListener("authstatechange", (event) => {
  authenticated = Boolean(event.detail);
  renderNavbar();
});

export default function navbar(bgColor = "#F25C54", isAuthenticated = false) {
  dropdownBgColor = bgColor;
  authenticated = Boolean(isAuthenticated);
  return `
  <div class="navbar" id="navbar">
    <img src="${titleImage}" alt="Logo" class="title" />
    ${navbarContent(breakpoint, authenticated)}
  </div>
  <div id="mobileDropdown">${mobileDropdownContent(breakpoint, authenticated)}</div>
  `;
}
