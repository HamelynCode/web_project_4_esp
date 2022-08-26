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
  form.addEventListener("click", (evt)=>{ //cerrar el formulario clickeando afuera
    if(evt.target === form){
      form.classList.toggle("form_hidden");
    }
  });
  formBtnClose.addEventListener("click", () => { //cerrar el formulario con el btn cerrar
    form.classList.toggle("form_hidden");
  });
  formBtnSubmit.addEventListener("click", () => { //cerrar el formulario con el btn submit
    form.classList.toggle("form_hidden");
  });

  return form;
}

function createCardElement(name, link) {
  const template = document.querySelector("#template-card").content;
  const card = template.cloneNode(true).querySelector(".card");
  card.removeAttribute("id");
  const img = card.querySelector(".card__image");
  img.src = link;
  img.alt = name;
  img.addEventListener("click", function (evt) {
    showImageToView(evt.target, name);
  });
  const text = card.querySelector(".card__text");
  text.textContent = name;
  const btnLike = card.querySelector(".btn_like");
  btnLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("btn_like_active");
  });
  const btnDelete = card.querySelector(".btn_delete");
  btnDelete.addEventListener("click", function (evt) {
    deleteCard(evt.target.closest(".card"));
  });
  return card;
}

/*-------- Form Edit Profile --------*/
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
//crear el formulario y dar comportamiento "onSubmit"
const profileForm = createFormElement("Nombre", "Acerca de mi", "Edit Profile", "#template-form-edit");
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileForm.querySelector(".form__name").value;
  profileAbout.textContent = profileForm.querySelector(".form__text").value;
});
//comportamiento del boton para abrir el formulario
const btnEditProfile = document.querySelector(".btn_edit");
btnEditProfile.addEventListener("click", function () {
  profileForm.querySelector(".form__name").value = profileName.textContent;
  profileForm.querySelector(".form__text").value = profileAbout.textContent;
  profileForm.classList.toggle("form_hidden");
});

/*-------- Form Add Card --------*/
const cardForm = createFormElement("Nombre", "Link", "Add a new Card", "#template-form-add");
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = cardForm.querySelector(".form__name").value;
  const link = cardForm.querySelector(".form__text").value;
  if (name && link) {
    addANewCard(name, link);
  }
});
//comportamiento del boton para abrir el formulario
const btnAddCard = document.querySelector(".btn_add");
btnAddCard.addEventListener("click", function () {
  cardForm.querySelector(".form__name").value = "";
  cardForm.querySelector(".form__text").value = "";
  cardForm.classList.toggle("form_hidden");
});

/*------- Card Elements -------*/
//array de elementos "card"
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
    card = createCardElement(card.name, card.link);
    sectionCards.append(card);
  });
}
//agregar un elemento card a la página
function addCardToPage(card) {
  const sectionCards = document.querySelector(".elements");
  sectionCards.prepend(card);
}

//eliminar un elemento del array "cards" y de la pagina
function deleteCard(card) {
  //eliminar el elemento del array
  const arrayItem = cards.find(function (item) {
    return item.name.includes(card.querySelector(".card__text").textContent);
  });
  const cantidad = 1;
  cards.splice(cards.indexOf(arrayItem), cantidad);
  //eliminar el elemento de la página
  card.remove();
}
//agregar un "card" nuevo al array cards y actualizarlo en la página
function addANewCard(newName, newLink) {
  cards.unshift({
    name: newName,
    link: newLink,
  });
  addCardToPage(createCardElement(newName, newLink));
}

/*--- View image Section ---*/
const viewSection = document.querySelector(".view");
const btnClose = viewSection.querySelector(".view__btn-close");
viewSection.addEventListener("click", (evt)=>{
  if(evt.target === viewSection){//ocultar view al dar click afuera
    viewSection.classList.toggle("view_hidden");
  }
});
btnClose.addEventListener("click", function () {//ocultar view al clickear el btn de cierre
  viewSection.classList.toggle("view_hidden");
});

function showImageToView(nodeImg, imgName) {
  const viewImg = viewSection.querySelector(".view__image");
  viewImg.src = nodeImg.src;
  viewImg.alt = nodeImg.alt;
  const name = viewSection.querySelector(".view__title");
  name.textContent = imgName;
  viewSection.classList.toggle("view_hidden");
}

const page = document.querySelector(".page");
page.append(profileForm);
page.append(cardForm);
updateCardsToPage();
