import degreesToRadians from './degreesToRadians';

/**
 * Gets the sagitta of an arc. The sagitta of an arc is the distance from the
 * center of the arc to the center of its base.
 *
 * @see {@link https://en.wikipedia.org/wiki/Sagitta_(geometry)}
 *
 * @param {number} r The radius of the arc.
 * @param {number} θ The angle in degrees of the arc.
 *
 * @return {number} The sagitta of the provided arc.
 */
export default (r, θ) => r * (1 - Math.cos(degreesToRadians(θ / 2)));
