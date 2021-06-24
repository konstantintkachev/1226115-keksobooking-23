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
