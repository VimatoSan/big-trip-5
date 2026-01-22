import {render} from './render.js';
import SortingList from './view/sort/SortingList.js';
import PointEditor from './view/PointEditor.js';
import PointCreator from './view/PointCreator/PointCreator.js';
import PointList from './view/points/PointList.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
  }

  init() {
    render(new SortingList(), this.container);
    render(new PointEditor(), this.container);
    render(new PointList(), this.container);
    render(new PointCreator(), this.container);
  }
}
