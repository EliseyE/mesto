import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

  static selectors = {
    popupImagePhoto: '.figure-space__image',
    popupImageCaption: '.figure-space__caption'
  }

  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = this._popup.querySelector(PopupWithImage.selectors.popupImagePhoto);
    this._popupImageCaption = this._popup.querySelector(PopupWithImage.selectors.popupImageCaption);

  }

  open(cardInfo) {
    this._writeDataInPopupImage(cardInfo);
    super.open();

  }

  _writeDataInPopupImage = function (photoCard) {
    this._popupImagePhoto.src = photoCard.link;
    this._popupImagePhoto.alt = photoCard.name;
    this._popupImageCaption.textContent = photoCard.name;
  }
}
