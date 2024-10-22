import './styles/index.css';
import { initialCards } from "./components/cards.js";
import { initCard, delFunction, createDeleteButton, cloneCard, cardImage, colorBtnLike, checkLikeBtn, setDeleteBtn } from "./components/card.js";
import { enableValidation, clearEdit, clearAddMesto } from "./components/validation.js";
import { openPopup, closeModal } from "./components/modal.js";
import { getInfoOnMe, cardsFromServer, loadNewCard, deleteCard, updateYourProfile, addLikeFromServer, deleteLikeFromServer } from "./components/api.js";

export const placesList = document.querySelector(".places__list");
const edit = document.querySelector(".profile__edit-button");
const formEdit = document.forms["edit-profile"];
export const formEditName = formEdit.elements.name;
export const formEditProffesion = formEdit.elements.description;
const personaName = document.querySelector(".profile__title");
const personaDescription = document.querySelector(".profile__description");
const buttonNewMesto = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const avatar = document.querySelector(".profile__image");

// добавление карточки
const formMesto = document.forms["new-place"];
export const formMestoName = formMesto.elements["place-name"];
export const formMestoLink = formMesto.elements.link;

const popups = document.querySelectorAll('.popup');
let yourId = "";



// загрузка контента от сервера на страницу
const promises = [getInfoOnMe(), cardsFromServer()];
Promise.all(promises)
  .then(([getUserData, allCards]) => {
    console.log('getUserData: ', getUserData, allCards);



    // Информация о профиле
    yourId = getUserData._id;
    renderInfoOnMe(getUserData);

    // Вывод карточек на страницу
    renderCards(allCards, yourId);

  })
  .catch((err) => {
    console.log('Ошибка. Promise.all не загрузился', err);
  });


function renderCards(arrayCards, myIdFromServer) {

  for (let index = 0; index < arrayCards.length; index++) {
    placesList.append(
      initCard(
        arrayCards[index], deleteCard, popupImg, myIdFromServer, arrayCards[index].owner._id, initLikefromCard,


        // function(colorBtnLike) {
        //   const arrayLikes = arrayCards[index].likes;
        //   arrayLikes.forEach(index => {
        //     if (index._id == myIdFromServer) {
        //       colorBtnLike.classList.add("card__like-button_is-active");
        //     }
        //   })
        // }
        
      )
    );
  };
}

// функция создания лайка
const initLikefromCard = (buttonLike, textNumlike, dataCard) => {
    checkLikeBtn(buttonLike)
    if (buttonLike.classList.contains("card__like-button_is-active")) {
      addLikeFromServer(dataCard._id)
      .then((data) => {
        console.log('data: ', "true", data);
        console.log('dataCard: ', data.likes.length);
        textNumlike.textContent = data.likes.length;
      })
      .catch(err => {
        console.log(`Лайк не добавлен ${err}`);
      })
    } else {
      deleteLikeFromServer(dataCard._id)
      .then((data) => {
        console.log('data: ', "false", data);
        console.log('dataCard: ', data.likes.length);
        textNumlike.textContent = data.likes.length;
        if(data.likes.length === 0) {
          textNumlike.textContent = null
        };
      })
      .catch(err => {
        console.log(`Лайк не удалился ${err}`);
      })
    }
}


// Валидация
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonElement: ".popup__button",
  popupButtonDisabled: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

// enableValidation();

// открыть, закрыть модальные окна

// модальное окно (Профиль)
function openProfileModal() {
  openPopup(popupTypeEdit);

  getInfoOnMe().then((data) => {
    console.log(data);
    formEditName.value = data.name;
    formEditProffesion.value = data.about;
  })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    });

};

// модальное окно (Новое место)
edit.addEventListener("click", function () {
  openProfileModal();
  clearEdit(formEdit);
});

buttonNewMesto.addEventListener("click", function () {
  openPopup(document.querySelector(".popup_type_new-card"));
  clearAddMesto(formMesto);
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});

// добавление данных в форму (редактирование профиля)
function addTextinForm(editNameValue, editProffesionValue) {
  personaName.textContent = editNameValue;
  personaDescription.textContent = editProffesionValue;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const dataProfile = {
    name: formEditName.value,
    about: formEditProffesion.value
  };

  updateYourProfile(dataProfile);

  addTextinForm(formEditName.value, formEditProffesion.value);
  closeModal(popupTypeEdit);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);

function renderInfoOnMe(obj) {
  personaName.textContent = obj.name;
  personaDescription.textContent = obj.about;
  avatar.style.backgroundImage = obj.avatar;
}



// форма добавления новой карточки
formMesto.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const newCardData = {
    name: formMestoName.value,
    link: formMestoLink.value,
  }

  loadNewCard(newCardData).then((response) => response.json())
    .then((card) =>
      placesList.prepend(
        initCard(
          card, deleteCard, popupImg, yourId, card.owner._id, initLikefromCard,
        )),
    )
  closeModal(document.querySelector(".popup_type_new-card"));
});

// Функция попапа с картинкой
export function popupImg(e) {
  openPopup(document.querySelector(".popup_type_image"));
  const imageModal = document.querySelector(".popup__image");

  imageModal.src = e.src;
  imageModal.alt = e.alt;
  document.querySelector(".popup__caption").textContent = imageModal.alt
}



