import {resetEffects} from './effects.js';
import {resetScale} from './scale.js';
import {sendData} from './server.js';
import {isEscapeKey} from './util.js';

const COUNT_OF_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGE = 'хэштег начинайте с решетки, не более 5 хэштегов';

const formImgUpload = document.querySelector('.img-upload__form');
const uploadControl = document.querySelector('.img-upload__start');
const uploadPicture = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const fieldHashtag = uploadPicture.querySelector('.text__hashtags');
const fieldComment = uploadPicture.querySelector('.text__description');
const uploadSubmit = uploadPicture.querySelector('.img-upload__submit');
const sendSuccess = document.querySelector('#success').content.querySelector('.success');
const sendError = document.querySelector('#error').content.querySelector('.error');
const sendLoading = document.querySelector('#messages').content.querySelector('.img-upload__message--loading');

const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
const hasValidCount = (tags) => tags.length <= COUNT_OF_HASHTAGS;
const hasUniqueTags = (tags) => tags.length === new Set(tags).size;

const validateTags = (value) => {
  const tags = value
    .trim()
    .toLowerCase()
    .split(/\s+/);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  fieldHashtag,
  validateTags,
  ERROR_MESSAGE
);

const openModal = () => {
  uploadPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

uploadControl.addEventListener('change', () => {
  openModal();
});

const closeModal = () => {
  uploadPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetEffects();
  resetScale();
  pristine.reset();
  formImgUpload.reset();
};

uploadCancel.addEventListener('click', () => {
  closeModal();
});

const isFieldFocused = () => document.activeElement === fieldHashtag || document.activeElement === fieldComment;

const showMessage = (message) => {
  const messageElement = message.cloneNode(true);
  document.body.appendChild(messageElement);
  messageElement.classList.add('message');
  window.addEventListener('click', (evt) => {
    if (evt.target.matches('.message')) {
      document.body.querySelectorAll('.message').forEach((element) => element.remove());
    }
  }, {once:true});

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.body.querySelectorAll('.message').forEach((element) => element.remove());
    }
  }, {once:true});

  if (messageElement.contains(messageElement.querySelector('button'))) {
    messageElement.querySelector('button').addEventListener('click', () => {
      document.body.querySelectorAll('.message').forEach((element) => element.remove());
    }, {once:true});
  }
};

const blockUploadSubmit = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.style.opacity = 0.2;
  showMessage(sendLoading);
};

const unblockUploadSubmit = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.style.opacity = 1;
  document.querySelectorAll('.message').forEach((e) => e.remove());
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}, {once:true});


const setUserFormSubmit = (onSuccess) => {
  formImgUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockUploadSubmit();
      sendData(new FormData(evt.target))
        .then((Response) => {
          if (Response.ok) {
            onSuccess();
            closeModal();
            unblockUploadSubmit();
            showMessage(sendSuccess);
          }
        })
        .catch(() => {
          showMessage(sendError);
        });
    } else {
      showMessage(sendError);
      openModal();
    }
  });
};

export {setUserFormSubmit, openModal, closeModal};
