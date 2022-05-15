import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._formPopup = this._popupSelector.querySelector('.popup__form');
  }

  getDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getDeletedCardData(card, cardID) {
    this._cardElement = card;
    this._cardID = cardID;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._cardID);
      super.close();
    });

    super.setEventListeners();
  }
}
