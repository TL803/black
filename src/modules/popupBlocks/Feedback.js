const showModalBoxes = document.getElementsByClassName('showModalBox');

const createContactModalBackdrop = () => {
    const backdrop = document.createElement('div');
    backdrop.className = 'global-modal-back bg-[#00000066] w-full h-screen fixed inset-0 z-40';
    backdrop.addEventListener('click', () => {
        backdrop.remove();
        document.querySelector('.global-modal')?.remove();
    });
    return backdrop;
};

const createContactModalContainer = () => {
    const modal = document.createElement('div');
    modal.className = 'global-modal flex flex-col gap-[44px] md:gap-[80px] container w-full px-[20px] md:py-[106px] py-[32px] md:px-[92px] bg-gradient-to-r from-[#131417] to-[#005f4f] rounded-[16px] md:rounded-[52px] shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';
    return modal;
};

const createContactModalHeader = () => {
    const header = document.createElement('div');
    header.className = 'text-center';
    header.innerHTML = `
        <h2 class="text-[20px] md:text-[64px] font-medium text-white">Остались вопросы?</h2>
        <p class="text-[16px] md:text-[36px] font-regular">Оставьте ваш номер и мы перезвоним в ближайшее время!</p>
    `;
    return header;
};

const createContactNameInput = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'ФИО';
    input.className = 'custom-select';
    input.required = true;
    return input;
};

const createContactPhoneInput = () => {
    const input = document.createElement('input');
    input.type = 'tel';
    input.placeholder = 'Ваш номер телефона';
    input.className = 'custom-select';
    input.required = true;
    return input;
};

const createContactConsentCheckbox = () => {
    const label = document.createElement('label');
    label.className = 'flex items-center space-x-[44px]';
    label.innerHTML = `
        <span class="inline-block relative">
            <input type="checkbox" checked class="custom-checkbox" required>
        </span>
        <span class="text-[11px] md:text-[20px]">
            я согласен с <a href="./Privacy-policy.html" class="text-[#19BC8D] underline">политикой обработки персональных данных</a>
        </span>
    `;
    return label;
};

const createContactSubmitButton = () => {
    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'w-full bg-secondary py-[24px] rounded-[32px] text-[16px] md:text-[36px] font-medium text-primary mt-[30px]';
    button.textContent = 'Отправить заявку';
    return button;
};

const createContactModalForm = () => {
    const form = document.createElement('form');
    form.className = 'flex flex-col gap-[32px] md:gap-[60px]';

    form.appendChild(createContactNameInput());
    form.appendChild(createContactPhoneInput());
    form.appendChild(createContactConsentCheckbox());
    form.appendChild(createContactSubmitButton());

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const modal = form.closest('.global-modal');
        const header = modal?.querySelector('.text-center');
        const backdrop = document.querySelector('.global-modal-back');

        form.remove();

        header.innerHTML = `
            <div class="flex flex-col items-center gap-4 md:gap-6">
                <div class="w-[60px] h-[60px] md:w-[120px] md:h-[120px] rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[30px] h-[30px] md:w-[60px] md:h-[60px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 class="text-[20px] md:text-[48px] font-medium text-white">Спасибо за вашу заявку!</h2>
                <p class="text-[16px] md:text-[28px] text-gray-300 text-center">Мы перезвоним в ближайшее время!</p>
            </div>
        `;

        setTimeout(() => {
            if (backdrop) backdrop.remove();
            if (modal) modal.remove();
        }, 3000);
    });

    return form;
};

const createContactCloseButton = () => {
    const button = document.createElement('button');
    button.className = 'absolute top-6 right-8 md:top-10 md:right-14 hover:opacity-80 transition-opacity';
    button.innerHTML = `
        <img src="../assets/Frame 156.svg" alt="Закрыть модальное окно" class="w-[16px] md:w-[32px] h-[16px] md:h-[32px]">
    `;
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const backdrop = document.querySelector('.global-modal-back');
        const modal = document.querySelector('.global-modal');
        if (backdrop) backdrop.remove();
        if (modal) modal.remove();
    });
    return button;
};

const showGlobalContactModal = () => {
    if (document.querySelector('.global-modal-back')) return;

    const body = document.body;
    const backdrop = createContactModalBackdrop();
    const modal = createContactModalContainer();
    const header = createContactModalHeader();
    const form = createContactModalForm();
    const closeBtn = createContactCloseButton();

    modal.appendChild(header);
    modal.appendChild(form);
    modal.appendChild(closeBtn);

    body.appendChild(backdrop);
    body.appendChild(modal);
};

document.addEventListener('DOMContentLoaded', () => {
    Array.from(showModalBoxes).forEach(box => {
        box.addEventListener('click', (e) => {
            e.preventDefault();
            showGlobalContactModal();
        });
    });
});