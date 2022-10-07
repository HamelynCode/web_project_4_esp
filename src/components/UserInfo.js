export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    // retorna un objeto con los datos del usuario
    return { name:this._name.textContent, about:this._about.textContent};
  }

  setUserInfo({name, about}) {
    //recive un objeto con datos del usuario y lo actualiza en el DOM
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
