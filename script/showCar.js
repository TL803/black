document.addEventListener("DOMContentLoaded", function () {
    const selects = document.querySelectorAll('form:first-of-type select');
    const carSection = document.querySelector("section:nth-of-type(2)");
    const fourthSection = document.querySelector("main section:last-of-type");

    // Скрываем секции
    carSection.style.display = "none";
    fourthSection.style.display = "none";

    // Слайдеры
    const priceSlider = document.getElementById("price-slider");         // noUiSlider
    const paymentSlider = document.getElementById("mobilePaymentSlider"); // обычный input[type=range]

    // Функция проверки всех условий
    function checkAllSteps() {
        const allSelectsFilled = Array.from(selects).every(select => select.value !== "");

        const priceSliderSet = priceSlider.noUiSlider 
            ? parseFloat(priceSlider.noUiSlider.get()[0]) >= 500000 
            : false;

        const paymentSliderSet = paymentSlider && parseInt(paymentSlider.value) > 0;

        const allStepsDone = allSelectsFilled && priceSliderSet && paymentSliderSet;

        if (allStepsDone) {
            carSection.style.display = "block";
            fourthSection.style.display = "block";
        } else {
            carSection.style.display = "none";
            fourthSection.style.display = "none";
        }
    }

    // Подписываемся на изменения селектов
    selects.forEach(select => {
        select.addEventListener("change", checkAllSteps);
    });

    // Подписываемся на noUiSlider (цена)
    if (priceSlider && priceSlider.noUiSlider) {
        priceSlider.noUiSlider.on("update", checkAllSteps);
    } else {
        console.warn("Слайдер цены не инициализирован или отсутствует");
    }

    // Подписываемся на обычный слайдер (платёж)
    if (paymentSlider) {
        paymentSlider.addEventListener("input", checkAllSteps);
    }

    // Запускаем проверку при загрузке (на случай, если поля уже заполнены)
    checkAllSteps();
});