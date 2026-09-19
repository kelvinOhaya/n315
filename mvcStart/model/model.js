export function loadData(fName, callback) {
  console.log(`My First Name is ${fName}`);
  callback(fName);
}

export function changePage(pageName) {
  document.querySelector("#app").innerHTML = pages[pageName];
}

const home = `
  <div class="card">
    <img src="https://picsum.photos/200" alt="kdkd" class="card__image" />
    <h2 class="card__title">Kelvin Ohaya</h2>
    <p class="card__text">Student for n315</p>
    <button class="card__button card__button--primary">Learn More</button>
  </div>
`;
const about = `
  <div class="card">
    <img src="https://picsum.photos/200" alt="kdkd" class="card__image" />
    <h2 class="card__title">About Me</h2>
    <p class="card__text">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
      quisquam excepturi voluptatum animi. Rerum illo odio saepe excepturi hic
      nam, veritatis nobis harum est non dolorum iure minima unde impedit?
    </p>
    <button class="card__button card__button--secondary">Learn More</button>
  </div>
`;
const services = `
  <div class="card">
    <img src="https://picsum.photos/200" alt="kdkd" class="card__image" />
    <h2 class="card__title">Services</h2>
    <p class="card__text">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
      quisquam excepturi voluptatum animi. Rerum illo odio saepe excepturi hic
      nam, veritatis nobis harum est non dolorum iure minima unde impedit?
    </p>
    <button class="card__button card__button--secondary">Learn More</button>
  </div>
`;
const contact = `
  <div class="card">
    <img src="https://picsum.photos/200" alt="kdkd" class="card__image" />
    <h2 class="card__title">Contact Me</h2>
    <p class="card__text">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
      quisquam excepturi voluptatum animi. Rerum illo odio saepe excepturi hic
      nam, veritatis nobis harum est non dolorum iure minima unde impedit?
    </p>
    <button class="card__button card__button--secondary">Send</button>
  </div>
`;
const pages = {
  home,
  about,
  contact,
  services,
};
