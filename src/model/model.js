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

  set points(points) {
    this.#points = points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getOffersByType(type) {
    return this.#offers.find((o) => o.type === type).offers;
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

  getDestinationByCityName(cityName) {
    return this.#destinations.find((d) => d.city === cityName);
  }

  getDestinationById(id) {
    return this.#destinations.find((d) => d.id === id);
  }
}
