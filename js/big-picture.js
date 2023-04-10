const COMMENTS_IN_PART = 5;
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplateElement = document.querySelector('.social__comment');

let commentsShown = 0;
let comments = [];

// const createComment = ({avatar, name, message}) => {
//   const comment = document.createElement('li');
//   comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p>';
//   comment.classList.add('social__comment');
//   comment.querySelector('p').classList.add('social__text');
//   comment.querySelector('.social__picture').src = avatar;
//   comment.querySelector('.social__picture').alt = name;
//   comment.querySelector('.social__text').textContent = message;
//   return comment;
// };

const createComment = ({name, avatar, message}) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  const pictureElement = commentElement.querySelector('.social__picture');
  pictureElement.src = avatar;
  pictureElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  commentsShown += COMMENTS_IN_PART;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  // for (let i = 0; i < commentsShown; i++) {
  //   // const commentElement = createComment(comments[i]);
  //   commentList.append(...comments.slice(commentsShown).map(createComment));
  // }

  commentList.innerHTML = '';
  // commentList.append(fragment);
  commentList.append(...comments.slice(0,comments.length).map(createComment));
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const renderPictureDetails = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

cancelButton.addEventListener('click', hideBigPicture);
commentsLoader.addEventListener('click', renderComments);

export {showBigPicture, renderComments};
