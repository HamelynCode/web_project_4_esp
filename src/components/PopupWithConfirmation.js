import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, info) {
    super({popupSelector}, info);
    super.setEventListeners();
  }

  show(){
    this._elem.classList.remove(this._hiddenClass);
  }

  hide(){
    this._elem.classList.add(this._hiddenClass);
  }

  setSubmitListener(callback) {
    this._elem.addEventListener("submit", callback);
  }
  /*
  removeSubmitListener(){
    this._elem.removeEventListener("submit", this._callback);
  }*/
}
