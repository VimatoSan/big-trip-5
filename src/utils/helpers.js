import { TEXT_TEMPLATE } from '../const.js';

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
    images.push(`img/photos/${id % 5 + 1}.jpg`);
  }
  return images;
}

function createIdGenerator() {
  let id = 1;
  return function () {
    return id++;
  };
}

function getObjectFromArrayById(array, id) {
  return array.find((item) => item.id === id);
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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, updateItem, generateRandomNumber, generateRandomImages, generateText,
  getRandomElementsFromArray, createIdGenerator, getObjectFromArrayById};
