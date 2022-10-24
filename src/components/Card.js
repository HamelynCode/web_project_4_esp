export default class Card {
  constructor({id, name, imgUrl, likes}, info, imgClickCallback, deleteCallback, likeCallback, canDelete) {
    this._id = id;
    this._name = name;
    this._imgUrl = imgUrl;
    this._info = info;
    this._likes = likes;
    this._elem = this._getElementFromTemplate(this._info.templateSelector);
    this._img = this._elem.querySelector(this._info.imgClass);
    this._btnDelete = this._elem.querySelector(this._info.btnDeleteClass);
    this._btnLike = this._elem.querySelector(this._info.btnLikeClass);
    this._likesCount = this._elem.querySelector(this._info.likesCountClass);
    this._likesCount.textContent = this._likes.length;

    if(this._likes.length > 0){
      this._btnLike.classList.add(this._info.btnLikeActiveClass);
    }

    this._deleteCallback = deleteCallback;
    this._imgCallback = imgClickCallback;
    this._likeCallback = likeCallback;
    this._handleEventListeners();
    
    if(canDelete){
      this._btnDelete.classList.remove(this._info.btnDeleteHidden);
    }
  }

  getElement() {
    return this._elem;
  }

  getCardId() {
    return this._id;
  }

  setLikes(likes){
    this._likesCount.textContent = likes;
  }

  _getElementFromTemplate(templateSelector) {
    //clonar el elemento card que se encuentra dentro del template
    const elem = document
      .querySelector(templateSelector)
      .content.querySelector(this._info.cardClass)
      .cloneNode(true);
    const img = elem.querySelector(this._info.imgClass);
    img.name = this._name;
    img.src = this._imgUrl;
    img.alt = this._name;

    const text = elem.querySelector(this._info.cardTextClass);
    text.textContent = this._name;
    return elem;
  }

  _handleEventListeners() {
    this._btnDeleteClickHandler();
    this._imgClickHandler();
    this._btnLikeClickHandler();
  }

  _btnDeleteClickHandler() {
    this._btnDelete.addEventListener("click", this._btnDeleteCallback);
  }

  _btnDeleteCallback = () => {
    this._deleteCallback();
  };

  removeCard(){
    this._elem.remove();
    this._btnDelete.removeEventListener("click", this._btnDeleteCallback);
  }

  _imgClickHandler() {
    this._img.addEventListener("click", this._imgCallback);
  }

  _btnLikeClickHandler() {
    this._btnLike.addEventListener("click", (evt) => {
      if(evt.target.classList.contains(this._info.btnLikeActiveClass)){
        this._likeCallback(false).then((res)=>{
          evt.target.classList.remove(this._info.btnLikeActiveClass);
          this._likesCount.textContent = res.likes.length;
        });
      }else{
        this._likeCallback(true).then((res)=>{
          evt.target.classList.add(this._info.btnLikeActiveClass);
          this._likesCount.textContent = res.likes.length;
        });
      }
    });
  }
}
