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


// добавление карточки
const formMesto = document.forms["new-place"];
const formMestoName = formMesto.elements["place-name"];
const formMestoLink = formMesto.elements.link;

const popups = document.querySelectorAll('.popup');

// Вывод карточек на страницу

export function initCards() {
  for (let index = 0; index < initialCards.length; index++) {
    placesList.append(initCard(initialCards[index], delFunction, addLike, popupImg));
  }
}
initCards();

// открыть, закрыть модальные окна
function openProfileModal() {
  openPopup(document.querySelector(".popup_type_edit"))
  formEditName.value = personaName.textContent;
  formEditProffesion.value = personaDescription.textContent;
}

edit.addEventListener("click", openProfileModal);
buttonNewMesto.addEventListener("click", function() {
  openPopup(document.querySelector(".popup_type_new-card"))
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close")
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
})

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
  closeModal(document.querySelector(".popup_type_edit"));
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

