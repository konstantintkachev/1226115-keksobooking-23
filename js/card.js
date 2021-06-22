import {similarArr, FEATURES} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const templateCard = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderCards = similarArr;

const createCards = (element) => {
  const elementCards = templateCard.cloneNode(true);
  const popupTitle = elementCards.querySelector('.popup__title').textContent = element.offer.title;
  if (!element.offer.title) {
    popupTitle.remove();
  }

  const popupAddress = elementCards.querySelector('.popup__text--address');
  popupAddress.textContent = `${element.offer.address.lat} это lat ${element.offer.address.lng} это lng`;
  if (!element.offer.address.lat || !element.offer.address.lng) {
    popupAddress.remove();
  }

  const popupPrice = elementCards.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  if (!element.offer.price) {
    popupPrice.remove();
  }

  const popupType = elementCards.querySelector('.popup__type').textContent = element.offer.type;
  if (!element.offer.type) {
    popupType.remove();
  }

  const popupCapacity = elementCards.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  if (!element.offer.rooms || !element.offer.guests) {
    popupCapacity.remove();
  }

  const popupTime = elementCards.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${element.offer.checkin}, выезд после ${element.offer.checkout}`;
  if (!element.offer.checkin || !element.offer.checkout) {
    popupTime.remove();
  }

  const popupFeatures = elementCards.querySelector('.popup__features');
  const modifiers = FEATURES.map((feature) => `popup__feature--${feature}`);
  const featureListElement = popupFeatures.querySelectorAll('.popup__features');
  featureListElement.forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  const popupDescription = elementCards.querySelector('.popup__description');
  popupDescription.textContent = element.offer.description;
  if (!element.offer.description) {
    popupDescription.remove();
  }

  const popupPhotos = elementCards.querySelector('.popup__photos');
  const parentElement = popupPhotos.children;
  parentElement[0].src = element.offer.photos;
  if (!element.offer.photos) {
    popupPhotos.remove();
  }

  const popupAvatar = elementCards.querySelector('.popup__avatar');
  popupAvatar.src = element.author.avatar;
  if (!element.author.avatar) {
    popupAvatar.remove();
  }
  return elementCards;
};
// eslint-disable-next-line no-console
mapCanvas.appendChild(createCards(renderCards[0]));
