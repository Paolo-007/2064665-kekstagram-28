const COUNT_OF_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGE = 'хэштег начинайте с решетки, не более 5 хэштегов';

const formImgUpload = document.querySelector('.img-upload__form');
const uploadControl = document.querySelector('.img-upload__start');
const uploadPicture = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const fieldHashtag = uploadPicture.querySelector('.text__hashtags');


const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
const hasValidCount = (tags) => tags.length <= COUNT_OF_HASHTAGS;
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
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
  document.querySelector('body').classList.remove('modal-open');
  pristine.reset();
};

uploadCancel.addEventListener('click', () => {
  closeModal();
});
