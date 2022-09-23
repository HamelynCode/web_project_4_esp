import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  handleGlobalEventListeners,
  addCardToPage,
} from "./utils.js";

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

/*-------- Form Edit Profile --------*/
const profileForm = createFormElement(
  "Nombre",
  "Acerca de mi",
  "Edit Profile",
  "#template-form-edit"
);

/*-------- Form Add Card --------*/
const cardForm = createFormElement(
  "Nombre",
  "Link",
  "Add a new Card",
  "#template-form-add"
);

/*--- View image Section ---*/
const viewSection = document.querySelector(".view");

/*------- Card Elements -------*/
//array de elementos "card" iniciales
const cards = [
  {
    name: "Valle de Yosemite",
    link: "./images/yosemite.png",
  },
  {
    name: "Lago Louise",
    link: "./images/louise.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/calvas.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/di-braies.png",
  },
];

//actualizar todo el array cards en la página
function updateCardsToPage() {
  const sectionCards = document.querySelector(".elements");
  sectionCards.innerHTML = "";
  cards.forEach((card) => {
    const newCard = new Card(card.name, card.link, "#template-card");
    addCardToPage(newCard);
  });
}

const page = document.querySelector(".page");
page.append(profileForm);
page.append(cardForm);
updateCardsToPage();

handleGlobalEventListeners(cardForm, profileForm, viewSection);

const config = {
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".form__btn-submit",
  inactiveButtonClass: "btn_inactive",
  inputErrorClass: "input_type_error",
};

const profileFormValidator = new FormValidator(config, profileForm);
const cardFormValidator = new FormValidator(config, cardForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
