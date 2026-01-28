import {createElement} from '../../render.js';

function createFilterItem(title) {
  const label = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${title}">
        <label class="trip-filters__filter-label" for="filter-${title}">${label}</label>
    </div>`
  );
}

export default class FilterItem {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createFilterItem(this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}

