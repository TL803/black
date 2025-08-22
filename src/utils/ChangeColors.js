function getColorContainer() {
  return document.getElementById('colorContainer');
}

function getCarImage() {
  return document.getElementById('carImage');
}

function getColors() {
  return [
    { color: "#FFFFFF", name: "Белый" },
    { color: "#161313", name: "Чёрный" },
    { color: "#8d1d2c", name: "Красный" },
    { color: "#154889", name: "Синий" },
    { color: "#444e4e", name: "Серый" },
    { color: "#c3c4c4", name: "Светло-серый" },
    { color: "#706c62", name: "Жёлтый" }
  ];
}

function createColorElement(item) {
  const div = document.createElement('div');
  div.innerHTML = `
    <div 
      class="w-[62px] h-[37px] md:w-[247px] md:h-[69px] rounded-[16px] cursor-pointer border-2 border-transparent hover:border-[#19BC8D] transition duration-200"
      style="background-color: ${item.color};"
      data-color="${item.color}"
      title="Цвет: ${item.name}"
      aria-label="Выбрать цвет ${item.name}">
    </div>
  `;
  return div.firstElementChild;
}

function renderColorOptions(container, colors) {
  container.innerHTML = '';
  colors.forEach(color => {
    const colorElement = createColorElement(color);
    container.appendChild(colorElement);
  });
}

function clearActiveBorders(container) {
  container.querySelectorAll('[data-color]').forEach(el => {
    el.style.borderColor = '';
  });
}

function setActiveBorder(element) {
  element.style.borderColor = '#19BC8D';
}

function updateCarImageBackground(image, color) {
  image.style.backgroundColor = color;
  image.style.backgroundImage = 'none';
}

function handleColorClick(e) {
  const container = getColorContainer();
  const image = getCarImage();
  const target = e.target.closest('[data-color]');
  if (!target) return;

  clearActiveBorders(container);
  setActiveBorder(target);

  const selectedColor = target.dataset.color;
  updateCarImageBackground(image, selectedColor);
}

function initColorSelector() {
  const container = getColorContainer();
  const colors = getColors();

  if (!container) return;

  renderColorOptions(container, colors);
  container.addEventListener('click', handleColorClick);
}

document.addEventListener('DOMContentLoaded', initColorSelector);