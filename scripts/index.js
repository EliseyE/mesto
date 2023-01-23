import { Card } from './Card.js';
import { initialCards, profileEditForm, photoCardCreateForm }  from './data.js';
import {profileEditFormValidator, photoCardCreateFormValidator} from './validate.js';
import { Section } from './Section.js';

// page
const page = document.querySelector('.page');
const popupsCloseButtons = page.querySelectorAll('.popup__close-button');

// profile variables
const profile = page.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddPhotoCardButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// profile popup
const popupEditProfile = page.querySelector('.popup_type_profile');

// profile edit form variables
const profileNameInputField = profileEditForm.querySelector('.edit-form__input_kind_profile-name');
const profileDescriptionInputField = profileEditForm.querySelector('.edit-form__input_kind_profile-description');

// photoCard popup
const popupCreatePhotoCard = page.querySelector('.popup_type_create-photoCard');

// photoCard create form varables
const photoCardNameInputField = photoCardCreateForm.querySelector('.edit-form__input_kind_create-photoCard-name');
const photoCardLinkInputField = photoCardCreateForm.querySelector('.edit-form__input_kind_create-photoCard-link');

// collection variables
const collectionItemList = page.querySelector('.collection__item-list');

// popup image variables
const popupImage = page.querySelector('.popup_type_image');
const popupImagePhoto = popupImage.querySelector('.figure-space__image');
const popupImageCaption = popupImage.querySelector('.figure-space__caption');

// keys
const escCode = 'Escape';


// functions

// common

// close by Escape
const closePopupByKeyUp = function (e) {
  if(e.key === escCode) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup)
  }
}

const closePopupByOverlay = function (e) {
  if(e.target === e.currentTarget) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup)
  }
}

//popup
// open popup
const openPopup = function (element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keyup', closePopupByKeyUp);
  element.addEventListener('mousedown', closePopupByOverlay);
}

// close popup
const closePopup = function (element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closePopupByKeyUp);
  element.removeEventListener('mousedown', closePopupByOverlay);
}

// profile edit form
// upload profile data in the edit form
const uploadProfileDataIntoEditFormInputFields = function () {
  profileNameInputField.value = profileName.textContent;
  profileDescriptionInputField.value = profileDescription.textContent;
}

// open profile edit form
const openProfileEditForm = function () {
  uploadProfileDataIntoEditFormInputFields();
  profileEditFormValidator.resetFormState();
  openPopup(popupEditProfile);
}

// write down profile new data on page
const writeDownProfileNewDataOnThePage = function () {
  profileName.textContent = profileNameInputField.value;
  profileDescription.textContent = profileDescriptionInputField.value;
}

// submit and close edit form profile
const handleProfileDataSubmit = function (evt) {
  evt.preventDefault();
  writeDownProfileNewDataOnThePage();
  closePopup(popupEditProfile);
}

// popup image functions
// wtite data in popup-image
const writeDataInPopupImage = function (nameValue, linkValue) {
  popupImagePhoto.src = linkValue;
  popupImagePhoto.alt = nameValue;
  popupImageCaption.textContent = nameValue;
}

// open popup image
const openPopupImage = function (nameValue, linkValue) {
  writeDataInPopupImage(nameValue, linkValue);
  openPopup(popupImage);
}

const addPhotoCard = function (nameValue, linkValue) {
  const newPhotoCard = new Card(nameValue, linkValue, '#photoCard', openPopupImage);
  collectionItemList.prepend(newPhotoCard.getCard());
}

// photoCard create edit form
// submit and close photoCard create edit form
const createNewPhotoCard = function (evt) {
  evt.preventDefault();
  addPhotoCard(photoCardNameInputField.value, photoCardLinkInputField.value);
  closePopup(popupCreatePhotoCard);
  evt.target.reset();
}

// add photoCards from array of objects
const addPhotoCardsFromArrayOfObjects = function (array) {
  array.slice().reverse().forEach(object => {
    addPhotoCard(object.name, object.link);
  });
}

// add photoCards from initial array
addPhotoCardsFromArrayOfObjects(initialCards);

// open
const openPhotoCardCreateForm = function () {
  photoCardCreateFormValidator.resetFormState();
  openPopup(popupCreatePhotoCard)
}

// listeners
// popup
popupsCloseButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// profile
profileEditButton.addEventListener('click', openProfileEditForm);
profileEditForm.addEventListener('submit', handleProfileDataSubmit);

// photoCard
profileAddPhotoCardButton.addEventListener('click', openPhotoCardCreateForm);
photoCardCreateForm.addEventListener('submit', createNewPhotoCard);
