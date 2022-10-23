export default class Api {
  constructor(){
    this._group = "web_es_cohort_02";
    this._user = "me";
    this._url = `https://around.nomoreparties.co/v1/${this._group}`;
    this._auth = {
      authorization: "43821f01-4b26-43b6-994f-72bfc960dac4"
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
    return fetch(`${this._url}/cards`, {
      headers:this._auth
    }).then(res => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.statusText}`);
    }).catch(err => console.log(err));
  }

  editProfile(name, about){
    return fetch(`${this._url}/users/${this._user}`, {
      method: "PATCH",
      headers: {
        authorization: this._auth.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  addNewCard(name, url){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._auth.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: url
      })
    }).then(res => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.statusText}`);
    }).catch(err => console.log(err));
  }

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._auth.authorization,
        "Content-Type": "application/json"
      }
    });
  }

  addNewLike(cardId){
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._auth
    }).then(res => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.statusText}`);
    }).catch(err => console.log(err));
  }

  removeLike(cardId){
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._auth
    }).then(res => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.statusText}`);
    }).catch(err => console.log(err));
  }

  setProfileImage(url){
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._auth.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: url
      }) 
    }).then(res => {
      return res.ok ? res.json(): Promise.reject(`Error: ${res.statusText}`);
    }).catch(err => console.log(err));
  }
  /*
  getCardLikes(card){
    return card.likes.length;
  }*/
}
