import PointView from '../view/points/point-view.js';
import EditPointView from '../view/points/edit-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import {UpdateType, UserAction} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


export default class PointPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #point = null;

  #eventListContainerHTML = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({pointsModel, offersModel, destinationsModel, eventListContainerHTML, onDataChange, onModeChange}) {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#eventListContainerHTML = eventListContainerHTML;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = this.#buildViewData(point);
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#pointComponent = new PointView(this.#point, this.#onEditClick, this.#onFavouriteClick);
    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      onSubmit: this.#onSubmitClick,
      onCloseBtnClick: this.#onFormCloseClick,
      onDeleteClick: this.#onDeleteClick,
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventListContainerHTML);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  #buildViewData(point) {
    const destination = this.#destinationsModel.getDestinationById(point.destinationId);
    const pointOffers = this.#offersModel.getOffersByIds(point.offers, point.type);
    const viewPoint = {...point, offers: pointOffers, destination: destination};

    delete viewPoint.destinationId;
    return viewPoint;
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #onFavouriteClick = () => {
    const updatedPoint = {...this.#point, isFavourite: !this.#point.isFavourite};
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      updatedPoint
    );
  };

  #onSubmitClick = (update) => {
    const isMinorUpdate = this.#point.dateFrom !== update.dateFrom || this.#point.dateTo !== update.dateTo ||
      this.#point.basePrice !== update.basePrice;
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToCard();
  };

  #onDeleteClick = (update) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      update
    );
  };

  #onFormCloseClick = () => {
    this.#replaceFormToCard();
  };

  #onEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#onEscKeydown);
  };

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };
}
