const showModalBoxes = document.getElementsByClassName('showModalBox');

const initGlobalModal = () => {
    if (document.querySelector('.global-modal-back')) return;

    const body = document.body;

    const modalBack = document.createElement('div');
    modalBack.className = 'global-modal-back bg-[#00000066] w-full h-screen fixed inset-0 z-40';
    modalBack.addEventListener('click', () => {
        modalBack.remove();
        modal.remove();
    });

    const modal = document.createElement('div');
    modal.className = 'global-modal flex flex-col gap-[44px] md:gap-[80px] container w-full px-[20px] md:py-[106px] py-[32px] md:px-[92px] bg-gradient-to-r from-[#131417] to-[#005f4f] rounded-[16px] md:rounded-[52px] shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'text-center';
    modalHeader.innerHTML = `
        <h2 class="text-[20px] md:text-[64px] font-medium text-white">Остались вопросы?</h2>
        <p class="text-[16px] md:text-[36px] font-regular">Оставьте ваш номер и мы перезвоним в ближайшее время!</p>
    `;

    const modalForm = document.createElement('form');
    modalForm.className = 'flex flex-col gap-[32px] md:gap-[60px]';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'ФИО';
    inputName.className = 'custom-select';
    inputName.required = true;

    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Ваш номер телефона';
    inputPhone.className = 'custom-select';
    inputPhone.required = true;

    const consentCheckbox = document.createElement('label');
    consentCheckbox.className = 'flex items-center space-x-[44px]';
    consentCheckbox.innerHTML = `
        <span class="inline-block relative">
            <input type="checkbox" class="custom-checkbox" required>
        </span>
        <span class="text-[11px] md:text-[20px]">
            Я соглашаюсь с условиями и даю свое согласие на обработку моих персональных данных, и разрешаю сделать запрос в бюро кредитных историй
        </span>
    `;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'w-full bg-secondary py-[24px] rounded-[32px] text-[16px] md:text-[36px] font-medium text-primary mt-[30px]';
    submitButton.textContent = 'Отправить заявку';

    modalForm.appendChild(inputName);
    modalForm.appendChild(inputPhone);
    modalForm.appendChild(consentCheckbox);
    modalForm.appendChild(submitButton);

    const closeModalButton = document.createElement('button');
    closeModalButton.className = 'absolute top-6 right-8 md:top-10 md:right-14 hover:opacity-80 transition-opacity';
    closeModalButton.innerHTML = `
        <img src="../assets/Frame 156.svg" alt="Закрыть модальное окно" class="w-[16px] md:w-[32px] w-[16px] md:h-[32px]">
    `;
    closeModalButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modalBack.remove();
        modal.remove();
    });

    modal.appendChild(modalHeader);
    modal.appendChild(modalForm);
    modal.appendChild(closeModalButton);

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        modalForm.remove();

        modalHeader.innerHTML = `
            <div class="flex flex-col items-center gap-4 md:gap-6">
                <div class="w-[60px] h-[60px] md:w-[120px] md:h-[120px] rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[30px] h-[30px] md:h-[60px] md:w-[60px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 class="text-[20px] md:text-[48px] font-medium text-white">Спасибо за вашу заявку!</h2>
                <p class="text-[16px] md:text-[28px] text-gray-300 text-center">Мы перезвоним в ближайшее время!</p>
            </div>
        `;
        modal.appendChild(closeAfterSubmit);
    });

    body.appendChild(modalBack);
    body.appendChild(modal);
};

document.addEventListener('DOMContentLoaded', () => {
    Array.from(showModalBoxes).forEach(box => {
        box.addEventListener('click', (e) => {
            e.preventDefault();
            initGlobalModal();
        });
    });
});