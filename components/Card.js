export default class Card {
  constructor(name, imgUrl, templateSelector, imgClickCallback) {
    this._name = name;
    this._imgUrl = imgUrl;
    this._elem = this._getElementFromTemplate(templateSelector);
    this._imgCallback = imgClickCallback;
    this._handleEventListeners();
  }

  getElement() {
    return this._elem;
  }

  _getElementFromTemplate(templateSelector) {
    //clonar el elemento card que se encuentra dentro del template
    const elem = document
      .querySelector(templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const img = elem.querySelector(".card__image");
    img.name = this._name;
    img.src = this._imgUrl;
    img.alt = this._name;

    const text = elem.querySelector(".card__text");
    text.textContent = this._name;
    return elem;
  }

  _handleEventListeners() {
    this._btnDeleteClickHandler();
    this._imgClickHandler();
    this._btnLikeClickHandler();
  }

  _btnDeleteClickHandler() {
    const btnDelete = this._elem.querySelector(".btn_delete");
    btnDelete.addEventListener("click", this._btnDeleteCallback);
  }

  _btnDeleteCallback = (evt) => {
    evt.target.closest(".card").remove();
    const btnDelete = this._elem.querySelector(".btn_delete");
    btnDelete.removeEventListener("click", this._btnDeleteCallback);
  };

  _imgClickHandler() {
    const img = this._elem.querySelector(".card__image");
    img.addEventListener("click", this._imgCallback);
  }

  _btnLikeClickHandler() {
    const btnLike = this._elem.querySelector(".btn_like");
    btnLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle("btn_like_active");
    });
  }
}
