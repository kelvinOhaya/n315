import navbar from "../components/navbar";
import footer from "../components/footer";
import snackbar from "../components/snackbar";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function updateGreeting() {
  const greeting = document.getElementById("recipeGreeting");
  if (!greeting) return;
  greeting.textContent = `Hey ${auth.currentUser?.displayName ?? ""}, edit your recipie!`;
}

window.addEventListener("authstatechange", updateGreeting);

// The Firestore document ID of the recipe being edited; set by loadAndRenderEditForm()
let recipeId = null;

// Single source of truth for the ingredients being edited; re-rendered after every add/remove
let ingredientList = [{ name: "" }];

// Single source of truth for the instructions being edited; re-rendered after every add/remove
let instructionList = [{ text: "" }];

// The recipe's existing image, kept so submit can fall back to it if no new file is chosen
let existingImageDataUrl = null;

// Mirrors the "Recipie Name" field pattern: a persistent label above a separate underline input
function Ingredient(ingredient, index) {
  return /*html*/ `
<div class="ingredient" data-index="${index}">
    <span class="tag">Ingredient #${index + 1}</span>
    <input type="text" class="ingredient-name-input info-input" value="${ingredient.name}" required />
    <!-- <button type="button" class="remove-ingredient-btn" aria-label="Remove ingredient">
        <i class="fa-solid fa-xmark"></i>
    </button> -->
</div>`;
}

function Instruction(instruction, index) {
  return /*html*/ `
<div class="instruction" data-index="${index}">
    <span class="tag">Instruction #${index + 1}</span>
    <input type="text" class="instruction-text-input info-input" value="${instruction.text}" required />
    <!-- <button type="button" class="remove-instruction-btn" aria-label="Remove instruction">
        <i class="fa-solid fa-xmark"></i>
    </button> -->
</div>`;
}

// Re-renders the ingredients list from the current in-memory state
function renderIngredientsList() {
  const list = document.getElementById("ingredientsList");
  if (!list) return;
  list.innerHTML = ingredientList.map((ing, i) => Ingredient(ing, i)).join("");
}

// Re-renders the instructions list from the current in-memory state
function renderInstructionsList() {
  const list = document.getElementById("instructionsList");
  if (!list) return;
  list.innerHTML = instructionList.map((ins, i) => Instruction(ins, i)).join("");
}

// Reads a File as a base64 data URL so it can be persisted in Firestore and rendered directly
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function notFoundMarkup(message = "We couldn't find that recipe to edit.") {
  return /*html*/ `
<h2>Recipe not found</h2>
<p class="edit-recipe-not-found">${message} <a href="#browse">Back to Browse</a></p>`;
}

