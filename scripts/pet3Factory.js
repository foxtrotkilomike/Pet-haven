import petsData from './petsData.js'
import { createElement } from './utils.js';

const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const sliderContainer = document.querySelector('.silder__container');
const petTemplate = document.querySelector('#pet-template').content;
const petCard = petTemplate.querySelector('.pet-card');
const leftSilde = document.getElementById('left-slide');
const rightSilde = document.getElementById('right-slide');
const centralSilde = document.getElementById('central-slide');

const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('.modal__img');
const modalHeading = modal.querySelector('.modal__heading');
const modalBreed = modal.querySelector('.modal__breed');
const modalCaption = modal.querySelector('.modal__caption');
const modalListItem1 = modal.querySelector('#modal__list-item-1 span:nth-child(2)');
const modalListItem2 = modal.querySelector('#modal__list-item-2 span:nth-child(2)');
const modalListItem3 = modal.querySelector('#modal__list-item-3 span:nth-child(2)');
const modalListItem4 = modal.querySelector('#modal__list-item-4 span:nth-child(2)');
const modalButton = modal.querySelector('.modal__button');

export const closePopup = () => {
  modal.classList.remove('modal--active');
  overlay.classList.remove('overlay__active');
  body.classList.remove('noscroll');
};

modalButton.addEventListener('click', closePopup);

export const fillPopup = (id) => {
  modalImg.src = petsData[id].img;
  modalImg.alt = petsData[id].type;
  modalHeading.textContent = petsData[id].name;
  modalBreed.textContent = `${petsData[id].type} - ${petsData[id].breed}`
  modalCaption.textContent = petsData[id].description;
  modalListItem1.textContent = petsData[id].age;
  modalListItem2.textContent = petsData[id].inoculations.join(', ');
  modalListItem3.textContent = petsData[id].diseases.join(', ');
  modalListItem4.textContent = petsData[id].parasites.join(', ');
};

export const getUniquePetId = (petsIdOld, petsIdNew) => {
  let randomId = 0;
  do {
    randomId = Math.floor(Math.random() * 8)
  } while (petsIdOld.includes(randomId) || petsIdNew.includes(randomId));

  return randomId;
};

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
    petInstance.setAttribute('petId', `${newId}`);
    cards.push(petInstance);
  }

  return [cards, petsIdOld, petsIdNew];
};

export const generateSideSlider = (petsIdOld, petsIdNew) => {
  let newCards = [];
  [newCards, petsIdOld, petsIdNew] = pet3CardFactory(petsIdOld, petsIdNew);
  leftSilde.innerHTML = '';
  leftSilde.append(...newCards);
  rightSilde.innerHTML = leftSilde.cloneNode(true).innerHTML;

  return [petsIdOld, petsIdNew]
};

export const initSilder = (petsIdOld, petsIdNew) => {
  let centralCards = [];
  [centralCards, petsIdOld, petsIdNew] = pet3CardFactory(petsIdOld, petsIdNew);
  centralCards.forEach((card) => {
    card.addEventListener('click', () => {
      fillPopup(card.getAttribute('petid'));
      modal.classList.add('modal--active');
      overlay.classList.add('overlay__active');
      overlay.addEventListener('click', closePopup)
      body.classList.add('noscroll')
    });
  });
  centralSilde.append(...centralCards);

  return generateSideSlider(petsIdOld, petsIdNew);
};
