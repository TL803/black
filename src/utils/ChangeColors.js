const colorsContainer = document.getElementById('colorContainer');
const carImage = document.getElementById('carImage');

const differentColors = [
    { color: "#FFFFFF", name: "Белый" },
    { color: "#161313", name: "Чёрный" },
    { color: "#8d1d2c", name: "Красный" },
    { color: "#154889", name: "Синий" },
    { color: "#444e4e", name: "Серый" },
    { color: "#c3c4c4", name: "Светло-серый" },
    { color: "#706c62", name: "Жёлтый" },
];

// Очищаем контейнер и заполняем цветами
colorsContainer.innerHTML = '';

differentColors.forEach(item => {
    const colorDiv = document.createElement('div');
    colorDiv.innerHTML = `
        <div 
            class="w-[62px] h-[37px] md:w-[247px] md:h-[69px] rounded-[16px] cursor-pointer border-2 border-transparent hover:border-[#19BC8D] transition duration-200"
            style="background-color: ${item.color};"
            data-color="${item.color}"
            title="Цвет: ${item.color}"
            aria-label="Выбрать цвет ${item.color}">
        </div>
    `;
    colorsContainer.appendChild(colorDiv);
});

// Обработчик клика
colorsContainer.addEventListener('click', (e) => {
    const colorBlock = e.target.closest('[data-color]');
    if (!colorBlock) return;

    // Убираем подсветку со всех
    colorsContainer.querySelectorAll('div').forEach(el => {
        el.style.borderColor = '';
    });
    // Добавляем подсветку выбранному
    colorBlock.style.borderColor = '#19BC8D';

    // Меняем фон carImage на выбранный цвет
    const selectedColor = colorBlock.dataset.color;
    carImage.style.backgroundColor = selectedColor;
    // Убираем фоновое изображение (на случай, если было)
    carImage.style.backgroundImage = 'none';
});