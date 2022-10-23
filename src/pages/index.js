import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  formInfo,
  cardInfo,
  viewSectionInfo,
  globalInfo,
  validatorConfig,
} from "../utils/constants.js";

import "./index.css";

//----------- Api --------------
const api = new Api();

const viewSection = new PopupWithImage(
  globalInfo.viewSectionClass,
  viewSectionInfo
);

const confirmationForm = new PopupWithConfirmation(globalInfo.confirmationFormSelector, formInfo);

/*-------- Form Edit Profile --------*/
const user = new UserInfo({
    nameSelector: globalInfo.profileNameClass,
    aboutSelector: globalInfo.profileAboutClass,
    avatarSelector: globalInfo.profileAvatarSelector,
  });

api.getUserInfo()
.then((info)=>{
  user.setInitialData({
    id: info._id,
    name: info.name,
    about: info.about,
    imgUrl: info.avatar
  });

  const profileForm = new PopupWithForm(
    {
      popupSelector: globalInfo.profileFormTemplateId
    },
    formInfo,
    (evt) => {
      evt.preventDefault();
      api.editProfile(profileForm.getInputValues().name, profileForm.getInputValues().text);
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

  const editAvatarForm = new PopupWithForm(
    {popupSelector:globalInfo.avatarFormSelector},
    formInfo,
    ()=>{
      const url = editAvatarForm.getInputValues().text;
      api.setProfileImage(url).then((res)=>{console.log(res)});
      user.setUserAvatar(url);
    });
  const avatarFormValidator = new FormValidator(validatorConfig, editAvatarForm.getElement());
  avatarFormValidator.enableValidation();
  //comportamiento del boton para abrir el formulario
  const btnEditAvatar = document.querySelector(globalInfo.profileEditCover);
  btnEditAvatar.addEventListener("click", () => {
    avatarFormValidator.checkValidity();
    editAvatarForm.open();
  });
});

/*------- Card Elements -------*/
function createCard(item, imgCallback, deleteCallback, likeCallback, creatorId) {
  const canDelete = (creatorId === user.getId()) ? true: false;
  return new Card({id:item._id, name:item.name, imgUrl:item.link, likes:item.likes}, cardInfo, imgCallback, deleteCallback, likeCallback, canDelete);
}

function deleteCardCallback(card){
  confirmationForm.setSubmitListener((evt)=>{
    evt.preventDefault();
    api.deleteCard(card.getCardId())
    .then((res)=>{
      card.removeCard();
      confirmationForm.hide();
    });
  });
  confirmationForm.show();
};

function renderIndividualCard(card, section){
  const newCard = createCard(
    card,
    viewSection.showElement,
    ()=>{
      deleteCardCallback(newCard);
    },
    (addLike)=>{
      if(addLike){
        return api.addNewLike(newCard.getCardId());
      }else{
        return api.removeLike(newCard.getCardId());
      }
    },
    user.getId()
  );
  section.addItem(newCard.getElement());
}

api.getInitialCards()
.then((cards)=>{
  const sectionCards = new Section(
    {
      items: cards.reverse(),
      renderer: renderIndividualCard,
    },
    globalInfo.cardSectionClass
  );
  sectionCards.render();

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
        api.addNewCard(name, link)
        .then((res)=>{
          const newCard = createCard(
            res,
            viewSection.showElement,
            ()=>{
              deleteCardCallback(newCard);
            },
            (addLike)=>{
              if(addLike){
                return api.addNewLike(newCard.getCardId());
              }else{
                return api.removeLike(newCard.getCardId());
              }
            },
            user.getId()
          );
          sectionCards.addItem(newCard.getElement());
        });
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
});
