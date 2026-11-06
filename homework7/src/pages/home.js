import navbar from "../components/navbar";
import footer from "../components/footer";

export default function home() {
  return `<div class="home">
        ${navbar("#F25C54", window.isAuthenticated)}
        <div class="hero">
          <div class="smallCircle elevation-3">
            <p>
              Want to be a Jungle Cook? Go ahead and the kitchen is yours!
            </p>
          </div>
          <div class="bigCircle elevation-3">
            <h1>The Jungle Cook</h1>
            <p>
              The home to various<br />
              recipes of your choice.<br />
              Add your own recipe<br />
              today and fill the world<br />
              with joy!
            </p>
          </div>
        </div>
        ${footer()}
      </div>`;
}
