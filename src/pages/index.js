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
import { PopupConfirmForm } from '../components/PopupConfirmForm.js';
import {
  pageConfig,
  profileEditButton,
  profileAddPhotoCardButton,
  profileInfoSelectors,
  cardSelectors,
  popupEditProfileSelectors,
  popupCreatePhotoCardSelectors,
  popupChangeAvatarSelectors,
  popupImageSelectors,
  apiHeaders,
  apiBaseUrl,
  profileAvatar,
  popupDeletePhotoCardSelectors
}  from '../utils/constants.js';
import {
  profileEditFormValidator,
  photoCardCreateFormValidator,
  ChangeAvatarFormValidator
} from '../utils/utils.js';

// main

const userInfo = new UserInfo(profileInfoSelectors);

// Popup with image
const popupImage = new PopupWithImage(popupImageSelectors);
popupImage.setEventListeners();

const handleCardClick = function(cardInfo) {
  popupImage.open(cardInfo);
};

const handleTrashButtonClick = function(card) {
  popupDeletePhotoCard.open(card);
}

const handleLikeButtonClick = function(card, iLiked) {
  const cardId = card.getCardId();
  if(iLiked) {
    apiModule.unlikeCard(cardId)
    .then(res => {
      card.updateCardLikes(res.likes);
      card.setInitialLike(card);
    });
  }
    else {
    apiModule.likeCard(cardId)
    .then(res => {
      card.updateCardLikes(res.likes);
      card.setInitialLike(card);
    });
  }
}

const createCard = function(cardData) {
   const newPhotoCard = new Card(
    cardData,
    cardSelectors,
    userInfo.getUserId(),
    handleCardClick,
    handleTrashButtonClick,
    handleLikeButtonClick);
   return newPhotoCard.getCard();
};

// add photoCards from array of objects
const renderer = function (cardData) {
  const newPhotoCard = createCard(cardData);
  photoCardGallery.addItem(newPhotoCard);
};

const photoCardGallery = new Section(renderer, pageConfig.photoCardGallery);

const apiModule = new Api(apiBaseUrl, apiHeaders);

const updatePageData = function() {
  Promise.all([apiModule.getMyProfileData(), apiModule.getInitialCards()])
    .then(res => {
      userInfo.setUserInfo(
              { name: res[0].name,
                description: res[0].about,
                avatar: res[0].avatar,
                id:  res[0]._id
              });
      photoCardGallery.renderItems(res[1]);
    });
};

updatePageData();

// Profile edit from
const popupEditProfile = new PopupWithForm(popupEditProfileSelectors,
  (e, currentInputsValues) => {
    e.preventDefault();
    popupEditProfile.setSubmitButtonText('Сохранение...');

    const userInfoToUpdate =
    { name: currentInputsValues[pageConfig.profileNameInput],
      about: currentInputsValues[pageConfig.profileDescriptionInput]};
    apiModule.uploadUserInfo(userInfoToUpdate)
      .then(res => {
        userInfo.setUserInfo(
        { name: res.name,
          description: res.about });
        popupEditProfile.close();
      })
      .finally(() => { popupEditProfile.setSubmitButtonText('Сохранить'); });
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
    popupAddCard.setSubmitButtonText('Создание...');

    const cardData =
    { name: currentInputsValues[pageConfig.createPhotoCardNameInput],
      link: currentInputsValues[pageConfig.createPhotoCardLinkInput] };
    apiModule.uploadCard(cardData)
      .then(res => {
        renderer(res);
        popupAddCard.close();
      })
      .finally(() => { popupAddCard.setSubmitButtonText('Создать'); });
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
    popupChangeAvatar.setSubmitButtonText('Сохранение...');

    const avatar =
    {avatar: currentInputsValues[pageConfig.avatarLinkInput]};
    apiModule.uploadAvatar(avatar)
      .then(res => {
        userInfo.setUserInfo(
        { avatar: res.avatar });
          popupChangeAvatar.close();
      })
      .finally(() => { popupChangeAvatar.setSubmitButtonText('Сохранить'); });
  }
);
popupChangeAvatar.setEventListeners();

const openChangeAvatarForm = function () {
  ChangeAvatarFormValidator.resetFormState();
  popupChangeAvatar.open();
};

const popupDeletePhotoCard = new PopupConfirmForm(popupDeletePhotoCardSelectors,
  (e, card) => {
    e.preventDefault();
    popupDeletePhotoCard.setSubmitButtonText('Удаление...');

    const cardId = card.getCardId();
    apiModule.deletCard(cardId)
      .then(() => {
        card.deleteCard();
        popupDeletePhotoCard.close();
      })
      .finally(() => { popupDeletePhotoCard.setSubmitButtonText('Да'); });
  }
);
popupDeletePhotoCard.setEventListeners();

// listeners
// profile
profileEditButton.addEventListener('click', openProfileEditForm);
profileAvatar.addEventListener('click', openChangeAvatarForm);

// photoCard
profileAddPhotoCardButton.addEventListener('click', openPhotoCardCreateForm);
