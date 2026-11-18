// Renders the full recipe detail modal: image, title, description, serving size, total time,
// ingredients list, and instructions list. Returned as a backdrop + content HTML string that the
// caller injects into #modal-container.
export default function recipieModal(recipe) {
  const totalTimeText =
    recipe.totalTime && typeof recipe.totalTime === "object"
      ? `${recipe.totalTime.value} ${recipe.totalTime.unit}`
      : recipe.totalTime;

  return /*html*/ `
<div class="recipie-modal-backdrop">
    <div class="recipie-modal-content">
        <button type="button" class="recipie-modal-close" aria-label="Close">&times;</button>
        ${recipe.imageDataUrl ? `<img src="${recipe.imageDataUrl}" alt="${recipe.name}" class="recipie-modal-image" />` : ""}
        <h2 class="recipie-modal-title">${recipe.name}</h2>
        <p class="recipie-modal-description">${recipe.description ?? ""}</p>
        <div class="recipie-modal-meta">
            <span class="recipie-modal-serving-size">${recipe.servingSize} servings</span>
            <span class="recipie-modal-total-time">${totalTimeText}</span>
        </div>
        <h3>Ingredients</h3>
        <ul class="recipie-modal-ingredients">
            ${(recipe.ingredients ?? []).map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
        <h3>Instructions</h3>
        <ol class="recipie-modal-instructions">
            ${(recipe.instructions ?? []).map((instruction) => `<li>${instruction}</li>`).join("")}
        </ol>
    </div>
</div>`;
}
