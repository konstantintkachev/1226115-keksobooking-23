const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeaturesChecked = mapFilters.querySelectorAll('.map__features input[name="features"]');

const ANY = 'any';

const PRICE_VALUES = {
  any: {
    min: -Infinity,
    max: Infinity,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

const checkedFeatures = Array.from(housingFeaturesChecked);
const createFeaturesArray = () => {
  const featuresArray = [];
  checkedFeatures.forEach((element) => {
    const value = element.getAttribute('value');
    if (element.checked) {
      featuresArray.push(value);
    }
  });
  return featuresArray;
};

const checkFilterGuests = (advert) => housingGuests.value === ANY || advert.offer.guests === Number(housingGuests.value);
const checkFilterRooms = (advert) => housingRooms.value === ANY || advert.offer.rooms === Number(housingRooms.value);
const checkFilterPrice = (advert) => PRICE_VALUES[housingPrice.value].min < advert.offer.price && PRICE_VALUES[housingPrice.value].max > advert.offer.price;
const checkFilterType = (advert) => housingType.value === ANY || advert.offer.type === housingType.value;

const checkFiltersFeature = (advert) => {
  const checkedList = createFeaturesArray();
  return advert.offer.features && checkedList.every((checkFeature) => advert.offer.features.includes(checkFeature));
};

const createFilterAddData = (adverts) => {
  const filterAdverts = adverts.filter((advert) => checkFilterGuests(advert) && checkFilterRooms(advert) && checkFilterPrice(advert) && checkFilterType(advert) && checkFiltersFeature(advert));
  return filterAdverts;
};

export {
  createFilterAddData
};
