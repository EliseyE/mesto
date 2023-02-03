import './index.css';
import { Api } from '../components/Api';
import validationConfig from '../utils/validationConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  pageConfig,
  profileEditButton,
  profileAddPhotoCardButton,
  profileInfo,
  cardSelectors,
  popupEditProfileSelectors,
  popupCreatePhotoCardSelectors,
  popupChangeAvatarSelectors,
  popupImageSelectors,
  apiHeaders,
  apiBaseUrl,
  profileAvatar,
  profileAvatarImage
}  from '../utils/constants.js';
import {
  profileEditFormValidator,
  photoCardCreateFormValidator,
  ChangeAvatarFormValidator
} from '../utils/utils.js';

// main

const userInfo = new UserInfo(profileInfo);

// Popup with image
const popupImage = new PopupWithImage(popupImageSelectors);
popupImage.setEventListeners();

const handleCardClick = function(cardInfo) {
  popupImage.open(cardInfo);
};

const createCard = function(cardData) {
   const newPhotoCard = new Card(cardData, cardSelectors, handleCardClick);
   return newPhotoCard.getCard()
};

// add photoCards from array of objects
const renderer = function (cardData) {
  const newPhotoCard = createCard(cardData);
  photoCardGallery.addItem(newPhotoCard);
};

const photoCardGallery = new Section(renderer, pageConfig.photoCardGallery);

const apiModule = new Api(apiBaseUrl, apiHeaders);

const makeCardGalleryActual = function() {
  apiModule.getInitialCards()
  .then((res) => {
    photoCardGallery.renderItems(res);
  });
};

makeCardGalleryActual();

const makeUserInfoActual = function() {
  apiModule.getMyProfileData()
  .then((res) => {
    userInfo.setUserInfo(
      { name: res.name,
        description: res.about,
        avatar: res.avatar,
        id:  res._id
      });
  });
};

makeUserInfoActual();

// Profile edit from
const popupEditProfile = new PopupWithForm(popupEditProfileSelectors,
  (e, currentInputsValues) => {
    e.preventDefault();

    userInfo.setUserInfo({name: currentInputsValues[pageConfig.profileNameInput], description: currentInputsValues[pageConfig.profileDescriptionInput]});
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();

const updateProfileDataIntoEditFormInputFields = function () {
  const currentUserInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(
    {
      [pageConfig.profileNameInput]: currentUserInfo.name,
      [pageConfig.profileDescriptionInput]: currentUserInfo.description
    }
  );
}

const openProfileEditForm = function () {
  updateProfileDataIntoEditFormInputFields();
  profileEditFormValidator.resetFormState();
  popupEditProfile.open();
}

// Create photo card form
const popupAddCard = new PopupWithForm(popupCreatePhotoCardSelectors,
  (e, currentInputsValues) => {
    e.preventDefault();

    const cardData =
    { name: currentInputsValues[pageConfig.createPhotoCardNameInput],
      link: currentInputsValues[pageConfig.createPhotoCardLinkInput] };
    renderer(cardData);
    popupAddCard.close();
  }
);
popupAddCard.setEventListeners();

const openPhotoCardCreateForm = function () {
  photoCardCreateFormValidator.resetFormState();
  popupAddCard.open();
};

const popupChangeAvatar = new PopupWithForm(popupChangeAvatarSelectors,
  (e, currentInputsValues) => {
    e.preventDefault();

    userInfo.setUserInfo({avatar: currentInputsValues[pageConfig.avatarLinkInput]});
    popupChangeAvatar.close();
  }
);
popupChangeAvatar.setEventListeners();

const openChangeAvatarForm = function () {
  ChangeAvatarFormValidator.resetFormState();
  popupChangeAvatar.open();
};

// listeners
// profile
profileEditButton.addEventListener('click', openProfileEditForm);
profileAvatar.addEventListener('click', openChangeAvatarForm);

// photoCard
profileAddPhotoCardButton.addEventListener('click', openPhotoCardCreateForm);
