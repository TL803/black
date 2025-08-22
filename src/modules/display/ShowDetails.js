function getCheckbox() {
  return document.getElementById('show-details');
}

function getForm() {
  return document.getElementById('tradein-form');
}

function showForm(form) {
  form.classList.remove('hidden');
}

function hideForm(form) {
  form.classList.add('hidden');
}

function toggleFormVisibility(checkbox, form) {
  if (checkbox.checked) {
    showForm(form);
  } else {
    hideForm(form);
  }
}

function initFormToggle() {
  const checkbox = getCheckbox();
  const form = getForm();

  if (!checkbox || !form) return;

  checkbox.addEventListener('change', () => {
    toggleFormVisibility(checkbox, form);
  });
}

document.addEventListener('DOMContentLoaded', initFormToggle);