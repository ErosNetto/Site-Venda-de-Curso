const loginContainer = document.querySelector('.login-container');
const avançarLogin= document.querySelector('.btnAvancar');
const voltarLogin = document.querySelector('.icon-close');

// Login
avançarLogin.addEventListener('click', () => {
    loginContainer.classList.add('active');
    inputSenha.type = 'password';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    // verSenha.checked = false;

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

// Mostrar senha
// const verSenha = document.querySelector('.ver-senha');
// const inputSenha = document.querySelector('.senha');

// verSenha.addEventListener('click', () => {
//     if(inputSenha.type == 'password') {
//         inputSenha.type = 'text';
//     } else {
//         inputSenha.type = 'password';
//     }
// });


const icon = document.querySelector('.fa-eye');
const inputSenha = document.querySelector('.senha');

icon.addEventListener('click', () => {
    if(inputSenha.type == 'password') {
        inputSenha.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        inputSenha.type = 'password';
        icon.classList.add('fa-eye');
        icon.classList.remove('fa-eye-slash');
    }
});


// Não deixa o botão dar refresh
const form = document.querySelector('.formAvancar')
form.addEventListener('submit', e => {
    e.preventDefault()
});