import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__field'));
    this._formPopup = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._popupSelector.querySelector('.popup__submit');
    this._subtitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formFields = {};

    this._inputList.forEach(input => {
      this._formFields[input.name] = input.value;
    });

    return this._formFields;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.getLoadingText('Сохранение...');
      this._handlerFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    this._formPopup.reset();

    super.close();
  }

  getLoadingText(text) {
    this._submitButton.textContent = text;
  }
}
