const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard({name, link}, deleteElement) {
  const placeElement = cardTemplate.cloneNode(true);
  const cardDeleteButton = placeElement.querySelector('.card__delete-button');
  const cardTitle = placeElement.querySelector('.card__title');
  const cardImage = placeElement.querySelector('.card__image');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.setAttribute("alt", name);
  
  cardDeleteButton.addEventListener('click', function () {
    deleteElement(this.parentElement);
  });

  return placeElement;
}

function removeCard(el) {
  el.remove();
};

function renderCards(item, method = "prepend") {
  item.forEach(placeItem => placesList[ method ](createCard(placeItem, removeCard)));
};

renderCards(initialCards, 'prepend');