import {createElement} from '../../render.js';

function createSortingItem(title, disabled, checked) {
  const label = title.charAt(0).toUpperCase() + title.slice(1);
  const disabledAttr = disabled ? ' disabled' : '';
  const checkedAttr = checked ? ' checked' : '';

  return (
    ` <div class="trip-sort__item  trip-sort__item--${title}">
        <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${disabledAttr} ${checkedAttr}>
          <label class="trip-sort__btn" for="sort-${title}">${label}</label>
      </div>`
  );
}

export default class SortingItem {
  constructor(title, disabled = false, checked = false) {
    this.title = title;
    this.disabled = disabled;
    this.checked = checked;
  }

  getTemplate() {
    return createSortingItem(this.title, this.disabled, this.checked);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
