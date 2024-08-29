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






