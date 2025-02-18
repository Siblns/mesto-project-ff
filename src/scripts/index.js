import '../pages/index.css';
import { closeModal, openModal } from '../components/modal.js';
import { getInitialCards
  , getUserProfile
  , createNewCard
  , editProfileAvatar 
  , setLikeCardApi
  , delLikeCard
  , editProfile
  , removeCard
} from './api.js';

import {clearValidation, enableValidation } from './validation.js';

import { 
    createCard, 
    setLikeCard
    }
from '../components/createCards.js';

const handleResponseError = (err) => {
    console.error(`error ${err.code}: ${err.error}`);
};

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
function renderCard(item, currentUser, method = "prepend") {
  placesList[ method ](createCard(
      item
    , currentUser
    , removeCard
    , setLikeCard
    , setLikeCardApi
    , delLikeCard
    , clickImageCard
    )
  );
};

//открытие, закрытие окна с добавлением
const popupOpenButtonNewCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupSaveButton = document.querySelector('.popup__button');

//выбираем все попапы и вешаем на них событие закрытия родителя
const popups = document.querySelectorAll('.popup__close');
for (const popup of popups) {
  popup.addEventListener('click', (evt) => {
    const popupOpenForm = evt.target.closest(".popup")
      closeModal(popupOpenForm);
      clearValidation(popupOpenForm
        , {
          inputSelector: '.popup__input',
          inputErrorClass: 'popup__input_type_error'
          }
        );
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

// Находим форму редактирования аватара автора в DOM
const formElementEditProfileAvatar = document.forms["edit-avatar"];
// Находим поля формы в DOM
const linkInputEditProfile = formElementEditProfileAvatar.elements.link;
const profileImage = document.querySelector('.profile__image');

//Получение информации о пользователе
Promise.all([getUserProfile(), getInitialCards()])
  .then(
  ([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    profileImage.setAttribute("alt", profile.name);  
    const currentUser = profile._id;
       
    cards.forEach(card => {
        renderCard(card, currentUser);
      }
    );
  })
  .catch(handleResponseError);

//окно редактирования аватара
profileImage.addEventListener('click', () => 
  {
    openModal(popupEditAvatar);

    const urlAvatar = profileImage.style.backgroundImage.slice(5, -2);;
    linkInputEditProfile.value = urlAvatar;
});

// Обработчик «отправки» формы редактирования аватара
function handleFormSubmitEditProfileAvatar(evt) {
  evt.preventDefault();
  popupSaveButton.textContent = 'Сохранение...';
  const avatar = document.querySelector('.popup__input_edit-avatar').value;
 
  editProfileAvatar({avatar: avatar})
    .then((data) => {
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch(handleResponseError)
    .finally(() => {
      popupSaveButton.textContent = 'Сохранить';
    }); 

  closeModal(popupEditAvatar);
};

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
  const nameInputEditProfileValue = nameInputEditProfile.value;
  const jobInputEditProfileValue = jobInputEditProfile.value;
  popupSaveButton.textContent = 'Сохранение...';

  editProfile({
    name: nameInputEditProfileValue,
    about: jobInputEditProfileValue
    })
    .catch(handleResponseError)
    .finally(() => {
      popupSaveButton.textContent = 'Сохранить';
    })
  ;

  // Вставьте новые значения
  profileTitle.textContent = nameInputEditProfileValue;
  profileDescription.textContent = jobInputEditProfileValue;

  closeModal(popupEditCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
formElementEditProfileAvatar.addEventListener('submit', handleFormSubmitEditProfileAvatar);

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

  createNewCard({
    name: placeName.value,
    link: placeUrl.value
    }
  )
  .then((data)=>{
    renderCard(data, data.owner._id);   
  })
  .catch(handleResponseError);
  
  //сброс значений и закрытие окна
  formNewPlace.reset();

  closeModal(popupNewCard);
};

// Прикрепляем обработчик к форме новой карточки
formNewPlace.addEventListener('submit', newCardFormSubmit);

//валидация форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 