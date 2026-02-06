import {render} from '../framework/render.js';
import SortingOptions from '../view/sorting-options.js';
import EventListContainer from '../view/event-list-container.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils.js';

export default class Presenter {
  #model = null;
  #eventListComponent = new EventListContainer();
  #filterListComponent = new EventListContainer();
  #sortComponent = new SortingOptions();

  #presenters = new Map();
  #eventsContainerHTML = document.querySelector('.trip-events');
  #filtersContainerHTML = document.querySelector('.trip-controls__filters');

  constructor(model) {
    this.#model = model;
  }

  init() {
    this.#renderFilters();
    this.#renderSort();
    this.#renderPoints(this.#model.points);
  }

  #renderFilters() {
    render(this.#filterListComponent, this.#filtersContainerHTML);
  }

  #renderSort() {
    render(this.#sortComponent, this.#eventsContainerHTML);
  }

  #renderPoints(points) {
    render(this.#eventListComponent, this.#eventsContainerHTML);
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#model, this.#eventListComponent.element,
      this.#handlePointChange, this.#handleModeChange);
    this.#presenters.set(point.id, pointPresenter);
    pointPresenter.init(point);
  }

  #handleModeChange = () => {
    this.#presenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedTask) => {
    this.#model.points = updateItem(this.#model.points, updatedTask);
    this.#presenters.get(updatedTask.id).init(updatedTask);
  };
}
