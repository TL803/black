const showModalBox = document.getElementsByClassName('showModalBox')


const initGlobalModal = () => {
    if (document.querySelector('.global-modal-back')) return;

    const body = document.body;

    const modalBack = document.createElement('div');
    modalBack.className = 'global-modal-back bg-[#00000066] w-full h-screen fixed inset-0 z-40';

    const modal = document.createElement('div');
    modal.className = 'global-modal flex flex-col gap-[80px] container w-full py-[106px] px-[92px] bg-gradient-to-r from-[#131417] to-[#005f4f]  rounded-[52px] shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'text-center';
    modalHeader.innerHTML = `
    <h2 class="text-[64px] font-medium text-white">Остались вопросы?</h2>
    <p class="text-[36px] font-regular">Оставьте ваш номер и мы перезвоним в ближайшее время!</p>
  `;

    const modalForm = document.createElement('form');
    modalForm.className = 'flex flex-col gap-[60px]';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'ФИО';
    inputName.className = 'custom-select';

    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Ваш номер телефона';
    inputPhone.className = 'custom-select';

    const consentCheckbox = document.createElement('label');
    consentCheckbox.className = 'flex items-center space-x-[44px]';
    consentCheckbox.innerHTML = `
    <span class="inline-block relative">
      <input type="checkbox" class="custom-checkbox">
    </span>
    <span class="text-[20px]">
      Я соглашаюсь с условиями и даю свое согласие на обработку использования моих персональных данных,
      и разрешаю сделать запрос в бюро кредитных историй
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

    modal.appendChild(modalHeader);
    modal.appendChild(modalForm);

    const closeModalButton = document.createElement('button');
    closeModalButton.className = 'absolute top-10 right-14 hover:opacity-80 transition-opacity';
    closeModalButton.innerHTML = `
    <img src="../assets/Frame 156.svg" alt="Закрыть модальное окно" class="w-[32px] h-[32px]">
  `;
    closeModalButton.addEventListener('click', () => {
        modal.remove();
        modalBack.remove();
    });

    modal.appendChild(closeModalButton);

    body.appendChild(modalBack);
    body.appendChild(modal);
};

window.onload = initGlobalModal;

