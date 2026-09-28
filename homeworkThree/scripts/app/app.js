import { loadData, changePage } from "../model/model.js";

const loadDataBtn = document.querySelector("#loadDataBtn");

function myReturnedData(data) {
  console.log(`My data is this: ${data}`);
  document.querySelector("#callback").textContent = `My data is this: ${data}`;
}

function initListeners() {
  changePage("home");
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let btnId = e.currentTarget.id;
      console.log(btnId);
      changePage(btnId);
    });
  });
}

initListeners();
