import {humanizeFullDate} from '../../utils/time.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {createDestinationSectionTemplate} from './sections/destination-section.js';
import {createOffersSectionTemplate} from './sections/offers-section.js';
import {getObjectFromArrayById} from '../../utils/helpers.js';
import {POINT_TYPES} from '../../const.js';

function isNewPoint(point) {
  return !point.basePrice || point.basePrice === 0 || !point.destination;
}

function createDestinationsListTemplate(destinations) {
  const destinationItems = destinations.map((d) => `<option value="${d.city}"><option>`).join('');
  return (
    `<datalist id="destination-list-1">
        ${destinationItems}
    </datalist>`);
}

function createCloseBtnTemplate(point) {
  if (isNewPoint(point)) {
    return '';
  }
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
     </button>`);
}

function createEventTypeItemTemplate(type, isChecked) {
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  const checked = isChecked ? 'checked' : '';
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${typeLabel}</label>
    </div>
    `
  );
}

function createOfferTypeSelector(offerType) {
  const items = POINT_TYPES.map((item) => createEventTypeItemTemplate(item, item === offerType)).join('');
  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${items}
      </fieldset>
    </div>`
  );
}

function createFormContainerTemplate(point, destinations) {
  const {type, basePrice, date, destination, offers, pointTypeOffers} = point;
  const resetButtonTitle = isNewPoint(point) ? 'Cancel' : 'Delete';
  const closeButton = createCloseBtnTemplate(point);

  const destinationsList = createDestinationsListTemplate(destinations);
  const offersSection = createOffersSectionTemplate(offers, pointTypeOffers);
  const destinationSection = createDestinationSectionTemplate(destination.description, destination.photos);
  const typeList = createOfferTypeSelector(type);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            ${typeList}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
            ${destinationsList}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeFullDate(date.start)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeFullDate(date.end)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${resetButtonTitle}</button>
          ${closeButton}
        </header>
        <section class="event__details">

          ${offersSection}
          ${destinationSection}

        </section>
      </form>
    </li>`
  );
}

export default class EditPointForm extends AbstractStatefulView {
  #handleSubmit = null;
  #handleCloseBtnClick = null;
  #destinations = null;
  #offers = null;

  constructor({point, onSubmit, onCloseBtnClick, destinations, offers}) {
    super();
    this.#handleSubmit = onSubmit;
    this.#handleCloseBtnClick = onCloseBtnClick;
    this.#destinations = destinations;
    this.#offers = offers;
    this._setState(this.#parsePointToState(point));
    this._restoreHandlers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(this.#parseStateToPoint(this._state));
  };

  get template() {
    return createFormContainerTemplate(this._state, this.#destinations);
  }

  #parsePointToState(point) {
    return {...point,
      pointTypeOffers: this.#getOffersByType(point.type),
    };
  }

  #parseStateToPoint(state) {
    const point = {...state};
    delete point.pointTypeOffers;
    return point;
  }

  #changeDestinationHandler = (evt) => {
    const newDestination = this.#getDestinationByCity(evt.target.value);
    if (newDestination) {
      this.updateElement({
        destination: newDestination,
      });
    }
  };

  #changeTypeHandler = (evt) => {
    const type = evt.target.value;
    this.updateElement({
      type,
      offers: [],
      pointTypeOffers: this.#getOffersByType(type),
    });
  };

  #getOffersByType(type) {
    return this.#offers.find((o) => o.type === type).offers;
  }

  #getDestinationByCity(city) {
    return this.#destinations.find((d) => d.city === city);
  }

  #changeOfferHandler = (evt) => {
    const id = Number(evt.target.dataset.offerId);
    const pointTypeOffers = this.#getOffersByType(this._state.type);
    const newOffer = getObjectFromArrayById(pointTypeOffers, id);
    const updatedOffers = this._state.offers.map((o) => o.id).includes(id)
      ? this._state.offers.filter((o) => o.id !== id)
      : [...this._state.offers, newOffer];

    this._setState({
      offers: updatedOffers,
    });
  };

  _restoreHandlers() {
    if (!this._state.pointTypeOffers || this._state.pointTypeOffers.length !== 0) {
      this.element.querySelectorAll('.event__offer-checkbox')
        .forEach((elem) => elem.addEventListener('change', this.#changeOfferHandler));
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    if (isNewPoint(this._state)) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCloseBtnClick);
    }
  }
}
