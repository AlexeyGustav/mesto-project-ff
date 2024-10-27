export { enableValidation, clearForm };

export const validationConfig = {
  inputErrorClass: "popup__input_error",
  inputErrorActiveClass: "popup__input-error_active",
  popupSelector: ".popup__input",
  buttonElement: ".popup__button",
  form: "form"
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Находим элемент ошибки внутри самой формы
  
  // inputElement.classList.add("popup__input_error");
  inputElement.classList.add(validationConfig.inputErrorClass);
  // errorElement.classList.add("popup__input-error_active");
  errorElement.classList.add(validationConfig.inputErrorActiveClass);
  errorElement.textContent = errorMessage;
}  

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.inputErrorActiveClass);
  errorElement.textContent = "";
}

const isVaild = (formElement, inputElement) => {

  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  };

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  // Функция принимает массив полей
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if(hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
  };
};

const setEventListeners = (formElement) => {
  // const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.popupSelector));
  // const buttonElement = formElement.querySelector(".popup__button");
  const buttonElement = formElement.querySelector(validationConfig.buttonElement);
  
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isVaild(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  // const formList = Array.from(document.querySelectorAll("form"));
  const formList = Array.from(document.querySelectorAll(validationConfig.form));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// фунции отчиски полей форм
function clearForm(form) {
  const spanErrorElement = form.querySelectorAll("span");
  const inputErrorElements = form.querySelectorAll("input");
  
  inputErrorElements.forEach((input) => {
    input.classList.remove("popup__input_error");
  });

  spanErrorElement.forEach((span) => {
    span.classList.remove("popup__input-error_active");
    span.textContent = "";
  });
}