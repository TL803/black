function getCalcOptionsElements() {
    const options = document.querySelectorAll('[data-calc-option]');
    const totalAmount = document.getElementById('total-amount');
    return { options, totalAmount };
}

function extractPrice(priceContainer) {
    const priceElement = priceContainer.querySelector('[data-price]');
    const amountText = priceElement.textContent.trim();
    return parseInt(amountText.replace(/\D/g, ''), 10);
}

function isCheckboxChecked(checkbox) {
    return checkbox && checkbox.checked;
}

function calculateTotal(options) {
    let total = 0;

    options.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        if (isCheckboxChecked(checkbox)) {
            const amount = extractPrice(option);
            total += amount;
        }
    });

    return total;
}

function updateTotalDisplay(totalElement, total) {
    totalElement.textContent = `${total.toLocaleString('ru-RU')} ₽`;
}

function attachEventListeners(options, totalAmount) {
    options.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                const total = calculateTotal(options);
                updateTotalDisplay(totalAmount, total);
            });
        }
    });
}

function initCalculator() {
    const { options, totalAmount } = getCalcOptionsElements();
    const initialTotal = calculateTotal(options);
    updateTotalDisplay(totalAmount, initialTotal);
    attachEventListeners(options, totalAmount);
}

document.addEventListener('DOMContentLoaded', initCalculator);