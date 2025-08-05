document.addEventListener("DOMContentLoaded", function () {
    // Находим слайдеры и элементы отображения
    const slider = document.querySelector('.thick-blue-slider'); // первый слайдер (процент)
    const creditSlider = document.querySelector('.credit-slider'); // второй слайдер (срок кредита)

    const percentValue = document.getElementById('percentValue');
    const amountValue = document.getElementById('amountValue');
    const loanTermElement = document.getElementById('loanTerm');
    const monthlyPaymentElement = document.getElementById('monthlyPayment');

    const propertyPrice = 5_000_000; // Стоимость недвижимости

    // Форматирование чисел с пробелами (ru-RU)
    function formatNumber(num) {
        return num.toLocaleString('ru-RU');
    }

    // Склонение слова "год"
    function getYearText(year) {
        if (year === 1) return 'год';
        if (year >= 2 && year <= 4) return 'года';
        return 'лет';
    }

    // === Обновление первого слайдера (процент и сумма) ===
    function updateSlider() {
        const value = parseFloat(slider.value);
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;

        // Вычисляем процент заполнения
        const percent = ((value - min) / (max - min)) * 100;

        // Устанавливаем CSS-переменную для градиента
        slider.style.setProperty('--fill-percent', `${percent}%`);

        // Обновляем отображение процента
        const roundedPercent = Math.round(percent);
        percentValue.textContent = `${roundedPercent}%`;

        // Считаем сумму
        const amount = propertyPrice * (percent / 100);
        amountValue.textContent = formatNumber(Math.round(amount));

        // Обновляем tooltip (data-value)
        slider.setAttribute('data-value', `${roundedPercent}%`);
    }

    // === Обновление второго слайдера (срок кредита) ===
    function updateCreditSlider() {
        const years = parseInt(creditSlider.value);

        // Базовый платёж при 15 годах — 400 000 ₽
        const basePaymentAt15Years = 400_000;
        const payment = Math.round(basePaymentAt15Years * 15 / years); // обратная пропорция

        // Обновляем отображение срока
        loanTermElement.textContent = `${years} ${getYearText(years)}`;

        // Обновляем ежемесячный платёж
        monthlyPaymentElement.textContent = formatNumber(payment);

        // Обновляем tooltip
        creditSlider.setAttribute('data-value', `${years} ${getYearText(years)}`);
    }

    // === Проверка наличия элементов ===
    if (!slider) {
        console.warn("Первый слайдер (.thick-blue-slider) не найден");
    } else {
        // Инициализация data-value
        slider.setAttribute('data-value', '0%');
        slider.addEventListener('input', updateSlider);
        updateSlider(); // первоначальное обновление
    }

    if (!creditSlider) {
        console.warn("Второй слайдер (.credit-slider) не найден");
    } else {
        // Устанавливаем data-value по умолчанию
        const initialYears = creditSlider.value;
        creditSlider.setAttribute('data-value', `${initialYears} ${getYearText(initialYears)}`);
        creditSlider.addEventListener('input', updateCreditSlider);
        updateCreditSlider(); // первоначальное обновление
    }

    // === Функция для программного изменения значения слайдера (опционально) ===
    window.setSliderValue = function (value) {
        if (slider) {
            slider.value = value;
            slider.dispatchEvent(new Event('input'));
        }
    };
});