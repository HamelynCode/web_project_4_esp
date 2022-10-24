import UserInfo from "../components/UserInfo";

const formInfo = {
  btnClose: ".form__btn-close",
  hiddenClass: "popup_hidden",
  inputSelector: ".input",
  btnSubmitSelector: ".btn_submit",
};

const formTextInfo = {
  loadingText: "Guardando...",
  btnSubmitText: "Guardar",
};

const cardInfo = {
  cardClass: ".card",
  imgClass: ".card__image",
  btnDeleteClass: ".btn_delete",
  btnDeleteHidden: "btn_delete_hidden",
  btnLikeClass: ".btn_like",
  cardTextClass: ".card__text",
  btnLikeActiveClass: "btn_like_active",
  templateSelector: "#template-card",
  likesCountClass: ".card__likes-count",
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
  cardSectionClass: ".elements",
  profileFormTemplateId: "#form-edit",
  formClass: ".form",
  profileNameClass: ".profile__name",
  profileAboutClass: ".profile__about",
  btnEditProfileClass: ".btn_edit",
  cardFormTemplateId: "#form-add",
  btnAddCardClass: ".btn_add",
  confirmationFormSelector: "#form-delete",
  profileEditCover: ".profile__edit-cover",
  profileAvatarSelector: ".profile__avatar",
  avatarFormSelector: "#form-profile-img",
};

const apiInfo = {
  user: "me",
  url: `https://around.nomoreparties.co/v1/web_es_cohort_02`,
  headers: {
    authorization: "43821f01-4b26-43b6-994f-72bfc960dac4",
    "Content-Type": "application/json",
  },
};

export {
  formInfo,
  cardInfo,
  viewSectionInfo,
  validatorConfig,
  globalInfo,
  formTextInfo,
  apiInfo,
};
