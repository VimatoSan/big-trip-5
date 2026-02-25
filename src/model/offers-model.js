export default class OffersModel {
  #offers = null;

  constructor(offers) {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByIds(ids, type = null) {
    let offers;
    if (type) {
      offers = this.#offers.find((o) => o.type === type).offers;
    } else {
      offers = this.#offers.flatMap((o) => o.offers);
    }
    return offers.filter((o) => ids.includes(o.id));
  }
}
