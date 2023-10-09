// Бургер
const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const cross = document.querySelector('.cross');
burgerMenu.style.left = `-${burgerMenu.clientWidth}px`;
burgerMenu.style.transitionDuration = "500ms";

burger.addEventListener('click', () => {
    burgerMenu.style.left = "0";
});

burger.addEventListener('touchend', () => {
    burgerMenu.style.left = "0";
});

cross.addEventListener('click', () => {
    burgerMenu.style.left = `-${burgerMenu.clientWidth}px`;
});

cross.addEventListener('touchend', () => {
    burgerMenu.style.left = `-${burgerMenu.clientWidth}px`;
});

const burgerMenuNavItems = burgerMenu.querySelectorAll('nav p');
const navActive = burgerMenu.querySelector('.nav-active');

burgerMenuNavItems.forEach((item, index) => {
    function moveBurgerCursor() {
        burgerMenuNavItems.forEach((navItem, navIndex) => {
            navActive.classList.remove(`nav-active-${navIndex+1}`);
        });
    
        navActive.classList.add(`nav-active-${index+1}`);
    }

    item.addEventListener('mouseover', moveBurgerCursor);
    item.addEventListener('touchstart', moveBurgerCursor);
});