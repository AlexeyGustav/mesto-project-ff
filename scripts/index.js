// Version 1
// const templateCard = document.getElementById("card-template").content;
// const containerCards = document.querySelector(".places__list");

// function deleteCard(event) {
//   const touch = event.target
//   touch.offsetParent.remove();
// }


// function init() {
//   for(let i = 0; i < initialCards.length; i++) {
//     клонируем содержимое тега template
//     const cloneCard = templateCard.cloneNode(true);
    
//     наполняем содержимым
//     cloneCard.querySelector(".card__image").src = initialCards[i].link;
//     cloneCard.querySelector(".card__image").alt = initialCards[i].name;
//     cloneCard.querySelector(".card__title").textContent = initialCards[i].name;

//     containerCards.append(cloneCard);
//   }

//   Функция удаления карточки

//   const delBtns = document.querySelectorAll(".card__delete-button");
//   console.log('delBtns: ', delBtns);

//   delBtns.forEach(elem => {
//     elem.addEventListener("click", (e) => {
//       deleteCard(e);
//     });
//   });
// };

// init();

// Version 2
const templateCard = document.getElementById("card-template").content;
const placesList = document.querySelector(".places__list");


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

// Вывод карточек на страницу

function initCards() {
  for (let index = 0; index < initialCards.length; index++) {
    placesList.append(initCard(initialCards[index], delFunction));
  }
}
initCards();


// Функция удаления карточки

function delFunction(elem) {
  elem.remove();
}



