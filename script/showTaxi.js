const body = document.body;

function createTaxi(atPosition) {
  const taxi = document.createElement('img');
  taxi.src = '../assets/Group 1.png';
  taxi.className = 'absolute w-full z-[-1] pointer-events-none';
  
  taxi.style.top = `${atPosition}px`;
  taxi.style.left = '0';
  body.appendChild(taxi);
}

const THRESHOLD = 2300;
const FIRST_POSITION = 500;
let ticking = false;
let lastScrollTop = 0;

const addedPositions = new Set();

window.addEventListener('scroll', () => {
  const currentScrollTop = window.scrollY;
  const visibleBottom = currentScrollTop + window.innerHeight;

  const nextSection = Math.floor(visibleBottom / THRESHOLD);
  const targetPosition = nextSection * THRESHOLD;

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
  if (document.body.scrollHeight >= FIRST_POSITION) {
    const firstTaxi = document.createElement('img');
    firstTaxi.src = '../assets/Group 1.png';
    firstTaxi.className = 'absolute w-full z-[-1] pointer-events-none';
    firstTaxi.style.top = `${FIRST_POSITION}px`;
    firstTaxi.style.left = '0';
    body.appendChild(firstTaxi);
    addedPositions.add(FIRST_POSITION);
  }
});