function getBody() {
  return document.body;
}

function createTaxiElement() {
  const img = document.createElement('img');
  img.src = '../assets/Group 1.png';
  img.className = 'absolute w-full z-[-1] pointer-events-none';
  img.style.left = '0';
  return img;
}

function appendTaxi(atPosition) {
  const body = getBody();
  const taxi = createTaxiElement();
  taxi.style.top = `${atPosition}px`;
  body.appendChild(taxi);
}

function getThreshold() {
  const width = window.innerWidth;
  if (width < 768) return 800;
  if (width < 1024) return 1200;
  if (width < 1680) return 1500;
  return 2300;
}

function getFirstPosition() {
  const width = window.innerWidth;
  if (width < 768) return 300;
  if (width < 1024) return 400;
  if (width < 1680) return 500;
  return 800;
}

function removeExistingTaxis() {
  document.querySelectorAll('img[src="../assets/Group 1.png"]').forEach(el => el.remove());
}

function isPositionVisible(position) {
  const currentScrollTop = window.scrollY;
  const visibleBottom = currentScrollTop + window.innerHeight;
  const threshold = getThreshold();
  const section = Math.floor(visibleBottom / threshold);
  return position === section * threshold;
}

function handleScroll(addedPositions) {
  let ticking = false;
  const onScroll = () => {
    const targetPosition = Math.floor((window.scrollY + window.innerHeight) / getThreshold()) * getThreshold();

    if (targetPosition === 0 || addedPositions.has(targetPosition) || targetPosition > document.body.scrollHeight) {
      ticking = false;
      return;
    }

    if (!ticking) {
      requestAnimationFrame(() => {
        appendTaxi(targetPosition);
        addedPositions.add(targetPosition);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll);
}

function initFirstTaxi(addedPositions) {
  const firstPosition = getFirstPosition();
  if (document.body.scrollHeight >= firstPosition && !addedPositions.has(firstPosition)) {
    appendTaxi(firstPosition);
    addedPositions.add(firstPosition);
  }
}

function handleResize(addedPositions) {
  let timeout;
  window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      removeExistingTaxis();
      addedPositions.clear();
      initFirstTaxi(addedPositions);
    }, 250);
  });
}

function initTaxiAnimation() {
  const addedPositions = new Set();
  initFirstTaxi(addedPositions);
  handleScroll(addedPositions);
  handleResize(addedPositions);
}

document.addEventListener('DOMContentLoaded', initTaxiAnimation);