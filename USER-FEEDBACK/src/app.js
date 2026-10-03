import { loadPages } from "./model.js";
import { showToast } from "./utility.js";

let isLoggedIN = false;

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID) {
    loadPages(pageID);
  } else {
    loadPages("home");
  }

  initPageListener();
}

function initURLListener() {
  window.addEventListener("hashchange", changeRoute);
  changeRoute();
}

function initPageListener() {
  const loadBtn = document.querySelector("#loadBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", loadData);
  }
}

function loadData() {
  const data = document.querySelector("#data");
  showToast("Loading data...", "loading");

  setTimeout(() => {
    data.innerHTML = `
    <h2>Student Data</h2>
    <p>Name: Kelvin Ohaya</p>
    <p>Email: k@k.com</p>
    `;

    showToast("Data Loaded Successfully", "success");
  }, 2000);
}

function initLogin() {
  const loginBtn = document.querySelector("#loginBtn");
  const loginModal = document.querySelector("#loginModal");
  const closeModal = document.querySelector("#closeModal");
  const loginForm = document.querySelector("#loginForm");

  loginBtn.addEventListener("click", () => {
    if (isLoggedIN) {
      isLoggedIn = false;
      loginBtn.innerHTML = "Login";

      showToast("You have successfully logged out", "info");
      return;
    }
    loginModal.classList.add("modal--show");
  });

  closeModal.addEventListener("click", () => {
    loginModal.classList.remove("modal--show");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email === "") {
      showToast("Please enter your email address", "error");
      return;
    }

    if (email.length < 5) {
      showToast("Your email address is too short", "error");
      return;
    }

    if (!email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (password === "") {
      showToast("Please enter your password", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    //if login was successful
    isLoggedIN = true;
    loginBtn.innerHTML = "Logout";
    showToast("You have successfully signed in!", "success");
    loginModal.classList.remove("modal--show");
    loginForm.reset();
  });
}

function initApp() {
  initURLListener();
  initLogin();
}

initApp();
