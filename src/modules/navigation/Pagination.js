function getElements() {
  return {
    marks: document.getElementById('marks'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn')
  };
}

const marksArray = [
  "BAIC", "Lada", "Belgee", "Changan", "Chery", "Dongfeng", "EXEED", "Faw", "Forthing", "Gac", "Geely", "Haval",
  "Hyundai", "Jaecoo", "Jac", "Jetour", "Jetta", "KAIYI", "Livan", "Moskvich", "MG", "Nissan", "Omoda", "Renault", "Skoda",
  "Soueast", "SWM", "Tank", "UAZ", "Volkswagen", "XCite"
];

const itemsPerPage = 6;

function isMobile() {
  return window.innerWidth < 1680;
}

function createMarkElement(mark) {
  const div = document.createElement('div');
  div.className = 'toggle-elem-click flex bg-black/[44%] px-[20px] py-[6px] md:px-[24px] md:py-[16px] cursor-pointer relative rounded-full transition-colors duration-200 text-white';
  div.dataset.mark = mark;

  div.innerHTML = `
    <div class="w-[32px] h-[32px] md:w-[76px] md:h-[76px] rounded-full bg-[#D9D9D91F] absolute left-[1px] top-[2px]"></div>
    <p class="ml-[44px] md:ml-[72px] text-[16px] md:text-[32px]">${mark}</p>
  `;

  return div;
}

function renderAllMarks(marksContainer) {
  marksContainer.innerHTML = '';
  marksArray.forEach(mark => {
    marksContainer.appendChild(createMarkElement(mark));
  });
}

function renderPaginatedMarks(marksContainer, currentPage) {
  const totalPages = Math.ceil(marksArray.length / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = marksArray.slice(start, end);

  marksContainer.innerHTML = '';
  pageItems.forEach(mark => {
    marksContainer.appendChild(createMarkElement(mark));
  });

  return totalPages;
}

function updateButtonState(prevBtn, nextBtn, currentPage, totalPages) {
  const isAtStart = currentPage === 0;
  const isAtEnd = currentPage >= totalPages - 1;

  prevBtn.disabled = isAtStart;
  prevBtn.style.opacity = isAtStart ? '0.5' : '1';
  prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

  nextBtn.disabled = isAtEnd;
  nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
  nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
}

let currentPage = 0;

function renderMarks() {
  const { marks, prevBtn, nextBtn } = getElements();

  if (isMobile()) {
    renderAllMarks(marks);
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
  } else {
    const totalPages = renderPaginatedMarks(marks, currentPage);
    updateButtonState(prevBtn, nextBtn, currentPage, totalPages);
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  }
}

function handleMarksClick(e) {
  const clickedCard = e.target.closest('.toggle-elem-click');
  if (!clickedCard) return;

  const mark = clickedCard.dataset.mark;

  document.querySelectorAll('.toggle-elem-click').forEach(card => {
    card.style.backgroundColor = 'rgba(0, 0, 0, 0.44)';
  });
  clickedCard.style.backgroundColor = '#225045';

  window.location.href = `SelectedCar.html?mark=${encodeURIComponent(mark)}`;
}

function handlePrevClick() {
  if (currentPage > 0) {
    currentPage--;
    renderMarks();
  }
}

function handleNextClick() {
  const totalPages = Math.ceil(marksArray.length / itemsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderMarks();
  }
}

function handleResize() {
  renderMarks();
}

function init() {
  const { marks, prevBtn, nextBtn } = getElements();

  marks.addEventListener('click', handleMarksClick);
  prevBtn.addEventListener('click', handlePrevClick);
  nextBtn.addEventListener('click', handleNextClick);
  window.addEventListener('resize', handleResize);

  renderMarks();
}

document.addEventListener('DOMContentLoaded', init);