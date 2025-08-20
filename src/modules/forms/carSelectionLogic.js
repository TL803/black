function getCarSelections() {
    return Array.from(document.querySelectorAll('select[data-step]'))
        .sort((a, b) => {
            return parseInt(a.getAttribute('data-step')) - parseInt(b.getAttribute('data-step'));
        });
}

function applyDisabledLogic() {
    const selections = getCarSelections();

    selections.forEach((select, index) => {
        if (index === 0) {
            select.disabled = false;
        } else {
            const prevSelect = selections[index - 1];
            if (prevSelect.value && !prevSelect.disabled) {
                select.disabled = false;
            } else {
                select.disabled = true;
                select.value = '';
            }
        }
    });
}

function initCarSelectionLogic() {
    const selections = getCarSelections();

    if (selections.length === 0) return;

    selections.forEach((select, index) => {
        if (index === 0) {
            select.disabled = false;
        } else {
            select.disabled = true;
        }
    });

    selections.forEach(select => {
        select.addEventListener('change', applyDisabledLogic);
    });

    applyDisabledLogic();
}

document.addEventListener('DOMContentLoaded', initCarSelectionLogic);