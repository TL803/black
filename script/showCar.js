document.addEventListener("DOMContentLoaded", function () {
    const selects = document.querySelectorAll('form:first-of-type select');

    const carSection = document.querySelector("section:nth-of-type(2)");

    carSection.style.display = "none";

    function checkSelection() {
        const allSelected = Array.from(selects).every(select => select.value !== "");
        if (allSelected) {
            carSection.style.display = "block";
        } else {
            carSection.style.display = "none";
        }
    }

    selects.forEach(select => {
        select.addEventListener("change", checkSelection);
    });
});