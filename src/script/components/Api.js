export default class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Загружаем данные пользователя
  getUserData() {
    const request = `${this._url}/users/me`;
    return fetch(request,
      {
        headers: this._headers
      })
      .then((res) => this._checkStatus(res))
  }

  // Обновляем данные профиля
  setUserInfo(userData) {
    const request = `${this._url}/users/me`;
    return fetch(request,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userData.youName,
          about: userData.youJob
        })
      })
      .then((res) => this._checkStatus(res))
  }

  // Получаем данные всех карточек
  getInitialCards() {
    const request = `${this._url}/cards`;
    return fetch(request,
      {
        headers: this._headers
      })
      .then((res) => this._checkStatus(res))
  }

  // Загружаем свою карточку
  setCard(cardData) {
    const request = `${this._url}/cards`;
    return fetch(request,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.pictureName,
          link: cardData.pictureLink
        })
      })
      .then((res) => this._checkStatus(res))
  }

  // Устанавливаем лайк на карточке
  setCardLike(cardID) {
    const request = `${this._url}/cards/${cardID}/likes`;
    return fetch(request,
      {
        method: "PUT",
        headers: this._headers
      })
      .then((res) => this._checkStatus(res))
  }

  // Удаляем лайк с карточки
  getCardDeleteLike(cardID) {
    const request = `${this._url}/cards/${cardID}/likes`;
    return fetch(request,
      {
        method: "DELETE",
        headers: this._headers
      })
      .then((res) => this._checkStatus(res))
  }

  // Удаляем карточку
  getRemoveCard(cardId) {
    const request = `${this._url}/cards/${cardId}`;
    return fetch(request,
      {
        method: "DELETE",
        headers: this._headers
      })
      .then((res) => this._checkStatus(res))
  }

  // Обновляем аватар пользователя
  getUpdateAvatar(avatar) {
    const request = `${this._url}/users/me/avatar`;
    return fetch(request,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar.avatarLink,
        })
      })
      .then((res) => this._checkStatus(res))
  }
}
