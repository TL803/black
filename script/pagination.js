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

// Настройки пагинации
const itemsPerPage = 6;
let currentPage = 0;

// Делегирование кликов
marks.addEventListener('click', function (e) {
  const card = e.target.closest('.toggle-elem-click');
  if (card) {
    // Проверяем, активна ли уже карточка (уже зелёная)
    const isActivated = card.style.backgroundColor === 'rgb(34, 80, 69)'; // #225045 → RGB

    // Устанавливаем цвет: если активна — убираем, иначе — ставим #225045
    card.style.backgroundColor = isActivated ? 'rgba(0, 0, 0, 0.44)' : '#225045';

    // Также можно добавить/удалить класс для других стилей при необходимости
    card.classList.toggle('text-white');
  }
});

// Функция отображения карточек
function showCards() {
  marks.innerHTML = '';

  const totalPages = Math.ceil(marksArray.length / itemsPerPage);
  const isLastPage = currentPage === totalPages - 1;

  const pageItems = isLastPage
    ? marksArray.slice(-itemsPerPage)
    : marksArray.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  pageItems.forEach(mark => {
    const elem = `
      <div class="toggle-elem-click flex bg-black/[44%] px-[24px] cursor-pointer py-[16px] relative rounded-full transition-colors duration-200 text-white">
        <div class="w-[76px] h-[76px] rounded-full bg-[#D9D9D91F] absolute left-[1px] top-[2px]"></div>
        <p class="ml-[72px] text-[32px]">${mark}</p>
      </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = elem.trim();
    marks.appendChild(tempDiv.firstElementChild);
  });

  // Обновляем состояние кнопок
  prevBtn.disabled = currentPage === 0;
  prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
  prevBtn.style.pointerEvents = currentPage === 0 ? 'none' : 'auto';

  nextBtn.disabled = currentPage >= totalPages - 1;
  nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  nextBtn.style.pointerEvents = nextBtn.disabled ? 'none' : 'auto';
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    showCards();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(marksArray.length / itemsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    showCards();
  }
});

// Загрузка при старте
document.addEventListener('DOMContentLoaded', () => {
  showCards();
});