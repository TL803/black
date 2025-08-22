function getElements() {
    const container = document.getElementById('specs-scroll-container');
    const prevBtn = document.getElementById('specs-prev');
    const nextBtn = document.getElementById('specs-next');

    if (!container || !prevBtn || !nextBtn) {
        console.error('Один или несколько элементов не найдены.');
        return null;
    }

    return { container, prevBtn, nextBtn };
}

function setupMouseHandling(container) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}

function setupTouchHandling(container) {
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startX = touch.pageX;
        scrollLeft = container.scrollLeft;
    }, { passive: false });

    container.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.pageX;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    }, { passive: false });
}

function setupButtonControls(container, prevBtn, nextBtn, scrollAmount = 380) {
    prevBtn.addEventListener('click', () => {
        container.scrollLeft -= scrollAmount;
    });

    nextBtn.addEventListener('click', () => {
        container.scrollLeft += scrollAmount;
    });
}

function initScrollContainer() {
    const elements = getElements();
    if (!elements) return;

    const { container, prevBtn, nextBtn } = elements;

    setupMouseHandling(container);
    setupTouchHandling(container);
    setupButtonControls(container, prevBtn, nextBtn, 380);
}

document.addEventListener('DOMContentLoaded', initScrollContainer);