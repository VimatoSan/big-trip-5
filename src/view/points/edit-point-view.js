import {convertToServerFormat, durationToMinutes, humanizeFullDate} from '../../utils/time.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {getObjectFromArrayById} from '../../utils/helpers.js';
import {EditFormTypes, POINT_TYPES} from '../../const.js';
import OffersView from './sections/offers-view.js';
import DestinationView from './sections/destination-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

function createDestinationsListTemplate(destinations) {
  const destinationItems = destinations.map((d) => `<option value="${d.city}"><option>`).join('');
  return (
    `<datalist id="destination-list-1">
        ${destinationItems}
    </datalist>`);
}

function createCloseBtnTemplate(state, isDisabled) {
  if (state.formType === EditFormTypes.ADDING) {
    return '';
  }
  return (
    `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
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
  const items = Object.values(POINT_TYPES).map((item) => createEventTypeItemTemplate(item, item === offerType)).join('');
  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${items}
      </fieldset>
    </div>`
  );
}

function createFormContainerTemplate(state, destinations, isDisabled) {
  const {type, basePrice, dateFrom, dateTo, destination, offers, pointTypeOffers} = state;
  const resetButtonTitle = state.formType === EditFormTypes.ADDING ? 'Cancel' : 'Delete';
  const closeButton = createCloseBtnTemplate(state, isDisabled);

  const destinationsList = createDestinationsListTemplate(destinations);
  const offersSection = new OffersView(offers, pointTypeOffers, isDisabled).template;
  const destinationSection = new DestinationView(destination?.description, destination?.photos).template;
  const typeList = createOfferTypeSelector(type);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post" ${isDisabled ? 'disabled' : ''}>
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            ${typeList}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type?.charAt(0).toUpperCase() + type?.slice(1)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} value="${destination?.city || ''}" list="destination-list-1">
            ${destinationsList}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeFullDate(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeFullDate(dateTo)}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${basePrice} ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>Save</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${resetButtonTitle}</button>
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

export default class EditPointView extends AbstractStatefulView {
  #handleSubmit = null;
  #handleCloseBtnClick = null;
  #destinations = null;
  #offers = null;
  #startDatePicker = null;
  #endDatePicker = null;
  #handleDeleteBtnClick = null;
  #handleCancelBtnClick = null;

  constructor({point, onSubmit, onCloseBtnClick, onDeleteClick, onCancelBtnClick, destinations, offers}) {
    super();
    this.#handleSubmit = onSubmit;
    this.#handleCloseBtnClick = onCloseBtnClick;
    this.#handleDeleteBtnClick = onDeleteClick;
    this.#handleCancelBtnClick = onCancelBtnClick;
    this.#destinations = destinations;
    this.#offers = offers;
    this._setState(this.#parsePointToState(point));
    this._restoreHandlers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (durationToMinutes(this._state.dateFrom, this._state.dateTo) > 0) {
      this.#handleSubmit(this.#parseStateToPoint(this._state));
    }
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteBtnClick(this.#parseStateToPoint(this._state));
  };

  get template() {
    return createFormContainerTemplate(this._state, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatePicker) {
      this.#startDatePicker.destroy();
      this.#startDatePicker = null;
    }
    if (this.#endDatePicker) {
      this.#endDatePicker.destroy();
      this.#endDatePicker = null;
    }
  }

  #dateFromChangeHandler = (date)=> {
    this.updateElement({
      dateFrom: convertToServerFormat(date),
    });
  };

  #dateToChangeHandler = (date) => {
    this.updateElement({
      dateTo: convertToServerFormat(date),
    });
  };

  #setDatepickers() {
    this.#endDatePicker = flatpickr(
      this.element.querySelector('.event__input--time[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: dayjs(this._state.dateFrom).toDate(),
        onChange: this.#dateToChangeHandler,
      });
    this.#startDatePicker = flatpickr(
      this.element.querySelector('.event__input--time[name="event-start-time"]'), {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#dateFromChangeHandler,
      });
  }

  #createEmptyPoint() {
    return {
      type: POINT_TYPES.FLIGHT,
      basePrice: 0,
      offers: [],
      isFavourite: false,
    };
  }

  #parsePointToState(point) {
    if (!point) {
      const emptyPoint = this.#createEmptyPoint();
      return {...emptyPoint,
        pointTypeOffers: this.#getOffersByType(emptyPoint.type),
        formType: EditFormTypes.ADDING,
      };
    }
    return {...point,
      pointTypeOffers: this.#getOffersByType(point.type),
      formType: EditFormTypes.EDITING,
    };
  }

  #parseStateToPoint(state) {
    const point = {...state};
    delete point.pointTypeOffers;
    delete point.formType;
    return point;
  }

  #changeDestinationHandler = (evt) => {
    const destination = this.#getDestinationByCity(evt.target.value);
    this.updateElement({
      destination,
    });
  };

  #changeTypeHandler = (evt) => {
    const type = evt.target.value;
    this.updateElement({
      type,
      offers: [],
      pointTypeOffers: this.#getOffersByType(type),
    });
  };

  #changePriceHandler = (evt) => {
    this.updateElement({
      basePrice: Number(evt.target.value),
    });
  };

  #getOffersByType(type) {
    return this.#offers.find((o) => o.type === type)?.offers;
  }

  #getDestinationByCity(city) {
    return this.#destinations.find((d) => d.city === city);
  }

  #changeOfferHandler = (evt) => {
    const id = evt.target.dataset.offerId;
    const pointTypeOffers = this.#getOffersByType(this._state.type);
    const newOffer = getObjectFromArrayById(pointTypeOffers, id);
    const updatedOffers = this._state.offers.map((o) => o.id).includes(id)
      ? this._state.offers.filter((o) => o.id !== id)
      : [...this._state.offers, newOffer];

    this._setState({
      offers: updatedOffers,
    });
  };

  isFormValid() {
    const hasDestination = this._state.destination && this.#getDestinationByCity(this._state.destination.city);
    const hasDates = this._state.dateFrom && this._state.dateTo
      && durationToMinutes(this._state.dateFrom, this._state.dateTo) > 0;
    const priceValid = this._state.basePrice !== null && this._state.basePrice > 0;
    return hasDestination && hasDates && priceValid;
  }

  #updateSaveButtonState() {
    const saveBtn = this.element.querySelector('.event__save-btn[type="submit"]');
    saveBtn.disabled = !this.isFormValid();
  }

  _restoreHandlers() {
    if (!this._state.pointTypeOffers || this._state.pointTypeOffers.length !== 0) {
      this.element.querySelectorAll('.event__offer-checkbox')
        .forEach((elem) => elem.addEventListener('change', this.#changeOfferHandler));
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
    if (this._state.formType === EditFormTypes.EDITING) {
      this.element.querySelector('.event__reset-btn[type="reset"]').addEventListener('click', this.#deleteClickHandler);
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCloseBtnClick);
    }
    if (this._state.formType === EditFormTypes.ADDING) {
      this.element.querySelector('.event__reset-btn[type="reset"]').addEventListener('click', this.#handleCancelBtnClick);
    }
    this.#setDatepickers();

    this.#updateSaveButtonState();
  }
}
