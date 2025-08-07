document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('mobilePaymentSlider');
    const termValue = document.getElementById('termValue');
    const paymentValue = document.getElementById('paymentValue');

    const terms = [
        { term: "7 лет", payment: "50 000" },
        { term: "6 лет", payment: "60 000" },
        { term: "5 лет", payment: "70 000" },
        { term: "4 года", payment: "80 000" },
        { term: "3 года", payment: "90 000" }
    ];

    if (!slider || !termValue || !paymentValue) {
        console.error('Missing required elements');
        return;
    }

    function updateValues(index) {
        const numIndex = Math.round(index);
        if (numIndex < 0 || numIndex >= terms.length) {
            console.error('Invalid index:', numIndex);
            return;
        }

        const data = terms[numIndex];
        termValue.textContent = data.term;
        paymentValue.textContent = `${data.payment} ₽`;
    }

    // Основной обработчик движения ползунка
    slider.addEventListener('input', function () {
        const value = parseInt(this.value); // от 0 до 100
        const min = parseInt(this.min);     // 0
        const max = parseInt(this.max);     // 100

        // === 1. Плавная заливка — по реальному положению ползунка ===
        const fillPercent = ((value - min) / (max - min)) * 100;
        slider.style.setProperty('--fill-percent', `${fillPercent}%`);

        // === 2. Дискретное изменение цифр — маппим на индекс массива ===
        const index = ((value - min) / (max - min)) * (terms.length - 1);
        const roundedIndex = Math.round(index);

        updateValues(roundedIndex);
    });

    // === Инициализация при загрузке ===
    const initialValue = parseInt(slider.value);
    const minVal = parseInt(slider.min);
    const maxVal = parseInt(slider.max);

    // Устанавливаем плавную заливку
    const initialFill = ((initialValue - minVal) / (maxVal - minVal)) * 100;
    slider.style.setProperty('--fill-percent', `${initialFill}%`);

    // Устанавливаем значения
    const initialIndex = ((initialValue - minVal) / (maxVal - minVal)) * (terms.length - 1);
    updateValues(Math.round(initialIndex));
});