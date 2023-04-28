// // Background de uma cor
// let menuItem = document.querySelectorAll('.item-menu');
// function selectLink() {
//     menuItem.forEach(item => {
//         item.classList.remove('ativo');
//     });

//     this.classList.add('ativo');
// }
// menuItem.forEach(item => {
//     item.addEventListener('click', selectLink);
// });


// Expandir menu
const btnEx = document.querySelector('#btn-ex');
const menuLateral = document.querySelector('.menu-lateral');

btnEx.addEventListener('click', () => {
    menuLateral.classList.toggle('expandir');
});