import { renderNav } from "../components/nav.js";
import { renderFooter } from "../components/footer.js";

export const shop = () => `<div id="shop" class="home">
      ${renderNav()}
      <section class="stub">
        <p class="top-text">SHOP ALL GEAR</p>
        <h1 class="title">This is the shop page</h1>
      </section>
      ${renderFooter()}
    </div>`;
