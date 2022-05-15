import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._formPopup = this._popupSelector.querySelector('.popup__form');
  }

  changeSubmitHandler(submitHandler) {
    this._handlerFormSubmit = submitHandler;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit();
    });

    super.setEventListeners();
  }
}


