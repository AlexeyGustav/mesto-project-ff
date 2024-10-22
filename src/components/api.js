import { formMestoName, formMestoLink, newCardData, idCardForDelete } from "../index.js"

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "8921ad05-b64f-4b7a-874c-7de7db1761f7",
    "Content-Type": "application/json"
  }
}

// Загрузка информации о пользователе с сервера
export const getInfoOnMe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Данные пользователя не загрузились: ${res.status}`);
  })
}

// Загрузка карточек
export const cardsFromServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Карточки не загрузились: ${res.status}`);
  })
}

// Загрузка новой карточки
export const loadNewCard = (newCardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCardData)
  })
}

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Обновление данных профиля
export const updateYourProfile = (obj) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(obj)
  });  
} 

// данные по базовому URL от сервера
export const responseBaseUrlFromServer = () => {
  return fetch(`${config.baseUrl}`, {
    method: "GET",
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Данные пользователя не загрузились: ${res.status}`);
  })
}

// Добавить лайк
export const addLikeFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Карточки не загрузились: ${res.status}`);
    });
}

// Удалить лайк
export const deleteLikeFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Карточки не загрузились: ${res.status}`);
  });
}