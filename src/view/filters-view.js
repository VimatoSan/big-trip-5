import AbstractView from '../framework/view/abstract-view.js';
import {FilterTypes} from '../const';

function createFilterTemplate(title, currentFilter) {
  const label = title.charAt(0).toUpperCase() + title.slice(1);
  const checked = currentFilter === title ? 'checked' : '';
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${title}" ${checked}>
        <label class="trip-filters__filter-label" for="filter-${title}">${label}</label>
    </div>`
  );
}

function createFilterContainerTemplate(filters, currentFilter) {
  const innerFilters = filters.map((filter) => createFilterTemplate(filter.toLowerCase(), currentFilter)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
      ${innerFilters}
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  #currentFilter = null;
  #filters = null;
  #handleFilterChange = null;

  constructor({onChange, filters = Object.values(FilterTypes), currentFilter = FilterTypes.EVERYTHING}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onChange;

    this.element.addEventListener('click', this.#onClick);
  }

  #onClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#handleFilterChange(evt.target.value);
  };

  get template() {
    return createFilterContainerTemplate(this.#filters, this.#currentFilter);
  }
}
