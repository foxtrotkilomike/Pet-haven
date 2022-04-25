import petsData from '../assets/pets.json' assert { type: "json" };
import { createElement } from './utils.js';

const sliderContainer = document.querySelector('.silder__container');
const petTemplate = document.querySelector('#pet-template').content;
const petCard = petTemplate.querySelector('.pet-card');
const leftSilde = document.getElementById('left-slide');
const rightSilde = document.getElementById('right-slide');
const centralSilde = document.getElementById('central-slide');

export const getUniquePetId = (petsIdOld, petsIdNew) => {
  let randomId = 0;
  do {
    randomId = Math.floor(Math.random() * 8)
  } while (petsIdOld.includes(randomId) || petsIdNew.includes(randomId));

  return randomId;
}

export const pet3CardFactory = (petsIdOld, petsIdNew) => {
  petsIdOld = petsIdNew;
  petsIdNew = [];
  let newId;
  const cards = [];
  for (let i = 0; i < 3; i++) {
    newId = getUniquePetId(petsIdOld, petsIdNew)
    petsIdNew.push(newId);
    const petInstance = petCard.cloneNode(true);
    petInstance.children[0].src = petsData[newId].img;
    petInstance.children[0].alt = petsData[newId].type;
    petInstance.children[1].textContent = petsData[newId].name;
    cards.push(petInstance);
  }

  return [cards, petsIdOld, petsIdNew];
}

export const generateSideSlider = (petsIdOld, petsIdNew) => {
  let newCards = [];
  [newCards, petsIdOld, petsIdNew] = pet3CardFactory(petsIdOld, petsIdNew);
  leftSilde.innerHTML = '';
  leftSilde.append(...newCards);
  rightSilde.innerHTML = leftSilde.cloneNode(true).innerHTML;

  return [petsIdOld, petsIdNew]
}

export const initSilder = (petsIdOld, petsIdNew) => {
  let centralCards = [];
  [centralCards, petsIdOld, petsIdNew] = pet3CardFactory(petsIdOld, petsIdNew);
  centralSilde.append(...centralCards);

  return generateSideSlider(petsIdOld, petsIdNew);
}
