import AbstractView from '../../../framework/view/abstract-view';

function createPhotoTemplate(photo) {
  return (
    `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`
  );
}


function createDescriptionTemplate(description) {
  if (!description) {
    return '';
  }
  return (`<p class="event__destination-description">${description}</p>`);
}

function createPhotosContainerTemplate(photos) {
  if (!photos || photos.length === 0) {
    return '';
  }
  const innerPhotos = photos.map(createPhotoTemplate).join('');

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${innerPhotos}
      </div>
    </div>
     `
  );
}

function createDestinationSectionTemplate(description, photos) {
  if (!description && !photos) {
    return '';
  }

  const innerDescription = createDescriptionTemplate(description);
  const photosSection = createPhotosContainerTemplate(photos);
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${innerDescription}
      ${photosSection}
    </section>`
  );
}

export default class DestinationView extends AbstractView {
  #photos = null;
  #description = null;
  constructor(description, photos) {
    super();
    this.#description = description;
    this.#photos = photos;
  }

  get template() {
    return createDestinationSectionTemplate(this.#description, this.#photos);
  }
}
