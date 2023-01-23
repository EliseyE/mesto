import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

  static selectors = {
    popupImagePhoto: '.figure-space__image',
    popupImageCaption: '.figure-space__caption'
  }

  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = this._popup.querySelector(popupImagePhoto);
    this._popupImageCaption = this._popup.querySelector(popupImageCaption);

  }

  open(nameValue, linkValue) {
    this._writeDataInPopupImage(nameValue, linkValue);
    super.open();
  }

  _writeDataInPopupImage = function (nameValue, linkValue) {
    this._popupImagePhoto.src = linkValue;
    this._popupImagePhoto.alt = nameValue;
    this._popupImageCaption.textContent = nameValue;
  }
}
