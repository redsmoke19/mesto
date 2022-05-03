export default class Card {
  constructor(data, cardSelector, handlerCardClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handlerCardClick = handlerCardClick;
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.photos__item').cloneNode(true);
    return this._cardElement;
  }

  createCard = () => {
    this._element = this._getTemplate();
    this._photosImage = this._element.querySelector('.photos__img');
    this._photosTitle = this._element.querySelector('.photos__title');
    this._photosLikeButton = this._element.querySelector('.photos__like');
    this._photosDeleteButton = this._element.querySelector('.photos__delete');
    this._photosImage.src = this._data.link;
    this._photosImage.alt = this._data.name;
    this._photosTitle.textContent = this._data.name;

    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._photosLikeButton.addEventListener('click', () => {
      this._handleLikePhoto();
    });
    this._photosDeleteButton.addEventListener('click', () => {
      this._handleDeletePhoto();
    });
    this._photosImage.addEventListener('click', () => {
      this._handlerCardClick(this._data.name, this._data.link);
    });
  }

  _handleLikePhoto() {
    this._photosLikeButton.classList.toggle('photos__like_active');
  };

  _handleDeletePhoto() {
    this._element.remove();
  }
}
