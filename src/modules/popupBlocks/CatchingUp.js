class ModalManager {
    static MODAL_INTERVAL = 150_000;
    static autoModalInterval = null;
    static isOpen = false;

    static DEFAULT_TYPE = 'Credit';

    static createModal(type = 'Credit') {
        const backdrop = document.createElement('div');
        backdrop.className = 'global-modal-back bg-[#00000066] w-full h-screen fixed inset-0 z-40';

        const modal = document.createElement('div');
        modal.className = `
            global-modal
            flex flex-col
            w-[90vw] max-w-[340px] sm:max-w-[400px] md:max-w-[500px]
            mx-auto p-4 sm:p-6
            bg-gradient-to-r from-[#131417] to-[#005f4f]
            rounded-xl shadow-lg
            fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            z-50 overflow-hidden text-white
            box-border
        `;

        const header = this.createModalHeader(type);
        const form = this.createModalForm();
        const closeButton = this.createCloseButton();

        modal.appendChild(header);
        modal.appendChild(form);
        modal.appendChild(closeButton);

        backdrop.addEventListener('click', () => this.closeModal(backdrop, modal));

        return { backdrop, modal };
    }

    static createModalHeader(type) {
        const header = document.createElement('div');
        header.className = 'text-center text-white px-4 py-6 space-y-3 break-words';

        let offerText = type === 'Trade-in' ? 'по программе Trade-in' : 'в кредит';
        const isTradeIn = type === 'Trade-in';

        header.innerHTML = `
            <p class="text-[14px] sm:text-[16px] font-medium leading-tight">
                Настало время для вашей мечты — новый авто по особой цене!
            </p>
            <p class="text-[12px] sm:text-[14px] font-medium text-gray-300">
                Акция действует до 3 июля
            </p>
            <img 
                src="../assets/Frame 193 (1).png" 
                alt="Три автомобиля" 
                class="w-full h-auto max-h-[100px] sm:max-h-[120px] mt-6 mb-4 object-contain"
            >
            <h2 class="text-[16px] sm:text-[18px] font-bold text-white text-center">
                Специальное предложение на Hyundai Sonata ${isTradeIn ? 'по программе Trade-in' : ''}
            </h2>
        `;
        return header;
    }

    static createModalForm() {
        const form = document.createElement('form');
        form.className = 'flex flex-col gap-4 mt-6';

        const inputName = this.createInput('text', 'ФИО', true);
        const inputPhone = this.createInput('tel', 'Ваш номер телефона', true);

        const consentContainer = document.createElement('div');
        consentContainer.className = 'flex items-start gap-2 mt-4 text-[10px] sm:text-[12px] text-gray-300';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.required = true;
        checkbox.className = 'custom-checkbox w-14 h-5 accent-[#19BC8D] rounded cursor-pointer';

        const consentText = document.createElement('span');
        consentText.textContent = 'Я соглашаюсь с условиями и даю свое согласие на обработку и использование моих персональных данных, и разрешаю сделать запрос в бюро кредитных историй';

        consentContainer.appendChild(checkbox);
        consentContainer.appendChild(consentText);

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = `
            w-full bg-[#19BC8D] hover:bg-[#17a67c]
            py-3 sm:py-4 rounded-full
            text-[14px] sm:text-[16px] font-medium text-[#131417]
            transition-colors duration-200
            mt-6 shadow-md
        `;
        submitBtn.textContent = 'Отправить заявку на звонок';

        form.append(inputName, inputPhone, consentContainer, submitBtn);
        return form;
    }

    static createInput(type, placeholder, required) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.required = required;
        input.className = `
            custom-input
            w-full bg-transparent border border-gray-500
            rounded-full px-4 py-3 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#19BC8D]
            text-[14px] sm:text-[16px]
            box-border
        `;
        return input;
    }

    static createCloseButton() {
        const btn = document.createElement('button');
        btn.className = 'absolute top-4 right-4 w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
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
            <div class="flex flex-col items-center gap-4 text-white px-4 py-4">
                <img src="../assets/Frame 193 (1).png" alt="Три автомобиля" class="w-full max-w-[100px] h-auto mb-4 object-contain">
                <h2 class="text-[16px] font-bold text-white">Получили вашу заявку!</h2>
                <p class="text-[12px] text-gray-300">Мы перезвоним вам в ближайшее время.</p>
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
                this.showModal(this.DEFAULT_TYPE);
            } else {
                console.log('Модалка уже открыта — пропускаем');
            }
        }, this.MODAL_INTERVAL);
    }

    static showModal(type = this.DEFAULT_TYPE) {
        if (this.isOpen) return;
        this.isOpen = true;
        console.log('Показываем модалку с типом:', type);
        const { backdrop, modal } = this.createModal(type);
        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
        this.initModal(backdrop, modal);
    }

    static init() {
        this.startAutoModal();

        const buttons = document.querySelectorAll('[data-toggle-timer-container]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const type = button.getAttribute('data-toggle-timer-container');
                const validType = ['Credit', 'Trade-in'].includes(type) ? type : 'Credit';
                this.showModal(validType);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init();
});