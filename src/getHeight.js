import degreesToRadians from './utils/degreesToRadians';

/**
 * Gets the combined height of all letter elements.
 *
 * @param  {Array} letters  An array of letter elements.
 *
 * @return {Number}         The total height.
 */
export default (radius, theta) => {
  const chord = 2 * radius * Math.sin(degreesToRadians(theta) / 2);

  return radius - Math.sqrt((radius ** 2) - ((chord / 2) ** 2));
};
