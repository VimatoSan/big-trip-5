import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #points = [];
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  clear() {
    this.points = [];
    this._notify(UpdateType.ERROR);
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.points = points.map(this.#pointsApiService.adaptToClient);
    } catch (err) {
      this.points = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((p) => p.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedTask = this.#pointsApiService.adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedTask,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((p) => p.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
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
