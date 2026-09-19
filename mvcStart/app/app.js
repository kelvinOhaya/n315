import { loadData, changePage } from "../model/model.js";

const loadDataBtn = document.querySelector("#loadDataBtn");

function myReturnedData(data) {
  console.log(`My data is this: ${data}`);
}

loadDataBtn.addEventListener("click", () => {
  console.log("Load Data button clicked");
  loadData("Kelvin", myReturnedData);
});

function initListeners() {
  changePage("home");
  9;
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
