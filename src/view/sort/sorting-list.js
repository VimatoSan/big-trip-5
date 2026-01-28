import {createElement, render} from '../../render.js';
import SortingItem from './sorting-item.js';

const DEFAULT_SORTING_OPTIONS = [
  { title: 'day', disabled: false, checked: false },
  { title: 'event', disabled: true, checked: false },
  { title: 'time', disabled: false, checked: false },
  { title: 'price', disabled: false, checked: true },
  { title: 'offer', disabled: true, checked: false }
];

function createSortContainerTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    </form>`
  );
}


export default class SortingList {
  constructor(sortingOptions = DEFAULT_SORTING_OPTIONS) {
    this.sortingOptions = sortingOptions;
  }

  getTemplate() {
    return createSortContainerTemplate();
  }

  createSortingItems() {
    return this.sortingOptions.map((option) =>
      new SortingItem(option.title, option.disabled, option.checked)
    );
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.createSortingItems().forEach((sortingItem) => {
        render(sortingItem, this.element);
      });
    }

    return this.element;
  }
}
