import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, title, nombrePlacehold, textoPlacehold}, info, submitCallback) {
    super({ popupSelector }, info);
    this._formTitle = this._elem.querySelector(info.title);
    this._inputName = this._elem.querySelector(info.inputName);
    this._inputText = this._elem.querySelector(info.inputText);

    this._formTitle.textContent = title;
    this._inputName.placeholder = nombrePlacehold;
    this._inputText.placeholder = textoPlacehold;

    this._inputList = Array.from(
      this._elem.querySelectorAll(info.inputSelector)
    );

    this._submitExternalCallback = submitCallback;
    this.setEventListeners();
  }

  close() {
    //reiniciar el formulario al cerrar
    super.close();
    this._elem.reset();
  }

  setEventListeners() {
    //comportamiento on submit
    this._elem.addEventListener("submit", this._submitInternalCallback);
    super.setEventListeners();
  }

  _submitInternalCallback = (evt) => {
    this._submitExternalCallback(evt);
    this.close();
  };

  getInputValues() {
    const values = {};
    this._inputList.forEach(
      (input) => (values[input.name] = input.value)
    );
    return values;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
