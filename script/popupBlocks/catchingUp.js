const showCreaditpopup = document.getElementsByClassName('showCreaditpopup');

const initGlobalModal = () => {
    if (document.querySelector('.global-modal-back')) return;

    const body = document.body;

    // Создаем фоновое затемнение
    const modalBack = document.createElement('div');
    modalBack.className = 'global-modal-back bg-[#00000066] w-full h-screen fixed inset-0 z-40';
    modalBack.addEventListener('click', () => {
        modalBack.remove();
        modal.remove();
    });

    // Создаем основное модальное окно
    const modal = document.createElement('div');
    modal.className = 'global-modal flex flex-col gap-[80px] container w-full py-[56px] px-[92px] bg-gradient-to-r from-[#131417] to-[#005f4f] rounded-[52px] shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';

    // Заголовок модального окна
    const modalHeader = document.createElement('div');
    modalHeader.className = 'text-center text-white';
    modalHeader.innerHTML = `
        <p class="text-[48px] mb-4 ">Настало время для вашей мечты — новый авто по особой цене!</p>
        <p class="text-[40px] mb-8">Акция действует до 3 июля</p>
        <img src="../assets/Frame 193 (1).png" alt="Три автомобиля" class="w-full max-w-[600px] mx-auto mb-8">
        <h2 class="text-[64px] font-medium">Специальное предложение на Hyundai Sonata</h2>
    `;

    // Форма для ввода данных
    const modalForm = document.createElement('form');
    modalForm.className = 'flex flex-col gap-[24px]';

    // Поле ввода ФИО
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'ФИО';
    inputName.className = 'custom-select border border-gray-500 rounded-lg p-4 w-full';
    inputName.required = true;

    // Поле ввода телефона
    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Ваш номер телефона';
    inputPhone.className = 'custom-select border border-gray-500 rounded-lg p-4 w-full';
    inputPhone.required = true;

    // Чекбокс согласия
    const consentCheckbox = document.createElement('label');
    consentCheckbox.className = 'flex items-center space-x-4';
    consentCheckbox.innerHTML = `
        <span class="inline-block relative">
            <input type="checkbox" class="custom-checkbox" required>
        </span>
        <span class="text-[20px] text-white">
            Я соглашаюсь с условиями и даю свое согласие на обработку моих персональных данных, и разрешаю сделать запрос<br> в бюро кредитных историй
        </span>
    `;

    // Кнопка отправки формы
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'w-full bg-[#19BC8D] from-green-500  py-[24px] rounded-[32px] text-[16px] md:text-[36px] font-medium text-[#131417] mt-[30px]';
    submitButton.textContent = 'Отправить заявку на звонок';

    // Добавляем элементы в форму
    modalForm.appendChild(inputName);
    modalForm.appendChild(inputPhone);
    modalForm.appendChild(consentCheckbox);
    modalForm.appendChild(submitButton);

    // Кнопка закрытия модального окна
    const closeModalButton = document.createElement('button');
    closeModalButton.className = 'absolute top-10 right-14 hover:opacity-80 transition-opacity';
    closeModalButton.innerHTML = `
<img src="../assets/Frame 156.svg" alt="Закрыть модальное окно" class="w-[32px] h-[32px]">
    `;
    closeModalButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modalBack.remove();
        modal.remove();
    });

    // Добавляем элементы в модальное окно
    modal.appendChild(modalHeader);
    modal.appendChild(modalForm);
    modal.appendChild(closeModalButton);

    // Обработка отправки формы
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Очищаем форму
        modalForm.remove();

        // Отображаем сообщение об успешной отправке
modalHeader.innerHTML = `
    <div class="flex flex-col items-center gap-6">
        <!-- Зелёный круг с галочкой -->
        
        <!-- Основной заголовок -->
        
        <!-- Текст про мечту и акцию -->
        <div class="text-center">
        <p class="text-[20px] text-white mb-2">Настало время для вашей мечты — новый авто по особой цене!</p>
        <p class="text-[16px] text-gray-300">Акция действует до 3 июля</p>
        </div>

<img src="../assets/Frame 193 (1).png" alt="Три автомобиля" class="w-full max-w-[600px] mx-auto mb-8">
        
        <h2 class="text-[48px] font-medium text-white text-center">
            Получили вашу заявку на звонок!
        </h2>
        <!-- Финальное сообщение -->
        <p class="text-[28px] text-gray-300 text-center">
            Мы перезвоним вам в ближайшее время!
        </p>
    </div>
`;
    });

    // Добавляем модальное окно и фоновое затемнение в DOM
    body.appendChild(modalBack);
    body.appendChild(modal);
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    Array.from(showCreaditpopup).forEach(box => {
        box.addEventListener('click', (e) => {
            e.preventDefault();
            initGlobalModal();
        });
    });
});