import './index.css';
import validationConfig from '../utils/validationConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  initialCards,
  pageConfig,
  profileEditButton,
  profileAddPhotoCardButton,
  profileInfo,
  cardSelectors,
  popupEditProfileSelectors,
  popupCreatePhotoCardSelectors,
  popupImageSelectors
}  from '../utils/constants.js';
import {
  profileEditFormValidator,
  photoCardCreateFormValidator
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
  return new Card(cardData, cardSelectors, handleCardClick);
};

// add photoCards from array of objects
const renderer = function (cardData) {
  const newPhotoCard = createCard(cardData);
  photoCardGallery.addItem(newPhotoCard.getCard());
};

const photoCardGallery = new Section( { items: initialCards,  renderer }, pageConfig.photoCardGallery);
photoCardGallery.renderItems();

// Profile edit from
const popupEditProfile = new PopupWithForm(popupEditProfileSelectors,
  (e, currentInputsValues) => {
    e.preventDefault();

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
const popupAddCard = new PopupWithForm(popupCreatePhotoCardSelectors,
  (e, currentInputsValues) => {
    e.preventDefault();

    const cardData =
    { name: currentInputsValues[pageConfig.createPhotoCardNameInput],
      link: currentInputsValues[pageConfig.createPhotoCardLinkInput] };
      // Функция создания карточки вынесена отдельно в createCard()
      // Далее созданная карточка добавляется. Функция createCard() переиспользована в renderer
      // Получается, что renderer в таком случае здесь не требуется. Исправлено в соотвествии с замечаниями.
    const newPhotoCard = createCard(cardData);
    photoCardGallery.addItem(newPhotoCard.getCard());
    popupAddCard.close();
  }
);
popupAddCard.setEventListeners();

const openPhotoCardCreateForm = function () {
  photoCardCreateFormValidator.resetFormState();
  popupAddCard.open();
}

// listeners
// profile
profileEditButton.addEventListener('click', openProfileEditForm);

// photoCard
profileAddPhotoCardButton.addEventListener('click', openPhotoCardCreateForm);
