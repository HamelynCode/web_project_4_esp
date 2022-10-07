import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(popupSelector, info){
        super({popupSelector}, info);
        this._viewImg = this.getElement().querySelector(".view__image");
        this._targetName = this.getElement().querySelector(".view__title");
        this.setEventListeners();
    }

    open(target){
        this._viewImg.src = target.src;
        this._viewImg.alt = target.alt;
        this._targetName.textContent = target.name;
        super.open();
    }

    showElement = (evt) =>{
        this.open(evt.target);
    }
}