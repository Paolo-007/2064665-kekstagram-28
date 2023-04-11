import './upload-photo.js';
import {setUserFormSubmit, closeModal} from './upload-photo.js';
import './effects.js';
import './scale.js';
import {showAlert} from './util.js';
import {renderGallery} from './gallery.js';
import {getData} from './server.js';

const CONNECTION_ERROR_MESSAGE = 'Возникла проблема с загрузкой данных. Проверьте интернет-соединение';

try {
  const data = await getData();
  renderGallery(data);
} catch {
  // showAlert('Возникла проблема с загрузкой данных. Проверьте интернет-соединение');
  showAlert(CONNECTION_ERROR_MESSAGE);
}

setUserFormSubmit(closeModal);
