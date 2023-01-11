export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError = function (form, input, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }

  _hideInputError = function (form, input, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  }

  _isInputValid = function (form, input, config) {
    if(!input.validity.valid)
      this._showInputError(form, input, config);
    else
      this._hideInputError(form, input, config);
  }

  _toggleSubmitButton = function (inputList, submitButton, config) {
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

  _setEventListeners = function (form, config) {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;

    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    inputList.forEach(input => {
      input.addEventListener('input', () => {
      this._isInputValid(form, input, restConfig);
      this._toggleSubmitButton(inputList, submitButton, restConfig);
      });
    });
  }

  // validation
  enableValidation = function () {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(this._form, this._config);
  }

  // initial validation when form is opening
  resetFormState = function () {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);

      inputList.forEach(input => {
        this._isInputValid(this._form, input, this._config)

        // if all inputs are '', then it means form is clear after restarting
        if(inputList.every(input => { return input.value === '' })) {
        this._hideInputError(this._form, input, this._config);
        }
      });

    this._toggleSubmitButton(inputList, submitButton, this._config);
  }
}
