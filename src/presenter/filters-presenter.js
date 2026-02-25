import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {UpdateType} from '../const.js';

export default class FiltersPresenter {
  #filtersModel = null;
  #currentFilter = null;
  #filtersComponent = null;
  #filtersContainerHTML = document.querySelector('.trip-controls__filters');

  constructor(filtersModel) {
    this.#filtersModel = filtersModel;
    this.#currentFilter = filtersModel.filter;
    this.#filtersModel.addObserver(this.#handleModelChange);
  }

  init() {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({onChange: this.#handleFilterTypeChange, currentFilter: this.#filtersModel.filter});

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
    if (data === this.#currentFilter) {
      return;
    }
    this.#currentFilter = data;
    this.init();
  };
}
