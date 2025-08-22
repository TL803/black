function $(selector) {
  return typeof selector === 'string' ? document.querySelector(selector) : selector;
}

function $id(id) {
  return document.getElementById(id);
}

function formatNumber(num) {
  return num.toLocaleString('ru-RU');
}

function getYearText(year) {
  if (year === 1) return 'год';
  if (year >= 2 && year <= 4) return 'года';
  return 'лет';
}

function createSliderController(slider, config = {}) {
  const {
    valueElement,
    tooltipAttr = 'data-value',
    formatter,
    onUpdate = () => {}
  } = config;

  if (!slider) return null;

  const { min, max, step } = config;
  slider.min = min ?? slider.min;
  slider.max = max ?? slider.max;
  slider.step = step ?? slider.step;
  if (!slider.value) slider.value = min;

  function updateFillPercent(value) {
    const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--fill-percent', `${percent}%`);
  }

  function update() {
    const value = parseFloat(slider.value);
    updateFillPercent(value);

    if (valueElement) {
      valueElement.textContent = formatter ? formatter(value) : String(value);
    }

    if (tooltipAttr) {
      slider.setAttribute(tooltipAttr, slider.value);
    }

    onUpdate(value);
  }

  slider.addEventListener('input', update);
  update();

  return { update, element: slider };
}

function initDownPaymentSlider() {
  const slider = $('.thick-blue-slider');
  const percentValue = $id('percentValue');
  const amountValue = $id('amountValue');

  const propertyPrice = 5_000_000;

  return createSliderController(slider, {
    valueElement: percentValue,
    min: 0,
    max: 100,
    step: 10,
    formatter: (value) => {
      const percent = Math.round(value);
      const amount = propertyPrice * (percent / 100);
      if (amountValue) {
        amountValue.textContent = formatNumber(Math.round(amount));
      }
      return `${percent} Лет`;
    },
    onUpdate: (value) => {
      const percent = Math.round(value);
      slider.setAttribute('data-value', `${percent}%`);
    }
  });
}

function initCreditTermSlider() {
  const slider = $('.credit-slider');
  const loanTermElement = $id('loanTerm');
  const monthlyPaymentElement = $id('monthlyPayment');

  const paymentMap = {
    1: 6_000_000,
    2: 3_000_000,
    3: 2_000_000,
    4: 1_500_000,
    5: 1_200_000,
    6: 1_000_000,
    7: Math.round(6_000_000 / 7)
  };

  return createSliderController(slider, {
    valueElement: loanTermElement,
    min: 1,
    max: 7,
    step: 1,
    formatter: (years) => {
      const payment = paymentMap[years] || 0;
      if (monthlyPaymentElement) {
        monthlyPaymentElement.textContent = formatNumber(payment);
      }
      return `${years} ${getYearText(years)}`;
    },
    onUpdate: (years) => {
      slider.setAttribute('data-value', `${years} ${getYearText(years)}`);
    }
  });
}

function setupGlobalSliderAPI(controller) {
  window.setSliderValue = function (value) {
    const slider = $('.thick-blue-slider');
    if (!slider || !controller) return;

    const step = 10;
    const roundedValue = Math.round(value / step) * step;
    slider.value = Math.max(0, Math.min(100, roundedValue));
    controller.update();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const downPaymentCtrl = initDownPaymentSlider();
  const creditTermCtrl = initCreditTermSlider();

  setupGlobalAPI(downPaymentCtrl);
});