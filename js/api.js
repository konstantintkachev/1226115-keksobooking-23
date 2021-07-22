import {
  showAlert
} from './popup.js';

const GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      showAlert('Ошибка подключения! Попробуйте ещё раз.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {
  getData,
  sendData,
  GET_URL
};
