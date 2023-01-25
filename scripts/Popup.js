export class Popup {

  static selectors = {
    popupIsOpened: 'popup_is-opened',
    popupsCloseButton: '.popup__close-button'
  }

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.popupsCloseButton = this._popup.querySelector(Popup.selectors.popupsCloseButton);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }

  open() {
    this._popup.classList.add(Popup.selectors.popupIsOpened);
    this._setTemporaryEventListeners();
  }

  close() {
    this._popup.classList.remove(Popup.selectors.popupIsOpened);
    this._removeTemporaryEventListeners();
  }

  _handleEscClose(e) {
    if(e.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClickClose(e) {
    if(e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this.popupsCloseButton.addEventListener('click', this.close.bind(this));
  }

  _setTemporaryEventListeners() {
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClickClose);
  }

  _removeTemporaryEventListeners() {
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClickClose);
  }
}
