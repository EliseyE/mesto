import { Popup } from "./Popup";

export class PopupConfirmForm extends Popup {

  constructor(popupSelectors, submitForm) {
    super(popupSelectors);
    this._submitForm = submitForm;
    this._editForm = this._popup.querySelector(popupSelectors.editForm);
    this._submitButton = this._editForm.querySelector(popupSelectors.submitButton);
    this._currentItem = '';
  }

  open(card) {
    this._currentItem = card;
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._editForm.addEventListener('submit', (e) => this._submitForm(e, this._currentItem));
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }
}
