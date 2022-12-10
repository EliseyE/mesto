import validationConfig from './validationConfig.js';

const showInputError = function (form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
}

const hideInputError = function (form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
}

const isInputValid = function (form, input, config) {
  if(!input.validity.valid)
    showInputError(form, input, config);
  else
    hideInputError(form, input, config);
}

const toggleSubmitButton = function (inputList, submitButton, config) {
  const isFormValid = inputList.every(input => input.validity.valid);

  if(isFormValid) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = '';
  }
  else {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = 'disabled';
  }
}

const setEventListeners = function (form, config) {
  const { inputSelector, submitButtonSelector, ...restConfig } = config;

  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);

  // toggleSubmitButton(inputList, submitButton, restConfig);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
    isInputValid(form, input, restConfig);
    toggleSubmitButton(inputList, submitButton, restConfig);
    });
  });
}

// validation
const enableValidation = function (config) {
  const { formSelector, ...restConfig } = config;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form, restConfig);
  });
}

enableValidation(validationConfig);

export {toggleSubmitButton, isInputValid};
