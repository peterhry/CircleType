import degreesToRadians from './utils/degreesToRadians';

/**
 * Gets the combined height of all letter elements.
 *
 * @param  {Array} letters  An array of letter elements.
 *
 * @return {Number}         The total height.
 */
export default (radius, theta) => {
  const halfChord = radius * Math.sin(degreesToRadians(theta / 2));

  const delta = Math.sqrt((radius ** 2) - (halfChord ** 2));

  return (theta > 180) ? radius + delta : radius - delta;
};
