import EditPointView from '../view/points/edit-point-view';
import {remove, render, RenderPosition} from '../framework/render';
import {UpdateType, UserAction} from '../const';
import {generateId} from '../utils/helpers.js';

export default class AddPointPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #eventListComponent = null;
  #pointAddComponent = null;
  #handleDataChange = null;

  constructor({pointsModel, destinationsModel, offersModel, onDataChange, eventListComponent}) {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#eventListComponent = eventListComponent;
    this.#handleDataChange = onDataChange;
  }

  init() {
    this.#pointAddComponent = new EditPointView({
      point: null,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onCancelBtnClick: this.#onCancelClick,
      onSubmit: this.#onSubmit
    });
    render(this.#pointAddComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #onSubmit = (update) => {
    if (!(update.destination && update.dateFrom && update.dateTo)) {
      return;
    }
    this.destroy();
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {id: generateId(), ...update}
    );
  };

  destroy() {
    remove(this.#pointAddComponent);
    const addPointButton = document.querySelector('.trip-main__event-add-btn');
    addPointButton.disabled = false;
  }

  #onCancelClick = () => {
    this.destroy();
  };
}
