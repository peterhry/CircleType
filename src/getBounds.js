/**
 * Gets an element’s bounds relative to the document.
 *
 * @param  {HTMLElement} elem An element.
 *
 * @return {Object}
 */
export default elem => {
  const {
    top,
    left,
    width,
    height,
  } = elem.getBoundingClientRect();

  return {
    top: top + window.pageYOffset,
    left: left + window.pageXOffset,
    width,
    height,
  };
};
