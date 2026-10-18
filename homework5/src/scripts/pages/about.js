import { renderNav } from "../components/nav.js";
import { renderFooter } from "../components/footer.js";

export const about = () => `<div id="about" class="home">
      ${renderNav()}
      <section class="stub">
        <p class="top-text">ABOUT US</p>
        <h1 class="title">This is the about page</h1>
      </section>
      ${renderFooter()}
    </div>`;

