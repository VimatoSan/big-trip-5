import EventsPresenter from './presenter/events-presenter.js';
import {createMockData} from './mock/mocks.js';
import FiltersModel from './model/filters-model.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const mocks = createMockData();

const pointsModel = new PointsModel(mocks.points);
const offersModel = new OffersModel(mocks.offers);
const destinationsModel = new DestinationsModel(mocks.destinations);
const filtersModel = new FiltersModel();


const eventsPresenter = new EventsPresenter(
  {pointsModel, destinationsModel, offersModel, filtersModel});
const filtersPresenter = new FiltersPresenter(filtersModel);

const addPointButton = document.querySelector('.trip-main__event-add-btn');
addPointButton.addEventListener('click', () => {
  eventsPresenter.createPoint();
  addPointButton.disabled = true;
});

filtersPresenter.init();
eventsPresenter.init();
