document.querySelectorAll('.slider-container').forEach(container => {
    const sliderElement = container.querySelector('.slider__self');
    const inputMin = container.querySelector('.slider__field--min');
    const inputMax = container.querySelector('.slider__field--max');

    if (!sliderElement) {
        console.error('Slider element not found in container');
        return;
    }

    // Настройки диапазона и минимального разрыва
    const MIN_VALUE = 100000;   // Минимальная сумма — 100 руб
    const MAX_VALUE = 6000000;  // Максимальная сумма — 1000 руб
    const MIN_SPAN = 1000000;    // Минимальный разрыв между ползунками — 200 руб

    // Создаём слайдер
    noUiSlider.create(sliderElement, {
        start: [100000, 6000000], // Начальные значения (разница 300 - больше MIN_SPAN)
        connect: true,
        range: {
            'min': MIN_VALUE,
            'max': MAX_VALUE
        },
        behaviour: 'drag',
        step: 1,
        // Ограничиваем движение, чтобы не нарушался мин. разрыв
        margin: MIN_SPAN, // Это гарантирует, что разница всегда будет не меньше MIN_SPAN
        pips: {
            mode: 'values',
            values: [MIN_VALUE, MAX_VALUE],
            density: 4
        }
    });

    const handles = sliderElement.querySelectorAll('.noUi-handle');

    // Форматируем значение как деньги (например, "350 ₽")
    function formatMoney(value) {
        return Math.round(value) + ' ₽';
    }

    // Синхронизация полей ввода
    function updateInputs() {
        const values = sliderElement.noUiSlider.get().map(val => Math.round(val));
        inputMin.value = values[0];
        inputMax.value = values[1];
    }

    // Обновление классов обработчиков (left/right)
    function updateHandleClasses() {
        const values = sliderElement.noUiSlider.get();
        const value0 = parseFloat(values[0]);
        const value1 = parseFloat(values[1]);

        handles[0].classList.remove('left-handle', 'right-handle');
        handles[1].classList.remove('left-handle', 'right-handle');

        if (value0 < value1) {
            handles[0].classList.add('left-handle');
            handles[1].classList.add('right-handle');
        } else if (value0 > value1) {
            handles[0].classList.add('right-handle');
            handles[1].classList.add('left-handle');
        } else {
            handles[0].classList.add('left-handle');
            handles[1].classList.add('right-handle');
        }
    }

    // Проверка и корректировка значений с учётом минимального разрыва
    function enforceMinSpan(value0, value1) {
        if (value0 < MIN_VALUE) value0 = MIN_VALUE;
        if (value1 > MAX_VALUE) value1 = MAX_VALUE;

        if (Math.abs(value1 - value0) < MIN_SPAN) {
            // Если правый слишком близко к левому — сдвигаем
            if (value1 === parseFloat(sliderElement.noUiSlider.get()[1])) {
                value0 = value1 - MIN_SPAN;
            } else {
                value1 = value0 + MIN_SPAN;
            }
        }

        if (value0 < MIN_VALUE) {
            value0 = MIN_VALUE;
            value1 = MIN_VALUE + MIN_SPAN;
        }
        if (value1 > MAX_VALUE) {
            value1 = MAX_VALUE;
            value0 = MAX_VALUE - MIN_SPAN;
        }

        return [value0, value1];
    }

    // Обновляем при изменении слайдера
    sliderElement.noUiSlider.on('update', (values, handle) => {
        updateInputs();
        updateHandleClasses();
    });

    // При изменении через поля ввода
    inputMin.addEventListener('change', () => {
        let minVal = parseFloat(inputMin.value);
        const maxVal = parseFloat(sliderElement.noUiSlider.get()[1]);

        if (isNaN(minVal)) minVal = MIN_VALUE;
        minVal = Math.max(MIN_VALUE, Math.min(MAX_VALUE, minVal));

        const corrected = enforceMinSpan(minVal, maxVal);
        sliderElement.noUiSlider.set(corrected);
    });

    inputMax.addEventListener('change', () => {
        const minVal = parseFloat(sliderElement.noUiSlider.get()[0]);
        let maxVal = parseFloat(inputMax.value);

        if (isNaN(maxVal)) maxVal = MAX_VALUE;
        maxVal = Math.max(MIN_VALUE, Math.min(MAX_VALUE, maxVal));

        const corrected = enforceMinSpan(minVal, maxVal);
        sliderElement.noUiSlider.set(corrected);
    });

    // Защита от нечислового ввода (опционально)
    [inputMin, inputMax].forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9]/g, '');
        });
    });

    // Инициализация
    updateInputs();
    updateHandleClasses();
});