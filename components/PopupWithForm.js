import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callback){
        super(popupSelector);
    }

    open(){}

    close(){
        //reiniciar el formulario al cerrar
    }

    setEventListeners(){
        //click para cerrar y evento submit
    }

    _getInputValues(){}
}