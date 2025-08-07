document.addEventListener("DOMContentLoaded", function () {
    // === 1. Находим ключевые элементы (может отличаться на каждой странице) ===
    const selects = document.querySelectorAll('form:first-of-type select');
    const carSection = document.querySelector("section:nth-of-type(2)");
    const lastSection = document.querySelector("main section:last-of-type");

    // Если нет секций для показа — выходим (защита от ошибок)
    if (!carSection || !lastSection) {
        console.warn("Не найдены секции для показа. Пропускаем логику.");
        return;
    }

    // Скрываем секции по умолчанию
    carSection.style.display = "none";
    lastSection.style.display = "none";

    // === 2. Находим все слайдеры на странице (поддержка noUiSlider и обычных input[type=range]) ===
    const sliderElements = [];

    // Поищем noUiSlider
    const noUiSliderElement = document.getElementById("price-slider"); // типично для автокредита
    if (noUiSliderElement && noUiSliderElement.noUiSlider) {
        sliderElements.push({
            type: "noUiSlider",
            element: noUiSliderElement,
            minValue: 500000,
            getValue: () => parseFloat(noUiSliderElement.noUiSlider.get()[0]),
        });
    }

    // Добавим обычные range-слайдеры (лизинг, автокредит и др.)
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    rangeSliders.forEach(slider => {
        // Пропускаем, если это уже был noUiSlider (условно)
        if (slider.id === "price-slider") return;

        let minValue = 0;

        // Можно задать минимальное значение через data-атрибут
        // Например: <input type="range" data-min-value="500000" ...>
        const attrMin = slider.dataset.minValue;
        if (attrMin) {
            minValue = parseFloat(attrMin);
        } else if (slider.id === "downPaymentSlider") {
            minValue = 500000; // типично для лизинга
        } else if (slider.id === "mobilePaymentSlider") {
            minValue = 1; // просто изменён
        }

        sliderElements.push({
            type: "range",
            element: slider,
            minValue: minValue,
            getValue: () => parseInt(slider.value),
        });
    });

    // === 3. Функция проверки всех условий ===
    function checkAllSteps() {
        // Все селекты заполнены?
        const allSelectsFilled = selects.length === 0 || Array.from(selects).every(select => select.value !== "");

        // Все слайдеры соответствуют условиям?
        const allSlidersValid = sliderElements.every(slider => {
            const value = slider.getValue();
            return !isNaN(value) && value >= slider.minValue;
        });

        // Всё ли готово?
        const allStepsDone = allSelectsFilled && allSlidersValid;

        if (allStepsDone) {
            carSection.style.display = "block";
            lastSection.style.display = "block";
        } else {
            carSection.style.display = "none";
            lastSection.style.display = "none";
        }
    }

    // === 4. Подписываемся на изменения ===

    // Селекты
    selects.forEach(select => {
        select.addEventListener("change", checkAllSteps);
    });

    // noUiSlider
    if (noUiSliderElement && noUiSliderElement.noUiSlider) {
        noUiSliderElement.noUiSlider.on("update", checkAllSteps);
    }

    // Обычные слайдеры
    rangeSliders.forEach(slider => {
        if (slider.id !== "price-slider") { // чтобы не дублировать с noUiSlider
            slider.addEventListener("input", checkAllSteps);
        }
    });

    // === 5. Проверка при загрузке ===
    checkAllSteps();

    // === 6. Экспортируем (если нужно использовать в других модулях) ===
    window.checkAllSteps = checkAllSteps; // опционально
});