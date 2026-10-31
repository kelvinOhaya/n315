import navbar from "../components/navbar";
import footer from "../components/footer";

export default function browse() {
  return `
    <div class="placeholder-page">
      ${navbar("#F25C54", window.isAuthenticated)}
      <main class="placeholder-content">
        <p>This is the browse page</p>
      </main>
      ${footer()}
    </div>
  `;
}
