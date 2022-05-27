import { generateSideSlider, initSilder, closePopup, fillPopup } from './pet3Factory.js'

const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const sliderContainer = document.querySelector('.silder__container');
const silde = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.left-button');
const rightBtn = document.querySelector('.right-button');
const leftSilde = document.getElementById('left-slide');
const rightSilde = document.getElementById('right-slide');
const centralSilde = document.getElementById('central-slide');
const modal = document.querySelector('.modal');

let petsIdOld = [];
let petsIdNew = [];

const translateLeft = () => {
  sliderContainer.classList.add('translate-left');
  leftBtn.removeEventListener('click', translateRight);
  rightBtn.removeEventListener('click', translateLeft);
}

const translateRight = () => {
  sliderContainer.classList.add('translate-right');
  leftBtn.removeEventListener('click', translateRight);
  rightBtn.removeEventListener('click', translateLeft);
}

leftBtn.addEventListener('click', translateRight);
rightBtn.addEventListener('click', translateLeft);

sliderContainer.addEventListener('animationend', (animationEvt) => {
  if (animationEvt.animationName === 'translateRight') {
    sliderContainer.classList.remove('translate-right');
    centralSilde.innerHTML = leftSilde.innerHTML;
    Array.from(centralSilde.children).forEach((card) => {
      card.addEventListener('click', () => {
        fillPopup(card.getAttribute('petid'));
        modal.classList.add('modal--active');
        overlay.classList.add('overlay__active');
        overlay.addEventListener('click', closePopup)
        body.classList.add('noscroll')
    });
  });
  }

  if (animationEvt.animationName === 'translateLeft') {
    sliderContainer.classList.remove('translate-left');
    centralSilde.innerHTML = rightSilde.innerHTML;
    Array.from(centralSilde.children).forEach((card) => {
      card.addEventListener('click', () => {
        fillPopup(card.getAttribute('petid'));
        modal.classList.add('modal--active');
        overlay.classList.add('overlay__active');
        overlay.addEventListener('click', closePopup)
        body.classList.add('noscroll')
    });
  });
  }

  [petsIdOld, petsIdNew] = generateSideSlider(petsIdOld, petsIdNew);
  leftBtn.addEventListener('click', translateRight);
  rightBtn.addEventListener('click', translateLeft);
});

[petsIdOld, petsIdNew] = initSilder(petsIdOld, petsIdNew);
