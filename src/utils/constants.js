export const initialCards = [
  // put last object in the end of array
  {
    name: 'Сузунское месторождение',
    link: 'https://live.staticflickr.com/65535/52524339705_69c9911025_k.jpg'
  },
  {
    name: 'Москва',
    link: 'https://live.staticflickr.com/65535/52524141604_bd89708abb_k.jpg'
  },
  {
    name: 'Питер',
    link: 'https://live.staticflickr.com/65535/52523860251_49f3b0fb2a_k.jpg'
  },
  {
    name: 'Урал. Соколиный камень',
    link: 'https://live.staticflickr.com/65535/52524339695_b2cabb0d8d_k.jpg'
  },
  {
    name: 'Волга',
    link: 'https://live.staticflickr.com/65535/52523394012_8a799ab47d_k.jpg'
  },
  {
    name: 'Сургут',
    link: 'https://live.staticflickr.com/65535/52524339710_4783c5abb5_k.jpg'
  }
];

// pageConfig
export const pageConfig = {
  page: '.page',
  profileEditButton: '.profile__edit-button',
  profileAddPhotoCardButton: '.profile__add-button',
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  collectionItemList: '.collection__item-list',
  popupImage: '.popup_type_image',
  popupImagePhoto: '.figure-space__image',
  popupImageCaption: '.figure-space__caption',
  photoCard: '.photoCard',
  photoCardId: '#photoCard',
  cardImage: '.photoCard__image',
  cardImageDescription: '.photoCard__description',
  cardLikeButton: '.photoCard__like-button',
  cardLikeButtonActive: 'photoCard__like-button_active',
  cardTrashButton: '.photoCard__trash-button',
  photoCardGallery: '.collection__item-list',
  popupEditProfile: '.popup_type_profile',
  profileNameInput: 'profile-name',
  profileDescriptionInput: 'profile-description',
  popopupCreatePhotoCard: '.popup_type_create-photoCard',
  createPhotoCardNameInput: 'create-photoCard-name',
  createPhotoCardLinkInput: 'create-photoCard-link',
  popupIsOpened: 'popup_is-opened',
  popupCloseButton: '.popup__close-button',
  editForm: '.edit-form',
  inputSelector: '.edit-form__input',
  profileEditForm: "edit-form_type_profile",
  photoCardCreateForm: "edit-form_type_create-photoCard"
};

export const profileEditForm = document.forms[pageConfig.profileEditForm];
export const photoCardCreateForm = document.forms[pageConfig.photoCardCreateForm];

export const cardSelectors = {
  cardTemplate: pageConfig.photoCardId,
  photoCard: pageConfig.photoCard,
  cardImage: pageConfig.cardImage,
  cardImageDescription: pageConfig.cardImageDescription,
  cardLikeButton: pageConfig.cardLikeButton,
  cardLikeButtonActive: pageConfig.cardLikeButtonActive,
  cardTrashButton: pageConfig.cardTrashButton
};

const editFormSelectors = {
  editForm: pageConfig.editForm,
  inputSelector: pageConfig.inputSelector
};

const popupSelectors = {
  popupIsOpened: pageConfig.popupIsOpened,
  popupCloseButton: pageConfig.popupCloseButton
};

export const popupEditProfileSelectors = Object.assign(
  { popupSelector: pageConfig.popupEditProfile }, popupSelectors, editFormSelectors);

export const popupCreatePhotoCardSelectors = Object.assign(
  { popupSelector: pageConfig.popopupCreatePhotoCard }, popupSelectors, editFormSelectors);

export const popupImageSelectors = Object.assign(
  { popupSelector: pageConfig.popupImage,
    popupImagePhoto: pageConfig.popupImagePhoto,
    popupImageCaption: pageConfig.popupImageCaption }, popupSelectors);

// page
export const page = document.querySelector(pageConfig.page);

// profile variables
export const profileEditButton = page.querySelector(pageConfig.profileEditButton);
export const profileAddPhotoCardButton = page.querySelector(pageConfig.profileAddPhotoCardButton);

export const profileInfo = {
  name: pageConfig.profileName,
  description: pageConfig.profileDescription
};

export const collectionItemList = page.querySelector(pageConfig.collectionItemList);
