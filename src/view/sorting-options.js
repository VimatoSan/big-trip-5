import AbstractView from '../framework/view/abstract-view.js';
import {DEFAULT_SORTING_OPTIONS} from '../const.js';

function createSortingOptionTemplate(title, disabled, checked) {
  const label = title.charAt(0).toUpperCase() + title.slice(1);
  const disabledAttr = disabled ? ' disabled' : '';
  const checkedAttr = checked ? ' checked' : '';
  const sortTypeDataAttr = disabled ? '' : `data-sort-type = "${title}"`;
  return (
    `<div class="trip-sort__item  trip-sort__item--${title}">
      <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${sortTypeDataAttr} ${disabledAttr} ${checkedAttr}>
        <label class="trip-sort__btn" for="sort-${title}">${label}</label>
    </div>`
  );
}

function createSortContainerTemplate(sortingOptions) {
  const innerOptionsTemplate = Object.values(sortingOptions).map((option) =>
    createSortingOptionTemplate(option.title, option.disabled, option.checked)).join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${innerOptionsTemplate}
    </form>`
  );
}


export default class SortingOptions extends AbstractView {
  #handleSortTypeChange = null;
  #sortingOptions = null;
  constructor(onSortTypeChange, sortingOptions = DEFAULT_SORTING_OPTIONS) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sortingOptions = sortingOptions;

    this.element.addEventListener('click', this.#onClick);
  }

  #onClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortContainerTemplate(this.#sortingOptions);
  }
}
