const templateCard = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createCards = (element) => {

  const elementCards = templateCard.cloneNode(true);
  const popupTitle = elementCards.querySelector('.popup__title').textContent = element.offer.title;
  if (!element.offer.title) {
    popupTitle.remove();
  }
  const popupAddress = elementCards.querySelector('.popup__text--address');
  popupAddress.textContent = element.offer.address;
  if (!element.offer.address) {
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

  const featuresPopup = elementCards.querySelector('.popup__features');
  featuresPopup.innerHTML = '';
  const featuresArray = [];
  const featureElement = element.offer.features;
  const addfeaturesArray = featuresArray.push(featureElement);

  for (let item = 0; item <= addfeaturesArray.length - 1; item++) {
    const ad = addfeaturesArray[item];
    const newElement = document.createElement('li');
    newElement.classList.add('popup__feature', `popup__feature--${ad}`);
    featuresPopup.append(newElement);
  }

  if (!element.offer.features) {
    featuresPopup.remove();
  }

  const popupDescription = elementCards.querySelector('.popup__description');
  popupDescription.textContent = element.offer.description;
  if (!element.offer.description) {
    popupDescription.remove();
  }

  const photosPopup = elementCards.querySelector('.popup__photos');
  const photoPopup = elementCards.querySelector('.popup__photo');

  const insertPhoto = (el, array) => {
    el.innerHTML = '';
    if(array){
      array.forEach((item) => {
        const adPhoto = photoPopup.cloneNode(true);
        adPhoto.src = item;
        el.appendChild(adPhoto);
      });
    }
  };

  insertPhoto(photosPopup, element.offer.photos);

  if (!element.offer.photos) {
    photosPopup.remove();
  }

  const popupAvatar = elementCards.querySelector('.popup__avatar');
  popupAvatar.src = element.author.avatar;
  if (!element.author.avatar) {
    popupAvatar.remove();
  }
  return elementCards;
};

export {
  createCards
};
