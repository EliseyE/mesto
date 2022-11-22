// page
const pageElement = document.querySelector('.page');

// profile variables
const profileElement = pageElement.querySelector('.profile');
const editFormOpenButtonElement = profileElement.querySelector('.profile__edit-button');
let personName = profileElement.querySelector('.profile__name');
let personDescription = profileElement.querySelector('.profile__description');

// popup close button
const popupElement = pageElement.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

// edit form variables
const editFormElement = popupElement.querySelector('.profile-edit-form');
const editFormSubmitButtonElement = editFormElement.querySelector('.profile-edit-form__submit-button');
let editFormInputFieldName = editFormElement.querySelector('.profile-edit-form__input_kind_name');
let editFormInputFieldDescription = editFormElement.querySelector('.profile-edit-form__input_kind_description');

//elements variables
const elementsElement = pageElement.querySelector('.elements');
const elementsListElement = pageElement.querySelector('.elements__list');

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

// open edit form
const openEditForm = function () {
  editFormInputFieldName.value = personName.textContent;
  editFormInputFieldDescription.value = personDescription.textContent;
  popupElement.classList.add('popup_is-opened');
}

// close edit form
const closeEditForm = function () {
  popupElement.classList.remove('popup_is-opened');
}

// submit and close edit form
function editFormSubmitHandler (evt) {
    evt.preventDefault();

    if ((editFormInputFieldName.value !== '') && (editFormInputFieldDescription.value !== '')) {
      personName.textContent = editFormInputFieldName.value;
      personDescription.textContent = editFormInputFieldDescription.value;
      closeEditForm();
    }
}

//elements's functions
const addElement = function(nameValue, linkValue) {
  const elementTemplate = pageElement.querySelector('#element').content;
  const elementElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const imgElement = elementElement.querySelector('img');

  elementElement.querySelector('.elements__description').textContent = nameValue;
  imgElement.alt = nameValue;
  imgElement.src = linkValue;

  elementsListElement.append(elementElement);
}

const addInitialElements = function(initialElements) {
  initialElements.forEach(element => {
    addElement(element.name, element.link);
  });
}

addInitialElements(initialElements);

// listeners
editFormOpenButtonElement.addEventListener('click', openEditForm);
popupCloseButtonElement.addEventListener('click', closeEditForm);
editFormElement.addEventListener('submit', editFormSubmitHandler);
