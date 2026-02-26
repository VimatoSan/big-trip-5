function getObjectFromArrayById(array, id) {
  return array.find((item) => item.id === id);
}


export {getObjectFromArrayById};
