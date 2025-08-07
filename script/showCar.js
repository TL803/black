// Ждём загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    // Все select'ы в первой форме (выбор автомобиля)
    const selects = document.querySelectorAll('form:first-of-type select');

    // Второй section — блок с автомобилем (изображение, характеристики, цена и т.д.)
    const carSection = document.querySelector("section:nth-of-type(2)");

    // Скрываем блок с машиной изначально
    carSection.style.display = "none";

    // Функция проверки: все ли select имеют выбранное значение
    function checkSelection() {
        const allSelected = Array.from(selects).every(select => select.value !== "");
        if (allSelected) {
            carSection.style.display = "block"; // Показываем, только если все заполнены
        } else {
            carSection.style.display = "none";  // Скрываем, если хотя бы один пуст
        }
    }

    // Добавляем обработчик на каждое изменение select'а
    selects.forEach(select => {
        select.addEventListener("change", checkSelection);
    });
});