// Builds the edit form markup, pre-filled from the fetched recipe document
function formMarkup(recipe) {
  return /*html*/ `
<h2 id="recipeGreeting">Hey ${auth.currentUser?.displayName ?? ""}, edit your recipie!</h2>
<form id="editRecipeForm" class="auth-form recipe-form">
    <section class="top-info">
        <div class="info-container attach-row">
            <div class="attach-row-top">
                <span class="tag">Add Recipie Image</span>
                <input type="file" id="recipeImageInput" accept="image/*" hidden />
                <span id="recipeImageName" class="file-name"></span>
                <button type="button" id="attachFileBtn" class="attatch-file">Attatch file</button>
            </div>
            <img id="recipeImagePreview" class="image-preview" alt="Recipe image preview" src="${recipe.imageDataUrl ?? ""}" ${recipe.imageDataUrl ? "" : "hidden"} />
        </div>
        <div class="info-container">
            <span class="tag">Recipie Name</span>
            <input type="text" id="recipeName" class="info-input" value="${recipe.name ?? ""}" required />
        </div>
        <div class="info-container">
            <span class="tag">Recipie Description</span>
            <input type="text" id="recipeDescription" class="info-input" value="${recipe.description ?? ""}" />
        </div>
        <div class="info-container">
            <span class="tag">Recipe Total Time</span>
            <div class="time-input-group">
                <input type="number" id="recipeTotalTimeValue" class="info-input time-value-input" min="0" step="1" value="${recipe.totalTime?.value ?? ""}" />
                <select id="recipeTotalTimeUnit" class="info-input time-unit-select">
                    <option value="seconds" ${recipe.totalTime?.unit === "seconds" ? "selected" : ""}>Seconds</option>
                    <option value="minutes" ${!recipe.totalTime?.unit || recipe.totalTime?.unit === "minutes" ? "selected" : ""}>Minutes</option>
                    <option value="hours" ${recipe.totalTime?.unit === "hours" ? "selected" : ""}>Hours</option>
                    <option value="days" ${recipe.totalTime?.unit === "days" ? "selected" : ""}>Days</option>
                </select>
            </div>
        </div>
        <div class="info-container">
            <span class="tag">Recipe Serving Size</span>
            <input type="number" id="recipeServingSize" class="info-input" min="1" max="1000" step="1" value="${recipe.servingSize ?? ""}" />
        </div>
    </section>
    <section class="create-recipe-content">
        <div class="ingredients-section">
            <h3>Enter Ingredients:</h3>
            <div id="ingredientsList" class="ingredients-list">
                ${ingredientList.map((ing, i) => Ingredient(ing, i)).join("")}
            </div>
            <button type="button" id="addIngredientBtn" class="add-ingredient-btn">+</button>
        </div>
        <div class="instructions-section">
            <h3>Enter Instructions:</h3>
            <div id="instructionsList" class="instructions-list">
                ${instructionList.map((ins, i) => Instruction(ins, i)).join("")}
            </div>
            <button type="button" id="addInstructionBtn" class="add-instruction-btn">+</button>
        </div>
        <div class="edit-recipe-actions">
            <button type="submit" id="saveRecipeBtn" class="auth-btn">Save</button>
            <button type="button" id="backToBrowseBtn" class="auth-btn auth-btn--secondary">Back</button>
        </div>
    </section>
</form>`;
}

