const cardTemplate = document.querySelector('#card-template').content;

export function countingLikes (cardElement, iconCardLikes, arrayLikes){
    cardElement.target.classList.toggle('card__like-button_is-active')
    iconCardLikes.textContent = arrayLikes.length;
};

export function createCard(
  dataCard, 
  currentUser,
  deleteElement, 
  setLikeElement,
  clickImageCard
  ) {
  const placeElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = placeElement.querySelector('.card__delete-button');
  const cardTitle = placeElement.querySelector('.card__title');
  const cardImage = placeElement.querySelector('.card__image');
  const cardLikeButton = placeElement.querySelector('.card__like-button');

  cardTitle.textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.setAttribute("alt", dataCard.name);
  
  const iconCardLikes = placeElement.querySelector('.card__like-count');
  const isLikedCurrentUser = dataCard.likes.some(data => data._id === currentUser);

  const countCardLikes = dataCard.likes.length;

  if(countCardLikes === 0) {
    iconCardLikes.textContent = 0;
  }
  else {
    iconCardLikes.textContent = countCardLikes;
  };
  
  if(isLikedCurrentUser){
     cardLikeButton.classList.toggle('card__like-button_is-active');
  };  

  cardLikeButton.addEventListener('click', function (card) { 
    setLikeElement(card, dataCard._id, iconCardLikes);
  });

  if(dataCard.owner._id != currentUser) {  
    cardDeleteButton.classList.toggle('card__delete-button-hidden');
  };

  if(dataCard.owner._id === currentUser) { 
    cardDeleteButton.addEventListener('click', function (evt) {
      evt.preventDefault();    
      deleteElement(dataCard._id, this.parentElement);       
    });
  };
  
  cardImage.addEventListener('click', function () {
    clickImageCard(cardImage, cardTitle);
  });

  return placeElement;
};