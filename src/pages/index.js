import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  formInfo,
  viewSectionInfo,
  globalInfo,
  validatorConfig,
  cards,
} from "../utils/constants.js";

import "./index.css";

function createCard(item, selector, callback) {
  return new Card(item.name, item.link, selector, callback);
}

const viewSection = new PopupWithImage(
  globalInfo.viewSectionClass,
  viewSectionInfo
);

/*------- Card Elements -------*/
const sectionCards = new Section(
  {
    items: cards,
    renderer: (card) => {
      const newCard = createCard(
        card,
        globalInfo.cardTemplateId,
        viewSection.showElement
      );
      sectionCards.addItem(newCard.getElement());
    },
  },
  globalInfo.cardSectionClass
);
sectionCards.render();

/*-------- Form Edit Profile --------*/
const user = new UserInfo({
  nameSelector: globalInfo.profileNameClass,
  aboutSelector: globalInfo.profileAboutClass,
});

const profileForm = new PopupWithForm(
  {
    popupSelector: globalInfo.profileFormTemplateId
  },
  formInfo,
  (evt) => {
    evt.preventDefault();
    user.setUserInfo({
      name: profileForm.getInputValues().name,
      about: profileForm.getInputValues().text,
    });
  }
);

const profileFormElement = profileForm.getElement();

const profileFormValidator = new FormValidator(
  validatorConfig,
  profileFormElement
);
profileFormValidator.enableValidation();

//comportamiento del boton para abrir el formulario
const btnEditProfile = document.querySelector(globalInfo.btnEditProfileClass);
btnEditProfile.addEventListener("click", () => {
  const { name, about } = user.getUserInfo();
  profileForm.setInputValues({ name: name, text: about });
  profileFormValidator.checkValidity();
  profileForm.open();
});

/*-------- Form Add Card --------*/
const cardForm = new PopupWithForm(
  {
    popupSelector: globalInfo.cardFormTemplateId
  },
  formInfo,
  (evt) => {
    evt.preventDefault();
    const name = cardForm.getInputValues().name;
    const link = cardForm.getInputValues().text;
    if (name && link) {
      const newCard = createCard(
        { name: name, link: link },
        globalInfo.cardTemplateId,
        viewSection.showElement
      );
      sectionCards.addItem(newCard.getElement());
    }
  }
);

const cardFormElement = cardForm.getElement();

const cardFormValidator = new FormValidator(validatorConfig, cardFormElement);
cardFormValidator.enableValidation();

//comportamiento del boton para abrir el formulario
const btnAddCard = document.querySelector(globalInfo.btnAddCardClass);
btnAddCard.addEventListener("click", () => {
  cardFormValidator.checkValidity();
  cardForm.open();
});