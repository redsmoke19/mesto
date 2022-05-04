export default class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
  };

  _getErrorElement(inputElement) {
    return inputElement.nextElementSibling;
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._obj.inputErrorClass);
    this._errorElement.classList.add(this._obj.errorClass);
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElement) {
    this._errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._obj.inputErrorClass);
    this._errorElement.classList.remove(this._obj.errorClass);
    this._errorElement.textContent = '';
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._obj.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'true');
    } else {
      buttonElement.classList.remove(this._obj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._obj.submitButtonSelector);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  resetValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners(this._obj, this._formElement);
  };
}
