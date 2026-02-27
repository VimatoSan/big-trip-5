import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {UpdateType} from '../const.js';

export default class FiltersPresenter {
  #filtersModel = null;
  #pointsModel = null;
  #currentFilter = null;
  #filtersComponent = null;
  #isLoading = true;
  #filtersContainerHTML = document.querySelector('.trip-controls__filters');

  constructor({filtersModel, pointsModel}) {
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;
    this.#currentFilter = filtersModel.filter;
    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filtersModel.addObserver(this.#handleModelChange);
  }

  init() {
    const prevFiltersComponent = this.#filtersComponent;

    if (this.#isLoading) {
      this.#filtersComponent = new FiltersView({disabled: true});
    } else {
      this.#filtersComponent = new FiltersView({onChange: this.#handleFilterTypeChange, currentFilter: this.#filtersModel.filter});
    }

    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainerHTML);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelChange = (updateType, data) => {
    if (updateType === UpdateType.INIT) {
      this.#isLoading = false;
    }
    if (data === this.#currentFilter) {
      return;
    }
    this.#currentFilter = data;
    this.init();
  };
}
