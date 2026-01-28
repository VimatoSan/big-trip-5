import {createElement, render} from '../../render.js';
import {humanizeDateDay, humanizeDateHour, humanizeDuration} from '../../utils.js';


class OfferItem {
  constructor(offer) {
    this.offer = offer;
  }

  getTemplate() {
    return (
      `<li class="event__offer">
      <span class="event__offer-title">${this.offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${this.offer.price}</span>
    </li>`);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}


function createOffersTemplate() {
  return (
    `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers"></ul>`
  );
}

function createTemplate(point) {
  const {type, basePrice, isFavourite, date, offers, destination} = point;
  const isFavouriteButton = isFavourite ? 'event__favorite-btn--active' : '';
  const offersList = offers ? createOffersTemplate() : '';
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${date.start}">${humanizeDateDay(date.start)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type} ${destination.city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${date.start}">${humanizeDateHour(date.start)}</time>
            &mdash;
            <time class="event__end-time" datetime="${date.end}">${humanizeDateHour(date.end)}</time>
          </p>
          <p class="event__duration">${humanizeDuration(date.start, date.end)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${offersList}
        <button class="event__favorite-btn ${isFavouriteButton}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointItem {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    const offersContainer = this.element.querySelector('.event__selected-offers');
    this.point.offers.forEach((offer) => {
      render(new OfferItem(offer), offersContainer);
    });
    return this.element;
  }
}
