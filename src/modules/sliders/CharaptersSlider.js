const container = document.getElementById('specs-scroll-container');
const prevBtn = document.getElementById('specs-prev');
const nextBtn = document.getElementById('specs-next');

let isDown = false;
let startX;
let scrollLeft;

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

prevBtn.addEventListener('click', () => {
    container.scrollLeft -= 380;
});

nextBtn.addEventListener('click', () => {
    container.scrollLeft += 380;
});