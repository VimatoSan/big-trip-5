function createOfferTemplate(title, id, price, isChecked) {
  const isCheckedAttr = isChecked ? 'checked' : '';
  const shortTitle = title.split(' ')[0].toLowerCase();
  const dataOfferId = `data-offer-id = "${id}"`;
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${shortTitle}-1" type="checkbox" name="event-offer-${shortTitle}" ${isCheckedAttr} ${dataOfferId}>
      <label class="event__offer-label" for="event-offer-${shortTitle}-1">
      <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

export function createOffersSectionTemplate(selectedOffers, pointTypeOffers) {
  if (!pointTypeOffers || pointTypeOffers.length === 0) {
    return '';
  }
  if (!selectedOffers) {
    selectedOffers = [];
  }
  const innerOffers = pointTypeOffers.map((t) => {
    const isChecked = selectedOffers.map((o) => o.id).includes(t.id);
    return createOfferTemplate(t.title, t.id, t.price, isChecked);
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
