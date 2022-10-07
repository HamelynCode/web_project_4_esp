const profileFormInfo = {
    btnClose:".form__btn-close",
    btnSubmit:".form__btn-submit",
    title:".form__title",
    inputName:".form__name",
    inputText:".form__text",
    hiddenClass:"form_hidden"
  }

const cardFormInfo = {
    btnClose:".form__btn-close",
    btnSubmit:".form__btn-submit",
    title:".form__title",
    inputName:".form__name",
    inputText:".form__text",
    hiddenClass:"form_hidden"
}

const validatorConfig = {
    formSelector: ".form",
    inputSelector: ".input",
    submitButtonSelector: ".form__btn-submit",
    inactiveButtonClass: "btn_inactive",
    inputErrorClass: "input_type_error",
  }

const viewSectionInfo = {
  hiddenClass:"view_hidden",
  btnClose:".view__btn-close"
}

const globalInfo = {
  viewSectionClass:".view",
  cardTemplateId:"#template-card",
  cardSectionClass:".elements",
  profileFormTemplateId:"#template-form-edit",
  formClass:".form",
  profileNameClass:".profile__name",
  profileAboutClass:".profile__about",
  profileFormTitle:"Edit Profile",
  profileFormName:"Nombre",
  profileFormText:"Acerca de mi",
  btnEditProfileClass:".btn_edit",
  cardFormTemplateId:"#template-form-add",
  cardFormTitle:"Add a new Card",
  cardFormName:"Nombre",
  cardFormText:"Link",
  btnAddCardClass:".btn_add",
  pageClass:".page",
}

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

export {profileFormInfo, cardFormInfo, viewSectionInfo, validatorConfig, globalInfo, cards};