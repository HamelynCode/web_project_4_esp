import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, contentSelector}, info, submitCallback){
        super({popupSelector, contentSelector});

        this._formBtnClose = this._elem.querySelector(info.btnClose);
        this._formBtnSubmit = this._elem.querySelector(info.btnSubmit);
        this._formTitle = this._elem.querySelector(info.title);
        this._inputName = this._elem.querySelector(info.inputName);
        this._inputText = this._elem.querySelector(info.inputText);

        this._info = info;
        this._submitExternalCallback = submitCallback;
        this.setEventListeners();
    }

    open(){
        this._elem.classList.toggle(this._info.hiddenClass);
    }

    close(){
        //reiniciar el formulario al cerrar
        this._elem.classList.toggle(this._info.hiddenClass);
        this._elem.reset();
    }

    init(title, nombrePlacehold, textoPlacehold){
        this._formTitle.textContent = title;
        this._inputName.placeholder = nombrePlacehold;
        this._inputText.placeholder = textoPlacehold;
    }

    setEventListeners(){
        //comportamiento on submit
        this._elem.addEventListener("submit", this._submitExternalCallback);
        this._elem.addEventListener("submit", this._submitInternalCallback);
        
        //cerrar el formulario clickeando afuera
        this._elem.addEventListener("click", this._clickOverCallback);
        
        //cerrar el formulario con el btn cerrar
        this._formBtnClose.addEventListener("click", this._btnCloseCallback);
    }

    _submitInternalCallback = evt => {this.close();}

    _clickOverCallback = evt =>{
        if (evt.target === this._elem) {
            this.close();
        }
    }

    _btnCloseCallback = evt =>{this.close();}

    _getInputValues(){}
}