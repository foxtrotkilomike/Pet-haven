import petsData from '../assets/pets.json' assert { type: "json" };
import * as burger from './burger.js'
import { getUniquePetId} from './pet3Factory.js'

const pet8CardFactory = () => {
  petsIdOld = petsIdNew;
  petsIdNew = [];
  let newId;
  for (let i = 0; i < 3; i++) {
    newId = getUniquePetId(petsIdOld, petsIdNew)
    petsIdNew.push(newId);
    const petInstance = petCard.cloneNode(true);
    petInstance.children[0].src = `../${petsData[newId].img}`;
    petInstance.children[0].alt = petsData[newId].type;
    petInstance.children[1].textContent = petsData[newId].name;
    console.log(petInstance)
    // sliderContainer.append(petInstance);
  }
}

pet8CardFactory();
