const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({url, description, comments, likes, id}) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;
  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPreviews = (data) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  data.forEach(({id, likes, url, description, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    picturesList.appendChild(pictureElement);
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.dataset.thumbnailId = id;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
  });
};

export{createPreviews};

export {renderThumbnails};
