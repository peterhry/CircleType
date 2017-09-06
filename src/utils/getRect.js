/**
 * Returns the size and position of the provided element relative to `window`.
 *
 * @param {Element} element The element to find the size and position for.
 *
 * @return {object} The size and position of the provided element.
 */
export default element => {
  const {
    top,
    left,
    width,
    height,
  } = element.getBoundingClientRect();

  return {
    left: left + window.pageXOffset,
    top: top + window.pageYOffset,
    height,
    width,
  };
};
