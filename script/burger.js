// burger.js
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');

    // Функция открытия меню
    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    }

    // Функция закрытия меню
    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    // Обработчики кликов
    burgerMenu.addEventListener('click', openMobileMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && e.target !== burgerMenu && !overlay.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
});