import {isEscapeKey} from './utils.js';
import { sendData } from './fetch.js';
import { showError } from './utils.js';
import { resetParams } from './slider.js';

const formNode = document.querySelector('.img-upload__form');
const formModal = document.querySelector('.img-upload__overlay');
const photoChoose = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const userHashTags = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(formNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-wrapper',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

function submitForm(form, onSuccess) {
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(form)
      .then(onSuccess)
      .catch(
        (err) => {
          showError(err.message);
        }
      )
      .finally(unblockSubmitButton);
  }
}

function onDocumentKeydown(event) {
  if (isEscapeKey(event)) {
    event.stopPropagation();
    formClose();
  }
}

function stopPropOnEsc(event) {
  if (isEscapeKey(event)) {
    event.stopPropagation();
  }
}

function formOpen() {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  userHashTags.addEventListener('keydown', (evt) => stopPropOnEsc(evt));
  userComment.addEventListener('keydown', (evt) => stopPropOnEsc(evt));
}

function formClose() {
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formNode.reset();
  resetParams(false);
  document.removeEventListener('keydown', onDocumentKeydown);
}


const userHashTagsArray = (inputString) => inputString.trim().split(' ').filter((array) => Boolean(array.length));

const HASHTAGS_MAX_QTY = 5;
const userHashTagsValidSum = (value) => userHashTagsArray(value).length <= HASHTAGS_MAX_QTY;

const HashRegEx = /^#[a-zа-яё0-9]{1,19}$/i;
const userHashTagsValidHashtag = (value) => userHashTagsArray(value).every((string) => HashRegEx.test(string));

const userHashTagsValidUnique = (value) => {
  const userHashTagsArrayLover = userHashTagsArray(value).map((string) => string.toLowerCase());
  return userHashTagsArrayLover.length === new Set(userHashTagsArrayLover).size;
};

const errorTextValidSum = () => `Для использования доступны только ${HASHTAGS_MAX_QTY} хэштегов`;
const errorTextValidHashtag = () => 'Введён некорректный хэштег';
const errorTextValidUnique = () => 'Невозможно использовать одинаковые хэштеги';

pristine.addValidator(userHashTags, userHashTagsValidSum, errorTextValidSum, 3);
pristine.addValidator(userHashTags, userHashTagsValidHashtag, errorTextValidHashtag, 2);
pristine.addValidator(userHashTags, userHashTagsValidUnique, errorTextValidUnique, 1);

formNode.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
photoChoose.addEventListener('input', formOpen);
closeButton.addEventListener('click', formClose);
formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();

  submitForm(evt.target, formClose());
});
