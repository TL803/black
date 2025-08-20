function updateCarDisplay() {
  const brandSelect = document.querySelector('select[name="brand"]');
  const modelSelect = document.querySelector('select[name="model"]');
  const trimSelect = document.querySelector('select[name="trim"]');

  const carTitle = document.querySelector("#hiddenSections h1");

  // TODO: Пока не использованны, но в будущем пригодятся
  const carImage = document.getElementById("carImage");
  const colorContainer = document.getElementById("colorContainer");

  if (!carTitle) return;

  const getSelectedText = (select) => {
    if (!select || !select.value) return "";
    return select.options[select.selectedIndex]?.text || "";
  };

  const brand = getSelectedText(brandSelect);
  const model = getSelectedText(modelSelect);
  const trim = getSelectedText(trimSelect);

  const titleParts = [brand, model, trim].filter(Boolean);
  carTitle.textContent = titleParts.join(" ") || "Kaiyi X3 Pro";

  const hiddenSections = document.getElementById("hiddenSections");
  if (titleParts.length > 0 && !hiddenSections.classList.contains("hidden")) {
    hiddenSections.classList.remove("hidden");
  }


}

document.addEventListener("change", (e) => {
  if (e.target.matches('select[data-step]')) {
    updateCarDisplay();
  }
});

document.addEventListener("DOMContentLoaded", updateCarDisplay);