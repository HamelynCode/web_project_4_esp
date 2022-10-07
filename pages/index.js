import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  profileFormInfo,
  cardFormInfo,
  viewSectionInfo,
  globalInfo,
  validatorConfig,
  cards,
} from "../utils/constants.js";

const viewSection = new PopupWithImage(
  globalInfo.viewSectionClass,
  viewSectionInfo
);

/*------- Card Elements -------*/
const sectionCards = new Section(
  {
    items: cards,
    renderer: (card) => {
      const newCard = new Card(
        card.name,
        card.link,
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
const profileName = document.querySelector(globalInfo.profileNameClass);
const profileAbout = document.querySelector(globalInfo.profileAboutClass);

const profileForm = new PopupWithForm(
  {
    popupSelector: globalInfo.profileFormTemplateId,
    contentSelector: globalInfo.formClass,
  },
  profileFormInfo,
  (evt) => {
    evt.preventDefault();
    profileName.textContent = profileForm.getInputValues().name;
    profileAbout.textContent = profileForm.getInputValues().text;
  }
);
profileForm.init(
  globalInfo.profileFormTitle,
  globalInfo.profileFormName,
  globalInfo.profileFormText
);
const profileFormElement = profileForm.getElement();

//comportamiento del boton para abrir el formulario
const btnEditProfile = document.querySelector(globalInfo.btnEditProfileClass);
btnEditProfile.addEventListener("click", () => {
  profileForm.getNameInput().value = profileName.textContent;
  profileForm.getTextInput().value = profileAbout.textContent;
  profileForm.open();
});

/*-------- Form Add Card --------*/
const cardForm = new PopupWithForm(
  {
    popupSelector: globalInfo.cardFormTemplateId,
    contentSelector: globalInfo.formClass,
  },
  cardFormInfo,
  (evt) => {
    evt.preventDefault();
    const name = cardForm.getInputValues().name;
    const link = cardForm.getInputValues().text;
    if (name && link) {
      const newCard = new Card(
        name,
        link,
        globalInfo.cardTemplateId,
        viewSection.showElement
      );
      sectionCards.addItem(newCard.getElement());
    }
  }
);
cardForm.init(
  globalInfo.cardFormTitle,
  globalInfo.cardFormName,
  globalInfo.cardFormText
);
const cardFormElement = cardForm.getElement();

//comportamiento del boton para abrir el formulario
const btnAddCard = document.querySelector(globalInfo.btnAddCardClass);
btnAddCard.addEventListener("click", () => {
  cardForm.getNameInput().value = "";
  cardForm.getTextInput().value = "";
  cardForm.open();
});

const page = document.querySelector(globalInfo.pageClass);
page.append(profileFormElement);
page.append(cardFormElement);

const profileFormValidator = new FormValidator(
  validatorConfig,
  profileFormElement
);
const cardFormValidator = new FormValidator(validatorConfig, cardFormElement);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
