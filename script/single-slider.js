document.addEventListener("DOMContentLoaded", function () {
    // Находим слайдеры и элементы отображения
    const slider = document.querySelector('.thick-blue-slider'); // первый слайдер (процент)
    const creditSlider = document.querySelector('.credit-slider'); // второй слайдер (срок кредита)

    // === ВАЖНО: Проверяем, существуют ли элементы ===
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
        if (!slider) return;

        const value = parseFloat(slider.value);
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;

        // Процент заполнения для стиля
        const percent = ((value - min) / (max - min)) * 100;
        slider.style.setProperty('--fill-percent', `${percent}%`);

        // Округлённое значение в процентах
        const roundedPercent = Math.round(value); // value уже округляется через step

        // Обновляем отображение процента, если элемент есть
        if (percentValue) {
            percentValue.textContent = `${roundedPercent} Лет`;
        }

        // Сумма первоначального взноса
        const amount = propertyPrice * (roundedPercent / 100);
        if (amountValue) {
            amountValue.textContent = formatNumber(Math.round(amount));
        }

        // Tooltip
        slider.setAttribute('data-value', `${roundedPercent}%`);
    }

    // === Обновление второго слайдера (срок кредита) ===
    function updateCreditSlider() {
        if (!creditSlider) return;

        const years = parseInt(creditSlider.value, 10);

        // Жёстко заданные значения ежемесячных платежей (в рублях)
        const paymentMap = {
            1: 6000000,
            2: 3000000,
            3: 2000000,
            4: 1500000,
            5: 1200000,
            6: 1000000,
            7: Math.round(6_000_000 / 7) // ≈ 857 143
        };

        const monthlyPayment = paymentMap[years] || 0;

        // Обновляем отображение срока, если элемент существует
        if (loanTermElement) {
            loanTermElement.textContent = `${years} ${getYearText(years)}`;
        }

        // Обновляем ежемесячный платёж
        if (monthlyPaymentElement) {
            monthlyPaymentElement.textContent = formatNumber(monthlyPayment);
        }

        // Обновляем tooltip
        creditSlider.setAttribute('data-value', `${years} ${getYearText(years)}`);
    }

    // === Инициализация первого слайдера (процент) ===
    if (!slider) {
        console.warn("Первый слайдер (.thick-blue-slider) не найден");
    } else {
        slider.min = 0;
        slider.max = 100;
        slider.step = 10; // Шаг 10%
        if (!slider.value) slider.value = 0;

        // Инициализация tooltip
        slider.setAttribute('data-value', '0%');
        slider.addEventListener('input', updateSlider);
        updateSlider(); // начальное обновление
    }

    // === Инициализация второго слайдера (срок кредита) ===
    if (!creditSlider) {
        console.warn("Второй слайдер (.credit-slider) не найден");
    } else {
        creditSlider.min = 1;
        creditSlider.max = 7;
        creditSlider.step = 1;
        if (!creditSlider.value) creditSlider.value = 1;

        // Устанавливаем начальное значение tooltip
        const initialYears = parseInt(creditSlider.value, 10);
        creditSlider.setAttribute('data-value', `${initialYears} ${getYearText(initialYears)}`);

        creditSlider.addEventListener('input', updateCreditSlider);
        updateCreditSlider(); // начальное обновление
    }

    // === Функция для программного изменения значения слайдера (опционально) ===
    window.setSliderValue = function (value) {
        if (slider) {
            const step = 10;
            const roundedValue = Math.round(value / step) * step; // округляем к шагу
            slider.value = Math.max(0, Math.min(100, roundedValue)); // в пределах 0–100
            updateSlider();
        }
    };
});