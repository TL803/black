document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('downPaymentSlider');
    const valueDisplay = document.getElementById('downPaymentValue');
    const percentDisplay = document.getElementById('downPaymentPercent');

    if (!slider || !valueDisplay || !percentDisplay) {
        console.error('Missing required elements for down payment slider');
        return;
    }

    const min = 100000;
    const max = 5000000;
    const step = 100000;

    slider.min = min;
    slider.max = max;
    slider.step = step;

    function formatNumber(num) {
        return num.toLocaleString('ru-RU');
    }

    function updateValues() {
        const value = parseInt(slider.value);
        const percent = Math.round((value / max) * 100);

        // Обновляем отображение
        valueDisplay.textContent = `${formatNumber(value)} ₽`;
        percentDisplay.textContent = `(${percent}%)`;

        // Обновляем заливку
        const fillPercent = ((value - min) / (max - min)) * 100;
        slider.style.setProperty('--fill-percent', `${fillPercent}%`);
    }

    // Обработчик движения
    slider.addEventListener('input', updateValues);

    // Инициализация
    updateValues();
});