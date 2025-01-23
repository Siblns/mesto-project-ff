import '../pages/index.css';
import { initialCards } from './cards.js';
import { closeModal, openModal } from '../components/modal.js';

import { 
    createCard, 
    removeCard, 
    setLikeCard }
from '../components/createCards.js';

const placesList = document.querySelector('.places__list');

//создаем карточку
function renderCards(item, method = "prepend") {
  item.forEach(placeItem => placesList[ method ](createCard(
      placeItem
    , removeCard
    , setLikeCard
    )
  ));
};

//вывод имеющихся карточек
renderCards(initialCards, 'prepend');

//открытие, закрытие окна с добавлением
const popupOpenButtonNewCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupEditButton = document.querySelector('.profile__edit-button');

//выбираем все попапы и вешаем на них событие закрытия родителя
const popups = document.querySelectorAll('.popup__close');
for (const popup of popups) {
  popup.addEventListener('click', (evt) => {
      closeModal(evt.target.closest(".popup"));
    }
  );
};

//окно редактирования автора
popupEditButton.addEventListener('click', () => openModal(popupEditCard));
//окно создания новой карточки
popupOpenButtonNewCard.addEventListener('click', () => openModal(popupNewCard));

// Находим форму редактирования автора в DOM
const formElement = document.forms["edit-profile"];// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value    
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector('.profile__title')  // Воспользуйтесь инструментом .querySelector()
  const profileDescription = document.querySelector('.profile__description') // Воспользуйтесь инструментом .querySelector()

  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  
  closeModal(evt.target.closest(".popup"));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// Находим форму добавления нового места в DOM
const formNewPlace = document.forms["new-place"];
// Находим поля формы в DOM
const placeName = formNewPlace.elements["place-name"];
const placeUrl = formNewPlace.elements.link;

// Обработчик «отправки» формы
function newCardFormSubmit(evt) {
  evt.preventDefault();

  // добавление новой карточки
  renderCards( [{
    name: placeName.value,
    link: placeUrl.value
    }], 'prepend'
  );
  //сброс значений и закрытие окна
  formNewPlace.reset();

  closeModal(evt.target.closest(".popup"));
};

// Прикрепляем обработчик к форме новой карточки
formNewPlace.addEventListener('submit', newCardFormSubmit);