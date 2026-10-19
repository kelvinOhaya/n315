import { renderNav } from "../components/nav.js";
import { renderFooter } from "../components/footer.js";
import { shopTitle } from "../components/shopTitle.js";

const imageUrl = (id, width) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const categories = [
  { name: "Camping", image: "photo-1756147627747-f921252ae2b2", icon: "campingIcon.svg" },
  { name: "Hiking", image: "photo-1682294235600-e172309e5ac6", icon: "OrangeMountainLogo.svg" },
  { name: "Fishing", image: "photo-1670249305936-49250bea39ff", icon: "fishIcon.svg" },
  { name: "Kayaking", image: "photo-1608801320397-43d99bda19f2", icon: "waves.svg" },
  { name: "Climbing", image: "photo-1624410721903-0b8e8596cc6e", icon: "triangle.svg" },
  { name: "Apparel", image: "photo-1587325170487-684f3d33d561", icon: "apparel.svg" },
];

const featuredProducts = [
  { name: "Trailblazer 65L Backpack", price: "$289", image: "photo-1622260614153-03223fb72052", alt: "Hiking backpack beside a mountain lake" },
  { name: "Pinecrest 2P Backpacking Tent", price: "$249", image: "photo-1678736428914-30bdaf507b7f", alt: "Tent pitched in a forest campsite" },
  { name: "RidgeLine Trekking Shell", price: "$179", image: "photo-1587325170487-684f3d33d561", alt: "Hiker wearing outdoor layers on a mountain trail" },
  { name: "Summit Climbing Harness", price: "$89", image: "photo-1624410721903-0b8e8596cc6e", alt: "Climber ascending a rock face with a rope" },
  { name: "RiverRun Touring Kayak", price: "$699", image: "photo-1608801320397-43d99bda19f2", alt: "Kayaker paddling on a mountain lake" },
  { name: "High Country Fly Rod", price: "$219", image: "photo-1670249305936-49250bea39ff", alt: "Fly fisher standing in a mountain river" },
];

const adventureStories = [
  {
    title: "Rocky Mountain High: A Weekend Trek",
    description: "Three days, 22 miles, and big alpine views. Plan a memorable weekend on the trail.",
    image: "photo-1704277915374-29915bafc485",
  },
  {
    title: "A Night Under the Stars",
    description: "Find a campsite, pitch your tent, and settle in for a quiet night in the forest.",
    image: "photo-1756147627747-f921252ae2b2",
  },
  {
    title: "Paddling the Colorado River",
    description: "A beginner-friendly guide to choosing a route, reading the water, and packing safely.",
    image: "photo-1608801320397-43d99bda19f2",
  },
  {
    title: "Finding Your First Climbing Route",
    description: "Build confidence on the rock with a guide, the right equipment, and a smart first objective.",
    image: "photo-1624410721903-0b8e8596cc6e",
  },
];

