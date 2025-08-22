function $(id) {
  return document.getElementById(id);
}

function getYearWord(year) {
  if (year % 10 === 1 && year % 100 !== 11) return 'год';
  if (year % 10 >= 2 && year % 10 <= 4 && (year % 100 < 10 || year % 100 >= 20)) return 'года';
  return 'лет';
}

const terms = [
  { term: "1 год", payment: "100 000" },
  { term: "2 года", payment: "90 000" },
  { term: "3 года", payment: "80 000" },
  { term: "4 года", payment: "75 000" },
  { term: "5 лет", payment: "70 000" },
  { term: "6 лет", payment: "65 000" },
  { term: "7 лет", payment: "60 000" },
  { term: "8 лет", payment: "55 000" }
];

function setupMobilePaymentSlider() {
  const slider = $('mobilePaymentSlider');
  const termValue = $('termValue');
  const paymentValue = $('paymentValue');

  if (!slider || !termValue || !paymentValue) {
    console.error('Missing required elements');
    return;
  }

  slider.min = 1;
  slider.max = 8;
  slider.step = 1;
  slider.value = 5;

  function updateValues(year) {
    const data = terms[year - 1];
    if (!data) return;

    termValue.textContent = data.term;
    paymentValue.textContent = `${data.payment} ₽`;
  }

  function updateFillPercent(year) {
    const percent = ((year - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--fill-percent', `${percent}%`);
  }

  function handleInput() {
    const year = parseInt(slider.value);
    updateValues(year);
    updateFillPercent(year);
  }

  slider.addEventListener('input', handleInput);
  handleInput();
}

document.addEventListener('DOMContentLoaded', setupMobilePaymentSlider);