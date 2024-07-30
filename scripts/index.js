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


const templateCard = document.getElementById("card-template").content;
const containerCards = document.querySelector(".places__list");


function init(dataCard, delCard) {
  // Темплейт карточки
  const cloneCard = templateCard.cloneNode(true);
  let cardImage = cloneCard.querySelector(".card__image");

  // карточка которую мы будем удалять (не шаблон)
  let placesItem = cloneCard.querySelector(".places__item");

  // наполнение карточки данными
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cloneCard.querySelector(".card__title").textContent = dataCard.name;

  // удаление карточки
  const delBtn = cloneCard.querySelector(".card__delete-button");
  delBtn.addEventListener("click", () => {
    delCard(placesItem);
  });

  return cloneCard;

};

// @todo: Вывести карточки на страницу

function initCards() {
  for (let index = 0; index < initialCards.length; index++) {
    containerCards.append(init(initialCards[index], delFunction));
  }
}
initCards();


// @todo: Функция удаления карточки

function delFunction(elem) {
  elem.remove();
}



