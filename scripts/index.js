// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const templateCards = document.getElementById("card-template");
const containerCards = document.querySelector(".places__list");

function deleteCard(event) {
  const touch = event.target
  touch.offsetParent.remove();
}


function init() {
  for(let i = 0; i < initialCards.length; i++) {
    // клонируем содержимое тега template
    const cloneCards = templateCards.content.cloneNode(true);
    
    // наполняем содержимым
    cloneCards.querySelector(".card__image").src = initialCards[i].link;
    cloneCards.querySelector(".card__title").textContent = initialCards[i].name;

    containerCards.append(cloneCards);
  }

  // Функция удаления карточки

  const delBtns = document.querySelectorAll(".card__delete-button");
  console.log('delBtns: ', delBtns);

  delBtns.forEach(elem => {
    elem.addEventListener("click", (e) => {
      deleteCard(e);
    });
  });
};

init();


