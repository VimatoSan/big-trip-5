import PointItem from '../view/points/point-item.js';
import EditPointForm from '../view/points/edit-point-form.js';
import {remove, render, replace} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #model = null;
  #point = null;

  #eventListContainerHTML = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor(model, eventListContainerHTML, onDataChange, onModeChange) {
    this.#model = model;
    this.#eventListContainerHTML = eventListContainerHTML;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = this.#buildViewData(point);
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#pointComponent = new PointItem(this.#point, this.#onEditClick, this.#onFavouriteClick);
    this.#pointEditComponent = new EditPointForm({
      point: this.#point,
      onSubmit: this.#onSubmitCLick,
      onCloseBtnClick: this.#onFormCloseClick,
      offers: this.#model.offers,
      destinations: this.#model.destinations,
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
    const destination = this.#model.getDestinationById(point.destinationId);
    const pointOffers = this.#model.getOffersByIds(point.offers, point.type);
    const viewPoint = {...point, offers: pointOffers, destination: destination};

    delete viewPoint.destinationId;
    return viewPoint;
  }

  #buildModelData(point) {
    const destinationId = point.destination.id;
    const offers = point.offers.map((o) => o.id);
    const modelPoint = {...point, offers, destinationId};

    delete modelPoint.destination;
    return modelPoint;
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
    const updatedPoint = this.#buildModelData({...this.#point, isFavourite: !this.#point.isFavourite});
    this.#handleDataChange(updatedPoint);
  };

  #onSubmitCLick = (point) => {
    const updatedPoint = this.#buildModelData(point);
    this.#handleDataChange(updatedPoint);
    this.#replaceFormToCard();
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
