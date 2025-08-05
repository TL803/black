// Элементы DOM
const marks = document.getElementById('marks');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Массив марок
const marksArray = [
  "BAIC", "Lada", "Belgee", "Changan", "Chery", "Dongfeng", "EXEED", "Faw", "Forthing", "Gac", "Geely", "Haval",
  "Hyundai", "Jaecoo", "Jac", "Jetour", "Jetta", "KAIYI", "Livan", "Moskvich", "MG", "Nissan", "Omoda", "Renault", "Skoda",
  "Soueast", "SWM", "Tank", "UAZ", "Volkswagen", "XCite"
];

// Определяем, мобильное ли устройство (по ширине экрана)
function isMobile() {
  return window.innerWidth < 1600; // или ваш порог, например 1681, но это странно — это огромный экран
}

// Функция отображения всех марок (для мобильных)
function showAllMarks() {
  marks.innerHTML = '';

  marksArray.forEach(mark => {
    const elem = `
      <div class="toggle-elem-click flex bg-black/[44%] px-[20px] py-[6px] md:px-[24px] md:py-[16px] cursor-pointer relative rounded-full transition-colors duration-200 text-white">
        <div class="w-[32px] h-[32px] md:w-[76px] md:h-[76px] rounded-full bg-[#D9D9D91F] absolute left-[1px] top-[2px]"></div>
        <p class="ml-[44px] md:ml-[72px] text-[16px] md:text-[32px]">${mark}</p>
      </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = elem.trim();
    marks.appendChild(tempDiv.firstElementChild);
  });
}

// Функция отображения пагинации (для десктопа)
function showPaginatedMarks() {
  const itemsPerPage = 6; // фиксированное значение для десктопа
  const totalPages = Math.ceil(marksArray.length / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  marks.innerHTML = '';

  const pageItems = marksArray.slice(start, end);
  pageItems.forEach(mark => {
    const elem = `
      <div class="toggle-elem-click flex bg-black/[44%] px-[20px] py-[6px] md:px-[24px] md:py-[16px] cursor-pointer relative rounded-full transition-colors duration-200 text-white">
        <div class="w-[32px] h-[32px] md:w-[76px] md:h-[76px] rounded-full bg-[#D9D9D91F] absolute left-[1px] top-[2px]"></div>
        <p class="ml-[44px] md:ml-[72px] text-[16px] md:text-[32px]">${mark}</p>
      </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = elem.trim();
    marks.appendChild(tempDiv.firstElementChild);
  });

  // Обновление кнопок
  prevBtn.disabled = currentPage === 0;
  prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
  prevBtn.style.pointerEvents = currentPage === 0 ? 'none' : 'auto';

  nextBtn.disabled = currentPage >= totalPages - 1;
  nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  nextBtn.style.pointerEvents = nextBtn.disabled ? 'none' : 'auto';
}

let currentPage = 0;

// Основная функция отображения
function renderMarks() {
  if (isMobile()) {
    // На мобильных — показываем все
    showAllMarks();
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
  } else {
    // На десктопе — пагинация
    showPaginatedMarks();
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  }
}

// Делегирование кликов (общее)
marks.addEventListener('click', function (e) {
  const card = e.target.closest('.toggle-elem-click');
  if (card) {
    const isActivated = card.style.backgroundColor === 'rgb(34, 80, 69)';
    card.style.backgroundColor = isActivated ? 'rgba(0, 0, 0, 0.44)' : '#225045';
    card.classList.toggle('text-white');
  }
});

// Обработчики кнопок (только для десктопа)
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderMarks();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(marksArray.length / 6);
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderMarks();
  }
});

// Обновление при ресайзе
window.addEventListener('resize', () => {
  renderMarks();
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderMarks();
});