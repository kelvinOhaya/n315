import navbar from "../components/navbar";
import footer from "../components/footer";
import snackbar from "../components/snackbar";
import recipiePreview from "../components/recipiePreview";
import recipieModal from "../components/recipieModal";
import { auth, db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

// Builds the greeting heading's inner markup: a personalized "Hey {name}" for signed-in users,
// or a sign-in prompt linking to #login otherwise. Shared by the initial render and updateGreeting().
function greetingMarkup() {
  if (auth.currentUser) {
    const firstName = auth.currentUser.displayName?.split(" ")[0] ?? "Chef";
    return `Hey ${firstName}, here are your recipes`;
  }
  return `Sign in to view your recipes — <a href="#login">Log in</a>`;
}

// auth.currentUser starts out null until Firebase's async onAuthStateChanged check resolves, so
// the greeting is refreshed once main.js dispatches "authstatechange"
function updateGreeting() {
  const heading = document.getElementById("browseGreeting");
  if (!heading) return;

  // The signed-in branch is the only one with user-controlled text (displayName), so it's set
  // via textContent rather than innerHTML; the sign-in prompt is static markup.
  if (auth.currentUser) {
    heading.textContent = greetingMarkup();
  } else {
    heading.innerHTML = greetingMarkup();
  }
}

// Refreshes the greeting and re-fetches recipes once Firebase resolves/changes auth state, so the
// page doesn't get stuck showing a stale greeting or an empty grid for an already-signed-in user
function handleAuthStateChange() {
  updateGreeting();
  loadAndRenderRecipies();
}

// In-memory cache of the signed-in user's recipes, refreshed after every fetch/delete
let cachedRecipies = [];

// Fetches only the signed-in user's recipes from the "recipes" collection
async function fetchUserRecipies() {
  if (!auth.currentUser) return [];
  const recipiesQuery = query(collection(db, "recipes"), where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(recipiesQuery);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

// Renders the recipe grid (or an empty-state message) for a list of {recipe, id} entries.
// `id` is the recipe's Firestore document ID, so edit/delete always target the exact cloud record.
function renderRecipiesGrid(entries, emptyMessage) {
  if (!entries.length) {
    return `<p class="browse-empty">${emptyMessage}</p>`;
  }
  return `<div class="recipie-grid">${entries
    .map(
      ({ recipe, id }) =>
        `<div class="browse-card-wrapper" data-id="${id}">${recipiePreview(recipe)}</div>`,
    )
    .join("")}</div>`;
}

// Closes the modal by clearing its container and detaching the Escape-key listener
function closeModal() {
  const modalContainer = document.getElementById("modal-container");
  if (modalContainer) modalContainer.innerHTML = "";
  window.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

// Renders the modal for a single recipe and wires up its close interactions
function openModal(recipe) {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return;

  modalContainer.innerHTML = recipieModal(recipe);

  const backdrop = modalContainer.querySelector(".recipie-modal-backdrop");
  const closeBtn = modalContainer.querySelector(".recipie-modal-close");

  closeBtn.addEventListener("click", closeModal);
  // Clicking the dark background (not the modal card) closes the modal
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });
  window.addEventListener("keydown", handleEscapeKey);
}

// Re-renders the grid from cachedRecipies, respecting any active search query
function refreshGrid() {
  const gridContainer = document.getElementById("recipiesGridContainer");
  const searchInput = document.getElementById("recipeSearchInput");
  if (!gridContainer || !searchInput) return;

  if (!cachedRecipies.length) {
    gridContainer.innerHTML = renderRecipiesGrid(
      [],
      "No recipes yet. Create one to see it here!",
    );
    return;
  }

  const queryText = searchInput.value.trim().toLowerCase();
  const entries = cachedRecipies
    .map((recipe) => ({ recipe, id: recipe.id }))
    .filter(({ recipe }) => recipe.name.toLowerCase().includes(queryText));

  gridContainer.innerHTML = renderRecipiesGrid(entries, "No matching recipies found.");
}

// Fetches the signed-in user's recipes from Firestore and renders the grid, showing a loading
// indicator while the request is in flight
async function loadAndRenderRecipies() {
  const gridContainer = document.getElementById("recipiesGridContainer");
  if (!gridContainer) return;

  gridContainer.innerHTML = `<p class="browse-loading">Loading your recipes...</p>`;

  try {
    cachedRecipies = await fetchUserRecipies();
    refreshGrid();
  } catch (error) {
    gridContainer.innerHTML = `<p class="browse-empty">Couldn't load your recipes. ${error.message || ""}</p>`;
  }
}

// Removes the recipe document from Firestore and re-renders the grid
async function handleDeleteRecipe(id) {
  try {
    await deleteDoc(doc(db, "recipes", id));
    cachedRecipies = cachedRecipies.filter((recipe) => recipe.id !== id);
    snackbar("Recipe deleted.", "var(--blue-green)");
    refreshGrid();
  } catch (error) {
    snackbar(error.message || "Something went wrong. Please try again.", "var(--pink)");
  }
}

// Stores the target document ID and navigates to the edit page
function handleEditRecipe(id) {
  sessionStorage.setItem("editRecipeId", id);
  window.location.hash = "#edit";
}

// Wires up the search filter and card-click handlers that open the recipe detail modal
export function init() {
  // Update greeting immediately if the auth state is already known (user signed in).
  // Otherwise, rely on the "authstatechange" event to set the correct greeting without a flash.
  if (auth.currentUser) {
    updateGreeting();
  }

  // Re-registering on every init() call is safe: removing a not-yet-added listener is a no-op,
  // so repeated navigations to this page never accumulate duplicate "authstatechange" handlers
  window.removeEventListener("authstatechange", handleAuthStateChange);
  window.addEventListener("authstatechange", handleAuthStateChange);
  updateGreeting();

  // Re-registering on every init() call is safe: removing a not-yet-added listener is a no-op,
  // so repeated navigations to this page never accumulate duplicate "authstatechange" handlers
  window.removeEventListener("authstatechange", handleAuthStateChange);
  window.addEventListener("authstatechange", handleAuthStateChange);

  const gridContainer = document.getElementById("recipiesGridContainer");
  const searchInput = document.getElementById("recipeSearchInput");

  // Event delegation on the container so cards still open the modal after the grid is
  // re-rendered by the search filter below
  gridContainer.addEventListener("click", (e) => {
    const actionBtn = e.target.closest(".recipie-action-btn");
    if (actionBtn) {
      // Edit/Delete live inside the clickable card, so stop the click reaching the
      // "open modal" handler below
      e.stopPropagation();
      const wrapper = actionBtn.closest(".browse-card-wrapper");
      const id = wrapper.dataset.id;

      if (actionBtn.dataset.action === "delete") {
        handleDeleteRecipe(id);
      } else if (actionBtn.dataset.action === "edit") {
        handleEditRecipe(id);
      }
      return;
    }

    const wrapper = e.target.closest(".browse-card-wrapper");
    if (!wrapper) return;
    const recipe = cachedRecipies.find((r) => r.id === wrapper.dataset.id);
    if (recipe) {
      openModal(recipe);
    }
  });

  searchInput.addEventListener("input", refreshGrid);

  loadAndRenderRecipies();
}

export default function browse() {
  return /*html*/ `
<div class="browse-page">
    ${navbar("#F25C54", window.isAuthenticated)}
    <main class="browse-content">
        <h2 id="browseGreeting" class="browse-heading">${greetingMarkup()}</h2>
        <div class="browse-search-wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="recipeSearchInput" class="browse-search-input" placeholder="Search by recipe title..." />
        </div>
        <div id="recipiesGridContainer">
            <p class="browse-loading">Loading your recipes...</p>
        </div>
    </main>
    ${footer()}
    <div id="modal-container"></div>
</div>
`;
}
