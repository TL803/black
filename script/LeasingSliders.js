  // 1. Слайдер первоначального взноса
  const downPaymentSlider = document.getElementById('downPaymentSlider');
  const downPaymentValue = document.getElementById('downPaymentValue');

  downPaymentSlider.addEventListener('input', function () {
    const value = parseInt(this.value).toLocaleString('ru-RU') + ' ₽';
    downPaymentValue.textContent = value;

    // Рассчитываем процент
    const percent = ((this.value - this.min) / (this.max - this.min)) * 100;

    // Устанавливаем CSS-переменную для трека
    this.style.setProperty('--progress', `${percent}%`);
  });

  // Инициализация
  downPaymentSlider.dispatchEvent(new Event('input'));


  // 2. Слайдер срока кредита
  const termSlider = document.getElementById('termSlider');
  const termValue = document.getElementById('termValue');

  function getYearWord(year) {
    if (year % 10 === 1 && year % 100 !== 11) return 'год';
    if (year % 10 >= 2 && year % 10 <= 4 && (year % 100 < 10 || year % 100 >= 20)) return 'года';
    return 'лет';
  }

  termSlider.addEventListener('input', function () {
    const term = this.value;
    termValue.textContent = `${term} ${getYearWord(term)}`;
  });

  termSlider.dispatchEvent(new Event('input'));