// page
const pageElement = document.querySelector('.page');
const pageElement1 = document.querySelectorAll

// profile variables
const profileElement = pageElement.querySelector('.profile');
const editFormProfileOpenButtonElement = profileElement.querySelector('.profile__edit-button');
const editFormElementsOpenButtonElement = profileElement.querySelector('.profile__add-button');
const personName = profileElement.querySelector('.profile__name');
const personDescription = profileElement.querySelector('.profile__description');

// profile popup
// popup profile close button
const popupProfileEditElement = pageElement.querySelector('.popup_type_profile');
const popupProfileEditCloseButtonElement = popupProfileEditElement.querySelector('.popup__close-button_type_profile');

// edit form profile variables
const editFormProfileElement = popupProfileEditElement.querySelector('.edit-form_type_profile');
const editFormProfileInputFieldName = editFormProfileElement.querySelector('.edit-form__input_kind_profile-name');
const editFormProfileInputFieldDescription = editFormProfileElement.querySelector('.edit-form__input_kind_profile-description');

// element popup
// popup profile close button
const popupCreateElementElement = pageElement.querySelector('.popup_type_create-element');
const popupCreateElementCloseButtonElement = popupCreateElementElement.querySelector('.popup__close-button_type_create-element');

// edit form create element varables
const editFormCreateElementElement = pageElement.querySelector('.edit-form_type_create-element');
const editFormCreateElementInputFieldsetElement = editFormCreateElementElement.querySelector('.edit-form__input-container');
const editFormCreateElementInputName = editFormCreateElementElement.querySelector('.edit-form__input_kind_create-element-name');
const editFormCreateElementInputLink = editFormCreateElementElement.querySelector('.edit-form__input_kind_create-element-link');

// elements variables
const elementsElement = pageElement.querySelector('.elements');
const elementsListElement = elementsElement.querySelector('.elements__list');

// popup-image (figure-space) variables
const popupImageElement = pageElement.querySelector('.popup_type_image');
const popupImageElementCloseButton = popupImageElement.querySelector('.popup__close-button_type_image');
const popupImageUnit = popupImageElement.querySelector('.figure-space__image');
const popupImageCaption = popupImageElement.querySelector('.figure-space__caption');


const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//
// functions

// common
const removeElement = function (element) {
  element.remove();
}

const cleanAllInputValues = function (element) {
  let item = element.querySelectorAll('input');
  item.forEach(item => {
    item.value = '';
  });
}

const isValidLink = function (url) {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return true;
  };
    alert("Ссылка нерабочая - введите адрес, начинающийся с https:// или http://");
    return false;
}

//popup
const openPopupElement = function (item) {
  item.classList.add('popup_is-opened');
}

const closePopupElement = function (item) {
  item.classList.remove('popup_is-opened');
}

//edit form profile
// open edit form profile
const openEditFormProfile = function () {
  editFormProfileInputFieldName.value = personName.textContent;
  editFormProfileInputFieldDescription.value = personDescription.textContent;
  openPopupElement(popupProfileEditElement);
}

// submit and close edit form profile
const editFormProfileSubmitHandler = function (evt) {
    evt.preventDefault();

    if ((editFormProfileInputFieldName.value !== '') && (editFormProfileInputFieldDescription.value !== '')) {
      personName.textContent = editFormProfileInputFieldName.value;
      personDescription.textContent = editFormProfileInputFieldDescription.value;
      closePopupElement(popupProfileEditElement);
    }
}

//elements's functions
// wtite data in popup-image
const writeDataInPopupImage = function (element) {
  popupImageUnit.src = element.querySelector('img').src;
  popupImageUnit.alt = element.querySelector('.elements__description').textContent
  popupImageCaption.textContent = popupImageUnit.alt;
}

// open popup-image
const openPopupImageElement = function (element) {
  writeDataInPopupImage(element);
  openPopupElement(popupImageElement);
}

//  close popup-image
const closePopupImageElement = function (popupImageElement) {
  closePopupElement(popupImageElement);
  setTimeout (function() {
    popupImageUnit.src = "#";
    popupImageUnit.alt = "Картинка";
    popupImageCaption.textContent = "";
  }, 100);
}

// add
const addElement = function (nameValue, linkValue) {
  const elementTemplate = pageElement.querySelector('#element').content;
  const elementElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const imgElement = elementElement.querySelector('img');

  elementElement.querySelector('.elements__description').textContent = nameValue;
  imgElement.alt = nameValue;
  imgElement.src = linkValue;

  elementElement.querySelector('.elements__like-button').addEventListener('click', function (evt) { evt.target.classList.toggle('elements__like-button_active');});
  elementElement.querySelector('.elements__trash-button').addEventListener('click', function () { removeElement(elementElement) });
  elementElement.querySelector('.elements__image').addEventListener('click', function () { openPopupImageElement(elementElement) })

  elementsListElement.prepend(elementElement);
}

const addInitialElements = function (initialElements) {
  initialElements.slice().reverse().forEach(element => {
    addElement(element.name, element.link);
  });
}

// initial adding of elements
addInitialElements(initialElements);

//edit form create element
// submit and close edit form profile
const createNewElement = function (evt) {
  evt.preventDefault();

  if (isValidLink(editFormCreateElementInputLink.value)) {
    addElement(editFormCreateElementInputName.value, editFormCreateElementInputLink.value);
    closePopupElement(popupCreateElementElement);
    cleanAllInputValues(editFormCreateElementInputFieldsetElement);
  }
}

// close create element form
const closePopupCreateElementEditForm = function () {
  closePopupElement(popupCreateElementElement);
  cleanAllInputValues(editFormCreateElementInputFieldsetElement);
}

// listeners
// profile
editFormProfileOpenButtonElement.addEventListener('click', openEditFormProfile);
popupProfileEditCloseButtonElement.addEventListener('click', function() { closePopupElement(popupProfileEditElement) } );
editFormProfileElement.addEventListener('submit', editFormProfileSubmitHandler);

// element
editFormElementsOpenButtonElement.addEventListener('click', function() { openPopupElement(popupCreateElementElement) } );
popupCreateElementCloseButtonElement.addEventListener('click', closePopupCreateElementEditForm);
editFormCreateElementElement.addEventListener('submit', createNewElement);

// popup-image
popupImageElementCloseButton.addEventListener('click', function () { closePopupElement(popupImageElement) });

