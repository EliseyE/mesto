export class Popup {

  static selectors = {
    popupIsOpened: '.popup_is-opened',
    popupsCloseButton: '.popup__close-button'
  }

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.popupsCloseButton = this._popup.querySelector(popupsCloseButton);
  }

  open = function () {
    this._popup.classList.add(popupIsOpened);
    this._setTemporaryEventListeners();
  }

  close = function () {
    this._popup.classList.remove(popupIsOpened);
    this._removeEventListeners();
  }

  _handleEscClose = function (e) {
    if(e.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClickClose = function (e) {
    if(e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners = function () {
    this.popupsCloseButton.addEventListener('click', this.close);
  }

  _setTemporaryEventListeners = function () {
    document.addEventListener('keyup', this._handleClickClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClickClose);
  }

  _removeEventListeners = function () {
    document.removeEventListener('keyup', this._handleClickClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClickClose);
  }
}
