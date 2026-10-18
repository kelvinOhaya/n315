import { renderNav } from "../components/nav.js";
import { renderFooter } from "../components/footer.js";

export const adventureGuides = () => `<div id="adventure-guides" class="home">
      ${renderNav()}
      <section class="stub">
        <p class="top-text">ADVENTURE GUIDES</p>
        <h1 class="title">This is the adventure guides page</h1>
      </section>
      ${renderFooter()}
    </div>`;
