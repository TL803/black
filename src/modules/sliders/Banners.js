    document.addEventListener('DOMContentLoaded', () => {
        // --- 1. GET: Получаем элементы ---
        const slider = document.getElementById('banner-slider');
        const slides = slider.children;
        const totalSlides = slides.length;

        // --- 2. STATE: Состояние слайдера ---
        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        // --- 3. INIT: Инициализация ---
        function init() {
            render();
            addEventListeners();
            setCursor('grab');
            console.log(`Слайдер запущен. Слайдов: ${totalSlides}`);
        }

        // --- 4. RENDER: Отрисовка текущего слайда ---
        function render() {
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            currentTranslate = -currentIndex * slider.clientWidth;
        }

        // --- 5. Утилита: Проверка, по кнопке ли кликнули ---
        function isInteractive(target) {
            return target.closest('button') || target.closest('a');
        }

        // --- 6. DRAG: Обработка перетаскивания ---
        function handleMouseDown(e) {
            if (isInteractive(e.target)) return;
            if (e.button !== 0) return;

            isDragging = true;
            startPos = e.pageX;
            prevTranslate = currentTranslate;
            setCursor('grabbing');
            e.preventDefault();
        }

        function handleMouseMove(e) {
            if (!isDragging) return;
            const dx = e.pageX - startPos;
            currentTranslate = prevTranslate + dx;
            updatePosition();
        }

        function handleMouseUp() {
            if (!isDragging) return;
            isDragging = false;
            setCursor('grab');
            finalizeDrag();
        }

        function handleTouchStart(e) {
            if (isInteractive(e.target)) return;

            isDragging = true;
            startPos = e.changedTouches[0].pageX;
            prevTranslate = currentTranslate;
            e.preventDefault();
        }

        function handleTouchMove(e) {
            if (!isDragging) return;
            const dx = e.changedTouches[0].pageX - startPos;
            currentTranslate = prevTranslate + dx;
            updatePosition();
            e.preventDefault();
        }

        function handleTouchEnd() {
            if (!isDragging) return;
            isDragging = false;
            finalizeDrag();
        }

        // --- 7. Вспомогательные функции ---
        function updatePosition() {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${currentTranslate}px)`;
        }

        function finalizeDrag() {
            const minThreshold = 50;
            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -minThreshold) {
                goToSlide(currentIndex + 1);
            } else if (movedBy > minThreshold) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex);
            }
        }

        function goToSlide(index) {
            index = (index + totalSlides) % totalSlides;
            currentIndex = index;
            render();
        }

        function setCursor(type) {
            slider.style.cursor = type;
        }

        // --- 8. Клавиатура ---
        function handleKeyDown(e) {
            if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
            if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
        }

        // --- 9. Ресайз ---
        function handleResize() {
            goToSlide(currentIndex);
        }

        // --- 10. Добавление слушателей ---
        function addEventListeners() {
            // Мышь
            slider.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            // Touch
            slider.addEventListener('touchstart', handleTouchStart, { passive: false });
            slider.addEventListener('touchmove', handleTouchMove, { passive: false });
            slider.addEventListener('touchend', handleTouchEnd);

            // Клавиатура
            document.addEventListener('keydown', handleKeyDown);

            // Ресайз
            window.addEventListener('resize', handleResize);
        }

        // --- 11. Запуск ---
        init();

        // --- 12. Обработчик для кнопок (пример) ---
        document.querySelectorAll('.showCreaditpopup').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Открываем форму кредита');
                // showModal('creditForm');
            });
        });
    });