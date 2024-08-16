const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// Функция создания карточки
function initCard(dataCard, delCard) {
  // Темплейт карточки
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

function delFunction(elem) {
  elem.remove();
}
