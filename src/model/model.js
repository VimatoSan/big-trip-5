export default class Model {
  #offers = null;
  #destinations = null;
  #points = null;
  constructor(mockData) {
    this.#offers = mockData.offers;
    this.#destinations = mockData.destinations;
    this.#points = mockData.points;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getOffersByType(type, ids = []) {
    const offers = this.#offers.find((o) => o.type === type).offers;
    if (ids.length === 0) {
      return offers;
    } else {
      return offers.filter((o) => ids.includes(o.id));
    }
  }

  getDestinationById(id) {
    return this.#destinations.find((d) => d.id === id);
  }
}
