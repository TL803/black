document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.thick-blue-slider'); // первый слайдер (процент)
    const percentValue = document.getElementById('percentValue');
    const amountValue = document.getElementById('amountValue');
    const propertyPrice = 5_000_000;

    const creditSlider = document.querySelector('.credit-slider'); // второй слайдер (срок кредита)
    const loanTermElement = document.getElementById('loanTerm');
    const monthlyPaymentElement = document.getElementById('monthlyPayment');

    function formatNumber(num) {
        return num.toLocaleString('ru-RU');
    }

    if (!slider || !creditSlider) {
        console.warn("Ползунки не найдены");
        return;
    }

    // Функция обновления первого слайдера (процент и сумма)
    function updateSlider() {
        const value = parseFloat(slider.value);
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const percent = ((value - min) / (max - min)) * 100;

        slider.style.setProperty('--fill-percent', `${percent}%`);
        percentValue.textContent = `${Math.round(percent)}%`;

        const amount = propertyPrice * (percent / 100);
        amountValue.textContent = formatNumber(Math.round(amount));
    }

    // Функция обновления слайдера срока кредита
    function updateCreditSlider() {
        const years = parseInt(creditSlider.value);

        // Базовая логика: чем больше лет — тем меньше платёж
        // При 15 лет — платёж минимальный (например, 400_000)
        // При 1 год — платёж максимальный
        // Используем обратную пропорцию: платёж = K / years
        const basePaymentAt15Years = 400_000; // платёж при 15 годах
        const payment = Math.round(basePaymentAt15Years * 15 / years); // чем меньше лет — тем больше платёж

        loanTermElement.textContent = `${years} ${getYearText(years)}`;
        monthlyPaymentElement.textContent = formatNumber(payment);
    }

    // Функция для правильного склонения слова "год"
    function getYearText(year) {
        if (year === 1) return 'год';
        if (year >= 2 && year <= 4) return 'года';
        return 'лет';
    }

    // Слушатели событий
    slider.addEventListener('input', updateSlider);
    creditSlider.addEventListener('input', updateCreditSlider);

    // Инициализация
    updateSlider();
    updateCreditSlider();
});

// Функция для установки значения первого слайдера
function setSliderValue(value) {
    const slider = document.querySelector('.thick-blue-slider');
    if (slider) {
        slider.value = value;
        slider.dispatchEvent(new Event('input'));
    }
}