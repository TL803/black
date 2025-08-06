let autoModalInterval; // Храним интервал
const MODAL_INTERVAL = 150000; // 150 секунд (150_000 мс) — время между автоматическими показами модалки
// Для теста можно временно поставить: 1000 (1 секунда)

/**
 * Функция инициализации глобального модального окна
 */
const initGlobalModal = () => {
    // Если модальное окно уже открыто — не создаем новое
    if (document.querySelector('.global-modal-back')) return;

    const body = document.body;

    // Фон затемнения
    const modalBack = document.createElement('div');
    modalBack.className = 'global-modal-back bg-[#00000066] w-full h-screen fixed inset-0 z-40';
    modalBack.addEventListener('click', () => {
        modalBack.remove();
        modal.remove();
    });

    // Основное модальное окно
    const modal = document.createElement('div');
    modal.className = `
        global-modal
        flex flex-col gap-[20px] sm:gap-[32px] md:gap-[44px] lg:gap-[80px]
        container w-full
        px-[16px] sm:px-[24px] md:px-[40px] lg:px-[92px]
        py-[24px] sm:py-[32px] md:py-[60px] lg:py-[106px]
        bg-gradient-to-r from-[#131417] to-[#005f4f]
        rounded-[12px] sm:rounded-[16px] md:rounded-[24px] lg:rounded-[52px]
        shadow-xl
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        z-50 max-w-[95vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]  /* Изменено: max-w-[95vw] на малых экранах */
        text-white
        overflow-y-auto max-h-[95vh]
        box-border
        px-[16px] sm:px-[24px] md:px-[40px] lg:px-[92px]
        pt-[24px] pb-[40px] sm:pb-[60px] md:pb-[80px] lg:pb-[106px]  /* Явно ограничиваем нижний padding */
    `;

    // Заголовок модального окна
    const modalHeader = document.createElement('div');
    modalHeader.className = 'text-center text-white px-4 break-words';
    modalHeader.innerHTML = `
        <p class="text-[14px] sm:text-[28px] md:text-[40px] lg:text-[48px] font-regular md:font-medium leading-tight mb-2 sm:mb-4">
            Настало время для вашей мечты — новый авто по особой цене!
        </p>
        <p class="text-[14px] sm:text-[24px] md:text-[36px] lg:text-[40px] font-regular md:font-medium mb-4 sm:mb-6 leading-tight">
            Акция действует до 3 июля
        </p>
        <img 
            src="../assets/Frame 193 (1).png" 
            alt="Три автомобиля" 
            class="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto mb-4 sm:mb-8 h-auto"
        >
        <h2 class="text-[16px] sm:text-[36px] md:text-[56px] lg:text-[64px] font-medium md:font-bold leading-tight">
            Специальное предложение на Hyundai Sonata
        </h2>
    `;

    // Форма для ввода данных
    const modalForm = document.createElement('form');
    modalForm.className = 'flex flex-col gap-[16px] sm:gap-[20px] md:gap-[24px] px-4';

    // Поле ввода ФИО
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'ФИО';
    inputName.className = `
        custom-select border border-gray-500 bg-transparent
        rounded-lg p-3 sm:p-4
        text-[14px] sm:text-[16px] md:text-[18px]
        placeholder-gray-400 text-white
        focus:outline-none focus:ring-2 focus:ring-[#19BC8D]
        w-full
        box-border
    `;
    inputName.required = true;

    // Поле ввода телефона
    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Ваш номер телефона';
    inputPhone.className = `
        custom-select border border-gray-500 bg-transparent
        rounded-lg p-3 sm:p-4
        text-[14px] sm:text-[16px] md:text-[18px]
        placeholder-gray-400 text-white
        focus:outline-none focus:ring-2 focus:ring-[#19BC8D]
        w-full
        box-border
    `;
    inputPhone.required = true;

    // Чекбокс согласия
    const consentCheckbox = document.createElement('label');
    consentCheckbox.className = 'flex items-start sm:items-center space-x-2 sm:space-x-4 break-words';
    consentCheckbox.innerHTML = `
        <span class="inline-block relative mt-1">
            <input 
                type="checkbox" 
                class="custom-checkbox w-5 h-5 sm:w-6 sm:h-6 accent-[#19BC8D] rounded" 
                required
            >
        </span>
        <span class="text-[11px] sm:text-[13px] md:text-[16px] lg:text-[20px] text-gray-200 leading-tight break-words">
            Я соглашаюсь с условиями и даю своё согласие на обработку моих персональных данных, 
            и разрешаю сделать запрос в бюро кредитных историй
        </span>
    `;

    // Кнопка отправки формы
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = `
        w-full bg-[#19BC8D] hover:bg-[#17a67c] 
        py-[14px] sm:py-[20px] md:py-[24px] 
        rounded-[24px] sm:rounded-[32px]
        text-[14px] sm:text-[16px] md:text-[20px] lg:text-[36px] 
        font-medium text-[#131417] 
        mt-[16px] sm:mt-[30px]
        transition-colors duration-200
        shadow-md
        break-words
    `;
    submitButton.textContent = 'Отправить заявку на звонок';

    // Добавляем поля в форму
    modalForm.appendChild(inputName);
    modalForm.appendChild(inputPhone);
    modalForm.appendChild(consentCheckbox);
    modalForm.appendChild(submitButton);

    // Кнопка закрытия
    const closeModalButton = document.createElement('button');
    closeModalButton.className = 'absolute top-3 right-3 sm:top-6 sm:right-6 md:top-10 md:right-14 hover:opacity-80 transition-opacity z-50';
    closeModalButton.innerHTML = `
        <img src="../assets/Frame 156.svg" alt="Закрыть модальное окно" class="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[32px] md:h-[32px]">
    `;
    closeModalButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modalBack.remove();
        modal.remove();
        // Останавливаем интервал, чтобы не дублировать показ
        if (autoModalInterval) clearInterval(autoModalInterval);
        // Перезапускаем через 150 секунд после закрытия
        setTimeout(startAutoModalInterval, MODAL_INTERVAL);
    });

    // Добавляем элементы в модальное окно
    modal.appendChild(modalHeader);
    modal.appendChild(modalForm);
    modal.appendChild(closeModalButton);

    // Обработка отправки формы
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Удаляем форму
        modalForm.remove();

        // Показываем сообщение об успехе
        modalHeader.innerHTML = `
            <div class="flex flex-col items-center gap-4 sm:gap-6 px-4 break-words">
                <img 
                    src="../assets/Frame 193 (1).png" 
                    alt="Три автомобиля" 
                    class="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto mb-6 h-auto"
                >
                <h2 class="text-[24px] sm:text-[32px] md:text-[48px] font-bold text-white text-center leading-tight">
                    Получили вашу заявку на звонок!
                </h2>
                <p class="text-[14px] sm:text-[16px] md:text-[24px] text-gray-300 text-center leading-relaxed break-words">
                    Мы перезвоним вам в ближайшее время!
                </p>
            </div>
        `;

        // Через 3 секунды автоматически закрываем модалку
        setTimeout(() => {
            modalBack.remove();
            modal.remove();
            // Перезапускаем интервал
            if (autoModalInterval) clearInterval(autoModalInterval);
            startAutoModalInterval();
        }, 3000);
    });

    // Добавляем модальное окно в DOM
    body.appendChild(modalBack);
    body.appendChild(modal);
};

/**
 * Запуск интервала для автоматического показа модального окна
 */
const startAutoModalInterval = () => {
    autoModalInterval = setInterval(() => {
        initGlobalModal(); // Показываем, если ещё не открыто
    }, MODAL_INTERVAL);
};

/**
 * Инициализация: ручной вызов и авто-модалка
 */
document.addEventListener('DOMContentLoaded', () => {
    // Автоматический показ каждые 150 секунд
    startAutoModalInterval();

    // Ручной вызов через кнопки с классом 'showCreaditpopup'
    const triggerButtons = document.getElementsByClassName('showCreaditpopup');
    Array.from(triggerButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Останавливаем авто-модалку при ручном вызове
            if (autoModalInterval) clearInterval(autoModalInterval);
            initGlobalModal();
        });
    });
});