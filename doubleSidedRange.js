// Получаем элемент слайдера
const slider = document.querySelector('.slider__self');

// Проверяем, что элемент найден
if (!slider) {
    console.error('Slider element not found');
    exit;
}

// Создаём слайдер
noUiSlider.create(slider, {
    start: [20, 80], // начальные значения
    connect: true,   // закрашенная область между ползунками
    range: {
        'min': 0,
        'max': 100
    },
    behaviour: 'drag', // позволяет перетаскивать один ползунок через другой
    step: 1
});

// Получаем оба маркера (handle)
const handles = slider.querySelectorAll('.noUi-handle');

// Функция для обновления классов маркеров в зависимости от позиции
function updateHandleClasses() {
    const values = slider.noUiSlider.get(); // Получаем текущие значения
    const value0 = parseFloat(values[0]);
    const value1 = parseFloat(values[1]);

    // Удаляем старые классы
    handles[0].classList.remove('left-handle', 'right-handle');
    handles[1].classList.remove('left-handle', 'right-handle');

    if (value0 < value1) {
        handles[0].classList.add('left-handle');
        handles[1].classList.add('right-handle');
    } else if (value0 > value1) {
        handles[0].classList.add('right-handle');
        handles[1].classList.add('left-handle');
    } else {
        // Если значения равны — можно задать поведение по умолчанию
        handles[0].classList.add('left-handle');
        handles[1].classList.add('right-handle');
    }
}

// Вызываем при каждом изменении
slider.noUiSlider.on('update', updateHandleClasses);

// Также вызываем при старте, чтобы установить правильные классы
updateHandleClasses();