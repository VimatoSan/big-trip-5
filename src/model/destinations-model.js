export default class DestinationsModel {
  #destinations = [];
  #destinationsApiService = null;

  constructor(destinationsApiService) {
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch (err) {
      this.#destinations = [];
      throw err;
    }
  }

  clear() {
    this.#destinations = [];
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((d) => d.id === id);
  }

  #adaptToClient(destination) {
    const photos = destination.pictures.map((p) => ({
      src: p.src,
      alt: p.description
    }));
    const adaptedDestination = {...destination,
      city: destination.name,
      photos,
    };

    delete adaptedDestination.name;
    delete adaptedDestination.pictures;

    return adaptedDestination;
  }
}
