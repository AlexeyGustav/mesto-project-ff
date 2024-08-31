export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
};

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(event) {
  if(event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};
