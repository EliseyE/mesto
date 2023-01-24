import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  static selectors = {
    form: '.edit-form',
    inputSelector: '.edit-form__input'
  }

  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(form);
    this._inputList = Array.from(form.querySelectorAll(inputSelector));
    this._inputsData = {};
  }

  _getInputValues = function() {
    this._inputList.forEach(input => {
      inputsData.input.name = input.value;
    });

    return this._inputsData;
  }

  setEventListeners = function() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close = function() {
    this.close();
    this._form.reset();
  }
}
