function getSortedSelectionSteps() {
  return Array.from(document.querySelectorAll('select[data-step]'))
    .sort((a, b) => {
      const stepA = parseInt(a.getAttribute('data-step'), 10);
      const stepB = parseInt(b.getAttribute('data-step'), 10);
      return stepA - stepB;
    });
}

function isFirstStep(select, allSteps) {
  return allSteps.indexOf(select) === 0;
}

function isPreviousStepFilledAndEnabled(select, allSteps) {
  const currentIndex = allSteps.indexOf(select);
  if (currentIndex === 0) return true; 

  const prevSelect = allSteps[currentIndex - 1];
  return prevSelect && prevSelect.value && !prevSelect.disabled;
}

function disableSelect(select) {
  select.disabled = true;
  select.value = ''; 
}

function enableSelect(select) {
  select.disabled = false;
}

function updateSelectState(select, allSteps) {
  if (isFirstStep(select, allSteps)) {
    enableSelect(select);
  } else if (isPreviousStepFilledAndEnabled(select, allSteps)) {
    enableSelect(select);
  } else {
    disableSelect(select);
  }
}

function applySelectionLogic() {
  const steps = getSortedSelectionSteps();

  if (steps.length === 0) return;

  steps.forEach(select => {
    updateSelectState(select, steps);
  });
}

function initCarSelectionFlow() {
  const steps = getSortedSelectionSteps();

  if (steps.length === 0) return;

  steps.forEach((select, index) => {
    if (index === 0) {
      enableSelect(select);
    } else {
      disableSelect(select);
    }
  });

  steps.forEach(select => {
    select.addEventListener('change', applySelectionLogic);
  });

  applySelectionLogic();
}

document.addEventListener('DOMContentLoaded', initCarSelectionFlow);