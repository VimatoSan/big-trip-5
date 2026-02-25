export default class OffersModel {
  #offers = [];
  #offersApiService = null;
  constructor(offersApiService) {
    this.#offersApiService = offersApiService;
  }

  clear() {
    this.#offers = [];
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch (err) {
      this.#offers = [];
      throw err;
    }
  }

  get offers() {
    return this.#offers;
  }

  getOffersByIds(ids, type = null) {
    let offers;
    if (type) {
      offers = this.#offers.find((o) => o.type === type)?.offers;
    } else {
      offers = this.#offers.flatMap((o) => o.offers);
    }
    return offers?.filter((o) => ids.includes(o.id));
  }
}
