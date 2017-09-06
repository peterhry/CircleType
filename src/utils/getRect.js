/**
 * Returns the size and position of the provided element, relative to either
 * the viewport or an optional reference object.
 *
 * @param {Element} element The element to find the size and position for.
 * @param {object} reference The reference object, typically `window`.
 *
 * @return {object} The size and position of the provided element.
 */
export default (element, reference = window) => {
  const rect = element.getBoundingClientRect();

  rect.left += reference.pageXOffset || 0;
  rect.top += reference.pageYOffset || 0;

  return rect;
};
