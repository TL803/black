const marks = document.getElementById('marks');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const marksArray = [
  "BAIC", "Lada", "Belgee", "Changan", "Chery", "Dongfeng", "EXEED", "Faw", "Forthing", "Gac", "Geely", "Haval",
  "Hyundai", "Jaecoo", "Jac", "Jetour", "Jetta", "KAIYI", "Livan", "Moskvich", "MG", "Nissan", "Omoda", "Renault", "Skoda",
  "Soueast", "SWM", "Tank", "UAZ", "Volkswagen", "XCite"
];

function isMobile() {
  return window.innerWidth < 1680;
}

let currentPage = 0;
const itemsPerPage = 6;

// Функция для отображения всех марок (на мобильных)
function showAllMarks() {
  marks.innerHTML = '';
  marksArray.forEach(mark => {
    const elem = `
      <div class="toggle-elem-click flex bg-black/[44%] px-[20px] py-[6px] md:px-[24px] md:py-[16px] cursor-pointer relative rounded-full transition-colors duration-200 text-white" 
           data-mark="${mark}">
        <div class="w-[32px] h-[32px] md:w-[76px] md:h-[76px] rounded-full bg-[#D9D9D91F] absolute left-[1px] top-[2px]"></div>
        <p class="ml-[44px] md:ml-[72px] text-[16px] md:text-[32px]">${mark}</p>
      </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = elem.trim();
    marks.appendChild(tempDiv.firstElementChild);
  });
}

// Функция для отображения постранично (на десктопах)
function showPaginatedMarks() {
  const totalPages = Math.ceil(marksArray.length / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  marks.innerHTML = '';

  const pageItems = marksArray.slice(start, end);
  pageItems.forEach(mark => {
    const elem = `
      <div class="toggle-elem-click flex bg-black/[44%] px-[20px] py-[6px] md:px-[24px] md:py-[16px] cursor-pointer relative rounded-full transition-colors duration-200 text-white"
           data-mark="${mark}">
        <div class="w-[32px] h-[32px] md:w-[76px] md:h-[76px] rounded-full bg-[#D9D9D91F] absolute left-[1px] top-[2px]"></div>
        <p class="ml-[44px] md:ml-[72px] text-[16px] md:text-[32px]">${mark}</p>
      </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = elem.trim();
    marks.appendChild(tempDiv.firstElementChild);
  });

  prevBtn.disabled = currentPage === 0;
  prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
  prevBtn.style.pointerEvents = currentPage === 0 ? 'none' : 'auto';

  nextBtn.disabled = currentPage >= totalPages - 1;
  nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  nextBtn.style.pointerEvents = nextBtn.disabled ? 'none' : 'auto';
}

function renderMarks() {
  if (isMobile()) {
    showAllMarks();
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
  } else {
    showPaginatedMarks();
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  }
}

marks.addEventListener('click', function (e) {
  const clickedCard = e.target.closest('.toggle-elem-click');
  if (!clickedCard) return;

  const mark = clickedCard.dataset.mark;

  // Опционально: визуальное выделение (если остаётся на той же странице)
  document.querySelectorAll('.toggle-elem-click').forEach(card => {
    card.style.backgroundColor = 'rgba(0, 0, 0, 0.44)';
  });
  clickedCard.style.backgroundColor = '#225045';

  // Перенаправление на SelectedCar.html с передачей марки в параметре
  window.location.href = `SelectedCar.html?mark=${encodeURIComponent(mark)}`;
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderMarks();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(marksArray.length / itemsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderMarks();
  }
});

window.addEventListener('resize', () => {
  renderMarks();
});

document.addEventListener('DOMContentLoaded', () => {
  renderMarks();
});