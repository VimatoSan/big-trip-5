function createPhotoTemplate(photo) {
  return (
    `<img class="event__photo" src="${photo}" alt="Event photo">`
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

export function createDestinationSectionTemplate(description, photos) {
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
