import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__field'));
    this._formPopup = this._popupSelector.querySelector('.popup__form');
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
      this._handlerFormSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._formPopup.reset();

    super.close();
  }
}
