export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector}) {
    this._dataId = "";
    this._dataName = "";
    this._dataAbout = "";
    this._dataImgUrl = "";
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._avatar.src = this._dataImgUrl;
  }

  getUserInfo() {
    // retorna un objeto con los datos del usuario
    return { name:this._name.textContent, about:this._about.textContent};
  }

  getId(){return this._dataId;}

  setInitialData({id, name, about, imgUrl}){
    this._dataId = id;
    this._dataName = name;
    this._dataAbout = about;
    this._dataImgUrl = imgUrl;
    this.setUserInfo({name, about});
    this.setUserAvatar(this._dataImgUrl);
  }

  setUserAvatar(url){
    this._avatar.src = url;
  }

  setUserInfo({name, about}) {
    //recive un objeto con datos del usuario y lo actualiza en el DOM
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
