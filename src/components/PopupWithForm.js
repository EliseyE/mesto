import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  constructor(popupSelectors, submitForm) {
    super(popupSelectors);
    this._submitForm = submitForm;
    this._editForm = this._popup.querySelector(popupSelectors.editForm);
    this._inputList = Array.from(this._editForm.querySelectorAll(popupSelectors.inputSelector));
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
    this._editForm.addEventListener('submit', (e) => this._submitForm(e));
  }

  close() {
    super.close();
    setTimeout(() => { this._editForm.reset(); }, 100);
  }
}
