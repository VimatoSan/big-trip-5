import {render} from '../render.js';
import SortingList from '../view/sort/sorting-list.js';
import EditPointForm from '../view/points/edit-point-form.js';
import CreatePointForm from '../view/points/point-creator/create-point-form.js';
import FilterList from '../view/filters/filter-list.js';
import EventListContainer from '../view/event-list-container.js';
import PointItem from '../view/points/point-item.js';
import {getRandomArrayElement} from '../utils.js';

export default class Presenter {
  constructor(model) {
    this.model = model;
    this.eventsContainer = document.querySelector('.trip-events');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    const points = this.model.getPoints();
    const eventListContainer = new EventListContainer();
    render(new FilterList(), this.filtersContainer);
    render(new SortingList(), this.eventsContainer);
    render(eventListContainer, this.eventsContainer);

    const editingPoint = getRandomArrayElement(points);
    const editingPointDestination = this.model.getDestinationById(editingPoint.destinationId);
    const pointTypeOffers = this.model.getOffersByType(editingPoint.type);
    render(new EditPointForm({...editingPoint, destination: editingPointDestination}, pointTypeOffers), eventListContainer.getElement());

    points.forEach((point) => {
      const destination = this.model.getDestinationById(point.destinationId);
      const pointOffers = this.model.getOffersByType(point.type, point.offers);
      const pointItem = new PointItem({...point, offers: pointOffers, destination: destination});
      render(
        pointItem,
        eventListContainer.getElement());
    });
    render(new CreatePointForm(), eventListContainer.getElement());
  }
}
