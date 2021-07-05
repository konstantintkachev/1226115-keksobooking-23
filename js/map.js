// eslint-disable-next-line no-redeclare
/* global L:readonly */
import {renderCards, createCards} from './card.js';
import {makeActiveForm} from './form.js';

const LAT = 35.660940;
const LNG = 139.778745;

const map = L.map('map-canvas')
  .on('load', () => {
    makeActiveForm();
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [52, 26],
  },
);
const mainPinMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

renderCards.forEach((element) => {
  const iconPin = L.icon(
    {
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [40, 20],
    },
  );
  const markerPin =  L.marker(
    {
      lat: element.offer.address.lat,
      lng: element.offer.address.lng,
    },
    {
      icon: iconPin,
    },
  );
  markerPin
    .addTo(map)
    .bindPopup(createCards(element));
});

mainPinMarker.on('moveend', (evt) => {
  const mooveMarket = evt.target.getLatLng();
  const lat = mooveMarket.lat.toFixed(5);
  const lng = mooveMarket.lng.toFixed(5);
  // eslint-disable-next-line no-undef
  address.value = `${lat}, ${lng}`;
});
