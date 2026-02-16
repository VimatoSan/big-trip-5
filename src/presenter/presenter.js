import {render} from '../framework/render.js';
import SortingOptions from '../view/sorting-options.js';
import EventListContainer from '../view/event-list-container.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/helpers.js';
import {DEFAULT_SORTING_OPTIONS} from '../const.js';
import FilterList from '../view/filter-list.js';
import {sortByDate, sortByPrice, sortByTimeDuration} from '../utils/sort.js';

export default class Presenter {
  #model = null;
  #eventListComponent = null;
  #filterListComponent = new FilterList();
  #sortComponent = null;

  #pointPresenters = new Map();
  #eventsContainerHTML = document.querySelector('.trip-events');
  #filtersContainerHTML = document.querySelector('.trip-controls__filters');

  #currentSortType = DEFAULT_SORTING_OPTIONS.DAY.title;

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
    this.#sortComponent = new SortingOptions(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#eventsContainerHTML);
  }

  #renderPoints(points) {
    if (this.#eventListComponent === null) {
      this.#eventListComponent = new EventListContainer();
      render(this.#eventListComponent, this.#eventsContainerHTML);
    }
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#model, this.#eventListComponent.element,
      this.#handlePointChange, this.#handleModeChange);
    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#model.points = updateItem(this.#model.points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPoints();
    const copyPoints = this.#model.points.slice();

    if (sortType === DEFAULT_SORTING_OPTIONS.DAY.title) {
      this.#renderPoints(copyPoints.sort(sortByDate));
    }
    if (sortType === DEFAULT_SORTING_OPTIONS.TIME.title) {
      this.#renderPoints(copyPoints.sort(sortByTimeDuration));
    }
    if (sortType === DEFAULT_SORTING_OPTIONS.PRICE.title) {
      this.#renderPoints(copyPoints.sort(sortByPrice));
    }
  };
}
