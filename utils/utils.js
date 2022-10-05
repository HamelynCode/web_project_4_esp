import Card from "../components/Card.js";


function addCardToPage(card) {
  const sectionCards = document.querySelector(".elements");
  sectionCards.prepend(card.getElement());
}

function createCard(name, link) {
  addCardToPage(new Card(name, link, "#template-card"));
}

function handleGlobalEventListeners(cardForm, profileForm, viewSection) {
  
  //-----------------------------eventos de profileForm---------------------

  /*
  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = profileForm.querySelector(".form__name").value;
    profileAbout.textContent = profileForm.querySelector(".form__text").value;
  });
  */
  
  /*
  //-----------------------------eventos de cardform---------------------
  cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = cardForm.querySelector(".form__name").value;
    const link = cardForm.querySelector(".form__text").value;
    if (name && link) {
      createCard(name, link);
    }
  });
  //comportamiento del boton para abrir el formulario
  const btnAddCard = document.querySelector(".btn_add");
  btnAddCard.addEventListener("click", function () {
    cardForm.querySelector(".form__name").value = "";
    cardForm.querySelector(".form__text").value = "";
    cardForm.classList.toggle("form_hidden");
  });

  //-----------------------------eventos de viewSection---------------------
  //ocultar view al dar click afuera
  viewSection.addEventListener("click", (evt) => {
    if (evt.target === viewSection) {
      viewSection.classList.toggle("view_hidden");
    }
  });

  //ocultar view al clickear el btn de cierre
  const btnClose = viewSection.querySelector(".view__btn-close");
  btnClose.addEventListener("click", function () {
    viewSection.classList.toggle("view_hidden");
  });

  //------------------------eventos de teclado---------------------
  document.addEventListener("keydown", (evt) => {
    switch (evt.key) {
      case "Esc":
      case "Escape":
        //ocultar view al presionar escape
        if (!viewSection.classList.contains("view_hidden")) {
          viewSection.classList.add("view_hidden");
        }
        //ocultar formulario "add card" al presionar escape
        if (!cardForm.classList.contains("form_hidden")) {
          cardForm.classList.add("form_hidden");
        }
        //ocultar formulario "edit profile" al presionar escape
        if (!profileForm.classList.contains("form_hidden")) {
          profileForm.classList.add("form_hidden");
        }
        break;
    }
  });
  */
}

function showImageToView(nodeImg, imgName) {
  const viewSection = document.querySelector(".view");
  const viewImg = viewSection.querySelector(".view__image");
  viewImg.src = nodeImg.src;
  viewImg.alt = nodeImg.alt;
  const name = viewSection.querySelector(".view__title");
  name.textContent = imgName;
  viewSection.classList.toggle("view_hidden");
}

export { showImageToView, handleGlobalEventListeners, addCardToPage };
