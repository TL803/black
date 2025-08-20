document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('mobilePaymentSlider');
    const termValue = document.getElementById('termValue');
    const paymentValue = document.getElementById('paymentValue');

    // Данные: для каждого года — свой срок и платеж
    const terms = [
        { term: "1 год", payment: "100 000" },
        { term: "2 года", payment: "90 000" },
        { term: "3 года", payment: "80 000" },
        { term: "4 года", payment: "75 000" },
        { term: "5 лет", payment: "70 000" },
        { term: "6 лет", payment: "65 000" },
        { term: "7 лет", payment: "60 000" },
        { term: "8 лет", payment: "55 000" }
    ];

    if (!slider || !termValue || !paymentValue) {
        console.error('Missing required elements');
        return;
    }

    // Устанавливаем min, max и step через JS, чтобы гарантировать контроль
    slider.min = 1;
    slider.max = 8;
    slider.step = 1;
    slider.value = 5; // начальное значение — 5 лет

    function getYearWord(year) {
        if (year % 10 === 1 && year % 100 !== 11) return 'год';
        if (year % 10 >= 2 && year % 10 <= 4 && (year % 100 < 10 || year % 100 >= 20)) return 'года';
        return 'лет';
    }

    function updateValues(year) {
        const index = year - 1; // т.к. годы от 1 до 8, а индекс от 0 до 7

        if (index < 0 || index >= terms.length) {
            console.error('Invalid year index:', index);
            return;
        }

        const data = terms[index];
        termValue.textContent = data.term;
        paymentValue.textContent = `${data.payment} ₽`;
    }

    // Обработчик движения ползунка
    slider.addEventListener('input', function () {
        const year = parseInt(this.value);

        // Обновляем отображаемые значения
        updateValues(year);

        // Плавная заливка: от 0% (1 год) до 100% (8 лет)
        const fillPercent = ((year - parseInt(this.min)) / (parseInt(this.max) - parseInt(this.min))) * 100;
        this.style.setProperty('--fill-percent', `${fillPercent}%`);
    });

    // Инициализация при загрузке
    const initialValue = parseInt(slider.value);
    const minVal = parseInt(slider.min);
    const maxVal = parseInt(slider.max);
    const fillPercent = ((initialValue - minVal) / (maxVal - minVal)) * 100;
    slider.style.setProperty('--fill-percent', `${fillPercent}%`);
    updateValues(initialValue);
});