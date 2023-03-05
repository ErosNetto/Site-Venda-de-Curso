const loginContainer = document.querySelector('.login-container');
const avançarLogin= document.querySelector('.btnAvancar');
const voltarLogin = document.querySelector('.icon-close');

// Login
avançarLogin.addEventListener('click', () => {
    loginContainer.classList.add('active');
});

voltarLogin.addEventListener('click', () => {
    loginContainer.classList.remove('active');
});


// Cadastro
const cadastro = document.querySelector('.register-link');
const voltarCadastro = document.querySelector('.login-link')

cadastro.addEventListener('click', () => {
    loginContainer.classList.add('cadastrar');
});

voltarCadastro.addEventListener('click', () => {
    loginContainer.classList.remove('cadastrar');
});





// Não deixa o botão dar refresh
const form = document.querySelector('.formAvancar')
form.addEventListener('submit', e => {
    e.preventDefault()
});