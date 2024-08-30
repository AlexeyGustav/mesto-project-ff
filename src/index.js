import './styles/index.css';
import { initialCards } from "./components/cards.js";
import {initCard, delFunction, addLike, poupupImg} from "./components/card.js";
import { openModal, closeModal, openModalNewMesto, handleFormSubmit } from "./components/modal.js";

export const placesList = document.querySelector(".places__list");
const edit = document.querySelector(".profile__edit-button");
const closeEdit = document.querySelectorAll(".popup__close");
const formEdit =  document.forms["edit-profile"];
export const formEditName = formEdit.elements.name;
export const formEditProffesion = formEdit.elements.description;
export const personaName = document.querySelector(".profile__title");
export const personaDescription = document.querySelector(".profile__description");
const buttonNewMesto = document.querySelector(".profile__add-button");

// добавление карточки
const formMesto = document.forms["new-place"];
const formMestoName = formMesto.elements["place-name"];
const formMestoLink = formMesto.elements.link;

export const overlay = document.querySelectorAll(".popup");


// Вывод карточек на страницу

export function initCards() {
  for (let index = 0; index < initialCards.length; index++) {
    placesList.append(initCard(initialCards[index], delFunction, addLike, poupupImg));
  }
}
initCards();

// открыть, закрыть модальные окна

edit.addEventListener("click", openModal);
buttonNewMesto.addEventListener("click", openModalNewMesto);
closeEdit.forEach(item => {
  item.addEventListener("click", closeModal);
});

overlay.forEach(item => {
  item.addEventListener("click", function(e) {
    if(e.target.classList.contains("popup")) {
      closeModal(item)
    }
  });
});

document.addEventListener("keydown", function(e) {
  if(e.key === "Escape") {
    closeModal()
  };
});

// добавление данных в формы
formEdit.addEventListener('submit', handleFormSubmit); 
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
  closeModal();
  placesList.prepend(initCard(arrCards, delFunction, addLike, poupupImg));
}); 

