import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, info) {
    super({popupSelector}, info);
  }
}
