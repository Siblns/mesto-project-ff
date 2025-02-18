// включение валидации вызовом enableValidation
// все настройки передаются при вызове
/*
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
*/

const showValidationError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);

  if (inputElement.validity.patternMismatch) {
    errorElement.textContent=inputElement.dataset.errorMessage;
    } 
    else if(inputElement.value.length===0) {
      errorElement.textContent="Вы пропустили это поле.";
    }
    else if(inputElement.type==="url") {
      errorElement.textContent="Введите адрес сайта.";
    }
    else {
      errorElement.textContent = errorMessage;
  }

  errorElement.classList.add(config.errorClass);
};

const hideValidationError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

export const clearValidation = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  inputList.forEach((inputElement) => {
      hideValidationError(formElement, inputElement, config);
    });
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showValidationError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideValidationError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {  
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  };

//кнопка активности должна быть активной при открытии
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)){
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
    };
  };

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const validationElements = document.querySelectorAll(config.formSelector);

    validationElements.forEach((validationElement) => {
      setEventListeners(validationElement, config);
    }); 
};
