import {remove, render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {EmptyEventsMessages, FilterTypes, SortTypes, UpdateType, UserAction} from '../const.js';
import {sortByDate, sortByPrice, sortByTimeDuration} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import EmptyEventsView from '../view/empty-events-view.js';
import AddPointPresenter from './add-point-presenter';
import EventListView from '../view/event-list-view';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventsPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #eventsContainerHTML = document.querySelector('.trip-events');

  #loadingComponent = new LoadingView();
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #emptyEventsComponent = null;

  #addPointPresenter = null;
  #pointPresenters = new Map();
  #currentSortType = SortTypes.DAY;

  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({pointsModel, destinationsModel, offersModel, filtersModel}) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#addPointPresenter = new AddPointPresenter({
      pointsModel,
      destinationsModel,
      offersModel,
      eventListComponent: this.#eventListComponent,
      onDataChange: this.#handleViewAction,
    });
  }

  createPoint() {
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#handleModeChange();
    this.#addPointPresenter.init();
  }

  init() {
    render(this.#eventListComponent, this.#eventsContainerHTML);
    this.#renderEvents();
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filteredPoints = filter[this.#filtersModel.filter](this.#pointsModel.points);
    if (this.#currentSortType === SortTypes.DAY) {
      return filteredPoints.sort(sortByDate);
    }
    if (this.#currentSortType === SortTypes.TIME) {
      return filteredPoints.sort(sortByTimeDuration);
    }
    if (this.#currentSortType === SortTypes.PRICE) {
      return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  #renderEmptyEvents() {
    this.#emptyEventsComponent = new EmptyEventsView(EmptyEventsMessages[this.#filtersModel.filter]);
    render(this.#emptyEventsComponent, this.#eventsContainerHTML);
  }

  #renderLoading() {
    render(this.#loadingComponent , this.#eventsContainerHTML);
  }

  #renderEvents() {
    if (this.#isLoading) {
      this.#renderLoading();
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      return;
    }

    if (this.points.length === 0) {
      this.#renderEmptyEvents();
      return;
    }
    this.#currentSortType = SortTypes.DAY;
    this.#renderSort();
    this.#renderPoints(this.points);
  }

  #clearEvents() {
    this.#addPointPresenter.destroy();
    remove(this.#emptyEventsComponent);
    remove(this.#loadingComponent);
    remove(this.#sortComponent);
    this.#clearPoints();
  }

  #renderSort() {
    this.#sortComponent = new SortView(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#eventsContainerHTML, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsModel: this.#pointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      eventListContainerHTML: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point);
  }

  #handleModeChange = () => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #buildModelData(viewPoint) {
    const destinationId = viewPoint.destination.id;
    const offers = viewPoint.offers.map((o) => o.id);
    const modelPoint = {...viewPoint, offers, destinationId};

    delete modelPoint.destination;
    return modelPoint;
  }

  #handleViewAction = async (actionType, updateType, viewUpdate) => {
    const modelUpdate = this.#buildModelData(viewUpdate);
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT: {
        this.#pointPresenters.get(modelUpdate.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, modelUpdate);
          this.#pointPresenters.get(modelUpdate.id).resetView();
        } catch (err) {
          this.#pointPresenters.get(modelUpdate.id).setAborting();
        }
        break;
      }
      case UserAction.ADD_POINT: {
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, modelUpdate);
        } catch (err) {
          this.#addPointPresenter.setAborting();
        }
        break;
      }
      case UserAction.DELETE_POINT: {
        this.#pointPresenters.get(viewUpdate.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, modelUpdate);
        } catch (err) {
          this.#pointPresenters.get(modelUpdate.id).setAborting();
        }
        break;
      }
    }
    this.#uiBlocker.unblock();
  };

  #renderError() {
    const errorMessageComponent = new EmptyEventsView('Error while loading from server');
    render(errorMessageComponent, this.#eventsContainerHTML);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        this.#pointPresenters.get(data.id).init(data);
        break;
      }
      case UpdateType.MINOR: {
        if (this.points.length === 0) {
          this.#clearEvents();
          this.#renderEmptyEvents();
          break;
        }
        this.#clearPoints();
        this.#renderPoints(this.points);
        break;
      }
      case UpdateType.MAJOR: {
        this.#clearEvents();
        this.#renderEvents();
        break;
      }
      case UpdateType.INIT: {
        this.#isLoading = false;
        document.querySelector('.trip-main__event-add-btn').disabled = false;
        remove(this.#loadingComponent);
        this.#renderEvents();
        break;
      }
      case UpdateType.ERROR: {
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#filtersModel.removeObserver(this.#handleModelEvent);
        this.#pointsModel.removeObserver(this.#handleModelEvent);
        this.#renderError();
        break;
      }
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints(this.points);
  };
}
