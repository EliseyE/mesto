// page
const pageElement = document.querySelector('.page');

// profile variables
const profileElement = pageElement.querySelector('.profile');
const editFormProfileOpenButtonElement = profileElement.querySelector('.profile__edit-button');
const editFormElementsOpenButtonElement = profileElement.querySelector('.profile__add-button');
let personName = profileElement.querySelector('.profile__name');
let personDescription = profileElement.querySelector('.profile__description');

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
const editFormCreateElementInputName = editFormCreateElementElement.querySelector('.edit-form__input_kind_create-element-name');
const editFormCreateElementInputLink = editFormCreateElementElement.querySelector('.edit-form__input_kind_create-element-link');

// elements variables
const elementsElement = pageElement.querySelector('.elements');
const elementsListElement = elementsElement.querySelector('.elements__list');
// const elementElement = elementsElement.querySelector('.elements__element');
// const elementLikeButton = elementElement.querySelector('.elements__like-button');

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
function editFormProfileSubmitHandler (evt) {
    evt.preventDefault();

    if ((editFormProfileInputFieldName.value !== '') && (editFormProfileInputFieldDescription.value !== '')) {
      personName.textContent = editFormProfileInputFieldName.value;
      personDescription.textContent = editFormProfileInputFieldDescription.value;
      closePopupElement(popupProfileEditElement);
    }
}

//elements's functions
const addElement = function(nameValue, linkValue) {
  const elementTemplate = pageElement.querySelector('#element').content;
  const elementElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const imgElement = elementElement.querySelector('img');

  // data
  elementElement.querySelector('.elements__description').textContent = nameValue;
  imgElement.alt = nameValue;
  imgElement.src = linkValue;

  elementElement.querySelector('.elements__like-button').addEventListener('click', function (evt) { evt.target.classList.toggle('elements__like-button_active');});

  elementsListElement.prepend(elementElement);
}

const addInitialElements = function(initialElements) {
  initialElements.slice().reverse().forEach(element => {
    addElement(element.name, element.link);
  });
}

addInitialElements(initialElements);



//edit form create element
// submit and close edit form profile
function createNewElement (evt) {
  evt.preventDefault();

  if ((editFormCreateElementInputName.value !== '') && (editFormCreateElementInputLink.value !== '')) {

    addElement(editFormCreateElementInputName.value, editFormCreateElementInputLink.value);

    closePopupElement(popupCreateElementElement);
    editFormCreateElementInputName.value = '';
    editFormCreateElementInputLink.value = '';
  }
}


// listeners
// profile
editFormProfileOpenButtonElement.addEventListener('click', openEditFormProfile);
popupProfileEditCloseButtonElement.addEventListener('click', function() { closePopupElement(popupProfileEditElement) } );
editFormProfileElement.addEventListener('submit', editFormProfileSubmitHandler);

// element
editFormElementsOpenButtonElement.addEventListener('click', function() { openPopupElement(popupCreateElementElement) } );
popupCreateElementCloseButtonElement.addEventListener('click', function() { closePopupElement(popupCreateElementElement) } );
editFormCreateElementElement.addEventListener('submit', createNewElement);


