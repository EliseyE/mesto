import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

  constructor(popupSelectors) {
    super(popupSelectors);
    this._popupImagePhoto = this._popup.querySelector(popupSelectors.popupImagePhoto);
    this._popupImageCaption = this._popup.querySelector(popupSelectors.popupImageCaption);
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
