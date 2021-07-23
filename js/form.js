import {
  sendData
} from './api.js';
import {
  mainPinMarker,
  LAT,
  LNG,
  map,
  resetMarkerPosition,
  startRendering
} from './map.js';

import {
  previewAvatar,
  previewFlatPhoto
} from './avatar.js';

const numberOfRooms = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const typeMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

const noticeForm = document.querySelector('.notice');
const adForm = noticeForm.querySelector('.ad-form');
const fieldsetForm = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const selectForm = mapFiltersForm.querySelectorAll('select');
const priceForm = document.querySelector('#price');
const typeForm = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const body = document.querySelector('body');
const defaultOptions = [...guestNumber.options];
const resetButtonAdForm = adForm.querySelector('.ad-form__reset');
const titleForm = adForm.querySelector('#title');
const templateError = document.querySelector('#error')
  .content
  .querySelector('.error');

typeForm.addEventListener('change', () => {
  priceForm.placeholder = typeMinPrice[typeForm.value];
  priceForm.min = typeMinPrice[typeForm.value];
});

const addDisabled = (element, bool) => {
  for (let item = 0; item < element.length; item++) {
    element[item].disabled = bool;
  }
};

const makeDisabledForm = () => {
  adForm.classList.add('ad-form--disabled');
  addDisabled(fieldsetForm, true);
  mapFiltersForm.classList.add('ad-form--disabled');
  addDisabled(selectForm, true);
};
makeDisabledForm();

const makeActiveForm = () => {
  adForm.classList.remove('ad-form--disabled');
  addDisabled(fieldsetForm, false);
  mapFiltersForm.classList.remove('ad-form--disabled');
  addDisabled(selectForm, false);
};

titleForm.addEventListener('input', () => {
  const valueLength = titleForm.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleForm.setCustomValidity(`Введите ещё ${MIN_NAME_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleForm.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} символы`);
  } else {
    titleForm.setCustomValidity('');
  }
  titleForm.reportValidity();
});

const getChangeParametrs = (value = 1) => {
  guestNumber.innerHTML = '';
  if (+value === 100) {
    guestNumber.append(defaultOptions[3]);
  } else {
    guestNumber.append(...defaultOptions.filter((option) => option.value <= value & option.value > 0));
  }
};
getChangeParametrs();

roomNumber.addEventListener('change', (evt) => {
  const selectedOption = evt.target.options[evt.target.selectedIndex];
  getChangeParametrs(selectedOption.value);
});

guestNumber.addEventListener('change', (event) => {
  const userChoice = event.target.value;

  guestNumber.setCustomValidity('');

  if (!numberOfRooms[roomNumber.value].includes(userChoice)) {
    guestNumber.setCustomValidity('Количество гостей не должно превышать количеству комнат');
  }
  guestNumber.reportValidity();
});

roomNumber.addEventListener('change', (event) => {
  const userChoice = event.target.value;

  roomNumber.setCustomValidity('');

  if (!numberOfRooms[userChoice].includes(guestNumber.value)) {
    roomNumber.setCustomValidity('Количество комнат должно соответствовать количеству людей или меньше');
  }
  roomNumber.reportValidity();
});

const makeSameValue = (first, second) => {
  first.value = second.value;
};

checkIn.addEventListener('change', () => {
  makeSameValue(checkOut, checkIn);
});

checkOut.addEventListener('change', () => {
  makeSameValue(checkIn, checkOut);
});

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const templateSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');

const getSuccessMessage = () => {
  const elementCards = templateSuccess.cloneNode(true);
  body.insertBefore(elementCards, null);

  document.addEventListener('click', () => {
    elementCards.remove();
  });

  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      elementCards.remove();
    }
  });
};

const resetForm = () => {
  adForm.reset();
  map.closePopup();
  mapFiltersForm.reset();
  resetMarkerPosition();
  startRendering();
  previewAvatar.src = 'img/muffin-grey.svg';
  const newChild = previewFlatPhoto.querySelector('.ad-form__photo img');
  if (previewFlatPhoto.childNodes.length > 0) { previewFlatPhoto.removeChild(newChild); }
  adForm.addEventListener('reset', () => {
    mainPinMarker.setLatLng({
      lat: LAT,
      lng: LNG,
    });
  });
};

resetButtonAdForm.addEventListener('click', () => {
  resetForm();
});

const getErrorMessage = () => {
  const elementCards = templateError.cloneNode(true);
  body.insertBefore(elementCards, null);
  const errorButton = elementCards.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    elementCards.remove();
  });

  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      elementCards.remove();
    }
  });

  document.addEventListener('click', () => {
    elementCards.remove();
  });

};

const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(resetForm()),
      () => onFail(),
      new FormData(adForm),
    );
  });
};

setUserFormSubmit(getSuccessMessage, getErrorMessage);

export {
  makeActiveForm
};
