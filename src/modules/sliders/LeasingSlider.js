function $(id) {
  return document.getElementById(id);
}

function formatNumber(num) {
  return num.toLocaleString('ru-RU');
}

function getYearWord(year) {
  if (year % 10 === 1 && year % 100 !== 11) return 'год';
  if (year % 10 >= 2 && year % 10 <= 4 && (year % 100 < 10 || year % 100 >= 20)) return 'года';
  return 'лет';
}

function setupSlider(sliderId, valueId, formatter, labelUpdater) {
  const slider = $(sliderId);
  const valueEl = $(valueId);

  if (!slider || !valueEl) return;

  const update = () => {
    const value = parseInt(slider.value);
    const min = parseInt(slider.min);
    const max = parseInt(slider.max);
    const percent = ((value - min) / (max - min)) * 100;

    valueEl.textContent = formatter ? formatter(value) : String(value);
    labelUpdater && labelUpdater(value, valueEl);
    slider.style.setProperty('--progress', `${percent}%`);
  };

  slider.addEventListener('input', update);
  update();
}

function initDownPaymentSlider() {
  setupSlider(
    'downPaymentSlider',
    'downPaymentValue',
    (value) => `${formatNumber(value)} ₽`
  );
}

function initTermSlider() {
  const termSlider = $('termSlider');
  if (termSlider) {
    termSlider.min = 1;
    termSlider.max = 8;
  }

  setupSlider(
    'termSlider',
    'termValue',
    null,
    (value, el) => {
      el.textContent = `${value} ${getYearWord(value)}`;
    }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  initDownPaymentSlider();
  initTermSlider();
});