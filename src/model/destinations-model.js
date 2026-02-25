export default class DestinationsModel {
  #destinations = null;

  constructor(destinations) {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((d) => d.id === id);
  }
}
