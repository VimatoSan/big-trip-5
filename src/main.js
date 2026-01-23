import Presenter from './presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const board = new Presenter(eventsContainer, filtersContainer);
board.init();
