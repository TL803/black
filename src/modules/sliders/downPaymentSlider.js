function getSliderElements() {
    const slider = document.getElementById('downPaymentSlider');
    const valueDisplay = document.getElementById('downPaymentValue');
    const percentDisplay = document.getElementById('downPaymentPercent');
    return { slider, valueDisplay, percentDisplay };
}

function validateElements({ slider, valueDisplay, percentDisplay }) {
    if (!slider || !valueDisplay || !percentDisplay) {
        console.error('Missing required elements for down payment slider');
        return false;
    }
    return true;
}

function configureSlider(slider) {
    const min = 100000;
    const max = 5000000;
    const step = 100000;

    slider.min = min;
    slider.max = max;
    slider.step = step;

    return { min, max };
}

function formatNumber(num) {
    return num.toLocaleString('ru-RU');
}

function updateSliderDisplay(slider, valueDisplay, percentDisplay, min, max) {
    const value = parseInt(slider.value);
    const percent = Math.round((value / max) * 100);
    const fillPercent = ((value - min) / (max - min)) * 100;

    valueDisplay.textContent = `${formatNumber(value)} ₽`;
    percentDisplay.textContent = `(${percent}%)`;
    slider.style.setProperty('--fill-percent', `${fillPercent}%`);
}

function initDownPaymentSlider() {
    const elements = getSliderElements();
    
    if (!validateElements(elements)) return;

    const { slider, valueDisplay, percentDisplay } = elements;
    const { min, max } = configureSlider(slider);

    const update = () => updateSliderDisplay(slider, valueDisplay, percentDisplay, min, max);

    slider.addEventListener('input', update);
    update();
}

document.addEventListener('DOMContentLoaded', initDownPaymentSlider);