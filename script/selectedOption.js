    document.querySelectorAll('.custom-select').forEach(select => {
        function updateClass() {
            if (select.value) {
                select.classList.add('has-value');
            } else {
                select.classList.remove('has-value');
            }
        }

        updateClass();

        select.addEventListener('change', updateClass);
    });
