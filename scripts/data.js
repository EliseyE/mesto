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

export const profileEditForm = document.forms["edit-form_type_profile"];
export const photoCardCreateForm = document.forms["edit-form_type_create-photoCard"];

// pageConfig
export const pageConfig = {
  page: '.page',
  profileEditButton: '.profile__edit-button',
  profileAddPhotoCardButton: '.profile__add-button',
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  collectionItemList: '.collection__item-list',
  popupImage: '.popup_type_image',
  photoCardId: '#photoCard',
  photoCardGallery: '.collection__item-list',
  popupEditProfile: '.popup_type_profile',
  profileNameInput: 'profile-name',
  profileDescriptionInput: 'profile-description',
  popopupCreatePhotoCard: '.popup_type_create-photoCard',
  createPhotoCardNameInput: 'create-photoCard-name',
  createPhotoCardLinkInput: 'create-photoCard-link'
};

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
