const noticeForm = document.querySelector('.notice');
const adForm = noticeForm.querySelector('.ad-form');
const fieldsetForm = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const selectForm = mapFiltersForm.querySelectorAll('select');

const addDisabled = (element, bool) => {
  // eslint-disable-next-line id-length
  for (let i = 0; i < element.length; i++) {
    element[i].disabled = bool;
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
makeActiveForm();

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

const titleForm = adForm.querySelector('#title');
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

const priceForm = adForm.querySelector('#price');
priceForm.setAttribute('max', 1000000);

const numberOfRooms = {
  1: ['для 1 гостя'],
  2: ['для 2 гостей', 'для 1 гостя'],
  3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  100: ['не для гостей'],
};
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');

const defaultOptions = [...guestNumber.options];
roomNumber.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  guestNumber.innerHTML = '';
  if (+selectedOption.value === 100) {
    guestNumber.append(defaultOptions[3]);
  } else {
    guestNumber.append(...defaultOptions.filter((option) => option.value <= selectedOption.value & option.value > 0));
  }
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
