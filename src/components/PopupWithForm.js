import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, contentSelector }, info, submitCallback) {
    super({ popupSelector }, info);
    this._elem = document
      .querySelector(popupSelector)
      .content.querySelector(contentSelector)
      .cloneNode(true);

    this._btnClose = this._elem.querySelector(info.btnClose);
    this._formBtnSubmit = this._elem.querySelector(info.btnSubmit);
    this._formTitle = this._elem.querySelector(info.title);
    this._inputName = this._elem.querySelector(info.inputName);
    this._inputText = this._elem.querySelector(info.inputText);

    this._info = info;
    this._submitExternalCallback = submitCallback;
    this.setEventListeners();
  }

  open() {
    super.open();
  }

  close() {
    //reiniciar el formulario al cerrar
    super.close();
    this._elem.reset();
  }

  init(title, nombrePlacehold, textoPlacehold) {
    this._formTitle.textContent = title;
    this._inputName.placeholder = nombrePlacehold;
    this._inputText.placeholder = textoPlacehold;
  }

  setEventListeners() {
    //comportamiento on submit
    this._elem.addEventListener("submit", this._submitExternalCallback);
    this._elem.addEventListener("submit", this._submitInternalCallback);
    super.setEventListeners();
  }

  _submitInternalCallback = (evt) => {
    this.close();
  };

  getInputValues() {
    const values = {
      name: this._inputName.value,
      text: this._inputText.value,
    };
    return values;
  }

  getNameInput() {
    return this._inputName;
  }

  getTextInput() {
    return this._inputText;
  }
}
