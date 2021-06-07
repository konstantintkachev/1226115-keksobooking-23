const TITLE = ['Домик в деревне', 'Набережная мойки', 'Вилла в Шерегеше', 'Особняк на Рублевке'];
const LOCATION_X_FIRST = 35.65000;
const LOCATION_X_SECOND = 35.70000;
const LOCATION_Y_FIRST = 139.70000;
const LOCATION_Y_SECOND = 139.80000;
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['Рай в шалаше', 'Кошкин дом', 'Избушка на ножках', 'Теремок'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'http://o0.github.io/assets/https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg/tokyo/hotel3.jpg'];
const CREATE_DATA = 10;
const ANY_NUMBER_FIRST = 1;
const ANY_NUMBER_SECOND = 8;
const MAX_PRICE = 50000;

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

const LAT_X = getRandomLocation(LOCATION_X_FIRST, LOCATION_X_SECOND, 5);
const LNG_Y =  getRandomLocation(LOCATION_Y_FIRST, LOCATION_Y_SECOND, 5);

const createRandomValues = () => ({
  author: {
    avatar: `img/avatars/user0${getRandomNumber(ANY_NUMBER_FIRST, ANY_NUMBER_SECOND)}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLE),
    address: {
      lat: LAT_X,
      lng: LNG_Y,
    },
    price: getRandomNumber(ANY_NUMBER_FIRST, MAX_PRICE),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomNumber(ANY_NUMBER_FIRST, ANY_NUMBER_SECOND),
    guests: getRandomNumber(ANY_NUMBER_FIRST, ANY_NUMBER_SECOND),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getRandomArrayElement(FEATURES),
    description: getRandomArrayElement(DESCRIPTION),
    photos: getRandomArrayElement(PHOTOS),
  },
  location: {
    lat: LAT_X,
    lng: LNG_Y,
  },
});

const similarArr = new Array(CREATE_DATA).fill('').map(() => createRandomValues());
// eslint-disable-next-line no-console
console.log(similarArr);