// Wires up add/remove/edit handlers on the freshly-injected form markup
function wireUpForm() {
  updateGreeting();

  const ingredientsList = document.getElementById("ingredientsList");
  const addIngredientBtn = document.getElementById("addIngredientBtn");
  const instructionsList = document.getElementById("instructionsList");
  const addInstructionBtn = document.getElementById("addInstructionBtn");
  const attachFileBtn = document.getElementById("attachFileBtn");
  const recipeImageInput = document.getElementById("recipeImageInput");
  const recipeImageName = document.getElementById("recipeImageName");
  const recipeImagePreview = document.getElementById("recipeImagePreview");
  const saveBtn = document.getElementById("saveRecipeBtn");
  const backBtn = document.getElementById("backToBrowseBtn");
  const form = document.getElementById("editRecipeForm");
  let previewObjectUrl = null;

  addIngredientBtn.addEventListener("click", () => {
    ingredientList.push({
      name: "",
    });
    renderIngredientsList();
  });

  // Event delegation on the container so added/removed rows stay wired up automatically
  ingredientsList.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-ingredient-btn");
    if (!removeBtn) return;
    const index = Number(removeBtn.closest(".ingredient").dataset.index);
    ingredientList.splice(index, 1);
    renderIngredientsList();
  });

  ingredientsList.addEventListener("input", (e) => {
    const row = e.target.closest(".ingredient");
    if (!row) return;
    const index = Number(row.dataset.index);
    if (e.target.classList.contains("ingredient-name-input")) {
      ingredientList[index].name = e.target.value;
    }
  });

  addInstructionBtn.addEventListener("click", () => {
    instructionList.push({
      text: "",
    });
    renderInstructionsList();
  });

  instructionsList.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-instruction-btn");
    if (!removeBtn) return;
    const index = Number(removeBtn.closest(".instruction").dataset.index);
    instructionList.splice(index, 1);
    renderInstructionsList();
  });

  instructionsList.addEventListener("input", (e) => {
    const row = e.target.closest(".instruction");
    if (!row) return;
    const index = Number(row.dataset.index);
    if (e.target.classList.contains("instruction-text-input")) {
      instructionList[index].text = e.target.value;
    }
  });

  // "Attatch file" is a plain button next to a hidden file input it proxies clicks to
  attachFileBtn.addEventListener("click", () => recipeImageInput.click());
  recipeImageInput.addEventListener("change", () => {
    const file = recipeImageInput.files[0] ?? null;
    recipeImageName.textContent = file?.name ?? "";

    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = null;
    }

    if (file) {
      previewObjectUrl = URL.createObjectURL(file);
      recipeImagePreview.src = previewObjectUrl;
      recipeImagePreview.hidden = false;
    } else if (existingImageDataUrl) {
      // No new file chosen — revert the preview back to the recipe's existing image
      recipeImagePreview.src = existingImageDataUrl;
      recipeImagePreview.hidden = false;
    } else {
      recipeImagePreview.hidden = true;
      recipeImagePreview.src = "";
    }
  });

  // Discards unsaved changes and returns to the browse list
  backBtn.addEventListener("click", () => {
    sessionStorage.removeItem("editRecipeId");
    window.location.hash = "#browse";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const servingSizeValue = Number(document.getElementById("recipeServingSize").value);
    if (!Number.isInteger(servingSizeValue) || servingSizeValue < 1 || servingSizeValue > 1000) {
      snackbar("Serving size must be a whole number between 1 and 1,000.", "var(--pink)");
      return;
    }

    saveBtn.disabled = true;
    try {
      const imageFile = recipeImageInput.files[0] ?? null;
      const imageDataUrl = imageFile ? await readFileAsDataUrl(imageFile) : existingImageDataUrl;

      const updatedData = {
        name: document.getElementById("recipeName").value,
        description: document.getElementById("recipeDescription").value,
        totalTime: {
          value: document.getElementById("recipeTotalTimeValue").value,
          unit: document.getElementById("recipeTotalTimeUnit").value,
        },
        servingSize: servingSizeValue,
        imageDataUrl,
        ingredients: ingredientList
          .map((ing) => ing.name)
          .filter((name) => name.trim() !== ""),
        instructions: instructionList
          .map((ins) => ins.text)
          .filter((text) => text.trim() !== ""),
      };

      await updateDoc(doc(db, "recipes", recipeId), updatedData);

      snackbar("Recipe updated!", "var(--blue-green)");
      sessionStorage.removeItem("editRecipeId");
      window.location.hash = "#browse";
    } catch (error) {
      snackbar(error.message || "Something went wrong. Please try again.", "var(--pink)");
    } finally {
      saveBtn.disabled = false;
    }
  });
}

// Fetches the target recipe document and renders the pre-filled form (or a "not found" message)
async function loadAndRenderEditForm() {
  const container = document.getElementById("editRecipeContainer");
  if (!container) return;

  recipeId = sessionStorage.getItem("editRecipeId");
  if (!recipeId) {
    container.innerHTML = notFoundMarkup();
    return;
  }

  try {
    const snapshot = await getDoc(doc(db, "recipes", recipeId));
    if (!snapshot.exists()) {
      container.innerHTML = notFoundMarkup();
      return;
    }

    const recipe = snapshot.data();
    ingredientList = recipe.ingredients?.length
      ? recipe.ingredients.map((name) => ({ name }))
      : [{ name: "" }];
    instructionList = recipe.instructions?.length
      ? recipe.instructions.map((text) => ({ text }))
      : [{ text: "" }];
    existingImageDataUrl = recipe.imageDataUrl ?? null;

    container.innerHTML = formMarkup(recipe);
    wireUpForm();
  } catch (error) {
    container.innerHTML = notFoundMarkup(
      `Couldn't load that recipe. ${error.message || ""}`.trim(),
    );
  }
}

export function init() {
  loadAndRenderEditForm();
}

export default function EditRecipe() {
  return /*html*/ ` <div class="create-recipe-page">
    ${navbar("#F25C54", window.isAuthenticated)}
    <div id="editRecipeContainer">
        <p class="edit-recipe-loading">Loading recipe...</p>
    </div>
    ${footer()}
</div>
`;
}
