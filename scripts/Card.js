export class Card {

static selectors = {
  photoCard: '.photoCard',
  cardImage: '.photoCard__image',
  cardImageDescription: '.photoCard__description',
  cardLikeButton: '.photoCard__like-button',
  cardLikeButtonActive: 'photoCard__like-button_active',
  cardTrashButton: '.photoCard__trash-button'
}

  constructor(name, link, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._card = '';
  }

  _getTemplate() {
    const photoCardTemplate = document.querySelector(this._templateSelector).content;
    const newPhotoCard = photoCardTemplate.querySelector(Card.selectors.photoCard).cloneNode(true);
    return newPhotoCard;
  }

  _createPhotoCard = function () {
    const newPhotoCard = this._getTemplate();
    const newPhotoCardImage = newPhotoCard.querySelector(Card.selectors.cardImage);
    this._fillCard(newPhotoCard, newPhotoCardImage);
    this._addListeners(newPhotoCard, newPhotoCardImage);
    return newPhotoCard;
  }

  _fillCard = function (card, cardImage) {
    card.querySelector(Card.selectors.cardImageDescription).textContent =  this._name;
    cardImage.alt =  this._name;
    cardImage.src = this._link;
  }

  _addListeners = function (card, cardImage) {
    card.querySelector(Card.selectors.cardLikeButton).addEventListener('click', this._toggleCardLike);
    card.querySelector(Card.selectors.cardTrashButton).addEventListener('click', () => this._deleteCard());
    cardImage.addEventListener('click', () => this._handleCardClick(this._card, this._link));
  }

  _toggleCardLike = function (evt) {
    evt.target.classList.toggle(Card.selectors.cardLikeButtonActive);
  }

  _deleteCard = function () {
    this._card.remove();
    this._card = null;
  }

  getCard = function () {
    this._card = this._createPhotoCard();
    return this._card;
  }
}