export const shop = () => `<div id="shop" class="home">
      ${renderNav()}
      ${shopTitle()}
      <section class="explore">
        <p class="top-text">EXPLORE THE RANGE</p>
        <h1 class="title">Shop by Category</h1>
        <div class="categories">
          ${categories
            .map(
              ({ name, image, icon }) => `<div class="category">
            <img
              src="${imageUrl(image, 800)}"
              srcset="${imageUrl(image, 400)} 400w, ${imageUrl(image, 800)} 800w, ${imageUrl(image, 1200)} 1200w"
              sizes="(max-width: 600px) 45vw, 164px"
              class="cover"
              alt="${name} outdoors"
              loading="lazy"
            />
            <div class="title-and-logo">
              <img src="./assets/${icon}" class="logo" alt="" />
              <p>${name}</p>
            </div>
          </div>`,
            )
            .join("")}
        </div>
      </section>
      <section class="featured">
        <div class="center-text">
          <p class="top-text">HANDPICKED BY OUR STAFF</p>
          <h1 class="title">Featured Products</h1>
          <div class="products">
            ${featuredProducts
              .map(
                ({ name, price, image, alt }, index) => `<div class="product">
              ${index === 0 ? '<div class="chip">Best Seller</div>' : ""}
              <img
                class="product-photo"
                src="${imageUrl(image, 800)}"
                srcset="${imageUrl(image, 480)} 480w, ${imageUrl(image, 800)} 800w, ${imageUrl(image, 1200)} 1200w"
                sizes="(max-width: 600px) 90vw, 300px"
                alt="${alt}"
                loading="lazy"
              />
              <div class="content">
                <h2 class="title">${name}</h2>
                <div class="stars" aria-label="5 out of 5 stars">
                  <img src="./assets/star.svg" alt="" />
                  <img src="./assets/star.svg" alt="" />
                  <img src="./assets/star.svg" alt="" />
                  <img src="./assets/star.svg" alt="" />
                  <img src="./assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">${price}</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="./assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>`,
              )
              .join("")}
          </div>
          <button class="view-all-products">
            <span>View all Products</span>
            <img src="./assets/BlackArrowRight.svg" alt="" />
          </button>
        </div>
      </section>
      <section class="adventure">
        <div class="container">
          <p class="top-text">GO DEEPER</p>
          <h1 class="title" style="color: white">Adventure Inspiration</h1>
          <div class="card-list">
            ${adventureStories
              .map(
                ({ title, description, image }) => `<article class="card" style="--card-image: url('${imageUrl(image, 1200)}')">
              <div class="content">
                <h2 class="title">${title}</h2>
                <p class="description">${description}</p>
                <div class="action">
                  <span>Read More</span>
                  <img src="./assets/OrangeArrowRight.svg" alt="" />
                </div>
              </div>
            </article>`,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="remarks">
        <p class="top-text">REAL ADVENTURES, REAL STORIES</p>
        <h1 class="title">What Our Customers Say</h1>
        <div class="comments">
          <div class="comment">
            <div class="stars">
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
            </div>
            <p class="description">
              “Summit Ridge outfitted my entire PCT section hike. The staff
              spent two hours with me making sure every piece of gear was the
              right fit. I can't recommend them enough.”
            </p>
            <div class="user">
              <img src="./assets/profile.jpg" class="profile"></img>
              <div class="name-and-desc">
                <p class="name">Sarah K.</p>
                <p class="desc">Trail Runner · Denver, CO</p>
              </div>
            </div>
          </div>
          <div class="comment">
            <div class="stars">
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
            </div>
            <p class="description">
              “Summit Ridge outfitted my entire PCT section hike. The staff
              spent two hours with me making sure every piece of gear was the
              right fit. I can't recommend them enough.”
            </p>
            <div class="user">
              <img src="./assets/profile.jpg" class="profile"></img>
              <div class="name-and-desc">
                <p class="name">Sarah K.</p>
                <p class="desc">Trail Runner · Denver, CO</p>
              </div>
            </div>
          </div>
          <div class="comment">
            <div class="stars">
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
              <img src="./assets/star.svg" alt="" />
            </div>
            <p class="description">
              “Summit Ridge outfitted my entire PCT section hike. The staff
              spent two hours with me making sure every piece of gear was the
              right fit. I can't recommend them enough.”
            </p>
            <div class="user">
              <img src="./assets/profile.jpg" class="profile"></img>
              <div class="name-and-desc">
                <p class="name">Sarah K.</p>
                <p class="desc">Trail Runner · Denver, CO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="stay-in-the-loop">
        <p class="top-text">STAY IN THE LOOP</p>
        <p class="title" style="color: white">Get Trail-Ready Updates</p>
        <p class="desc">New gear drops, expert guides, seasonal sales, and trip inspiration — delivered twice a month. No spam, ever.</p>
        <div class="subscribe">
          <input type="text" placeholder="your@gmail.com">
          <button>Subscribe</button>
        </div>
      </section>
      ${renderFooter()}
    </div>`;
