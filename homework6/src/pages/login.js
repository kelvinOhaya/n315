import navbar from "../components/navbar";
import footer from "../components/footer";
import snackbar from "../components/snackbar";

// Event delegation for auth form submissions
if (typeof document !== "undefined") {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target && e.target.id === "loginForm") {
      window.isAuthenticated = true;
      window.dispatchEvent(new CustomEvent("authstatechange", { detail: true }));
      snackbar("Logged in", "var(--blue-green)");
    } else if (e.target && e.target.id === "signupForm") {
      window.isAuthenticated = true;
      window.dispatchEvent(new CustomEvent("authstatechange", { detail: true }));
      snackbar("Signed Up", "var(--blue)");
    }
  });
}

export default function login() {
  return `
    <div class="login-page">
      ${navbar("#FFD972", window.isAuthenticated)}
      <main class="login-content">
        <section class="login-tab">
          <h2>Login Here!</h2>
          <form id="loginForm" class="auth-form">
            <div class="form-group">
              <input type="email" id="loginEmail" placeholder="Email Address" required />
            </div>
            <div class="form-group">
              <input type="password" id="loginPassword" placeholder="Password" required />
            </div>
            <button type="submit" id="loginSubmitBtn" class="auth-btn">Login</button>
          </form>
        </section>

        <section class="signup-tab">
          <span class="subtitle">don't have an account?</span>
          <h2>Sign Up!</h2>
          <form id="signupForm" class="auth-form">
            <div class="form-group">
              <input type="text" id="signupFirstName" placeholder="First Name" required />
            </div>
            <div class="form-group">
              <input type="text" id="signupLastName" placeholder="Last Name" required />
            </div>
            <div class="form-group">
              <input type="email" id="signupEmail" placeholder="Email Address" required />
            </div>
            <div class="form-group">
              <input type="password" id="signupPassword" placeholder="Password" required />
            </div>
            <button type="submit" id="signupSubmitBtn" class="auth-btn">Sign Up</button>
          </form>
        </section>
      </main>
      ${footer()}
    </div>
  `;
}
