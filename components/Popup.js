export default class Popup {
    constructor({popupSelector}, info){
        this._elem = document.querySelector(popupSelector);
        this._hiddenClass = info.hiddenClass;
        this._btnClose = document.querySelector(info.btnClose);
    }

    getElement(){
        return this._elem;
    }

    open(){
        this._elem.classList.remove(this._hiddenClass);
        document.addEventListener("keydown", this._handleEscClose);
    }

    close(){
        this._elem.classList.add(this._hiddenClass);
    }

    setEventListeners(){
        //cerrar el formulario clickeando afuera
        this._elem.addEventListener("click", this._clickOverCallback);
        
        //cerrar el formulario con el btn cerrar
        this._btnClose.addEventListener("click", this._btnCloseCallback);
    }

    _clickOverCallback = evt =>{
        if (evt.target === this._elem) {
            this.close();
        }
    }

    _btnCloseCallback = evt =>{this.close();}
    
    _handleEscClose = (evt) => {
        switch (evt.key) {
          case "Esc":
          case "Escape":
            document.removeEventListener("keydown", this._handleEscClose);
            this.close();
        }
    }
}