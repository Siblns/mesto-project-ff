import '../pages/index.css';
import { initialCards } from './cards.js';
import { closeModal, openModal } from '../components/modal.js';

import { 
    createCard,
    removeCard, 
    setLikeCard
    }
from '../components/createCards.js';

const placesList = document.querySelector('.places__list');

function clickImageCard(cardImage, cardTitle){
  const popupImageType = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  openModal(popupImageType);
  popupImage.src = cardImage.src;
  popupImage.setAttribute("alt", cardTitle.textContent);
  popupCaption.textContent = cardTitle.textContent;
};

//создаем карточку
function renderCard(item, method = "prepend") {
  placesList[ method ](createCard(
      item
    , removeCard
    , setLikeCard
    , clickImageCard
    )
  );
};

//вывод имеющихся карточек
initialCards.forEach(item => renderCard(item));

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

// Находим форму редактирования автора в DOM
const formElementEditProfile = document.forms["edit-profile"];
// Находим поля формы в DOM
const nameInputEditProfile = formElementEditProfile.elements.name;
const jobInputEditProfile = formElementEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//окно редактирования автора
popupEditButton.addEventListener('click', () => 
  {
    openModal(popupEditCard);
    //получение существующих значений
    nameInputEditProfile.value = profileTitle.textContent;
    jobInputEditProfile.value = profileDescription.textContent;
});

// Обработчик «отправки» формы
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value    
  const nameInputValue = nameInputEditProfile.value;
  const jobInputValue = jobInputEditProfile.value;
  
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  closeModal(popupEditCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

//окно создания новой карточки
popupOpenButtonNewCard.addEventListener('click', () => openModal(popupNewCard));

// Находим форму добавления нового места в DOM
const formNewPlace = document.forms["new-place"];
// Находим поля формы в DOM
const placeName = formNewPlace.elements["place-name"];
const placeUrl = formNewPlace.elements.link;

// Обработчик «отправки» формы
function newCardFormSubmit(evt) {
  evt.preventDefault();

  // добавление новой карточки
  renderCard ( {
    name: placeName.value,
    link: placeUrl.value
    }
  );
  //сброс значений и закрытие окна
  formNewPlace.reset();

  closeModal(popupNewCard);
};

// Прикрепляем обработчик к форме новой карточки
formNewPlace.addEventListener('submit', newCardFormSubmit);