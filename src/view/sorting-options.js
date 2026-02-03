import AbstractView from '../framework/view/abstract-view.js';

const DEFAULT_SORTING_OPTIONS = [
  { title: 'day', disabled: false, checked: false },
  { title: 'event', disabled: true, checked: false },
  { title: 'time', disabled: false, checked: false },
  { title: 'price', disabled: false, checked: true },
  { title: 'offer', disabled: true, checked: false }
];

function createSortingOptionTemplate(title, disabled, checked) {
  const label = title.charAt(0).toUpperCase() + title.slice(1);
  const disabledAttr = disabled ? ' disabled' : '';
  const checkedAttr = checked ? ' checked' : '';
  return (
    `<div class="trip-sort__item  trip-sort__item--${title}">
      <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${disabledAttr} ${checkedAttr}>
        <label class="trip-sort__btn" for="sort-${title}">${label}</label>
    </div>`
  );
}

function createSortContainerTemplate(sortingOptions) {
  const innerOptionsTemplate = sortingOptions.map((option) =>
    createSortingOptionTemplate(option.title, option.disabled, option.checked)).join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${innerOptionsTemplate}
    </form>`
  );
}


export default class SortingOptions extends AbstractView {
  constructor(sortingOptions = DEFAULT_SORTING_OPTIONS) {
    super();
    this.sortingOptions = sortingOptions;
  }

  get template() {
    return createSortContainerTemplate(this.sortingOptions);
  }
}
