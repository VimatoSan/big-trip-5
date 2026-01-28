import {TEXT_TEMPLATE} from './const.js';
import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generateRandomNumber(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function generateRandomImages(count) {
  const ids = Array.from({ length: 100 }, (_ ,i) => i + 1);
  const selectedIds = getRandomElementsFromArray(ids, count);
  const images = [];
  for (const id of selectedIds) {
    images.push(`https://loremflickr.com/248/152?random=${id}`);
  }
  return images;
}

function generateText() {
  const sentences = TEXT_TEMPLATE.split('.');
  return getRandomElementsFromArray(sentences, generateRandomNumber(1, 5));
}

function getRandomElementsFromArray(array, size = 1) {
  const selected = [];
  const available = array.slice();
  if (size >= array.length) {
    return array;
  }
  while (selected.length < size) {
    const index = generateRandomNumber(0, available.length - 1);
    selected.push(available[index]);
    available.splice(index, 1);
  }
  return selected;
}


function humanizeFullDate(dueDate) {
  return dueDate ? dayjs(dueDate).format('DD/MM/YY HH:mm').toUpperCase() : '';
}

function humanizeDateDay(dueDate) {
  return dueDate ? dayjs(dueDate).format('MMM DD').toUpperCase() : '';
}

function humanizeDateHour(dueDate) {
  return dueDate ? dayjs(dueDate).format('HH:mm').toUpperCase() : '';
}

function humanizeDuration(startTime, endTime) {
  const totalMin = dayjs(endTime).diff(dayjs(startTime), 'minute');
  if (totalMin < 60) {
    return `${totalMin}M`;
  }
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;
  if (days === 0) {
    return `${String(hours).padStart(2,'0')}H ${String(mins).padStart(2,'0')}M`;
  }
  return `${String(days).padStart(2,'0')}D ${String(hours).padStart(2,'0')}H ${String(mins).padStart(2,'0')}M`;
}

export {getRandomArrayElement, generateRandomNumber, generateRandomImages, generateText, getRandomElementsFromArray, humanizeDateDay, humanizeDateHour, humanizeDuration, humanizeFullDate};
