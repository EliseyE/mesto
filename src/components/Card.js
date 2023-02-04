export class Card {

  constructor(cardData, cardSelectors, profileId, handleCardClick, handleTrashButtonClick, handleLikeButtonClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._likesQuantity = this._likes.length;
    this._owner = cardData.owner;
    this._createdAt = cardData.createdAt;
    this._profileId = profileId;
    this._iLiked = '';

    this._templateSelector = cardSelectors.cardTemplate;
    this._handleCardClick = handleCardClick;
    this._card = '';
    this._selectors = cardSelectors;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._cardLikeButton = '';
    this._cardLikesCounter = '';
  }

  _isLikedByMe = function() {
    if(this._likes !== []) {
      return this._likes.some(like => {
        return like._id === this._profileId;
      });
    }
  }

  setInitialLike = function(card) {
    card._iLiked = card._isLikedByMe();
    if(card._iLiked)
      card.setCardLike();
    else
      card.removeCardLike();
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
    this._cardLikeButton = newPhotoCard.querySelector(this._selectors.cardLikeButton);
    this.setInitialLike(this);
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
    this._cardLikesCounter = card.querySelector(this._selectors.cardLikesCounter)
    this._cardLikesCounter.textContent =  this._likesQuantity;
  }


  _addListeners = function (card, cardImage) {
    card.querySelector(this._selectors.cardLikeButton).addEventListener('click', () => this._handleLikeButtonClick(this, this._iLiked));
    card.querySelector(this._selectors.cardTrashButton).addEventListener('click', () => this._handleTrashButtonClick(this));
    cardImage.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
  }

  setCardLike = function () {
    this._cardLikeButton.classList.add(this._selectors.cardLikeButtonActive);
  }

  removeCardLike = function () {
    this._cardLikeButton.classList.remove(this._selectors.cardLikeButtonActive);
  }

  getCardId = function () {
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

  getCardId = function () {
    return this._id;
  }

  updateCardLikes = function (likes) {
    this._likes = likes;
    this._cardLikesCounter.textContent = this._likes.length;
  }
}
