import { renderNav } from "../components/nav.js";
import { renderFooter } from "../components/footer.js";

export const contact = () => `<div id="contact" class="home">
      ${renderNav()}
      <section class="stub">
        <p class="top-text">GET IN TOUCH</p>
        <h1 class="title">This is the contact page</h1>
      </section>
      ${renderFooter()}
    </div>`;
