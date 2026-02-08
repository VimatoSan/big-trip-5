const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS = {
  'taxi': ['Priority booking', 'Pet-friendly car', 'Silent ride'],
  'bus': ['Charging ports', 'Blanket & pillow', 'Entertainment system'],
  'train': ['Sleeper compartment', 'Workstation with WiFi', 'Lounge access'],
  'ship': ['All-inclusive drinks', 'Spa access', 'Private balcony'],
  'drive': ['Upgraded car class', 'Unlimited mileage', 'Roadside assistance'],
  'flight': ['Extra legroom seat', 'In-flight meal', 'Entertainment package'],
  'check-in': ['Fitness center', 'Early check-in', 'Daily room cleaning'],
  'sightseeing': ['Audio guide', 'Private transport', 'Photo package'],
  'restaurant': ['Chef\'s table', 'Non-alcoholic pairing', 'Cooking class add-on']
};

const OFFERS_SHORT_TITLES = ['luggage', 'meal', 'seats', 'cleaning'];

const CITIES = ['Moscow', 'Berlin', 'New York', 'Edinburgh', 'Paris', 'Sedona'];

const TEXT_TEMPLATE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const DATES = ['2026-01-19T14:00', '2026-01-20T14:30', '2026-01-20T15:30', '2026-01-22T10:00', '2026-01-23T18:20', '2026-02-3T00:45'];

const DEFAULT_FILTERS = ['everything', 'future', 'present', 'past'];

const DEFAULT_SORTING_OPTIONS = {
  'DAY': {title: 'day', disabled: false, checked: true},
  'EVENT': {title: 'event', disabled: true, checked: false},
  'TIME': {title: 'time', disabled: false, checked: false},
  'PRICE': {title: 'price', disabled: false, checked: false},
  'OFFER': {title: 'offer', disabled: true, checked: false}
};


export { POINT_TYPES, OFFERS, CITIES, TEXT_TEMPLATE, DATES, OFFERS_SHORT_TITLES, DEFAULT_FILTERS, DEFAULT_SORTING_OPTIONS };
