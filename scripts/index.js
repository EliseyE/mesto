import { Card } from './Card.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import {
  initialCards,
  pageConfig,
  profileEditButton,
  profileAddPhotoCardButton,
  profileInfo,
  collectionItemList
}  from './data.js';
import {
  profileEditFormValidator,
  photoCardCreateFormValidator
} from './validate.js';

// main

const userInfo = new UserInfo(profileInfo);

// Popup with image
const popupImage = new PopupWithImage(pageConfig.popupImage);
popupImage.setEventListeners();

const handleCardClick = function(cardInfo) {
  popupImage.open(cardInfo);
};

// add photoCards from array of objects
const renderer = function (object) {
  const newPhotoCard = new Card(object, pageConfig.photoCardId, handleCardClick);
  collectionItemList.prepend(newPhotoCard.getCard());
};

const addCadrsToCollection = function (array) {
  const photoCardGallery = new Section( { items: array,  renderer}, pageConfig.photoCardGallery);
  photoCardGallery.renderItems();
};

addCadrsToCollection(initialCards);

// Profile edit from
const popupEditProfile = new PopupWithForm(pageConfig.popupEditProfile,
  (e) => {
    e.preventDefault();

    const currentInputsValues = popupEditProfile.getInputValues();
    userInfo.setUserInfo({name: currentInputsValues[pageConfig.profileNameInput], description: currentInputsValues[pageConfig.profileDescriptionInput]});
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();

const uploadProfileDataIntoEditFormInputFields = function () {
  const currentUserInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(
    {
      [pageConfig.profileNameInput]: currentUserInfo.name,
      [pageConfig.profileDescriptionInput]: currentUserInfo.description
    }
  );
}

const openProfileEditForm = function () {
  uploadProfileDataIntoEditFormInputFields();
  profileEditFormValidator.resetFormState();
  popupEditProfile.open();
}

// Create photo card form
const popopupCreatePhotoCard = new PopupWithForm(pageConfig.popopupCreatePhotoCard,
  (e) => {
    e.preventDefault();

    const currentInputsValues = popopupCreatePhotoCard.getInputValues();
    const array = [
      {
        name: currentInputsValues[pageConfig.createPhotoCardNameInput],
        link: currentInputsValues[pageConfig.createPhotoCardLinkInput]
      }
    ];
    addCadrsToCollection(array);
    popopupCreatePhotoCard.close();
  }
);
popopupCreatePhotoCard.setEventListeners();

const openPhotoCardCreateForm = function () {
  photoCardCreateFormValidator.resetFormState();
  popopupCreatePhotoCard.open();
}

// listeners
// profile
profileEditButton.addEventListener('click', openProfileEditForm);

// photoCard
profileAddPhotoCardButton.addEventListener('click', openPhotoCardCreateForm);
