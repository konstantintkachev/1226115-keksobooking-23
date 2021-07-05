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

export {getRandomNumber, getRandomLocation, getRandomArrayElement, getNumber};
