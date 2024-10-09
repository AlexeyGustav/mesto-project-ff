import { formMestoName, formMestoLink } from "../index.js"

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "8921ad05-b64f-4b7a-874c-7de7db1761f7",
    "Content-Type": "application/json"
  }
}

// Загрузка информации о пользователе с сервера
export const userMe = () => {
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
export const loadNewCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: formMestoName.value,
      link: formMestoLink.value,
    })
  })
}