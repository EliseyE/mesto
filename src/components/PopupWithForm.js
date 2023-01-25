import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  static selectors = {
    form: '.edit-form',
    inputSelector: '.edit-form__input'
  }

  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(PopupWithForm.selectors.form);
    this._inputList = Array.from(this._form.querySelectorAll(PopupWithForm.selectors.inputSelector));
    this._inputsData = {};
  }

  getInputValues() {
    this._inputList.forEach(input => {
      this._inputsData[input.name] = input.value;
    });

    return this._inputsData;
  }

  //  search all data pairs and write data into inputs
  setInputValues(valuesForInputs) {
    for (var key in valuesForInputs) {
      this._inputList.forEach(input => {
        if (input.name === key)
        input.value = valuesForInputs[key];
      });
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => this._submitForm(e));
  }

  close() {
    super.close();
    setTimeout(() => { this._form.reset(); }, 100);
  }
}
