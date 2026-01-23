import {render} from './render.js';
import SortingList from './view/sort/SortingList.js';
import PointEditor from './view/points/PointEditor.js';
import PointCreator from './view/points/pointCreator/PointCreator.js';
import FilterList from './view/filters/FilterList.js';
import EventListContainer from './view/EventListContainer.js';
import PointItem from './view/points/PointItem.js';
import {DEFAULT_POINTS} from './mocks.js';

export default class Presenter {
  constructor(eventsContainer, filtersContainer) {
    this.eventsContainer = eventsContainer;
    this.filtersContainer = filtersContainer;
  }

  init() {
    const eventListContainer = new EventListContainer();
    render(new FilterList(), this.filtersContainer);
    render(new SortingList(), this.eventsContainer);
    render(eventListContainer, this.eventsContainer);
    render(new PointEditor(), eventListContainer.getElement());
    DEFAULT_POINTS.forEach((point) => {
      const pointItem = new PointItem(point.title, point.price, point.date, point.datetime, point.isFavorite);
      render(
        pointItem,
        eventListContainer.getElement());
    });
    render(new PointCreator(), eventListContainer.getElement());
  }
}
