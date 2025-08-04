// Находим все контейнеры со слайдерами
document.querySelectorAll('.slider-container').forEach(container => {
    const sliderElement = container.querySelector('.slider__self');
    const inputMin = container.querySelector('.slider__field--min');
    const inputMax = container.querySelector('.slider__field--max');

    if (!sliderElement) {
        console.error('Slider element not found in container');
        return;
    }

    // Создаём слайдер
    noUiSlider.create(sliderElement, {
        start: [20, 80],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        },
        behaviour: 'drag',
        step: 1
    });

    const handles = sliderElement.querySelectorAll('.noUi-handle');

    // Синхронизация полей ввода
    function updateInputs() {
        const values = sliderElement.noUiSlider.get();
        inputMin.value = Math.round(values[0]);
        inputMax.value = Math.round(values[1]);
    }

    // Обновление обработчиков классов (left/right)
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

    // Обновляем при изменении слайдера
    sliderElement.noUiSlider.on('update', (values, handle) => {
        updateInputs();
        updateHandleClasses();
    });

    // Обновляем при вводе в поля
    inputMin.addEventListener('change', () => {
        sliderElement.noUiSlider.set([inputMin.value, null]);
    });

    inputMax.addEventListener('change', () => {
        sliderElement.noUiSlider.set([null, inputMax.value]);
    });

    // Инициализация
    updateInputs();
    updateHandleClasses();
});