import './styles/index.css';
import { initialCards } from "./components/cards.js";
import {initCard, delFunction, addLike} from "./components/card.js";
import { openPopup, closeModal } from "./components/modal.js";

export const placesList = document.querySelector(".places__list");
const edit = document.querySelector(".profile__edit-button");
const formEdit =  document.forms["edit-profile"];
const formEditName = formEdit.elements.name;
const formEditProffesion = formEdit.elements.description;
const personaName = document.querySelector(".profile__title");
const personaDescription = document.querySelector(".profile__description");
const buttonNewMesto = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

// форма редактирования профиля
const formElement = document.querySelectorAll(".popup__form");
const inputElement = document.querySelectorAll(".popup__input");
const popupError = document.querySelector(`.${inputElement.id}-error`);
const errorSpanProfileModal = document.querySelectorAll(".profile-modal");

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("popup__input_error");
  errorElement.classList.add("popup__input-error_active");
  errorElement.textContent = errorMessage;
}  

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove("popup__input_error");
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = "";
}

const isVaild = (formElement, inputElement) => {

  // console.log(inputElement.validity);

  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  };

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  // Функция принимает массив полей
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if(hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
  };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector('.popup__button');
  
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);
  console.log("inputList", inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isVaild(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll("form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// добавление карточки
const formMesto = document.forms["new-place"];
const formMestoName = formMesto.elements["place-name"];
const formMestoLink = formMesto.elements.link;

const popups = document.querySelectorAll('.popup');

// Вывод карточек на страницу

function initCards() {
  for (let index = 0; index < initialCards.length; index++) {
    placesList.append(initCard(initialCards[index], delFunction, addLike, popupImg));
  }
}
initCards();


// отчистка полей формы от ошибок
function clearProfileModal(errorSpan, errorInput) {
  errorSpan.forEach(item => {
    item.textContent = "";
    item.classList.remove('popup__input-error_active');
  })
  errorInput.forEach(item => {
    item.classList.remove("popup__input_error");
  })
};

// открыть, закрыть модальные окна
function openProfileModal() {
  openPopup(popupTypeEdit);
  formEditName.value = personaName.textContent;
  formEditProffesion.value = personaDescription.textContent;

  enableValidation(); 
};

edit.addEventListener("click", function() {
  openProfileModal();
  clearProfileModal(errorSpanProfileModal, inputElement);
});

buttonNewMesto.addEventListener("click", function() {
  openPopup(document.querySelector(".popup_type_new-card"));
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeModal(popup);
      }
  });
}); 

// добавление данных в формы
function addTextinForm(editNameValue, editProffesionValue) {
  personaName.textContent = editNameValue;
  personaDescription.textContent = editProffesionValue;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  addTextinForm(formEditName.value, formEditProffesion.value);
  closeModal(popupTypeEdit);
}

// форма редактирования профиля
formEdit.addEventListener('submit', handleProfileFormSubmit); 

// форма добавления карточки
formMesto.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const mestoName = formMestoName.value;
  const mestoLink = formMestoLink.value;
  const arrCards = {
    name: mestoName,
    link: mestoLink,
  };

  formMestoName.value = "";
  formMestoLink.value = "";
  closeModal(document.querySelector(".popup_type_new-card"));
  placesList.prepend(initCard(arrCards, delFunction, addLike, popupImg));
}); 

// Функция попапа с картинкой
export function popupImg(e) { 
  openPopup(document.querySelector(".popup_type_image"));
  const imageModal = document.querySelector(".popup__image");
  
  imageModal.src = e.src;
  imageModal.alt = e.alt;
  document.querySelector(".popup__caption").textContent = imageModal.alt
}

