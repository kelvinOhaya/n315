export default function snackbar(text, backgroundColor = "var(--blue-green)") {
  let container = document.getElementById("snackbar-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "snackbar-container";
    document.body.appendChild(container);
  }

  const snackbarEl = document.createElement("div");
  snackbarEl.className = "snackbar elevation-3";
  snackbarEl.textContent = text;
  if (backgroundColor) {
    snackbarEl.style.backgroundColor = backgroundColor;
  }

  container.appendChild(snackbarEl);

  // Trigger animation
  requestAnimationFrame(() => {
    snackbarEl.classList.add("show");
  });

  // Auto-hide and cleanup after 3 seconds
  setTimeout(() => {
    snackbarEl.classList.remove("show");
    setTimeout(() => {
      snackbarEl.remove();
    }, 400);
  }, 3000);
}

export { snackbar };
