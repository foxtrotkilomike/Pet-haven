import petsData from './petsData.js'
import * as burger from './burger.js'

const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');
const cardsContainer = document.querySelector('.cards__container')
const petTemplate = document.querySelector('#pet-template').content;
const petCard = petTemplate.querySelector('.pet-card');
const firstPageBtn = document.getElementById('first-page');
const prevPageBtn = document.getElementById('prev-page');
const currPageBtn = document.getElementById('curr-page');
const nextPageBtn = document.getElementById('next-page');
const lastPageBtn = document.getElementById('last-page');

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

const allPetsArray = [];
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 8; j++) {
    allPetsArray.push(j);
  }
}

const shuffle = (arrayInit) => {
  const array = arrayInit.slice();
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const make6By8 = () => {
  const subArray = [0, 1, 2, 3, 4, 5, 6, 7];
  const set6By8 = [];
  // generate 6 sets (pages)
  for (let i = 0; i < 6; i++) {
    set6By8.push(shuffle(subArray));
  }

  return set6By8;
}

const make8By6 = () => {
  let currentIndex = 0;
  const set8By6 = [];
  let subArray = [];
  // fill the matrix
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 6; j++) {
      subArray.push(allPetsArray[currentIndex])
      currentIndex++;
    }
    set8By6.push(shuffle(subArray));
    subArray = [];
  }
  return set8By6;
}

const make16By3 = () => {
  let currentIndex = 0;
  const set16By3 = [];
  let subArray = [];
  // fill the matrix
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 3; j++) {
      subArray.push(allPetsArray[currentIndex])
      currentIndex++;
    }
    set16By3.push(shuffle(subArray));
    subArray = [];
  }
  return set16By3;
}

const fillPopup = (id) => {
  modalImg.src = `../${petsData[id].img}`;
  modalImg.alt = petsData[id].type;
  modalHeading.textContent = petsData[id].name;
  modalBreed.textContent = `${petsData[id].type} - ${petsData[id].breed}`
  modalCaption.textContent = petsData[id].description;
  modalListItem1.textContent = petsData[id].age;
  modalListItem2.textContent = petsData[id].inoculations.join(', ');
  modalListItem3.textContent = petsData[id].diseases.join(', ');
  modalListItem4.textContent = petsData[id].parasites.join(', ');
};

const closePopup = () => {
  modal.classList.remove('modal--active');
  overlay.classList.remove('overlay__active');
  body.classList.remove('noscroll');
  header.style.cssText = 'z-index: 4;';
};

modalButton.addEventListener('click', closePopup);

let petInstances = [];

const pet8CardFactory = () => {
  for (let i = 0; i < 8; i++) {
    const petInstance = petCard.cloneNode(true);
    petInstance.children[0].src = `../${petsData[i].img}`;
    petInstance.children[0].alt = petsData[i].type;
    petInstance.children[1].textContent = petsData[i].name;
    petInstance.setAttribute('petId', `${i}`);
    petInstances.push(petInstance)
  }
}

pet8CardFactory();

let currentPage = 1;
let lastPageNumber;
const set6By8 = make6By8();
const set8By6 = make8By6();
const set16By3 = make16By3();

const makePage = (pageNumber) => {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    set6By8[pageNumber].forEach((petIndex) => {
      let card = petInstances[petIndex].cloneNode(true);
      card.addEventListener('click', () => {
        fillPopup(card.getAttribute('petid'));
        modal.classList.add('modal--active');
        overlay.classList.add('overlay__active');
        overlay.addEventListener('click', closePopup)
        body.classList.add('noscroll')
        header.style.cssText = 'z-index: 3;';
      });
      cardsContainer.append(card);
    })
    lastPageNumber = 6;
  }

  if (window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches) {
    set8By6[pageNumber].forEach((petIndex) => {
      let card = petInstances[petIndex].cloneNode(true);
      card.addEventListener('click', () => {
        fillPopup(card.getAttribute('petid'));
        modal.classList.add('modal--active');
        overlay.classList.add('overlay__active');
        overlay.addEventListener('click', closePopup);
        body.classList.add('noscroll');
        header.style.cssText = 'z-index: 3;';
      });
      cardsContainer.append(card)
    })
    lastPageNumber = 8;
  }

  if (window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches) {
    set16By3[pageNumber].forEach((petIndex) => {
      let card = petInstances[petIndex].cloneNode(true);
      card.addEventListener('click', () => {
        fillPopup(card.getAttribute('petid'));
        modal.classList.add('modal--active');
        overlay.classList.add('overlay__active');
        overlay.addEventListener('click', closePopup);
        body.classList.add('noscroll');
        header.style.cssText = 'z-index: 3;';
      });
      cardsContainer.append(card)
    })
    lastPageNumber = 16;
  }
}

makePage(0);

firstPageBtn.addEventListener('click', () => {
  currentPage = 1;
  cardsContainer.innerHTML = '';
  makePage(currentPage - 1);
  firstPageBtn.classList.add('button--disabled');
  prevPageBtn.classList.add('button--disabled');
  nextPageBtn.classList.remove('button--disabled');
  lastPageBtn.classList.remove('button--disabled');
  currPageBtn.textContent = currentPage;
});

lastPageBtn.addEventListener('click', () => {
  currentPage = lastPageNumber;
  cardsContainer.innerHTML = '';
  makePage(currentPage - 1);
  nextPageBtn.classList.add('button--disabled');
  lastPageBtn.classList.add('button--disabled');
  firstPageBtn.classList.remove('button--disabled');
  prevPageBtn.classList.remove('button--disabled');
  currPageBtn.textContent = currentPage;
});

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    cardsContainer.innerHTML = '';
    makePage(currentPage - 1);
    if (currentPage === 1) {
      firstPageBtn.classList.add('button--disabled');
      prevPageBtn.classList.add('button--disabled');
    }

    if (currentPage === lastPageNumber - 1) {
      nextPageBtn.classList.remove('button--disabled');
      lastPageBtn.classList.remove('button--disabled');
    }
    currPageBtn.textContent = currentPage;
  }
});

nextPageBtn.addEventListener('click', () => {
  if (currentPage < lastPageNumber) {
    currentPage++;
    cardsContainer.innerHTML = '';
    makePage(currentPage - 1);
    if (currentPage === lastPageNumber) {
      nextPageBtn.classList.add('button--disabled');
      lastPageBtn.classList.add('button--disabled');
    }

    if (currentPage === 2) {
      firstPageBtn.classList.remove('button--disabled');
      prevPageBtn.classList.remove('button--disabled');
    }
    currPageBtn.textContent = currentPage;
  }
});
