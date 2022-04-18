const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header__container');
const headerMenu = document.querySelector('.header__menu');
const burgerButton = document.querySelector('.burger__button');
const overlay = document.querySelector('.overlay');
const menuList = document.querySelector('.menu__list');

burgerButton.addEventListener('click', ()=>{
  headerMenu.classList.toggle('menu--active');
  burgerButton.classList.toggle('menu--active');
  if (document.querySelector('.overlay__active')) {
    overlay.classList.remove('overlay__active');
    body.style.cssText = 'overflow-y: visible';
  } else {
    overlay.classList.add('overlay__active');
    body.style.cssText = 'overflow-y: hidden;';
  }

})

overlay.addEventListener('click', (e)=> {
  headerMenu.classList.remove('menu--active');
  burgerButton.classList.remove('menu--active');
  overlay.classList.remove('overlay__active');
  body.style.cssText = 'overflow-y: visible';
})

menuList.addEventListener('click', ()=> {
  headerMenu.classList.remove('menu--active');
  burgerButton.classList.remove('menu--active');
  overlay.classList.remove('overlay__active');
  body.style.cssText = 'overflow-y: visible';
})

body.addEventListener('click', (e)=>console.log(e.target))
