export default class Api {
  constructor(){
    this._group = "group-42";
    this._user = "me";
    this._url = `https://around.nomoreparties.co/v1/${this._group}`;
    this._auth = {
      authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6"
    };
  }

  getUserInfo() {
    return fetch(`${this._url}/users/${this._user}`, {
      headers:this._auth
    }).then(res => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.statusText}`);
    }).catch(err => console.log(err));
  }

  getInitialCards(){
    return fetch(`${this._url}/cards`).then(res => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.statusText}`);
    }).catch(err => console.log(err));
  }

  editProfile(){
    return fetch("https://around.nomoreparties.co/v1/groupId/users/me", {
      method: "PATCH",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Físico y químicos"
      })
    });
  }

  addNewCard(){
    return fetch("https://around.nomoreparties.co/v1/groupId/cards", {
      method: "POST",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Imagen",
        link: "alguna url de la imagen"
      })
    });
  }

  getCardLikes(card){
    return card.likes.length;
  }
}
