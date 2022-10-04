export default class UserInfo {
    constructor({nameSelector, aboutSelector}, ){
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo(){
        // retorna un objeto con los datos del usuario
        const name = this._getName();
        const about = this._getAbout();
        return {name, about};
    }

    setUserInfo(user){
        //recive un objeto con datos del usuario y lo actualiza en el DOM
        this._name.textContent = user.name;
        this._about.textContent = user.about;
    }

    _getName(){return this._name.textContent;}

    _getAbout(){return this._about.textContent;}
}