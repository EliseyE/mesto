export class Card {

  constructor(cardData, cardSelectors, profileId, handleCardClick, handleTrashButtonClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._likesQuantity = this._likes.length;
    this._owner = cardData.owner;
    this._createdAt = cardData.createdAt;
    this._profileId = profileId;

    this._templateSelector = cardSelectors.cardTemplate;
    this._handleCardClick = handleCardClick;
    this._card = '';
    this._selectors = cardSelectors;
    this._handleTrashButtonClick = handleTrashButtonClick;
  }

  _getTemplate() {
    const photoCardTemplate = document.querySelector(this._templateSelector).content;
    const newPhotoCard = photoCardTemplate.querySelector(this._selectors.photoCard).cloneNode(true);
    return newPhotoCard;
  }

  _createPhotoCard = function () {
    const newPhotoCard = this._getTemplate();
    const newPhotoCardImage = newPhotoCard.querySelector(this._selectors.cardImage);
    this._fillCard(newPhotoCard, newPhotoCardImage);
    this._setTrashButtonActivity(newPhotoCard);
    this._addListeners(newPhotoCard, newPhotoCardImage);
    return newPhotoCard;
  }

  _setTrashButtonActivity = function(card) {
    if(this._profileId !== this._owner._id) {
      const submitButton = card.querySelector(this._selectors.cardTrashButton);
      submitButton.classList.toggle(this._selectors.cardTrashButtonDisabled);
      submitButton.disabled = 'disabled';
    }
  };

  _fillCard = function (card, cardImage) {
    card.querySelector(this._selectors.cardImageDescription).textContent =  this._name;
    cardImage.alt =  this._name;
    cardImage.src = this._link;
    card.querySelector(this._selectors.cardLikesCounter).textContent =  this._likesQuantity;
  }

  _addListeners = function (card, cardImage) {
    card.querySelector(this._selectors.cardLikeButton).addEventListener('click', this._toggleCardLike.bind(this));
    card.querySelector(this._selectors.cardTrashButton).addEventListener('click', () => this._handleTrashButtonClick(this));
    cardImage.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
  }

  _toggleCardLike = function (evt) {
    evt.target.classList.toggle(this._selectors.cardLikeButtonActive);
  }

  getCardId = function() {
    return this._id;
  }

  deleteCard = function () {
    this._card.remove();
    this._card = null;
  }

  getCard = function () {
    this._card = this._createPhotoCard();
    return this._card;
  }
}
