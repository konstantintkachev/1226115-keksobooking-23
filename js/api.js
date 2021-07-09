import {showAlert} from './until.js';

const URL = 'https://23.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess) => {
  fetch(URL)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      showAlert('Ошибка подключения! Попробуйте еще раз.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
