/**
 * Returns the size and position of the provided element relative to `window`.
 *
 * @param {Element} element The element to find the size and position for.
 *
 * @return {object} The size and position of the provided element.
 */
export default element => {
  const rect = element.getBoundingClientRect();

  return {
    height: rect.height,
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width,
  };
};
