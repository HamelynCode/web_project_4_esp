/*-------- Profile Form --------*/
const form = document.querySelector(".form");
const formBtnClose = form.querySelector(".form__btn-close");
const formBtnSubmit = form.querySelector(".form__btn-submit");

const btnEditProfile = document.querySelector(".btn-edit");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const inputName = document.querySelector(".form__name");
const inputAbout = document.querySelector(".form__about");

formBtnClose.addEventListener("click", function () {
  form.classList.toggle("form_hidden");
});

formBtnSubmit.addEventListener("click", function () {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  form.classList.toggle("form_hidden");
});

btnEditProfile.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;

  form.classList.toggle("form_hidden");
});

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

/* Init page */
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
  cards.forEach((card)=>{
    card = createCardElement(card.name, card.link);
    sectionCards.append(card);
  });
}

updateCardsToPage();