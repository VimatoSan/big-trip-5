import {createElement, render} from '../../render.js';
import FilterItem from './FilterItem.js';

function createFilterContainerTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterList {
  constructor(filters = ['everything', 'future', 'present', 'past']) {
    this.filters = filters;
  }

  getTemplate() {
    return createFilterContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.filters.forEach((filterTitle) => {
        render(
          new FilterItem(filterTitle),
          this.element);
      });
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
