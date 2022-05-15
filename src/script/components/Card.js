export default class Card {
  constructor(data, userID, cardSelector, handlerCardClick, handlerLikeClick, handlerDeleteCard) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handlerCardClick = handlerCardClick;
    this._handlerLikeClick = handlerLikeClick;
    this._handlerDeleteCard = handlerDeleteCard;
    this._userID = userID;
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
    this._photosLikesCount = this._element.querySelector('.photos__count');
    this._photosLikesCount.textContent = this._data.likes.length;
    this._photosDeleteButton = this._element.querySelector('.photos__delete');
    this._photosImage.src = this._data.link;
    this._photosImage.alt = this._data.name;
    this._photosTitle.textContent = this._data.name;
    this._haveLike(this._data.likes);
    this._setOwner(this._data.owner._id);

    this._setEventListeners();
    return this._element;
  };

  isLiked() {
    return this._photosLikeButton.classList.contains('photos__like_active');
  }

  getLikesReload(likes) {
    this._photosLikesCount.textContent = likes;
  }

  _setEventListeners() {
    this._photosLikeButton.addEventListener('click', () => {
      this._handlerLikeClick();
      this._handleLikePhoto();
    });
    this._photosDeleteButton.addEventListener('click', () => {
      this._handlerDeleteCard(this._element, this._data._id);
    });
    this._photosImage.addEventListener('click', () => {
      this._handlerCardClick(this._data.name, this._data.link);
    });
  }

  _handleLikePhoto() {
    this._photosLikeButton.classList.toggle('photos__like_active');
  };

  _haveLike(likes) {
    likes.forEach((item) => {
      if (item._id === this._userID) {
        this._photosLikeButton.classList.add('photos__like_active');
      }
    })
  }

  _setOwner(owner) {
    if (owner !== this._userID) {
      this._photosDeleteButton.remove();
    }
  }
}
