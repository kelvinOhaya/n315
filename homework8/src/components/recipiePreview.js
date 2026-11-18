import timeIcon from "../assets/time.svg";
import servingsIcon from "../assets/servings.svg";

// Renders a summary card for a single saved recipe: image, title, description, serving size, and
// prep time — matches the Figma "Recipes - Laptop" card layout (node 1:891)
export default function recipiePreview(recipe) {
  const imageSrc = recipe.imageDataUrl || "https://picsum.photos/seed/recipie/400/300";
  const totalTimeText =
    recipe.totalTime && typeof recipe.totalTime === "object"
      ? `${recipe.totalTime.value} ${recipe.totalTime.unit}`
      : recipe.totalTime;

  return /*html*/ `
<div class="recipie-preview">
    <img src="${imageSrc}" alt="${recipe.name}" class="recipie-preview-image" />
    <div class="recipie-preview-info">
        <h3 class="recipie-preview-title">${recipe.name}</h3>
        <p class="recipie-preview-description">${recipe.description ?? ""}</p>
        <div class="recipie-preview-meta">
            <div class="recipie-preview-meta-row">
                <img src="${timeIcon}" alt="" class="recipie-preview-icon" />
                <span class="recipie-preview-total-time">${totalTimeText}</span>
            </div>
            <div class="recipie-preview-meta-row">
                <img src="${servingsIcon}" alt="" class="recipie-preview-icon" />
                <span class="recipie-preview-serving-size">${recipe.servingSize} servings</span>
            </div>
        </div>
    </div>
</div>
<div class="recipie-preview-actions">
    <button type="button" class="recipie-action-btn" data-action="edit">Edit Recipe</button>
    <button type="button" class="recipie-action-btn" data-action="delete">Delete</button>
</div>`;
}
