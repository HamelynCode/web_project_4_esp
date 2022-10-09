import yosemite from "../images/yosemite.png";
import louise from "../images/louise.png";
import calvas from "../images/calvas.png";
import latemar from "../images/latemar.png";
import vanoise from "../images/vanoise.png";
import braies from "../images/di-braies.png";

const profileFormInfo = {
  btnClose: ".form__btn-close",
  btnSubmit: ".form__btn-submit",
  title: ".form__title",
  inputName: ".form__name",
  inputText: ".form__text",
  hiddenClass: "popup_hidden",
  inputSelector: ".input"
};

const cardFormInfo = {
  btnClose: ".form__btn-close",
  btnSubmit: ".form__btn-submit",
  title: ".form__title",
  inputName: ".form__name",
  inputText: ".form__text",
  hiddenClass: "popup_hidden",
  inputSelector: ".input"
};

const validatorConfig = {
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".form__btn-submit",
  inactiveButtonClass: "btn_inactive",
  inputErrorClass: "input_type_error",
};

const viewSectionInfo = {
  hiddenClass: "popup_hidden",
  btnClose: ".view__btn-close",
};

const globalInfo = {
  viewSectionClass: ".view",
  cardTemplateId: "#template-card",
  cardSectionClass: ".elements",
  profileFormTemplateId: "#form-edit",
  formClass: ".form",
  profileNameClass: ".profile__name",
  profileAboutClass: ".profile__about",
  profileFormTitle: "Edit Profile",
  profileFormName: "Nombre",
  profileFormText: "Acerca de mi",
  btnEditProfileClass: ".btn_edit",
  cardFormTemplateId: "#form-add",
  cardFormTitle: "Add a new Card",
  cardFormName: "Nombre",
  cardFormText: "Link",
  btnAddCardClass: ".btn_add",
  pageClass: ".page",
};

//array de elementos "card" iniciales
const cards = [
  {
    name: "Valle de Yosemite",
    link: yosemite,
  },
  {
    name: "Lago Louise",
    link: louise,
  },
  {
    name: "Montañas Calvas",
    link: calvas,
  },
  {
    name: "Latemar",
    link: latemar,
  },
  {
    name: "Vanoise National Park",
    link: vanoise,
  },
  {
    name: "Lago di Braies",
    link: braies,
  },
];

export {
  profileFormInfo,
  cardFormInfo,
  viewSectionInfo,
  validatorConfig,
  globalInfo,
  cards,
};
