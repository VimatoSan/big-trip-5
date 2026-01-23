import {render} from '../../render.js';
import PointItem from './PointItem.js';

export default class PointList {
  constructor(container, points = DEFAULT_POINTS) {
    this.points = points;
    this.container = container;
  }

  getElement() {
    if (!this.created) {
      this.points.forEach((point) => {
        const pointItem = new PointItem(point.title, point.price, point.date, point.datetime, point.isFavorite);
        render(
          pointItem,
          this.container);
      });
      this.created = true;
    }
    return this.container;
  }

  removeElement() {
    this.element = null;
  }
}
