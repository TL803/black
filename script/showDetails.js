  const checkbox = document.getElementById('show-details');
  const form = document.getElementById('tradein-form');

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      form.classList.remove('hidden');
    } else {
      form.classList.add('hidden'); 
    }
  });