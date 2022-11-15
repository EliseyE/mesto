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

// listeners
editFormOpenButtonElement.addEventListener('click', openEditForm);
popupCloseButtonElement.addEventListener('click', closeEditForm);
editFormElement.addEventListener('submit', editFormSubmitHandler);
