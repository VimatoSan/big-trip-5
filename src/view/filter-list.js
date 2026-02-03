import AbstractView from '../framework/view/abstract-view.js';
import {DEFAULT_FILTERS} from '../const';

function createFilterTemplate(title) {
  const label = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${title}">
        <label class="trip-filters__filter-label" for="filter-${title}">${label}</label>
    </div>`
  );
}

function createFilterContainerTemplate(filters) {
  const innerFilters = filters.map((filter) => createFilterTemplate(filter)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
      ${innerFilters}
    </form>`
  );
}

export default class FilterList extends AbstractView {
  constructor(filters = DEFAULT_FILTERS) {
    super();
    this.filters = filters;
  }

  get template() {
    return createFilterContainerTemplate(this.filters);
  }
}
