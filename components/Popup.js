export default class Popup {
    constructor({popupSelector, contentSelector}){
        this._elem = document.querySelector(popupSelector).content.querySelector(contentSelector).cloneNode(true);
    }

    getElement(){
        return this._elem;
    }

    open(){}

    close(){}

    setEventListeners(){
        //cerrar al hacer click en el boton close
    }
    
    _handleEscClose(){
        //logica para cerrar el popup con esc
    }
}