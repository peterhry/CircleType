import getRect from './utils/getRect';

/**
 * Gets the combined height of all letter elements.
 *
 * @param  {Array} letters  An array of letter elements.
 *
 * @return {Number}         The total height.
 */
export default letters => {
  const mid = getRect(letters[Math.floor(letters.length / 2)]);
  const first = getRect(letters[0]);

  return first.height + Math.abs(first.top - mid.top);
};
