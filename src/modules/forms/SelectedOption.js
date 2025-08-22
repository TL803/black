function getCustomSelects() {
  return document.querySelectorAll('.custom-select');
}

function hasSelectValue(select) {
  return Boolean(select.value && select.value.trim() !== '');
}

function updateSelectClass(select) {
  if (hasSelectValue(select)) {
    select.classList.add('has-value');
  } else {
    select.classList.remove('has-value');
  }
}

function initCustomSelectStates() {
  const selects = getCustomSelects();

  if (selects.length === 0) return;

  selects.forEach(select => {
    updateSelectClass(select);

    select.addEventListener('change', () => updateSelectClass(select));
  });
}

document.addEventListener('DOMContentLoaded', initCustomSelectStates);