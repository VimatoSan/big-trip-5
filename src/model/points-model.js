import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((p) => p.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((p) => p.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }
}
