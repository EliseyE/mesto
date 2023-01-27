export class Popup {

  constructor(popupSelectors) {
    this._popup = document.querySelector([popupSelectors.popupSelector]);
    this._popupsCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupIsOpened = popupSelectors.popupIsOpened;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._popupIsOpened);
    this._setTemporaryEventListeners();
  }

  close() {
    this._popup.classList.remove(this._popupIsOpened);
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
    this._popupsCloseButton.addEventListener('click', this.close.bind(this));
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
