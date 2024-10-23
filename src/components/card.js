export { initCard }
import { openPopup, closeModal } from "./modal.js";

// Функция создания карточки
function initCard(dataCard, delCard, openImg, id, yourId, addLike, callBackDeleteBtn, deleteBtn) {
  // Темплейт карточки
  const templateCard = document.getElementById("card-template").content;
  const placesItem = templateCard.querySelector(".places__item");
  const cloneCard = placesItem.cloneNode(true);
  const cardImage = cloneCard.querySelector(".card__image");


  // Наполнение карточки данными
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cloneCard.querySelector(".card__title").textContent = dataCard.name;

  // Удаление карточки
  let delBtn = cloneCard.querySelector(".card__delete-button");
  if (id !== yourId) {
    delBtn.remove()
  }

  // const delBtn = cloneCard.querySelector(".card__delete-button");
  // delBtn.addEventListener("click", () => {
  //   delCard(cloneCard);
  // });

  delBtn.addEventListener("click", () => {
    openPopup(document.querySelector(".popup_type_delete"));
    const deleteOkCard = document.querySelector(".popup__ok");
    deleteOkCard.addEventListener("click", function () {

      delCard(dataCard._id);
      cloneCard.remove();

      closeModal(document.querySelector(".popup_type_delete"));
    })
  });

  // Лайк
  const like = cloneCard.querySelector(".card__like-button");
  const numlike = cloneCard.querySelector(".card__like-text");

  numlike.textContent = dataCard.likes.length;
  if(dataCard.likes.length === 0) {
    numlike.textContent = null
  };

  like.addEventListener("click", (evt) => {
    addLike(evt.target, cloneCard.querySelector(".card__like-text"), dataCard); 
  });

  // colorLikebtn(like);

    const arrayLikes =  dataCard.likes;
    arrayLikes.forEach(index => {
      if (index._id == id) {
        like.classList.add("card__like-button_is-active");
      }
    })
  

  // Открытие попапа с картинкой
  const imageCard = cloneCard.querySelector(".card__image");
  imageCard.addEventListener("click", function (e) {
    openImg(e.target);
  });

  return cloneCard;
};

// Функция добавления лайкa

export function checkLikeBtn(buttonLike) {
  buttonLike.classList.toggle("card__like-button_is-active");
}

export function activeLikeBtn(arrayLikes, myIdinCard, btnLike) {
  arrayLikes.forEach(index => {
    if (arrayLikes == myIdinCard) {
      btnLike.classList.add("card__like-button_is-active");
    }
  })
}

export function colorBtnLike(arrayCards, colorBtnLike) {
  const arrayLikes = arrayCards[index].likes;
  arrayLikes.forEach(index => {
    if (index._id == myIdFromServer) {
      colorBtnLike.classList.add("card__like-button_is-active");
    }
  })
}