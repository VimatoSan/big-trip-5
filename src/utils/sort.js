import {durationToMinutes} from './time.js';

function sortByTimeDuration(pointA, pointB) {
  return durationToMinutes(pointB.date.start, pointB.date.end) - durationToMinutes(pointA.date.start, pointA.date.end);
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sortByDate(pointA, pointB) {
  return durationToMinutes(pointB.date.start, pointA.date.start);
}

export { sortByTimeDuration, sortByPrice, sortByDate };
