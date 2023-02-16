import petsData from './petsData.js'
import * as burger from './burger.js'
import * as slider from './slider.js'
import { getUniquePetId, pet3CardFactory } from './pet3Factory.js'

const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const headerContainer = document.querySelector('.header__container');
const headerMenu = document.querySelector('.header__menu');
const burgerButton = document.querySelector('.burger__button');
const menuList = document.querySelector('.menu__list');

const sliderContainer = document.querySelector('.silder__container');
const petTemplate = document.querySelector('#pet-template').content;
const petCard = petTemplate.querySelector('.pet-card');
