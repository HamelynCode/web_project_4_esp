import { showImageToView } from "./utils.js";

export default class Card {
  constructor(name, imgUrl, templateSelector) {
    this._name = name;
    this._imgUrl = imgUrl;
    this._elem = this._getElementFromTemplate(templateSelector);
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
    btnDelete.addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });
  }

  _imgClickHandler() {
    const img = this._elem.querySelector(".card__image");
    img.addEventListener("click", (evt) => {
      showImageToView(evt.target, this._name);
    });
  }

  _btnLikeClickHandler() {
    const btnLike = this._elem.querySelector(".btn_like");
    btnLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle("btn_like_active");
    });
  }
}
