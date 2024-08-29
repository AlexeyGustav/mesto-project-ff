import { overlay, formEditName, formEditProffesion, personaName, personaDescription } from "../index.js"

export function openModal() {
  document.querySelector(".popup_type_edit").style.display = "flex";

  formEditName.value = personaName.textContent;
  formEditProffesion.value = personaDescription.textContent;
}

export function closeModal() {
  overlay.forEach(item => {
    item.style.display = "none";
  })
}

export function openModalNewMesto() {
  document.querySelector(".popup_type_new-card").style.display = "flex";
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

