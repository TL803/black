function getToggleElements() {
  return {
    toggleButton: document.querySelector('[data-toggle]'),
    specsContent: document.querySelector('.specs-content'),
    arrowIcon: document.querySelector('[data-arrow]')
  };
}

function isDesktop() {
  return window.matchMedia('(min-width: 768px)').matches;
}

function showContent() {
  const { specsContent, arrowIcon } = getToggleElements();
  specsContent.classList.remove('hidden');
  arrowIcon.style.transform = 'rotate(180deg)';
}

function hideContent() {
  const { specsContent, arrowIcon } = getToggleElements();
  specsContent.classList.add('hidden');
  arrowIcon.style.transform = 'rotate(0deg)';
}

function setDesktopState() {
  const { specsContent, toggleButton, arrowIcon } = getToggleElements();
  showContent();
  toggleButton.style.pointerEvents = 'none';
  arrowIcon.parentElement.classList.add('hidden');
}

function setMobileState() {
  const { toggleButton, arrowIcon } = getToggleElements();
  arrowIcon.parentElement.classList.remove('hidden');
  toggleButton.style.pointerEvents = 'auto';

  if (!toggleButton.hasAttribute('data-initialized')) {
    hideContent();
    toggleButton.setAttribute('data-initialized', 'true');
  }

  const newButton = toggleButton.cloneNode(true);
  newButton.addEventListener('click', toggleMobileContent);
  toggleButton.replaceWith(newButton);
}

function toggleMobileContent() {
  const { specsContent, arrowIcon } = getToggleElements();
  if (specsContent.classList.contains('hidden')) {
    showContent();
  } else {
    hideContent();
  }
}

function updateToggleState() {
  if (isDesktop()) {
    setDesktopState();
  } else {
    setMobileState();
  }
}

function initToggle() {
  const { toggleButton, specsContent, arrowIcon } = getToggleElements();
  if (!toggleButton || !specsContent || !arrowIcon) return;

  updateToggleState();

  const mediaQuery = window.matchMedia('(min-width: 768px)');
  mediaQuery.addEventListener('change', updateToggleState);
}

document.addEventListener('DOMContentLoaded', initToggle);