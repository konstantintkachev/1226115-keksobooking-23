const getRandomNumber = (min, max) => {
  if (min >= max) {
    throw new Error('Ошибка! Минимальное значение не может быть больше или равно максимальному');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomNumber(1, 5);

const getRandomLocation = (min, max, number) => {
  if (min >= max) {
    throw new Error('Ошибка! Минимальное значение не может быть больше или равно максимальному');
  }
  return (Math.random() * (max - min) + min).toFixed(number);
};
getRandomLocation(1, 2, 1);
