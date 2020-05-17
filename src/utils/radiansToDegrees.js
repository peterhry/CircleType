const degreesPerRadian = 180 / Math.PI;

/**
 * Converts an angle in radians to its equivalent in degrees.
 *
 * @param {number} angleInRadians The angle in radians to convert.
 *
 * @return {number} The equivalent angle in degrees.
 */
export default angleInRadians => angleInRadians * degreesPerRadian;
