import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, info, submitCallback) {
    super({ popupSelector }, info);

    this._inputList = Array.from(
      this._elem.querySelectorAll(info.inputSelector)
    );

    this._submitExternalCallback = submitCallback;
    this.setEventListeners();
  }

  close() {
    super.close();
    this._elem.reset();
  }

  setEventListeners() {
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
