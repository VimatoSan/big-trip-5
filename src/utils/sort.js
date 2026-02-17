import {durationToMinutes} from './time.js';

function sortByTimeDuration(pointA, pointB) {
  return durationToMinutes(pointB.dateFrom, pointB.dateTo) - durationToMinutes(pointA.dateFrom, pointA.dateTo);
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sortByDate(pointA, pointB) {
  return durationToMinutes(pointB.dateFrom, pointA.dateFrom);
}

export { sortByTimeDuration, sortByPrice, sortByDate };
