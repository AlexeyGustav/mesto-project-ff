import './styles/index.css';
import { initialCards } from "./components/cards.js";
import {initCard, delFunction, addLike, createDeleteButton, cloneCard, cardImage } from "./components/card.js";
import { enableValidation, clearEdit, clearAddMesto } from "./components/validation.js";
import { openPopup, closeModal } from "./components/modal.js";
import { userMe, cardsFromServer, loadNewCard } from "./components/api.js";

export const placesList = document.querySelector(".places__list");
const edit = document.querySelector(".profile__edit-button");
const formEdit =  document.forms["edit-profile"];
export const formEditName = formEdit.elements.name;
export const formEditProffesion = formEdit.elements.description;
const personaName = document.querySelector(".profile__title");
const personaDescription = document.querySelector(".profile__description");
const buttonNewMesto = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const avatar = document.querySelector(".profile__image");

// добавление карточки
const formMesto = document.forms["new-place"];
export const formMestoName = formMesto.elements["place-name"];
export const formMestoLink = formMesto.elements.link;

const popups = document.querySelectorAll('.popup');

// загрузка контента на страницу
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов!')
  userMe().then((data) => {
    personaName.innerHTML = data.name;
    personaDescription.innerHTML = data.about;
    avatar.style.backgroundImage = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

  const promises = [userMe, cardsFromServer];
  Promise.all(promises)
    .then((results) => {
      console.log("results", results);

      // Вывод карточек на страницу
      cardsFromServer().then((cards) => {
        for (let index = 0; index < cards.length; index++) {
          placesList.append(initCard(cards[index], addLike, popupImg));
        };
      })
        .catch((err) => {
          console.log('Ошибка. ( Загрузка карточек ). Запрос не выполнен');
        });
    })
    .catch((err) => {
      console.log('Ошибка. Promise.all не загрузился');
    }); 

})


enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonElement: ".popup__button",
  popupButtonDisabled: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

// enableValidation();

// открыть, закрыть модальные окна

// модальное окно (Профиль)
function openProfileModal() {
  openPopup(popupTypeEdit);

  userMe().then((data) => {
    console.log(data);
    formEditName.value = data.name;
    formEditProffesion.value = data.about;
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен");
  }); 

  // formEditName.value = personaName.textContent;
  // formEditProffesion.value = personaDescription.textContent;
};

// модальное окно (Новое место)
edit.addEventListener("click", function() {
  openProfileModal();
  clearEdit(formEdit);
});

buttonNewMesto.addEventListener("click", function() {
  openPopup(document.querySelector(".popup_type_new-card"));
  clearAddMesto(formMesto);
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

// добавление данных в форму (редактирование профиля)
function addTextinForm(editNameValue, editProffesionValue) {
  personaName.textContent = editNameValue;
  personaDescription.textContent = editProffesionValue;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-24/users/me", {
    method: "PATCH",
    headers: {
      authorization: "8921ad05-b64f-4b7a-874c-7de7db1761f7",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: formEditName.value,
      about: formEditProffesion.value
    })
  }); 

  addTextinForm(formEditName.value, formEditProffesion.value);
  closeModal(popupTypeEdit);
}

formEdit.addEventListener('submit', handleProfileFormSubmit); 

// форма добавления новой карточки

formMesto.addEventListener('submit', function(evt) {
  evt.preventDefault();
  
  loadNewCard().then((response) => response.json())
  .then((card) => 
    placesList.prepend(initCard(card, addLike, popupImg))
  );
 
  placesList.firstElementChild.prepend(createDeleteButton("card__delete-button"));

  closeModal(document.querySelector(".popup_type_new-card"));
}); 

// Функция попапа с картинкой
export function popupImg(e) { 
  openPopup(document.querySelector(".popup_type_image"));
  const imageModal = document.querySelector(".popup__image");
  
  imageModal.src = e.src;
  imageModal.alt = e.alt;
  document.querySelector(".popup__caption").textContent = imageModal.alt
}



// Информация о карточках
// cardsFromServer().then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log('Ошибка. Запрос не выполнен');
// }); 


