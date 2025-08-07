  // Элементы
  const toggleButton = document.querySelector('[data-toggle]');
  const specsContent = document.querySelector('.specs-content');
  const arrowIcon = document.querySelector('[data-arrow]');

  // Медиа-запрос для десктопа (md: и выше — например, 768px)
  const desktopMediaQuery = window.matchMedia('(min-width: 768px)');

  // Функция: включить/выключить логику в зависимости от экрана
  function handleResponsiveToggle() {
    if (desktopMediaQuery.matches) {
      // Десктоп: всегда показываем, убираем обработчик
      specsContent.classList.remove('hidden');
      toggleButton.style.pointerEvents = 'none'; // отключаем клик
      arrowIcon?.parentElement?.classList.add('hidden'); // прячем стрелку
    } else {
      // Мобильная версия
      arrowIcon?.parentElement?.classList.remove('hidden'); // показываем стрелку
      toggleButton.style.pointerEvents = 'auto'; // включаем клик

      // Устанавливаем начальное состояние (скрыто)
      if (!toggleButton.hasAttribute('data-initialized')) {
        specsContent.classList.add('hidden');
        arrowIcon.style.transform = 'rotate(0deg)';
        toggleButton.setAttribute('data-initialized', 'true');
      }

      // Удаляем старый обработчик, чтобы не дублировался
      const newButton = toggleButton.cloneNode(true);
      toggleButton.replaceWith(newButton);
      newButton.addEventListener('click', toggleContent);
    }
  }

  // Функция переключения видимости
  function toggleContent() {
    specsContent.classList.toggle('hidden');
    const isHidden = specsContent.classList.contains('hidden');
    arrowIcon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
  }

  // Инициализация
  if (toggleButton && specsContent && arrowIcon) {
    // Добавляем обработчик для мобильных
    function addMobileListener() {
      toggleButton.addEventListener('click', toggleContent);
    }

    // Проверяем при загрузке
    handleResponsiveToggle();

    // Следим за изменением размера экрана
    desktopMediaQuery.addEventListener('change', handleResponsiveToggle);
  }