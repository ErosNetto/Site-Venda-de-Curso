// Background de uma cor
let menuItem = document.querySelectorAll('.item-menu');
function selectLink() {
    menuItem.forEach(item => {
        item.classList.remove('ativo');
    });

    this.classList.add('ativo');
}
menuItem.forEach(item => {
    item.addEventListener('click', selectLink);
});


// Expandir menu
const btnEx = document.querySelector('#btn-ex');
const menuLateral = document.querySelector('.menu-lateral');

btnEx.addEventListener('click', () => {
    menuLateral.classList.toggle('expandir');
});


// função hover menu suspenso
// const user = document.querySelector('.menu-user');
// const menuSuspenso = document.querySelector('.menu-suspeso');
// const after = document.querySelector('.menu-after');

// const styleOn = {
//     "visibility": "visible",
//     "opacity": "1",
//     "display": "block"
// };

// const styleOff = {
//     "visibility": "hidden",
//     "opacity": "0",
//     "display": "none"
// };

// user.addEventListener('mouseover', () => {
//     Object.assign(menuSuspenso.style, styleOn);
// });

// user.addEventListener('mouseout', () => {
//     Object.assign(menuSuspenso.style, styleOff);
// });

// menuSuspenso.addEventListener('mouseover', () => {
//     Object.assign(menuSuspenso.style, styleOn);
// });

// menuSuspenso.addEventListener('mouseout', () => {
//     Object.assign(menuSuspenso.style, styleOff);
// });

// after.addEventListener('mouseover', () => {
//     if(after.mouseover) {
//         Object.assign(menuSuspenso.style, styleOn);
//     }
// });