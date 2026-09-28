import HOME from "../pages/home.js";
import ABOUT from "../pages/about.js";
import SERVICES from "../pages/services.js";

export function loadPage(pageID) {
  console.log(`model.js ${pageID}`);

  const main = document.querySelector("main");
  let currentPage = HOME;

  switch (pageID) {
    case "home":
      currentPage = HOME;
      break;
    case "about":
      currentPage = ABOUT;
      break;
    case "services":
      currentPage = SERVICES;
      break;
  }
  main.innerHTML = currentPage;
}
