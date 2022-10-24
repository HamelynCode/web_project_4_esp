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
  formTextInfo,
  apiInfo,
} from "../utils/constants.js";
import { handleServerError } from "../utils/utils.js";

import "./index.css";

//----------- Api --------------
const api = new Api({
  user: apiInfo.user,
  url: apiInfo.url,
  headers: apiInfo.headers,
});

const viewSection = new PopupWithImage(
  globalInfo.viewSectionClass,
  viewSectionInfo
);

const confirmationForm = new PopupWithConfirmation(
  globalInfo.confirmationFormSelector,
  formInfo
);

/*-------- Form Edit Profile --------*/
const user = new UserInfo({
  nameSelector: globalInfo.profileNameClass,
  aboutSelector: globalInfo.profileAboutClass,
  avatarSelector: globalInfo.profileAvatarSelector,
});

api
  .getUserInfo()
  .then((info) => {
    user.setInitialData({
      id: info._id,
      name: info.name,
      about: info.about,
      imgUrl: info.avatar,
    });

    const profileForm = new PopupWithForm(
      {
        popupSelector: globalInfo.profileFormTemplateId,
      },
      formInfo,
      (evt) => {
        evt.preventDefault();
        profileForm.setSubmitButtonText(formTextInfo.loadingText);
        api
          .editProfile(
            profileForm.getInputValues().name,
            profileForm.getInputValues().text
          )
          .then((res) => {
            api
              .getUserInfo()
              .then((info) => {
                user.setUserInfo({ name: info.name, about: info.about });
              })
              .catch(handleServerError)
              .finally(() => {
                profileForm.close();
                profileForm.setSubmitButtonText(formTextInfo.btnSubmitText);
              });
          })
          .catch(handleServerError);
      }
    );

    const profileFormElement = profileForm.getElement();

    const profileFormValidator = new FormValidator(
      validatorConfig,
      profileFormElement
    );
    profileFormValidator.enableValidation();

    //comportamiento del boton para abrir el formulario
    const btnEditProfile = document.querySelector(
      globalInfo.btnEditProfileClass
    );
    btnEditProfile.addEventListener("click", () => {
      const { name, about } = user.getUserInfo();
      profileForm.setInputValues({ name: name, text: about });
      profileFormValidator.checkValidity();
      profileForm.open();
    });

    const editAvatarForm = new PopupWithForm(
      { popupSelector: globalInfo.avatarFormSelector },
      formInfo,
      () => {
        const url = editAvatarForm.getInputValues().text;
        editAvatarForm.setSubmitButtonText(formTextInfo.loadingText);
        api
          .setProfileImage(url)
          .then((res) => {
            user.setUserAvatar(url);
          })
          .catch(handleServerError)
          .finally(() => {
            editAvatarForm.close();
            editAvatarForm.setSubmitButtonText(formTextInfo.btnSubmitText);
          });
      }
    );
    const avatarFormValidator = new FormValidator(
      validatorConfig,
      editAvatarForm.getElement()
    );
    avatarFormValidator.enableValidation();
    //comportamiento del boton para abrir el formulario
    const btnEditAvatar = document.querySelector(globalInfo.profileEditCover);
    btnEditAvatar.addEventListener("click", () => {
      avatarFormValidator.checkValidity();
      editAvatarForm.open();
    });
  })
  .catch(handleServerError);

/*------- Card Elements -------*/
function createCard(
  item,
  imgCallback,
  deleteCallback,
  likeCallback,
  thisUserId
) {
  const canDelete = thisUserId === item.owner._id ? true : false;
  return new Card(
    { id: item._id, name: item.name, imgUrl: item.link, likes: item.likes },
    cardInfo,
    imgCallback,
    deleteCallback,
    likeCallback,
    canDelete
  );
}

function deleteCardCallback(card) {
  confirmationForm.setSubmitListener((evt) => {
    evt.preventDefault();
    api
      .deleteCard(card.getCardId())
      .then((res) => {
        card.removeCard();
        confirmationForm.hide();
      })
      .catch(handleServerError);
  });
  confirmationForm.show();
}

function renderIndividualCard(card, section) {
  const newCard = createCard(
    card,
    viewSection.showElement,
    () => {
      deleteCardCallback(newCard);
    },
    (addLike) => {
      if (addLike) {
        return api.addNewLike(newCard.getCardId());
      } else {
        return api.removeLike(newCard.getCardId());
      }
    },
    user.getId()
  );
  section.addItem(newCard.getElement());
}

api
  .getInitialCards()
  .then((cards) => {
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
        popupSelector: globalInfo.cardFormTemplateId,
      },
      formInfo,
      (evt) => {
        evt.preventDefault();
        const name = cardForm.getInputValues().name;
        const link = cardForm.getInputValues().text;
        cardForm.setSubmitButtonText(formTextInfo.loadingText);
        if (name && link) {
          api
            .addNewCard(name, link)
            .then((res) => {
              const newCard = createCard(
                res,
                viewSection.showElement,
                () => {
                  deleteCardCallback(newCard);
                },
                (addLike) => {
                  if (addLike) {
                    return api.addNewLike(newCard.getCardId());
                  } else {
                    return api.removeLike(newCard.getCardId());
                  }
                },
                user.getId()
              );
              sectionCards.addItem(newCard.getElement());
            })
            .catch(handleServerError)
            .finally(() => {
              cardForm.close();
              cardForm.setSubmitButtonText(formTextInfo.btnSubmitText);
            });
        }
      }
    );

    const cardFormElement = cardForm.getElement();

    const cardFormValidator = new FormValidator(
      validatorConfig,
      cardFormElement
    );
    cardFormValidator.enableValidation();

    //comportamiento del boton para abrir el formulario
    const btnAddCard = document.querySelector(globalInfo.btnAddCardClass);
    btnAddCard.addEventListener("click", () => {
      cardFormValidator.checkValidity();
      cardForm.open();
    });
  })
  .catch(handleServerError);
