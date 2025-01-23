function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")){
    closeModal(evt.target);
   };
 };

function closePopupEsc(evt) {
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
   }
 };
 
//закрываем попапы и всех слушателей которые добавились при открытии
export function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
};

//добавляем класс и анимацию при открытии попапа
export function openModal (popup) {
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
};