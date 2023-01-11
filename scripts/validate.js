import { FormValidator } from './FormValidator.js';
import validationConfig from './validationConfig.js';
import {profileEditForm, photoCardCreateForm} from './index.js';

const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);
profileEditFormValidator.enableValidation();

const photoCardCreateFormValidator = new FormValidator(validationConfig, photoCardCreateForm);
photoCardCreateFormValidator.enableValidation();

export {profileEditFormValidator, photoCardCreateFormValidator};
