document.addEventListener("DOMContentLoaded", function () {
    const sliderElement = document.getElementById('price-slider');
    if (sliderElement) {
        noUiSlider.create(sliderElement, {
            start: [500000, 2500000],
            connect: true,
            step: 100000, // <-- Шаг 100 000
            range: {
                min: 500000,
                max: 2500000
            },
            format: {
                to: function (value) {
                    return Math.round(value);
                },
                from: function (value) {
                    return Number(value);
                }
            }
        });

        const minPriceValue = document.getElementById('minPriceValue');
        const maxPriceValue = document.getElementById('maxPriceValue');

        sliderElement.noUiSlider.on('update', function (values, handle) {
            const value = Math.round(values[handle]);
            const formattedValue = value.toLocaleString('ru-RU') + ' ₽';
            if (handle === 0) {
                minPriceValue.textContent = `От ${formattedValue}`;
            } else {
                maxPriceValue.textContent = `До ${formattedValue}`;
            }
        });

        const hiddenMinInput = document.querySelector('input[name="price_from"]');
        const hiddenMaxInput = document.querySelector('input[name="price_to"]');

        sliderElement.noUiSlider.on('change', function (values, handle) {
            const value = Math.round(values[handle]);
            if (handle === 0 && hiddenMinInput) hiddenMinInput.value = value;
            if (handle === 1 && hiddenMaxInput) hiddenMaxInput.value = value;
        });
    }
});