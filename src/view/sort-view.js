import AbstractView from '../framework/view/abstract-view.js';
import {ActiveSortingOptions, SortTypes} from '../const.js';

function createSortingOptionTemplate(title, currentSort) {
  const label = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  const disabled = !ActiveSortingOptions.includes(title);
  const disabledAttr = disabled ? 'disabled' : '';
  const checkedAttr = title === currentSort ? ' checked' : '';
  const sortTypeDataAttr = disabled ? '' : `data-sort-type = "${title}"`;
  return (
    `<div class="trip-sort__item  trip-sort__item--${title}">
      <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${sortTypeDataAttr} ${disabledAttr} ${checkedAttr}>
        <label class="trip-sort__btn" for="sort-${title}">${label}</label>
    </div>`
  );
}

function createSortContainerTemplate(sortingOptions, currentSort) {
  const innerOptionsTemplate = sortingOptions.map((option) =>
    createSortingOptionTemplate(option, currentSort)).join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${innerOptionsTemplate}
    </form>`
  );
}


export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #sortingOptions = null;
  #currentSort = null;

  constructor(onSortTypeChange, currentSort = SortTypes.DAY, sortingOptions = Object.values(SortTypes)) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sortingOptions = sortingOptions;
    this.#currentSort = currentSort;

    this.element.addEventListener('click', this.#onClick);
  }

  #onClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortContainerTemplate(this.#sortingOptions, this.#currentSort);
  }
}
