class ModalManager {
    static MODAL_INTERVAL = 150_000; 
    static autoModalInterval = null;
    static isOpen = false;

    static createModal() {
        const backdrop = document.createElement('div');
        backdrop.className = 'global-modal-back bg-[#00000066] w-full h-screen fixed inset-0 z-40';

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
            z-50 max-w-[95vw] max-w-[600px] md:max-w-[1800px]
            text-white
            overflow-y-auto max-h-[95vh]
            box-border
        `;

        const header = this.createModalHeader();
        const form = this.createModalForm();
        const closeButton = this.createCloseButton();

        modal.appendChild(header);
        modal.appendChild(form);
        modal.appendChild(closeButton);

        backdrop.addEventListener('click', () => this.closeModal(backdrop, modal));

        return { backdrop, modal };
    }

    static createModalHeader() {
        const header = document.createElement('div');
        header.className = 'text-center text-white px-4 break-words';
        header.innerHTML = `
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
        return header;
    }

    static createModalForm() {
        const form = document.createElement('form');
        form.className = 'flex flex-col gap-[16px] sm:gap-[20px] md:gap-[24px] px-4';

        const inputName = this.createInput('text', 'ФИО', true);
        const inputPhone = this.createInput('tel', 'Ваш номер телефона', true);

        const consent = document.createElement('label');
        consent.className = 'flex items-start sm:items-center space-x-2 sm:space-x-4 break-words';
        consent.innerHTML = `
            <span class="inline-block relative mt-1">
                <input type="checkbox" checked class="custom-checkbox w-5 h-5 sm:w-6 sm:h-6 accent-[#19BC8D] rounded" required>
            </span>
            <span class="text-[11px] md:text-[20px]">
                я согласен с <a href="./Privacy-policy.html" class="text-[#19BC8D] underline">политикой обработки персональных данных</a>
            </span>
        `;

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = `
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
        submitBtn.textContent = 'Отправить заявку на звонок';

        form.append(inputName, inputPhone, consent, submitBtn);
        return form;
    }

    static createInput(type, placeholder, required) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.required = required;
        input.className = `
            custom-select border border-gray-500 bg-transparent
            rounded-lg p-3 sm:p-4
            text-[14px] sm:text-[16px] md:text-[18px]
            placeholder-gray-400 text-white
            focus:outline-none focus:ring-2 focus:ring-[#19BC8D]
            w-full
            box-border
        `;
        return input;
    }

    static createCloseButton() {
        const btn = document.createElement('button');
        btn.className = 'absolute top-3 right-3 sm:top-6 sm:right-6 md:top-10 md:right-14 hover:opacity-80 transition-opacity z-50';
        btn.innerHTML = `
            <img src="../assets/Frame 156.svg" alt="Закрыть модальное окно" class="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[32px] md:h-[32px]">
        `;
        return btn;
    }

    static initModal(backdrop, modal) {
        const form = modal.querySelector('form');
        const closeButton = modal.querySelector('.absolute');

        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeModal(backdrop, modal);
            this.restartAutoModal();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form, modal, backdrop);
        });
    }

    static handleFormSubmit(form, modal, backdrop) {
        form.remove();

        const header = modal.querySelector('.text-center');
        header.innerHTML = `
            <div class="flex flex-col items-center gap-4 sm:gap-6 px-4 break-words">
                <img src="../assets/Frame 193 (1).png" alt="Три автомобиля" class="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto mb-6 h-auto">
                <h2 class="text-[24px] sm:text-[32px] md:text-[48px] font-bold text-white text-center leading-tight">
                    Получили вашу заявку на звонок!
                </h2>
                <p class="text-[14px] sm:text-[16px] md:text-[24px] text-gray-300 text-center leading-relaxed break-words">
                    Мы перезвоним вам в ближайшее время!
                </p>
            </div>
        `;

        setTimeout(() => {
            backdrop.remove();
            modal.remove();
            this.isOpen = false;
            this.restartAutoModal();
        }, 3000);
    }

    static closeModal(backdrop, modal) {
        if (backdrop && modal) {
            backdrop.remove();
            modal.remove();
        }
        this.isOpen = false; 
    }

    static restartAutoModal() {
        if (this.autoModalInterval) {
            clearInterval(this.autoModalInterval);
            this.autoModalInterval = null;
        }
        setTimeout(() => {
            this.startAutoModal();
        }, this.MODAL_INTERVAL);
    }

    static startAutoModal() {
        console.log('Авто-модалка запущена: следующее появление через', this.MODAL_INTERVAL / 1000, 'секунд');
        this.autoModalInterval = setInterval(() => {
            console.log('Интервал сработал!');
            if (!this.isOpen) {
                this.showModal();
            } else {
                console.log('Модалка уже открыта — пропускаем');
            }
        }, this.MODAL_INTERVAL);
    }

    static showModal() {
        if (this.isOpen) return;
        this.isOpen = true;
        console.log('Показываем модалку...');
        const { backdrop, modal } = this.createModal();
        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
        this.initModal(backdrop, modal);
    }


    static init() {
        this.startAutoModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init();
});