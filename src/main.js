import EventsPresenter from './presenter/events-presenter.js';
import FiltersModel from './model/filters-model.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsApiService from './service/points-api-service.js';
import DestinationsApiService from './service/destinations-api-service.js';
import OffersApiService from './service/offers-api-service.js';

const BASE_URL = 'https://24.objects.htmlacademy.pro/big-trip';
const AUTH_TOKEN = 'Basic 8hfekcmmddld';

const pointApiService = new PointsApiService(BASE_URL, AUTH_TOKEN);
const offersApiService = new OffersApiService(BASE_URL, AUTH_TOKEN);
const destinationsApiService = new DestinationsApiService(BASE_URL, AUTH_TOKEN);

const pointsModel = new PointsModel(pointApiService);
const offersModel = new OffersModel(offersApiService);
const destinationsModel = new DestinationsModel(destinationsApiService);
const filtersModel = new FiltersModel();

offersModel.init()
  .then(() => destinationsModel.init())
  .then(() => pointsModel.init())
  .catch((e) => {
    console.log(e)
    offersModel.clear();
    destinationsModel.clear();
    pointsModel.clear();
  });
const eventsPresenter = new EventsPresenter(
  {pointsModel, destinationsModel, offersModel, filtersModel});
const filtersPresenter = new FiltersPresenter({filtersModel, pointsModel});

const addPointButton = document.querySelector('.trip-main__event-add-btn');
addPointButton.addEventListener('click', () => {
  eventsPresenter.createPoint();
  addPointButton.disabled = true;
});

filtersPresenter.init();
eventsPresenter.init();
