import {
  createCards
} from './card.js';
import {
  makeActiveForm
} from './form.js';
import {
  getData
} from './api.js';
import {
  createFilterAddData
} from './filter.js';

const mapFilters = document.querySelector('.map__filters');
const LAT = 35.660940;
const LNG = 139.778745;
const address = document.querySelector('#address');
const SIMILAR_ADVERTS_COUNT = 10;
const RERENDER_DELAY = 500;

const map = L.map('map-canvas')
  .on('load', () => {
    makeActiveForm();
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [52, 26],
});
const mainPinMarker = L.marker({
  lat: LAT,
  lng: LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
});
mainPinMarker.addTo(map);
address.value = `${LAT}, ${LNG}`;

const pins = L.layerGroup();
pins
  .addTo(map);

const renderSimilarList = (ads) => {

  ads
    .slice(0, SIMILAR_ADVERTS_COUNT)
    .forEach((offer) => {

      const iconUsual = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [40, 20],
      });

      const markerFilter = L.marker({
        lat: offer.location.lat,
        lng: offer.location.lng,
      }, {
        icon: iconUsual,
      });

      markerFilter
        .addTo(map)
        .bindPopup(
          createCards(offer),
        );
      pins.addLayer(markerFilter);
    });
};

getData((adverts) => {

  const copyData = adverts.slice(0, SIMILAR_ADVERTS_COUNT);
  renderSimilarList(copyData);

  mapFilters.addEventListener('change', (_.debounce(() => {
    pins.clearLayers();
    renderSimilarList(createFilterAddData(copyData));
  }, RERENDER_DELAY)));
});

mainPinMarker.on('moveend', (evt) => {
  const mooveMarket = evt.target.getLatLng();
  const lat = mooveMarket.lat.toFixed(5);
  const lng = mooveMarket.lng.toFixed(5);
  address.value = `${lat}, ${lng}`;
});

export {
  mainPinMarker,
  LAT,
  LNG,
  pins
};
