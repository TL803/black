function getFormElements() {
  return {
    form: document.getElementById('firstForm'),
    hiddenSections: document.getElementById('hiddenSections')
  };
}

function hideElement(element) {
  if (element) element.classList.add('hidden');
}

function showElement(element) {
  if (element) element.classList.remove('hidden');
}

function scrollToElement(element) {
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function isFormValid(form) {
  const brand = form.querySelector('[name="brand"]')?.value.trim();
  const model = form.querySelector('[name="model"]')?.value.trim();
  const trim = form.querySelector('[name="trim"]')?.value.trim();

  if (!brand) {
    showError('Пожалуйста, выберите марку');
    return false;
  }
  if (!model) {
    showError('Пожалуйста, выберите модель');
    return false;
  }
  if (!trim) {
    showError('Пожалуйста, выберите комплектацию');
    return false;
  }

  return true;
}

function showError(message) {
  alert(message);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const { form, hiddenSections } = getFormElements();

  if (!form || !hiddenSections) {
    console.warn('Один из необходимых элементов не найден');
    return;
  }

  if (isFormValid(form)) {
    showElement(hiddenSections);
    scrollToElement(hiddenSections);
  }
}

function initFormFlow() {
  const { form, hiddenSections } = getFormElements();

  if (!form) {
    console.warn('Форма с id="firstForm" не найдена');
    return;
  }

  if (hiddenSections) {
    hideElement(hiddenSections);
  }

  form.addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', initFormFlow);