const burgerMenu = document.getElementById('burgerMenu');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

const openMobileMenu = () => {
    mobileMenu.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
};

const closeMobileMenu = () => {
    mobileMenu.classList.add('translate-x-full');
    overlay.classList.add('hidden');
};

const handleBurgerClick = () => {
    openMobileMenu();
};

const handleCloseButtonClick = () => {
    closeMobileMenu();
};

const handleOverlayClick = () => {
    closeMobileMenu();
};

const handleClickOutside = (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== burgerMenu && !overlay.classList.contains('hidden')) {
        closeMobileMenu();
    }
};

const initBurgerMenu = () => {
    burgerMenu.addEventListener('click', handleBurgerClick);
    closeMenu.addEventListener('click', handleCloseButtonClick);
    overlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('click', handleClickOutside);
};

document.addEventListener('DOMContentLoaded', initBurgerMenu);