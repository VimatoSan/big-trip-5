import {
  generateRandomImages,
  generateRandomNumber,
  generateText,
  getRandomArrayElement,
  getRandomElementsFromArray
} from '../utils.js';
import {CITIES, DATES, OFFERS, POINT_TYPES} from '../const.js';

const POINT_COUNT = 3;

function createMockData() {
  const destinations = generateDescriptions();
  const offers = generateOffers();
  const points = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    points.push(createPoint(offers, getRandomArrayElement(destinations)));
  }
  return {
    destinations,
    offers,
    points
  };
}

function createPoint(offers, destination) {
  const type = getRandomArrayElement(POINT_TYPES);
  const dateIdx = generateRandomNumber(0, DATES.length - 2);
  const allPointOffers = offers.find((offer) => offer.type === type);
  const selectedOffers = getRandomElementsFromArray(allPointOffers.offers, generateRandomNumber(1, allPointOffers.offers.length));
  return {
    type,
    basePrice: generateRandomNumber(20, 400),
    offers: selectedOffers.map((offer) => offer.id),
    destinationId: destination.id,
    isFavourite: getRandomArrayElement([true, false]),
    date: {
      start: DATES[dateIdx],
      end: DATES[dateIdx + 1]
    }
  };
}

function generateDescriptions() {
  const destinations = [];
  for (let i = 0; i < CITIES.length; i++) {
    destinations.push(createDestination(i + 1));
  }
  return destinations;
}

function createDestination(id) {
  return {
    id,
    city: getRandomArrayElement(CITIES),
    photos: generateRandomImages(generateRandomNumber(1, 7)),
    description: generateText()
  };
}

function generateOffers() {
  const offers = [];
  const createOffer = createOfferGenerator();
  for (const type of POINT_TYPES) {
    offers.push(createOffer(type));
  }
  return offers;
}

function createOfferGenerator() {
  let id = 1;
  return function (type) {
    const titles = OFFERS[type];
    const offers = [];
    for (const title of titles) {
      offers.push({
        id,
        title,
        price: generateRandomNumber(1, 200),
      });
      id++;
    }
    return {
      type,
      offers
    };
  };
}

export { createMockData };
