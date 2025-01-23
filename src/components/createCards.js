import { openModal } from '../components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;

export function removeCard(card) {
  card.remove();
};

export function setLikeCard(card) {
  card.target.classList.toggle('card__like-button_is-active')
};

export function createCard({name, link}, deleteElement, setLikeElement) {
  const placeElement = cardTemplate.cloneNode(true);
  const cardDeleteButton = placeElement.querySelector('.card__delete-button');
  const cardTitle = placeElement.querySelector('.card__title');
  const cardImage = placeElement.querySelector('.card__image');
  const cardLikeButton = placeElement.querySelector('.card__like-button');
  //подумать над названиями
  const popupImageOp = document.querySelector('.popup_type_image')
  const popupImage = document.querySelector('.popup__image')
  const popupCaption = document.querySelector('.popup__caption') 

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.setAttribute("alt", name);
  
  cardLikeButton.addEventListener('click', function (card) {
    setLikeElement(card);
  });

  cardDeleteButton.addEventListener('click', function () {
    deleteElement(this.parentElement);
  });

  cardImage.addEventListener('click', function () {
    openModal(popupImageOp);
    popupImage.src = cardImage.src;
    popupCaption.textContent = cardTitle.textContent;
  });

  return placeElement;
};