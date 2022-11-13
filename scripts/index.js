// profile variables
const profileElement = document.querySelector('.profile');
const editFormOpenButtonElement = profileElement.querySelector('.profile__edit-button');
let personName = profileElement.querySelector('.profile__name');
let personDescription = profileElement.querySelector('.profile__description');

// edit form variables
const editFormElement = document.querySelector('.edit-form');
const editFormCloseButtonElement = editFormElement.querySelector('.edit-form__close-button');
const editFormSubmitButtonElement = editFormElement.querySelector('.edit-form__submit-button');
let editFormInputFieldName = editFormElement.querySelector('.edit-form__input-name');
let editFormInputFieldDescription = editFormElement.querySelector('.edit-form__input-description');

// functions

// open edit form
const openEditForm = function () {
  editFormInputFieldName.value = personName.textContent;
  editFormInputFieldDescription.value = personDescription.textContent;
  editFormElement.classList.add('edit-form_is-opened');
}

editFormOpenButtonElement.addEventListener('click', openEditForm);


// close edit form
const closeEditForm = function () {
  editFormElement.classList.remove('edit-form_is-opened');
}

editFormCloseButtonElement.addEventListener('click', closeEditForm);

// submit
function editFormSubmitHandler (evt) {
    evt.preventDefault();

    if ((editFormInputFieldName.value !== '') && (editFormInputFieldName.value !== '')) {
      personName.textContent = editFormInputFieldName.value;
      personDescription.textContent = editFormInputFieldDescription.value;
      closeEditForm();
    }
}

editFormElement.addEventListener('submit', editFormSubmitHandler);

//like
const elementsElement = document.querySelector('.elements');
const elementLikeButton = elementsElement.querySelectorAll('.elements__like-button');

const likeElement = function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
}

elementLikeButton.forEach(function(el) {
  el.addEventListener('click', likeElement);
});
