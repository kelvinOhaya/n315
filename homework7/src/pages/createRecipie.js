import navbar from "../components/navbar";
import footer from "../components/footer";

export default function createRecipie() {
  return `
    <div class="placeholder-page">
      ${navbar("#F25C54", window.isAuthenticated)}
      <main class="placeholder-content">
        <p>This is the createRecipie page</p>
      </main>
      ${footer()}
    </div>
  `;
}
