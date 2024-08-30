import { overlay, formEditName, formEditProffesion, personaName, personaDescription } from "../index.js"

export function openModal() {
  openPopup(document.querySelector(".popup_type_edit"))
  formEditName.value = personaName.textContent;
  formEditProffesion.value = personaDescription.textContent;
}

export function closeModal() {
  overlay.forEach(item => {
    item.classList.remove("popup_is-opened");
  })
}

export function openPopup(e) {
  e.classList.add("popup_is-opened");
}

export function openModalNewMesto() {
  openPopup(document.querySelector(".popup_type_new-card"))
}

function addTextinForm(editNameValue, editProffesionValue) {
  personaName.textContent = editNameValue;
  personaDescription.textContent = editProffesionValue;
}

export function handleFormSubmit(evt) {
  evt.preventDefault();
  addTextinForm(formEditName.value, formEditProffesion.value);
  closeModal();
}
