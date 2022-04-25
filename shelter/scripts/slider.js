import { generateSideSlider, initSilder } from './pet3Factory.js'

const sliderContainer = document.querySelector('.silder__container');
const silde = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.left-button');
const rightBtn = document.querySelector('.right-button');
const leftSilde = document.getElementById('left-slide');
const rightSilde = document.getElementById('right-slide');
const centralSilde = document.getElementById('central-slide');

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
  }

  if (animationEvt.animationName === 'translateLeft') {
    sliderContainer.classList.remove('translate-left');
    centralSilde.innerHTML = rightSilde.innerHTML;
  }

  [petsIdOld, petsIdNew] = generateSideSlider(petsIdOld, petsIdNew);
  leftBtn.addEventListener('click', translateRight);
  rightBtn.addEventListener('click', translateLeft);
});

[petsIdOld, petsIdNew] = initSilder(petsIdOld, petsIdNew);
