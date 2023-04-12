const CONNECTION_ERROR_MESSAGE = 'Возникла проблема с загрузкой данных. Проверьте интернет-соединение';

import './upload-photo.js';
import {setUserFormSubmit, closeModal} from './upload-photo.js';
import './effects.js';
import './scale.js';
import {showAlert, debounce} from './util.js';
import {renderGallery} from './gallery.js';
import {getData} from './server.js';
import {filter, getFilteredPictures} from './filter.js';
import {renderThumbnails} from './thumbnail.js';

try {
  const data = await getData();
  const debouncedCreatePreviews = debounce(renderThumbnails);
  filter(data, debouncedCreatePreviews);
  renderThumbnails(getFilteredPictures());
  renderGallery(data);
} catch {
  showAlert(CONNECTION_ERROR_MESSAGE);
}

setUserFormSubmit(closeModal);
