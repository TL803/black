document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('banner-slider');
    if (!slider || !slider.children.length) {
        console.warn('Слайдер не найден или пуст');
        return;
    }

    const slides = slider.children;
    const totalSlides = slides.length;

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let slideWidth = 0; 

    function init() {
        updateSlideWidth();
        render();
        addEventListeners();
        setCursor('grab');
        console.debug(`Слайдер запущен. Слайдов: ${totalSlides}`);
    }

    function render() {
        updateSlideWidth();
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        currentTranslate = -currentIndex * slideWidth;
    }

    function updateSlideWidth() {
        slideWidth = slider.clientWidth || window.innerWidth;
    }

    function isInteractive(target) {
        return target.closest('button, a, input, select, textarea');
    }

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

    function handleTouchCancel() {
        if (!isDragging) return;
        isDragging = false;
        setCursor('grab');
    }

    function updatePosition() {
        slider.style.transition = 'none';
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function finalizeDrag() {
        updateSlideWidth();
        const minThreshold = slideWidth * 0.2; 
        const movedBy = currentTranslate - prevTranslate;

        if (Math.abs(movedBy) < 10) return;

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

    function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToSlide(currentIndex - 1);
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToSlide(currentIndex + 1);
        }
    }

    function handleResize() {
        updateSlideWidth();
        goToSlide(currentIndex);
    }

    function addEventListeners() {
        slider.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        slider.addEventListener('touchstart', handleTouchStart, { passive: false });
        slider.addEventListener('touchmove', handleTouchMove, { passive: false });
        slider.addEventListener('touchend', handleTouchEnd);
        slider.addEventListener('touchcancel', handleTouchCancel);

        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);
    }

    init();

    document.querySelectorAll('.showCreaditpopup').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.debug('Открываем форму кредита');
            // showModal('creditForm');
        });
    });
});