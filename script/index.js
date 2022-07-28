
/*-------- Profile Form --------*/
const form = document.querySelector(".form");
const formBtnClose = form.querySelector(".form__btn-close");
const formBtnSubmit = form.querySelector(".form__btn-submit");

const btnEditProfile = document.querySelector(".btn-edit");

formBtnClose.addEventListener("click", function(){
    form.classList.toggle("form_hidden");
});

formBtnSubmit.addEventListener("click", function(){
    const profileName = document.querySelector(".profile__name");
    const profileAbout = document.querySelector(".profile__about");

    const inputName = document.querySelector(".form__name");
    const inputAbout = document.querySelector(".form__about");

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;

    form.classList.toggle("form_hidden");
});

btnEditProfile.addEventListener("click", function(){
    form.classList.toggle("form_hidden");
});