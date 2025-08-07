document.addEventListener("DOMContentLoaded", function () {
  const downPaymentSlider = document.getElementById('downPaymentSlider');
  const downPaymentValue = document.getElementById('downPaymentValue');

  const termSlider = document.getElementById('termSlider');
  const termValue = document.getElementById('termValue');

  function formatNumber(num) {
    return num.toLocaleString('ru-RU');
  }

  function getYearWord(year) {
    if (year % 10 === 1 && year % 100 !== 11) return 'год';
    if (year % 10 >= 2 && year % 10 <= 4 && (year % 100 < 10 || year % 100 >= 20)) return 'года';
    return 'лет';
  }

  if (downPaymentSlider && downPaymentValue) {
    downPaymentSlider.addEventListener('input', function () {
      const value = formatNumber(parseInt(this.value)) + ' ₽';
      downPaymentValue.textContent = value;

      const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.setProperty('--progress', `${percent}%`);
    });

    downPaymentSlider.dispatchEvent(new Event('input'));
  }

  if (termSlider && termValue) {
    termSlider.addEventListener('input', function () {
      const term = parseInt(this.value);
      termValue.textContent = `${term} ${getYearWord(term)}`;

      const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.setProperty('--progress', `${percent}%`);
    });

    termSlider.dispatchEvent(new Event('input'));
  }
});