function showInputError(Config, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(Config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(Config, formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(Config.inputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(Config, form, input) {
  if (!input.validity.valid) {
    showInputError(Config, form, input, input.validationMessage);
  } else {
    hideInputError(Config, form, input);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(Config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(Config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(Config.inactiveButtonClass);
  }
}

function setEventListeners(Config, form) {
  const inputList = Array.from(form.querySelectorAll(Config.inputSelector));
  const buttonElement = form.querySelector(Config.submitButtonSelector);
  toggleButtonState(Config, inputList, buttonElement);

  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(Config, form, input);
      toggleButtonState(Config, inputList, buttonElement);
    });
  });
}

function enableValidation(Config) {
  const formList = Array.from(document.querySelectorAll(Config.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(Config, form);
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".form__btn-submit",
  inactiveButtonClass: "btn_inactive",
  inputErrorClass: "input_type_error",
});
