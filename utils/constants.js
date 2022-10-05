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
  };

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

export {profileFormInfo, cardFormInfo, validatorConfig, cards};