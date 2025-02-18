import { closeModal, openModal } from '../components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
/*
export function removeCard(card) {
  card.remove();
};*/

export function setLikeCard(card) {
  card.target.classList.toggle('card__like-button_is-active')
};

export function createCard(dataCard, currentUser, deleteElement, setLikeElement, setLikeCardApi, delLikeCard, clickImageCard) {
  const placeElement = cardTemplate.cloneNode(true);
  const cardDeleteButton = placeElement.querySelector('.card__delete-button');
  const cardTitle = placeElement.querySelector('.card__title');
  const cardImage = placeElement.querySelector('.card__image');
  const cardLikeButton = placeElement.querySelector('.card__like-button');
  const popupDeleteCard = document.querySelector('.popup_type_card-delete');
  const popupDeleteButton = document.querySelector('.popup__button-delete');

  cardTitle.textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.setAttribute("alt", dataCard.name);
  
  const countCardLikes = placeElement.querySelector('.card__like-count');
  if(dataCard.likes != null && dataCard.likes.length != 0){
    countCardLikes.textContent = dataCard.likes.length;
    cardLikeButton.classList.toggle('card__like-button_is-active');
    }
    else {
      countCardLikes.textContent = 0;
    }
  
  cardLikeButton.addEventListener('click', function (card) {    
    const existLikeCurrentUser = dataCard.likes.findIndex(data => data._id === currentUser)
    if( existLikeCurrentUser < 0) {
      setLikeCardApi(dataCard._id)      
        .then((data) => {
          if(dataCard.likes.length === 0){
            console.log
            setLikeElement(card);
          }          
          countCardLikes.textContent = data.likes.length;  
        }
      )
    }
    else if (existLikeCurrentUser >= 0) {      
      delLikeCard(dataCard._id)
      .then((data) => {
          if(dataCard.likes.length <= 1){
            setLikeElement(card);
          }
          countCardLikes.textContent = data.likes.length;
        })
      .catch((err) => {
          console.log(err);
      });
      }
  });

  if(dataCard.owner._id != currentUser) {  
    cardDeleteButton.classList.toggle('card__delete-button-hidden');
  }

  cardDeleteButton.addEventListener('click', function () {
    openModal(popupDeleteCard);
    const sourceCard = this.parentElement;

    popupDeleteButton.addEventListener('click'
      , function(evt){
        evt.preventDefault();

        if(dataCard.owner._id === currentUser) {            
          deleteElement(dataCard._id)
            .catch((err) => {
              console.log(err);
            });

          sourceCard.remove();
          closeModal(popupDeleteCard);
        }
        else {
          closeModal(popupDeleteCard);
        }
     }
    );    
  });

  cardImage.addEventListener('click', function () {
    clickImageCard(cardImage, cardTitle);
  });

  return placeElement;
};