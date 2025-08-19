        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('firstForm');
            const hiddenSections = document.getElementById('hiddenSections');

            // Скрываем все последующие секции
            hiddenSections.classList.add('hidden');

            // Обработка отправки формы
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const brand = form.querySelector('[name="brand"]').value;
                const model = form.querySelector('[name="model"]').value;
                const trim = form.querySelector('[name="trim"]').value;

                if (!brand || !model || !trim) {
                    alert('Пожалуйста, заполните все поля');
                    return;
                }

                // Показываем скрытые секции
                hiddenSections.classList.remove('hidden');

                // Плавная прокрутка к следующему блоку
                hiddenSections.scrollIntoView({ behavior: 'smooth' });
            });
        });