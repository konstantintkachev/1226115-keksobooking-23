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

const SIMILAR_ADVERTS_COUNT = 10;
const RERENDER_DELAY = 500;
const ZOOM = 12;
const LAT = 35.660940;
const LNG = 139.778745;
const COMMA_NUMBER = 5;

const MAIN_ICON_DATA = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [52, 26],
};

const USAUAL_ICON_DATA = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [40, 20],
};

const mapFilters = document.querySelector('.map__filters');
const address = document.querySelector('#address');


const map = L.map('map-canvas')
  .on('load', () => {
    makeActiveForm();
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_ICON_DATA.iconUrl,
  iconSize: MAIN_ICON_DATA.iconSize,
  iconAnchor: MAIN_ICON_DATA.iconAnchor,
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
        iconUrl: USAUAL_ICON_DATA.iconUrl,
        iconSize: USAUAL_ICON_DATA.iconSize,
        iconAnchor: USAUAL_ICON_DATA.iconAnchor,
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

const startRendering = () => {
  getData((adverts) => {
    const copyData = adverts;
    renderSimilarList(copyData.slice(0, SIMILAR_ADVERTS_COUNT));
    mapFilters.addEventListener('change', (_.debounce(() => {
      pins.clearLayers();
      renderSimilarList(createFilterAddData(copyData));
    }, RERENDER_DELAY)));
  });
};

startRendering();

address.value = `${map._lastCenter.lat} , ${map._lastCenter.lng}`;

const resetMarkerPosition = () => {
  map.setView([LAT, LNG], ZOOM);
  map.closePopup();
  pins.clearLayers();
  mainPinMarker.setLatLng({ lat: LAT, lng: LNG });
  address.value = `${LAT}, ${LNG}`;
};

mainPinMarker.on('moveend', (evt) => {
  const mooveMarket = evt.target.getLatLng();
  const lat = mooveMarket.lat.toFixed(COMMA_NUMBER);
  const lng = mooveMarket.lng.toFixed(COMMA_NUMBER);
  address.value = `${lat}, ${lng}`;
});

export {
  mainPinMarker,
  LAT,
  LNG,
  map,
  resetMarkerPosition,
  startRendering
};
