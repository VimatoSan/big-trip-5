import AbstractView from '../framework/view/abstract-view.js';

function createTemplate(message) {
  return (
    `<p class="trip-events__msg">${message}</p>`
  );
}

export default class EmptyEventsView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createTemplate(this.#message);
  }
}
