import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import snackbar from "./snackbar";

function closeLogoutModal() {
  const overlay = document.getElementById("logoutModalOverlay");
  if (overlay) {
    overlay.remove();
  }
}

async function confirmLogout() {
  try {
    await signOut(auth);
    snackbar("Logged out", "var(--blue-green)");
  } catch (error) {
    snackbar(
      error.message || "Something went wrong. Please try again.",
      "var(--pink)",
    );
  } finally {
    closeLogoutModal();
  }
}

export default function showLogoutModal() {
  // Avoid stacking multiple overlays if already open
  if (document.getElementById("logoutModalOverlay")) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "logoutModalOverlay";
  overlay.className = "logout-modal-overlay";
  overlay.innerHTML = `
    <div class="logout-modal elevation-3">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <div class="logout-modal-actions">
        <button type="button" id="logoutYesBtn" class="logout-modal-btn logout-modal-btn--yes">YES</button>
        <button type="button" id="logoutNoBtn" class="logout-modal-btn logout-modal-btn--no">NO</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Clicking the dark background (not the modal card) closes the modal
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeLogoutModal();
    }
  });

  document
    .getElementById("logoutYesBtn")
    .addEventListener("click", confirmLogout);
  document
    .getElementById("logoutNoBtn")
    .addEventListener("click", closeLogoutModal);
}

export { closeLogoutModal };
