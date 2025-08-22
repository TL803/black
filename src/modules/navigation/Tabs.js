function getTabElements() {
  return {
    tabSpecsBtn: document.getElementById("tab-specs"),
    tabComplectationsBtn: document.getElementById("tab-complectations"),
    contentSpecs: document.getElementById("content-specs"),
    contentComplectations: document.getElementById("content-complectations")
  };
}

function hideElement(element) {
  if (element) element.classList.add("hidden");
}

function showElement(element) {
  if (element) element.classList.remove("hidden");
}

function setActiveButton(button) {
  if (!button) return;
  button.classList.remove("border-[#19BC8D]", "text-white");
  button.classList.add("bg-[#13141770]", "text-[#19BC8D]");
}

function setInactiveButton(button) {
  if (!button) return;
  button.classList.remove("bg-[#13141770]", "text-[#19BC8D]");
  button.classList.add("border-[#19BC8D]", "text-white");
}

function showTab(tabId) {
  const { tabSpecsBtn, tabComplectationsBtn, contentSpecs, contentComplectations } = getTabElements();

  setInactiveButton(tabSpecsBtn);
  setInactiveButton(tabComplectationsBtn);

  hideElement(contentSpecs);
  hideElement(contentComplectations);

  if (tabId === "specs" && contentSpecs) {
    setActiveButton(tabSpecsBtn);
    showElement(contentSpecs);
  } else if (tabId === "complectations" && contentComplectations) {
    setActiveButton(tabComplectationsBtn);
    showElement(contentComplectations);
  }
}

function setupTabListeners() {
  const { tabSpecsBtn, tabComplectationsBtn } = getTabElements();

  tabSpecsBtn?.addEventListener("click", () => showTab("specs"));
  tabComplectationsBtn?.addEventListener("click", () => showTab("complectations"));
}

function initTabs() {
  setupTabListeners();
  showTab("complectations");
}

document.addEventListener("DOMContentLoaded", initTabs);