'use strict';

//Получение информации из сервера
export default class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token
  }
  //Получения карточек из сервера
  loadData() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка при загрузке из сервера ${this.url}: ${res.status}`);
      })
      .catch(err => console.log(err))
  }
  //Получение информации о профиле из сервера
  loadUser() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка при получении информации о профиле из сервера: ${res.status}`);
      })
}
  //Сохранение на сервере отредактированного профиля
  saveProfile(saveName, saveInfo) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: saveName,
        about: saveInfo
      })
    })
      .then((res) => {
      if (res.ok) {
          return res.json();
      }
          return Promise.reject(`Ошибка при редактировании профиля: ${res.status}`);
      })
      .catch(err => console.log(err))
  }
  //Добавление новой карточки
  saveNewCard(nameCard, nameLink) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameCard,
        link: nameLink
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка при добавлении новой карточки: ${res.status}`);
    })
    .catch(err => console.log(err))
  }
  //Удаление карточки из сервера
  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
      })
      .catch(err => console.log(err))
  }
  
  //Постановка лайка
  likeCard(cardId) {
    return fetch(`${this.url}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка при добавлении лайка: ${res.status}`);
    })
    .catch(err => console.log(err))
  }

  //Удаление лайка
  deleteLikeCard(cardId) {
    return fetch(`${this.url}/cards/like/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка при удалении лайка: ${res.status}`);
    })
    .catch(err => console.log(err))
  }
  
  //Обновление аватара
  changeAvatar(newAvatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      avatar: newAvatar
      })
    })
      .then((res) => {
      if (res.ok) {
          return res.json();
      }
          return Promise.reject(`Ошибка при редактировании профиля: ${res.status}`);
      })
      .catch(err => console.log(err))
  }
}