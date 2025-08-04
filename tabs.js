// Получаем элементы
const tabSpecsBtn = document.getElementById("tab-specs");
const tabComplectationsBtn = document.getElementById("tab-complectations");
const contentSpecs = document.getElementById("content-specs");
const contentComplectations = document.getElementById("content-complectations");

// Функция переключения вкладок
function showTab(tab) {
    // Сброс всех кнопок
    tabSpecsBtn.classList.remove("bg-[#13141770]", "text-[#19BC8D]");
    tabSpecsBtn.classList.add("border-[#19BC8D]", "text-white");

    tabComplectationsBtn.classList.remove("bg-[#13141770]", "text-[#19BC8D]");
    tabComplectationsBtn.classList.add("border-[#19BC8D]", "text-white");

    // Скрыть все контенты
    contentSpecs.classList.add("hidden");
    contentComplectations.classList.add("hidden");

    // Показать выбранную вкладку
    if (tab === "specs") {
        tabSpecsBtn.classList.remove("border-[#19BC8D]", "text-white");
        tabSpecsBtn.classList.add("bg-[#13141770]", "text-[#19BC8D]");
        contentSpecs.classList.remove("hidden");
    } else if (tab === "complectations") {
        tabComplectationsBtn.classList.remove("border-[#19BC8D]", "text-white");
        tabComplectationsBtn.classList.add("bg-[#13141770]", "text-[#19BC8D]");
        contentComplectations.classList.remove("hidden");
    }
}

// Обработчики кликов
tabSpecsBtn?.addEventListener("click", () => showTab("specs"));
tabComplectationsBtn?.addEventListener("click", () => showTab("complectations"));

// Открыть первую вкладку по умолчанию
if (contentSpecs) {
    showTab("specs");
}