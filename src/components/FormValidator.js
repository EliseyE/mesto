export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    this._submitButton = form.querySelector(config.submitButtonSelector);
  }

  _showInputError = function (input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideInputError = function (input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _isInputValid = function (input) {
    if(!input.validity.valid)
      this._showInputError(input);
    else
      this._hideInputError(input);
  }

  _toggleSubmitButton = function () {
    const isFormValid = this._inputList.every(input => input.validity.valid);

    if(isFormValid) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = '';
    }
    else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = 'disabled';
    }
  }

  _setEventListeners = function () {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
      this._isInputValid(input);
      this._toggleSubmitButton();
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

      this._inputList.forEach(input => {
        this._isInputValid(input)

        // if all inputs are '', then it means form is clear after restarting
        if(this._inputList.every(input => { return input.value === '' })) {
        this._hideInputError(input);
        }
      });

    this._toggleSubmitButton();
  }
}
