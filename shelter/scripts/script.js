import petsData from '../assets/pets.json' assert {type: "json"};

console.log(petsData)

const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const headerContainer = document.querySelector('.header__container');
const headerMenu = document.querySelector('.header__menu');
const burgerButton = document.querySelector('.burger__button');

const overlay = document.querySelector('.overlay');

const menuList = document.querySelector('.menu__list');



const createElement = (tagName, tagClass, textContent) => {
  const element = document.createElement(tagName);
  element.classList.add(tagClass);
  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

const hideMenu = () => {
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

body.addEventListener('click', (e)=>console.log(e.target))
