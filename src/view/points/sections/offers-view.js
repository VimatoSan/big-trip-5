import AbstractView from '../../../framework/view/abstract-view';

function createOfferTemplate(title, id, price, isChecked, isDisabled) {
  const isCheckedAttr = isChecked ? 'checked' : '';
  const eventTitle = title.toLowerCase().replaceAll(' ', '-');
  const dataOfferId = `data-offer-id = "${id}"`;
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${eventTitle}-1" type="checkbox" name="event-offer-${eventTitle}" ${isDisabled ? 'disabled' : ''} ${isCheckedAttr} ${dataOfferId}>
      <label class="event__offer-label" for="event-offer-${eventTitle}-1">
      <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createOffersSectionTemplate(selectedOffers, pointTypeOffers, isDisabled) {
  if (!pointTypeOffers || pointTypeOffers.length === 0) {
    return '';
  }
  if (!selectedOffers) {
    selectedOffers = [];
  }
  const innerOffers = pointTypeOffers.map((t) => {
    const isChecked = selectedOffers.map((o) => o.id).includes(t.id);
    return createOfferTemplate(t.title, t.id, t.price, isChecked, isDisabled);
  }).join('');
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${innerOffers}
      </div>
    </section>`
  );
}

export default class OffersView extends AbstractView {
  #selectedOffers;
  #pointTypeOffers;
  #isDisabled;

  constructor(selectedOffers, pointTypeOffers, isDisabled = false) {
    super();
    this.#selectedOffers = selectedOffers;
    this.#pointTypeOffers = pointTypeOffers;
    this.#isDisabled = isDisabled;
  }

  get template() {
    return createOffersSectionTemplate(this.#selectedOffers, this.#pointTypeOffers, this.#isDisabled);
  }
}
