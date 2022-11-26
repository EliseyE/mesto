import initialCards from './data.js';

// page
const page = document.querySelector('.page');
const closeButtons = page.querySelectorAll('.popup__close-button');

// profile variables
const profile = page.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddPhotoCardButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// profile popup
const popupEditProfile = page.querySelector('.popup_type_profile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button_type_profile');

// profile edit form variables
const profileEditForm = document.forms["edit-form_type_profile"];
const profileNameInputField = profileEditForm.querySelector('.edit-form__input_kind_profile-name');
const profileDescriptionInputField = profileEditForm.querySelector('.edit-form__input_kind_profile-description');

// photoCard popup
const popupCreatePhotoCard = page.querySelector('.popup_type_create-photoCard');
const popupCreatePhotoCardCloseButton = popupCreatePhotoCard.querySelector('.popup__close-button_type_create-photoCard');

// photoCard create form varables
const photoCardCreateForm = document.forms["edit-form_type_create-photoCard"];
const photoCardNameInputField = photoCardCreateForm.querySelector('.edit-form__input_kind_create-photoCard-name');
const photoCardLinkInputField = photoCardCreateForm.querySelector('.edit-form__input_kind_create-photoCard-link');

// collection variables
const collectionItemList = page.querySelector('.collection__item-list');

// popup image variables
const popupImage = page.querySelector('.popup_type_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button_type_image');
const popupImagePhoto = popupImage.querySelector('.figure-space__image');
const popupImageCaption = popupImage.querySelector('.figure-space__caption');


// functions

// common
//  validation of link
const isValidLink = function (url) {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return true;
  };
    alert("Ссылка нерабочая - введите адрес, начинающийся с https:// или http://");
    return false;
}

//popup
// open popup
const openPopup = function (element) {
  element.classList.add('popup_is-opened');
}

// close popup
const closePopup = function (element) {
  element.classList.remove('popup_is-opened');
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
const writeDataInPopupImage = function (element) {
  popupImagePhoto.src = element.querySelector('.photoCard__image').src;
  popupImagePhoto.alt = element.querySelector('.photoCard__description').textContent
  popupImageCaption.textContent = popupImagePhoto.alt;
}

// open popup image
const openPopupImage = function (element) {
  writeDataInPopupImage(element);
  openPopup(popupImage);
}

// photoCard functions
// create photoCard
const createPhotoCard = function (nameValue, linkValue) {
  const photoCardTemplate = page.querySelector('#photoCard').content;
  const newPhotoCard = photoCardTemplate.querySelector('.photoCard').cloneNode(true);
  const newPhotoCardImage = newPhotoCard.querySelector('.photoCard__image');

  newPhotoCard.querySelector('.photoCard__description').textContent = nameValue;
  newPhotoCardImage.alt = nameValue;
  newPhotoCardImage.src = linkValue;

  newPhotoCard.querySelector('.photoCard__like-button').addEventListener('click', (evt) => { evt.target.classList.toggle('photoCard__like-button_active');});
  newPhotoCard.querySelector('.photoCard__trash-button').addEventListener('click', (evt) => { evt.target.closest('.photoCard').remove() });
  newPhotoCardImage.addEventListener('click', function () { openPopupImage(newPhotoCard) });
  return newPhotoCard;
}

const addPhotoCard = function (nameValue, linkValue) {
  const newPhotoCard = createPhotoCard(nameValue, linkValue);
  collectionItemList.prepend(newPhotoCard);
}

// photoCard create edit form
// submit and close photoCard create edit form
const createNewPhotoCard = function (evt) {
  evt.preventDefault();

  if (isValidLink(photoCardLinkInputField.value)) {
    addPhotoCard(photoCardNameInputField.value, photoCardLinkInputField.value);
    closePopup(popupCreatePhotoCard);
    evt.target.reset();
  }

}

// add photoCards from array of objects
const addPhotoCardsFromArrayOfObjects = function (array) {
  array.slice().reverse().forEach(object => {
    addPhotoCard(object.name, object.link);
  });
}

// add photoCards from initial array
addPhotoCardsFromArrayOfObjects(initialCards);

// listeners
// popup
closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// profile
profileEditButton.addEventListener('click', openProfileEditForm);
profileEditForm.addEventListener('submit', handleProfileDataSubmit);

// photoCard
profileAddPhotoCardButton.addEventListener('click', () => { openPopup(popupCreatePhotoCard) });
photoCardCreateForm.addEventListener('submit', createNewPhotoCard);
