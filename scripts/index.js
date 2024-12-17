// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardMain = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

// @todo: функция вывода на страницу
function renderCards() {
  cardMain.forEach(renderCard);
}

// @todo: Функция создания карточки
function renderCard({name, link}) {
  const placeElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteButton = placeElement.querySelector('.card__delete-button');

  placeElement.querySelector('.card__title').textContent = name;
  placeElement.querySelector('.card__image').src = link;

  cardDeleteButton.addEventListener('click', function () {
    cardDelete(this.parentElement);
  });

  placesList.prepend(placeElement);
};

// @todo: Функция удаления карточки
function cardDelete(el) {
  el.remove();
};

// @todo: Вывести карточки на страницу
renderCards();
