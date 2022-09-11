export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._handleEventListeners();
  }

  _handleEventListeners() {
    const buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState(buttonElement);

    this._inputList.forEach((input) => {
      input.addEventListener("input", ()=> {
        this._checkInputValidity(input);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  _toggleButtonState(buttonElement) {
    if (this._hasInvalidInput()) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }
}
