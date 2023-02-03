export const apiHeaders = {
  authorization: 'e7f60b85-9e30-4602-89c2-652f79ad0c99',
  'Content-Type': 'application/json'
}
export const apiBaseUrl = 'https://mesto.nomoreparties.co/v1/cohort-59';


// pageConfig
export const pageConfig = {
  page: '.page',
  profileEditButton: '.profile__edit-button',
  profileAddPhotoCardButton: '.profile__add-button',
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  profileAvatar: '.profile__avatar',
  profileAvatarImage: '.profile__avatar-image',
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
  cardTrashButtonDisabled: 'photoCard__trash-button_disabled',
  photoCardGallery: '.collection__item-list',
  popupEditProfile: '.popup_type_profile',
  profileNameInput: 'profile-name',
  profileDescriptionInput: 'profile-description',
  popupCreatePhotoCard: '.popup_type_create-photoCard',
  createPhotoCardNameInput: 'create-photoCard-name',
  createPhotoCardLinkInput: 'create-photoCard-link',
  popupIsOpened: 'popup_is-opened',
  popupCloseButton: '.popup__close-button',
  editForm: '.edit-form',
  inputSelector: '.edit-form__input',
  profileEditForm: "edit-form_type_profile",
  photoCardCreateForm: "edit-form_type_create-photoCard",
  changeAvatarForm: "edit-form_type_change-avatar",
  popupСhangeAvatar: '.popup_type_change-avatar',
  avatarLinkInput: 'change-avatar-link',
  cardLikesCounter: '.photoCard__like-counter',
  editFormSubmitButton: '.edit-form__submit-button'
};

export const profileEditForm = document.forms[pageConfig.profileEditForm];
export const photoCardCreateForm = document.forms[pageConfig.photoCardCreateForm];
export const changeAvatarForm = document.forms[pageConfig.changeAvatarForm];

export const cardSelectors = {
  cardTemplate: pageConfig.photoCardId,
  photoCard: pageConfig.photoCard,
  cardImage: pageConfig.cardImage,
  cardImageDescription: pageConfig.cardImageDescription,
  cardLikeButton: pageConfig.cardLikeButton,
  cardLikeButtonActive: pageConfig.cardLikeButtonActive,
  cardTrashButton: pageConfig.cardTrashButton,
  cardTrashButtonDisabled: pageConfig.cardTrashButtonDisabled,
  cardLikesCounter: pageConfig.cardLikesCounter
};

const editFormSelectors = {
  editForm: pageConfig.editForm,
  inputSelector: pageConfig.inputSelector,
  submitButton: pageConfig.editFormSubmitButton
};

const popupSelectors = {
  popupIsOpened: pageConfig.popupIsOpened,
  popupCloseButton: pageConfig.popupCloseButton
};

export const popupEditProfileSelectors = Object.assign(
  { popupSelector: pageConfig.popupEditProfile }, popupSelectors, editFormSelectors);

export const popupCreatePhotoCardSelectors = Object.assign(
  { popupSelector: pageConfig.popupCreatePhotoCard }, popupSelectors, editFormSelectors);

export const popupChangeAvatarSelectors = Object.assign(
  { popupSelector: pageConfig.popupСhangeAvatar }, popupSelectors, editFormSelectors);

export const popupImageSelectors = Object.assign(
  { popupSelector: pageConfig.popupImage,
    popupImagePhoto: pageConfig.popupImagePhoto,
    popupImageCaption: pageConfig.popupImageCaption }, popupSelectors);

// page
export const page = document.querySelector(pageConfig.page);

// profile variables
export const profileEditButton = page.querySelector(pageConfig.profileEditButton);
export const profileAddPhotoCardButton = page.querySelector(pageConfig.profileAddPhotoCardButton);

export const profileInfoSelectors = {
  name: pageConfig.profileName,
  description: pageConfig.profileDescription,
  avatar: pageConfig.profileAvatarImage
};

export const collectionItemList = page.querySelector(pageConfig.collectionItemList);
export const profileAvatar = page.querySelector(pageConfig.profileAvatar);
