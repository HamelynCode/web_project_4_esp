import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  handleGlobalEventListeners,
  addCardToPage,
} from "../utils/utils.js";
import { profileFormInfo, cardFormInfo, validatorConfig, cards } from "../utils/constants.js";
/*
function createFormElement(nombrePlacehold, textoPlacehold, title, id) {
  const template = document.querySelector(id).content;
  const form = template.cloneNode(true).querySelector(".form");
  form.removeAttribute("id");

  const formBtnClose = form.querySelector(".form__btn-close");
  const formBtnSubmit = form.querySelector(".form__btn-submit");

  const formTitle = form.querySelector(".form__title");
  formTitle.textContent = title;
  const inputName = form.querySelector(".form__name");
  inputName.placeholder = nombrePlacehold;
  const inputText = form.querySelector(".form__text");
  inputText.placeholder = textoPlacehold;

  //agregar manejador de eventos por defecto
  form.addEventListener("click", (evt) => {
    //cerrar el formulario clickeando afuera
    if (evt.target === form) {
      form.classList.toggle("form_hidden");
    }
  });
  formBtnClose.addEventListener("click", () => {
    //cerrar el formulario con el btn cerrar
    form.classList.toggle("form_hidden");
  });
  formBtnSubmit.addEventListener("click", () => {
    //cerrar el formulario con el btn submit
    form.classList.toggle("form_hidden");
  });

  return form;
}
*/

/*------- Card Elements -------*/
const sectionCards = new Section({items:cards, renderer:(card)=>{
  const newCard = new Card(card.name, card.link, "#template-card");
  sectionCards.addItem(newCard.getElement());
}}, ".elements");
sectionCards.render();


/*-------- Form Edit Profile --------*/
const profileForm = new PopupWithForm(
  {popupSelector:"#template-form-edit", contentSelector:".form"}, 
  profileFormInfo,
  (evt)=>{
    evt.preventDefault();
    const profileName = document.querySelector(".profile__name");
    const profileAbout = document.querySelector(".profile__about");
    profileName.textContent = profileForm.getElement().querySelector(".form__name").value;
    profileAbout.textContent = profileForm.getElement().querySelector(".form__text").value;
  }
);
profileForm.init("Edit Profile", "Nombre", "Acerca de mi");
const profileFormElement = profileForm.getElement();

//comportamiento del boton para abrir el formulario
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const btnEditProfile = document.querySelector(".btn_edit");
btnEditProfile.addEventListener("click", () => {
  profileFormElement.querySelector(".form__name").value = profileName.textContent;
  profileFormElement.querySelector(".form__text").value = profileAbout.textContent;
  profileForm.open();
});


/*-------- Form Add Card --------*/
const cardForm = new PopupWithForm(
  {popupSelector:"#template-form-add", contentSelector:".form"}, 
  cardFormInfo,
  (evt)=>{
    evt.preventDefault();
    const name = cardForm.getElement().querySelector(".form__name").value;
    const link = cardForm.getElement().querySelector(".form__text").value;
    if (name && link) {
      const newCard = new Card(name, link, "#template-card");
      sectionCards.addItem(newCard.getElement());
    }
  }
);
cardForm.init("Add a new Card", "Nombre", "Link");
const cardFormElement = cardForm.getElement();

//comportamiento del boton para abrir el formulario
const btnAddCard = document.querySelector(".btn_add");
btnAddCard.addEventListener("click", () => {
  cardFormElement.querySelector(".form__name").value = "";
  cardFormElement.querySelector(".form__text").value = "";
  cardForm.open();
});




/*--- View image Section ---*/
//const viewSection = document.querySelector(".view");

const viewSection = PopupWithImage(".view");

//actualizar todo el array cards en la página
/*
function updateCardsToPage() {
  const sectionCards = document.querySelector(".elements");
  sectionCards.innerHTML = "";
  cards.forEach((card) => {
    const newCard = new Card(card.name, card.link, "#template-card");
    addCardToPage(newCard);
  });
}*/

const page = document.querySelector(".page");
page.append(profileFormElement);
page.append(cardFormElement);
//updateCardsToPage();

//handleGlobalEventListeners(cardForm, profileForm, viewSection);

const profileFormValidator = new FormValidator(validatorConfig, profileFormElement);
const cardFormValidator = new FormValidator(validatorConfig, cardFormElement);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
