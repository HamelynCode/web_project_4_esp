
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

//add cards
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

function createCardElement(name, link){
  const template = document.querySelector("#template-card").content;
  const card = template.cloneNode(true);
  const img = card.querySelector(".card__image");
  img.src = link;
  img.alt = name;
  const text = card.querySelector(".card__text");
  text.textContent = name;
  return card;
}

function updateCardsToPage(){
  const sectionCards = document.querySelector(".elements");
  sectionCards.innerHTML = "";
  cards.forEach((card)=>{
    card = createCardElement(card.name, card.link);
    sectionCards.append(card);
  });
}

function addANewCard(newName, newLink){
  cards.unshift({
    name:newName,
    link:newLink
  });
  updateCardsToPage();
}

const page = document.querySelector(".page");
page.append(profileForm);
page.append(cardForm);
updateCardsToPage();
