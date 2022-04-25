const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const headerContainer = document.querySelector('.header__container');
const headerMenu = document.querySelector('.header__menu');
const burgerButton = document.querySelector('.burger__button');
const menuList = document.querySelector('.menu__list');

export const hideMenu = () => {
  headerMenu.classList.remove('menu--active');
  burgerButton.classList.remove('menu--active');
  overlay.classList.remove('overlay__active');
  body.classList.remove('noscroll');
}

burgerButton.addEventListener('click', ()=>{
  headerMenu.classList.toggle('menu--active');
  burgerButton.classList.toggle('menu--active');
  if (headerContainer.querySelector('.menu--active')) {
    overlay.classList.add('overlay__active');
    overlay.addEventListener('click', () => hideMenu() )
    body.classList.add('noscroll')
  } else {
    overlay.classList.remove('overlay__active');
    overlay.removeEventListener('click', () => hideMenu() )
    body.classList.remove('noscroll')
  }

})

menuList.addEventListener('click', ()=> {
  hideMenu();
})
