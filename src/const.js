const POINT_TYPES = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const OFFERS = {
  [POINT_TYPES.TAXI]: ['Priority booking', 'Pet-friendly car', 'Silent ride'],
  [POINT_TYPES.BUS]: ['Charging ports', 'Blanket & pillow', 'Entertainment system'],
  [POINT_TYPES.TRAIN]: ['Sleeper compartment', 'Workstation with WiFi', 'Lounge access'],
  [POINT_TYPES.SHIP]: ['All-inclusive drinks', 'Spa access', 'Private balcony'],
  [POINT_TYPES.DRIVE]: ['Upgraded car class', 'Unlimited mileage', 'Roadside assistance'],
  [POINT_TYPES.FLIGHT]: ['Extra legroom seat', 'In-flight meal', 'Entertainment package'],
  [POINT_TYPES.CHECK_IN]: ['Fitness center', 'Early check-in', 'Daily room cleaning'],
  [POINT_TYPES.SIGHTSEEING]: ['Audio guide', 'Private transport', 'Photo package'],
  [POINT_TYPES.RESTAURANT]: ['Chef\'s table', 'Non-alcoholic pairing', 'Cooking class add-on']
};

const CITIES = ['Moscow', 'Berlin', 'New York', 'Edinburgh', 'Paris', 'Sedona'];

const TEXT_TEMPLATE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const DATES = ['2026-01-19T14:00', '2026-01-20T14:30', '2026-01-20T15:30', '2026-01-22T10:00', '2026-01-23T18:20',
  '2026-02-3T00:45', '2026-02-18T00:45', '2026-03-3T04:45', '2026-03-10T10:45', '2026-03-17T12:00'];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const EmptyEventsMessages = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.PAST]: 'There are no past events now',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const ActiveSortingOptions = [SortTypes.DAY, SortTypes.TIME, SortTypes.PRICE];

const UserAction = {
  UPDATE_POINT: 'update-point',
  ADD_POINT: 'add-point',
  DELETE_POINT: 'delete-point',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

const EditFormTypes = {
  ADDING: 'adding',
  EDITING: 'editing',
};

export { POINT_TYPES, OFFERS, CITIES, TEXT_TEMPLATE, DATES, FilterTypes, SortTypes,
  UserAction, UpdateType, ActiveSortingOptions, EditFormTypes, EmptyEventsMessages};
