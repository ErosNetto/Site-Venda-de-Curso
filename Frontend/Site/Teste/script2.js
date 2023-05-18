// Modo Dark
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

// Não deixa o botão dar refresh
const form = document.querySelector('#login-form')
form.addEventListener('submit', e => {
    e.preventDefault()
})

function mudarParaSenha() {
    document.querySelector('#label').innerHTML = 'Senha <div class="input-field"><i class="fa-solid fa-key"></i><input type="password" name="senha" id="senha"></div>';
    document.querySelector('#teste').innerHTML = 'Esqueceu a senha?';
    document.querySelector('#login-button').innerHTML = 'Login';
}
