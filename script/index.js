
function createFormElement(nombrePlacehold, textoPlacehold, title){
  const template = document.querySelector("#template-form").content;
  const form = template.cloneNode(true).querySelector(".form");//document.querySelector(".form");
  const formBtnClose = form.querySelector(".form__btn-close");
  const formBtnSubmit = form.querySelector(".form__btn-submit");

  const formTitle = form.querySelector(".form__title");
  formTitle.textContent = title;
  const inputName = form.querySelector(".form__name");
  inputName.placeholder = nombrePlacehold;
  const inputText = form.querySelector(".form__text");
  inputText.placeholder = textoPlacehold;

  //agregar manejador de eventos por defecto
  formBtnClose.addEventListener("click",()=>{form.classList.toggle("form_hidden");});
  formBtnSubmit.addEventListener("click",()=>{form.classList.toggle("form_hidden");});

  return form;
  /*
  document.addEventListener('keydown', function(event) {
    const keyName = event.key;

    if (keyName == "Enter" && form.classList.contains("form_hidden") == false) {
      event.preventDefault();
      
      profileName.textContent = inputName.value;
      profileAbout.textContent = inputAbout.value;

      form.classList.toggle("form_hidden");
      console.log("hola");
    }
  });
  */
}

function createCardElement(name, link){
  const template = document.querySelector("#template-card").content;
  const card = template.cloneNode(true);
  const img = card.querySelector(".card__image");
  img.src = link;
  img.alt = name;
  img.addEventListener("click", function(evt){
    showImageToView(evt.target, name);
  });
  const text = card.querySelector(".card__text");
  text.textContent = name;
  const btnLike = card.querySelector(".btn-like");
  btnLike.addEventListener("click", function(evt){
    evt.target.classList.toggle("btn-like_active");
  });
  const btndelete = card.querySelector(".btn-delete");
  btndelete.addEventListener("click", function(evt){
    deleteCard(evt.target.closest(".card"));
  });
  return card;
}

/*-------- Form Edit Profile --------*/
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
//crear el formulario y dar comportamiento "onSubmit"
const profileForm = createFormElement("Nombre", "Acerca de mi", "Edit Profile");
profileForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();
  profileName.textContent = profileForm.querySelector(".form__name").value;
  profileAbout.textContent = profileForm.querySelector(".form__text").value;
});
//comportamiento del boton para abrir el formulario
const btnEditProfile = document.querySelector(".btn-edit");
btnEditProfile.addEventListener("click", function () {
  profileForm.querySelector(".form__name").value = profileName.textContent;
  profileForm.querySelector(".form__text").value = profileAbout.textContent;
  profileForm.classList.toggle("form_hidden");
});

/*-------- Form Add Card --------*/
const cardForm = createFormElement("Nombre", "Link", "Add a new Card");
cardForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();
  const name = cardForm.querySelector(".form__name").value;
  const link = cardForm.querySelector(".form__text").value;
  if(name && link){
    addANewCard(name, link);
  }
});
//comportamiento del boton para abrir el formulario
const btnAddCard = document.querySelector(".btn-add");
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
    link: "./images/yosemite.png"
  },
  {
    name: "Lago Louise",
    link: "./images/louise.png"
  },
  {
    name: "Montañas Calvas",
    link: "./images/calvas.png"
  },
  {
    name: "Latemar",
    link: "./images/latemar.png"
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.png"
  },
  {
    name: "Lago di Braies",
    link: "./images/di-braies.png"
  }
];

//actualizar todo el array cards en la página
function updateCardsToPage(){
  const sectionCards = document.querySelector(".elements");
  sectionCards.innerHTML = "";
  cards.forEach((card)=>{
    card = createCardElement(card.name, card.link);
    sectionCards.append(card);
  });
}
//agregar un elemento card a la página
function addCardToPage(card){
  const sectionCards = document.querySelector(".elements");
  sectionCards.prepend(card);
}

//eliminar un elemento del array "cards" y de la pagina
function deleteCard(card){
  //eliminar el elemento del array
  const arrayItem = cards.find(function (item) {
    return item.name.includes( card.querySelector(".card__text").textContent );
  });
  cards.splice(cards.indexOf(arrayItem), 1);
  //eliminar el elemento de la página
  card.remove();
}
//agregar un "card" nuevo al array cards y actualizarlo en la página
function addANewCard(newName, newLink){
  cards.unshift({
    name:newName,
    link:newLink
  });
  addCardToPage( createCardElement(newName, newLink) );
}

/*--- View image Section ---*/
const viewSection = document.querySelector(".view");
const btnClose = viewSection.querySelector(".view__btn-close");
btnClose.addEventListener("click", function(){
  viewSection.classList.toggle("view_hidden");
});

function showImageToView(nodeImg, imgName){
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
