const modo = document.querySelector('#mode-icon');

modo.addEventListener('click',() => {
    const form = document.querySelector('#login-form')
    if(modo.classList.contains('fa-moon')) {
        modo.classList.remove('fa-moon');
        modo.classList.add('fa-sun');

        form.classList.add('dark');
        return;
    }
    modo.classList.remove('fa-sun');
    modo.classList.add('fa-moon');
    form.classList.remove('dark');
});