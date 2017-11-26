import degreesToRadians from './degreesToRadians';

/**
 * Gets the chord length of an arc.
 *
 * @see {@link https://en.wikipedia.org/wiki/Chord_(geometry)}
 *
 * @param {number} r The radius of the arc.
 * @param {number} θ The angle in degrees of the arc.
 *
 * @return {number} The chord of the provided arc.
 */
export default (r, θ) => 2 * r * Math.sin(degreesToRadians(θ / 2));
