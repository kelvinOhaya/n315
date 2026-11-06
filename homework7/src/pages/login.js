import navbar from "../components/navbar";
import footer from "../components/footer";
import snackbar from "../components/snackbar";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Maps Firebase Auth error codes to user-friendly messages
function getAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return error.message || "Something went wrong. Please try again.";
  }
}

// Event delegation for auth form submissions
if (typeof document !== "undefined") {
  document.addEventListener("submit", async (e) => {
    if (e.target && e.target.id === "loginForm") {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        snackbar("Logged in", "var(--blue-green)");
        window.location.hash = "#home";
      } catch (error) {
        snackbar(getAuthErrorMessage(error), "var(--pink)");
      }
    } else if (e.target && e.target.id === "signupForm") {
      e.preventDefault();
      const firstName = document.getElementById("signupFirstName").value;
      const lastName = document.getElementById("signupLastName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: `${firstName} ${lastName}`.trim() });
        snackbar("Signed Up", "var(--blue)");
        window.location.hash = "#home";
      } catch (error) {
        snackbar(getAuthErrorMessage(error), "var(--pink)");
      }
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
