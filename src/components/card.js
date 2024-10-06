export { initCard, createDeleteButton, delFunction, addLike }

// Функция создания карточки
function initCard(dataCard, delCard, addLike, openImg) {
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
  // const delBtn = cloneCard.querySelector(".card__delete-button");
  // delBtn.addEventListener("click", () => {
  //   delCard(cloneCard);
  // });

  // Лайк
  const like = cloneCard.querySelector(".card__like-button");
  like.addEventListener("click", (evt) => {
    addLike(evt.target)
  });

  // Открытие попапа с картинкой
  const imageCard = cloneCard.querySelector(".card__image");

  imageCard.addEventListener("click", function(e) {
    openImg(e.target);
  });
  return cloneCard;

};

// Функция удаления карточки
function delFunction(elem) {
  elem.remove();
}

// Функция добавления лайка
function addLike(elem) {
  elem.classList.toggle("card__like-button_is-active");
}



// Функция создания кнопки удаления карточки
function createDeleteButton(elem) {
  let button = document.createElement("button");
  button.className = elem;
  return button;
}