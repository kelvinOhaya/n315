import { renderNav } from "../components/nav.js";
import { renderFooter } from "../components/footer.js";

export const home = () => `<div id="home" class="home">
      ${renderNav()}
      <section class="welcome">
        <div class="welcome-content">
          <div class="top-text">
            <svg
              width="32"
              height="1"
              viewBox="0 0 32 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="31.9891" height="0.987747" fill="#E8722A" />
            </svg>
            Boulder, CO · Est. 1998
          </div>
          <div class="title">
            Where the <span class="orange-text">Trail</span> Begins.
          </div>
          <div class="description">
            Premium outdoor gear and expert guidance for every adventure — from
            your first summit to your hundredth. We'll make sure you're ready.
          </div>
          <div class="buttons">
            <button class="shop-now">
              Shop Now <img src="src/assets/arrowRight.svg" /></button
            ><button class="explore-adventures">Expolore Adventures</button>
          </div>
        </div>
      </section>
      <section class="stats">
        <div class="stat left-border">
          <h1>25+</h1>
          <p>YEARS IN BUSINESS</p>
        </div>
        <div class="stat left-border">
          <h1>12,400+</h1>
          <p>HAPPY CUSTOMERS</p>
        </div>
        <div class="stat left-border">
          <h1>2,400+</h1>
          <p>PRODUCTS IN STOCK</p>
        </div>
        <div class="stat">
          <h1>4.9 ★</h1>
          <p>AVERAGE REVIEW</p>
        </div>
      </section>
      <section class="explore">
        <p class="top-text">EXPLORE THE RANGE</p>
        <h1 class="title">Shop by Category</h1>
        <div class="categories">
          <div class="category">
            <img src="https://picsum.photos/200" class="cover" alt="" />
            <div class="title-and-logo">
              <img
                src="src/assets/OrangeMountainLogo.svg"
                class="logo"
                alt=""
              />
              <p>Title</p>
            </div>
          </div>
          <div class="category">
            <img src="https://picsum.photos/200" class="cover" alt="" />
            <div class="title-and-logo">
              <img
                src="src/assets/OrangeMountainLogo.svg"
                class="logo"
                alt=""
              />
              <p>Title</p>
            </div>
          </div>
          <div class="category">
            <img src="https://picsum.photos/200" class="cover" alt="" />
            <div class="title-and-logo">
              <img
                src="src/assets/OrangeMountainLogo.svg"
                class="logo"
                alt=""
              />
              <p>Title</p>
            </div>
          </div>
          <div class="category">
            <img src="https://picsum.photos/200" class="cover" alt="" />
            <div class="title-and-logo">
              <img
                src="src/assets/OrangeMountainLogo.svg"
                class="logo"
                alt=""
              />
              <p>Title</p>
            </div>
          </div>
          <div class="category">
            <img src="https://picsum.photos/200" class="cover" alt="" />
            <div class="title-and-logo">
              <img
                src="src/assets/OrangeMountainLogo.svg"
                class="logo"
                alt=""
              />
              <p>Title</p>
            </div>
          </div>
          <div class="category">
            <img src="https://picsum.photos/200" class="cover" alt="" />
            <div class="title-and-logo">
              <img
                src="src/assets/OrangeMountainLogo.svg"
                class="logo"
                alt=""
              />
              <p>Title</p>
            </div>
          </div>
        </div>
      </section>
      <section class="featured">
        <div class="center-text">
          <p class="top-text">HANDPICKED BY OUR STAFF</p>
          <h1 class="title">Featured Products</h1>
          <div class="products">
            <div class="product">
              <div class="chip">Best Seller</div>
              <img src="https://picsum.photos/200" />
              <div class="content">
                <h1 class="title">Trailblazer 65L Backpack</h1>
                <div class="stars">
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">$289</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="src/assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="product">
              <div class="chip">Best Seller</div>
              <img src="https://picsum.photos/200" />
              <div class="content">
                <h1 class="title">Trailblazer 65L Backpack</h1>
                <div class="stars">
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">$289</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="src/assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="product">
              <div class="chip">Best Seller</div>
              <img src="https://picsum.photos/200" />
              <div class="content">
                <h1 class="title">Trailblazer 65L Backpack</h1>
                <div class="stars">
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">$289</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="src/assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="product">
              <div class="chip">Best Seller</div>
              <img src="https://picsum.photos/200" />
              <div class="content">
                <h1 class="title">Trailblazer 65L Backpack</h1>
                <div class="stars">
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">$289</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="src/assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="product">
              <div class="chip">Best Seller</div>
              <img src="https://picsum.photos/200" />
              <div class="content">
                <h1 class="title">Trailblazer 65L Backpack</h1>
                <div class="stars">
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">$289</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="src/assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="product">
              <div class="chip">Best Seller</div>
              <img src="https://picsum.photos/200" />
              <div class="content">
                <h1 class="title">Trailblazer 65L Backpack</h1>
                <div class="stars">
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">$289</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="src/assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="product">
              <div class="chip">Best Seller</div>
              <img src="https://picsum.photos/200" />
              <div class="content">
                <h1 class="title">Trailblazer 65L Backpack</h1>
                <div class="stars">
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                  <img src="src/assets/star.svg" alt="" />
                </div>
                <div class="price-and-link">
                  <p class="price">$289</p>
                  <div class="view-product">
                    <span>View Product</span>
                    <img src="src/assets/OrangeArrowRight.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="view-all-products">
            <span>View all Products</span>
            <img src="src/assets/BlackArrowRight.svg" alt="" />
          </button>
        </div>
      </section>
      <section class="adventure">
        <div class="container">
          <p class="top-text">GO DEEPER</p>
          <h1 class="title" style="color: white">Adventure Inspiration</h1>
          <div class="card-list">
            <div class="card">
              <div class="content">
                <h1 class="title">Rocky Mountain High: A Weekend Trek</h1>
                <p class="description">
                  Three days, 22 miles, and some of the most breathtaking views
                  in the American West. Here's everything you need to know
                  before you go.
                </p>
                <div class="action">
                  <span>Read More</span>
                  <img src="src/assets/OrangeArrowRight.svg" alt="" />
                </div>
              </div>
            </div>
            <div class="card">
              <div class="content">
                <h1 class="title">Rocky Mountain High: A Weekend Trek</h1>
                <p class="description">
                  Three days, 22 miles, and some of the most breathtaking views
                  in the American West. Here's everything you need to know
                  before you go.
                </p>
                <div class="action">
                  <span>Read More</span>
                  <img src="src/assets/OrangeArrowRight.svg" alt="" />
                </div>
              </div>
            </div>
            <div class="card">
              <div class="content">
                <h1 class="title">Rocky Mountain High: A Weekend Trek</h1>
                <p class="description">
                  Three days, 22 miles, and some of the most breathtaking views
                  in the American West. Here's everything you need to know
                  before you go.
                </p>
                <div class="action">
                  <span>Read More</span>
                  <img src="src/assets/OrangeArrowRight.svg" alt="" />
                </div>
              </div>
            </div>
            <div class="card">
              <div class="content">
                <h1 class="title">Rocky Mountain High: A Weekend Trek</h1>
                <p class="description">
                  Three days, 22 miles, and some of the most breathtaking views
                  in the American West. Here's everything you need to know
                  before you go.
                </p>
                <div class="action">
                  <span>Read More</span>
                  <img src="src/assets/OrangeArrowRight.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="remarks">
        <p class="top-text">REAL ADVENTURES, REAL STORIES</p>
        <h1 class="title">What Our Customers Say</h1>
        <div class="comments">
          <div class="comment">
            <div class="stars">
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
            </div>
            <p class="description">
              “Summit Ridge outfitted my entire PCT section hike. The staff
              spent two hours with me making sure every piece of gear was the
              right fit. I can't recommend them enough.”
            </p>
            <div class="user">
              <img src="src/assets/profile.jpg" class="profile"></img>
              <div class="name-and-desc">
                <p class="name">Sarah K.</p>
                <p class="desc">Trail Runner · Denver, CO</p>
              </div>
            </div>
          </div>
          <div class="comment">
            <div class="stars">
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
            </div>
            <p class="description">
              “Summit Ridge outfitted my entire PCT section hike. The staff
              spent two hours with me making sure every piece of gear was the
              right fit. I can't recommend them enough.”
            </p>
            <div class="user">
              <img src="src/assets/profile.jpg" class="profile"></img>
              <div class="name-and-desc">
                <p class="name">Sarah K.</p>
                <p class="desc">Trail Runner · Denver, CO</p>
              </div>
            </div>
          </div>
          <div class="comment">
            <div class="stars">
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
              <img src="src/assets/star.svg" alt="" />
            </div>
            <p class="description">
              “Summit Ridge outfitted my entire PCT section hike. The staff
              spent two hours with me making sure every piece of gear was the
              right fit. I can't recommend them enough.”
            </p>
            <div class="user">
              <img src="src/assets/profile.jpg" class="profile"></img>
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
