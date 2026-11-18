import navbar from "../components/navbar";
import footer from "../components/footer";
import snackbar from "../components/snackbar";
import { auth, db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function updateGreeting() {
  const greeting = document.getElementById("recipeGreeting");
  if (!greeting) return;
  greeting.textContent = `Hey ${auth.currentUser?.displayName ?? ""}, create your recipie!`;
}

window.addEventListener("authstatechange", updateGreeting);

// Single source of truth for the ingredients being edited; re-rendered after every add/remove
let ingredientList = [
  {
    name: "",
  },
];

// Single source of truth for the instructions being edited; re-rendered after every add/remove
let instructionList = [
  {
    text: "",
  },
];

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
  list.innerHTML = instructionList
    .map((ins, i) => Instruction(ins, i))
    .join("");
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

// Wires up add/remove/edit handlers; called after the page markup is rendered
export function init() {
  updateGreeting();

  const ingredientsList = document.getElementById("ingredientsList");
  const addIngredientBtn = document.getElementById("addIngredientBtn");
  const instructionsList = document.getElementById("instructionsList");
  const addInstructionBtn = document.getElementById("addInstructionBtn");
  const attachFileBtn = document.getElementById("attachFileBtn");
  const recipeImageInput = document.getElementById("recipeImageInput");
  const recipeImageName = document.getElementById("recipeImageName");
  const recipeImagePreview = document.getElementById("recipeImagePreview");
  const submitBtn = document.getElementById("createRecipeSubmitBtn");
  const form = document.getElementById("createRecipeForm");
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
    } else {
      recipeImagePreview.hidden = true;
      recipeImagePreview.src = "";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      snackbar("You must be logged in to create a recipe.", "var(--pink)");
      return;
    }

    const servingSizeValue = Number(document.getElementById("recipeServingSize").value);
    if (!Number.isInteger(servingSizeValue) || servingSizeValue < 1 || servingSizeValue > 1000) {
      snackbar("Serving size must be a whole number between 1 and 1,000.", "var(--pink)");
      return;
    }

    submitBtn.disabled = true;
    try {
      const imageFile = recipeImageInput.files[0] ?? null;
      const imageDataUrl = imageFile ? await readFileAsDataUrl(imageFile) : null;

      const recipe = {
        uid: auth.currentUser.uid,
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
        createdAt: serverTimestamp(),
      };

      // Persist to Firestore; await the write before navigating away
      await addDoc(collection(db, "recipes"), recipe);

      snackbar("Recipe created!", "var(--blue-green)");
      window.location.hash = "#browse";
    } catch (error) {
      snackbar(error.message || "Something went wrong. Please try again.", "var(--pink)");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

export default function CreateRecipe() {
  return /*html*/ ` <div class="create-recipe-page">
    ${navbar("#F25C54", window.isAuthenticated)}
    <h2 id="recipeGreeting">Hey ${auth.currentUser?.displayName ?? ""}, create your recipie!</h2>
    <form id="createRecipeForm" class="auth-form recipe-form">
        <section class="top-info">
            <div class="info-container attach-row">
                <div class="attach-row-top">
                    <span class="tag">Add Recipie Image</span>
                    <input type="file" id="recipeImageInput" accept="image/*" hidden />
                    <span id="recipeImageName" class="file-name"></span>
                    <button type="button" id="attachFileBtn" class="attatch-file">Attatch file</button>
                </div>
                <img id="recipeImagePreview" class="image-preview" alt="Recipe image preview" hidden />
            </div>
            <div class="info-container">
                <span class="tag">Recipie Name</span>
                <input type="text" id="recipeName" class="info-input" required />
            </div>
            <div class="info-container">
                <span class="tag">Recipie Description</span>
                <input type="text" id="recipeDescription" class="info-input" />
            </div>
            <div class="info-container">
                <span class="tag">Recipe Total Time</span>
                <div class="time-input-group">
                    <input type="number" id="recipeTotalTimeValue" class="info-input time-value-input" min="0" step="1" />
                    <select id="recipeTotalTimeUnit" class="info-input time-unit-select">
                        <option value="seconds">Seconds</option>
                        <option value="minutes" selected>Minutes</option>
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                    </select>
                </div>
            </div>
            <div class="info-container">
                <span class="tag">Recipe Serving Size</span>
                <input type="number" id="recipeServingSize" class="info-input" min="1" max="1000" step="1" />
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
            <button type="submit" id="createRecipeSubmitBtn" class="auth-btn">Create Recipe</button>
        </section>
    </form>
    ${footer()}
</div>
`;
}
