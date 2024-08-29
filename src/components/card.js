import { initialCards } from "./cards.js";
import placesList from "./index.js";

import { closeModal } from "./modal.js";

// Функция создания карточки
export function initCard(dataCard, delCard) {
  // Темплейт карточки
  const templateCard = document.getElementById("card-template").content;
  const placesItem = templateCard.querySelector(".places__item");
  const cloneCard = placesItem.cloneNode(true);
  const cardImage = cloneCard.querySelector(".card__image");

  // наполнение карточки данными
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cloneCard.querySelector(".card__title").textContent = dataCard.name;

  // удаление карточки
  const delBtn = cloneCard.querySelector(".card__delete-button");
  delBtn.addEventListener("click", () => {
    delCard(cloneCard);
  });

  return cloneCard;

};

// Функция удаления карточки

export function delFunction(elem) {
  elem.remove();
}



