import './styles/index.css';
import { initCard, colorItBtn } from "./components/card.js";
import { enableValidation, clearEdit, clearAddMesto, clearAvatar, clearInputForms, validationConfig, clearErrorsForm } from "./components/validation.js";
import { openPopup, closeModal } from "./components/modal.js";
import { getInfoOnMe, cardsFromServer, loadNewCard, deleteCard, updateYourProfile, addLikeFromServer, deleteLikeFromServer, updatingUserAvatar } from "./components/api.js";

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
const submitButton = document.querySelector(".popup__button");


// добавление карточки
const formMesto = document.forms["new-place"];
export const formMestoName = formMesto.elements["place-name"];
export const formMestoLink = formMesto.elements.link;

// Добавление аватара
const formAvatar = document.forms["new-avatar"];
console.log('formAvatar: ', formAvatar);
export const formAvatarName = formAvatar.elements["avatar-new"];

const popups = document.querySelectorAll('.popup');
let yourId = "";
let cardIdForDelete;
let cardElementForDelete;


// загрузка контента от сервера на страницу
const promises = [getInfoOnMe(), cardsFromServer()];
Promise.all(promises)
  .then(([getUserData, allCards]) => {
    console.log('getUserData: ', getUserData, allCards);

    // Информация о профиле
    yourId = getUserData._id;
    renderInfoOnMe(getUserData);

    formEditName.value = getUserData.name;
    formEditProffesion.value = getUserData.about;

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
        arrayCards[index], popupImg, deleteCardonList, myIdFromServer, arrayCards[index].owner._id, initLikefromCard,     
      )
    );
  };
}


// Функция удаления карточки
function deleteCardonList(cardId, cardElement) {
  cardIdForDelete = cardId;
  cardElementForDelete = cardElement;
  openPopup(".popup_type_delete");
}

document.querySelector(".popup__ok").addEventListener("click", function () {
  deleteCard(cardIdForDelete)
  .then(() => {
    cardElementForDelete.remove();
  })
  .catch(err => {
    console.log(`Карточка не удалена ${err}`);
  })

  closeModal(document.querySelector(".popup_type_delete"));
})


// функция создания лайка
const initLikefromCard = (buttonLike, textNumlike, dataCard) => {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    deleteLikeFromServer(dataCard._id)

      .then((data) => {
        buttonLike.classList.remove("card__like-button_is-active");
        textNumlike.textContent = data.likes.length;
        if (data.likes.length === 0) {
          textNumlike.textContent = null
        };
      })
      .catch(err => {
        console.log(`Лайк не добавлен ${err}`);
      })
  } else {
    addLikeFromServer(dataCard._id)

      .then((data) => {
        buttonLike.classList.add("card__like-button_is-active");
        textNumlike.textContent = data.likes.length;
      })
      .catch(err => {
        console.log(`Лайк не удалился ${err}`);
      })
  }
}

// Валидация
enableValidation(validationConfig);


// Oткрыть модальное окно обновить аватар
avatar.addEventListener("click", function () {
  openPopup(".popup_type_new-avatar");
  clearAvatar(formAvatar);
  formAvatar.reset();
});

// Oткрыть модальное окно (Профиль)
edit.addEventListener("click", function () {
  openPopup(".popup_type_edit");
  clearEdit(formEdit);
});

// Oткрыть модальное окно (Новое место)
buttonNewMesto.addEventListener("click", function () {
  openPopup(".popup_type_new-card");
  
  formMesto.reset()
  clearAddMesto(formMesto);
});

formAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const avatarObj = {
    avatar: formAvatarName.value,
  }

  submitButton.textContent = 'Сохранение...';

  updatingUserAvatar(avatarObj)
    .then((res) => {
      renderInfoOnMe(res)
      closeModal(document.querySelector(".popup_type_new-avatar"));
    })
    .catch(err => {
      console.log(err);
    })
})


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

  submitButton.textContent = 'Сохранение...';
  updateYourProfile(dataProfile)
    .then(() => {

      addTextinForm(formEditName.value, formEditProffesion.value);
    })
    .finally(() => {
      
      submitButton.textContent = 'Сохранить';
    });
    closeModal(popupTypeEdit);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);

function renderInfoOnMe(obj) {
  personaName.textContent = obj.name;
  personaDescription.textContent = obj.about;
  avatar.style.backgroundImage = `url(${obj.avatar})`;
}


// форма добавления новой карточки
formMesto.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const newCardData = {
    name: formMestoName.value,
    link: formMestoLink.value,
  }

  submitButton.textContent = 'Сохранение...';

  loadNewCard(newCardData)
    .then((card) =>
      placesList.prepend(
        initCard(
          card, popupImg, deleteCardonList, yourId, card.owner._id, initLikefromCard,
        )),
      closeModal(document.querySelector(".popup_type_new-card")),
      
    ).finally(() => {
      
      submitButton.textContent = 'Сохранить';
    });

});


// Функция попапа с картинкой
export function popupImg(e) {
  openPopup(".popup_type_image");
  const imageModal = document.querySelector(".popup__image");

  imageModal.src = e.src;
  imageModal.alt = e.alt;
  document.querySelector(".popup__caption").textContent = imageModal.alt
}



