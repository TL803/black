const body = document.body;

function createTaxi(atPosition) {
  const taxi = document.createElement('img');
  taxi.src = '../assets/Group 1.png';
  taxi.className = 'absolute w-full z-[-1] pointer-events-none';
  
  taxi.style.top = `${atPosition}px`;
  taxi.style.left = '0';
  body.appendChild(taxi);
}

// Функция для определения шага в зависимости от ширины экрана
function getThreshold() {
  if (window.innerWidth < 768) { // Мобильные устройства
    return 800;
  } else if (window.innerWidth < 1024) { // Планшеты
    return 1200;
  } else if (window.innerWidth < 1680) { // Ноутбуки
    return 1500;
  } else { // Большие экраны
    return 2300;
  }
}

// Функция для определения первой позиции (более высокие значения)
function getFirstPosition() {
  if (window.innerWidth < 768) {
    return 300; // Было 600
  } else if (window.innerWidth < 1024) {
    return 400; // Было 800
  } else if (window.innerWidth < 1680) {
    return 500; // Было 1000
  } else {
    return 800; // Было 1500
  }
}

let ticking = false;
let lastScrollTop = 0;
const addedPositions = new Set();

window.addEventListener('scroll', () => {
  const currentScrollTop = window.scrollY;
  const visibleBottom = currentScrollTop + window.innerHeight;
  
  // Получаем текущий шаг
  const currentThreshold = getThreshold();
  const nextSection = Math.floor(visibleBottom / currentThreshold);
  const targetPosition = nextSection * currentThreshold;

  if (targetPosition === 0) return;

  if (!ticking && !addedPositions.has(targetPosition) && targetPosition <= document.body.scrollHeight) {
    requestAnimationFrame(() => {
      createTaxi(targetPosition);
      addedPositions.add(targetPosition);
      ticking = false;
    });
    ticking = true;
  }

  lastScrollTop = currentScrollTop;
});

document.addEventListener('DOMContentLoaded', () => {
  const firstPosition = getFirstPosition();
  if (document.body.scrollHeight >= firstPosition) {
    const firstTaxi = document.createElement('img');
    firstTaxi.src = '../assets/Group 1.png';
    firstTaxi.className = 'absolute w-full z-[-1] pointer-events-none';
    firstTaxi.style.top = `${firstPosition}px`;
    firstTaxi.style.left = '0';
    body.appendChild(firstTaxi);
    addedPositions.add(firstPosition);
  }
});

// Обработчик изменения размера окна с дебаунсингом
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    addedPositions.clear();
    // Пересоздаем первую картинку при изменении размера
    const firstPosition = getFirstPosition();
    const existingTaxis = document.querySelectorAll('img[src="../assets/Group 1.png"]');
    existingTaxis.forEach(taxi => taxi.remove());
    
    if (document.body.scrollHeight >= firstPosition) {
      const firstTaxi = document.createElement('img');
      firstTaxi.src = '../assets/Group 1.png';
      firstTaxi.className = 'absolute w-full z-[-1] pointer-events-none';
      firstTaxi.style.top = `${firstPosition}px`;
      firstTaxi.style.left = '0';
      body.appendChild(firstTaxi);
      addedPositions.add(firstPosition);
    }
  }, 250);
});