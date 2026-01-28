export default class Model {
  constructor(mockData) {
    this.offers = mockData.offers;
    this.destinations = mockData.destinations;
    this.points = mockData.points;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffersByType(type, ids = []) {
    const offers = this.offers.find((o) => o.type === type).offers;
    if (ids.length === 0) {
      return offers;
    } else {
      return offers.filter((o) => ids.includes(o.id));
    }
  }

  getDestinationById(id) {
    return this.destinations.find((d) => d.id === id);
  }
}
