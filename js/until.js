const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max) => {
  if (min >= max) {
    throw new Error('Ошибка! Минимальное значение не может быть больше или равно максимальному');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomLocation = (min, max, number) => {
  if (min >= max) {
    throw new Error('Ошибка! Минимальное значение не может быть больше или равно максимальному');
  }
  return (Math.random() * (max - min) + min).toFixed(number);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// eslint-disable-next-line id-length
const getNumber = (n) => (n < 10) ? (`0${n}`) : n;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getRandomLocation, getRandomArrayElement, getNumber, showAlert};
