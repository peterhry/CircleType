import degreesToRadians from './degreesToRadians';

/**
 * Gets the sagitta of an arc. The sagitta of an arc is the distance from the
 * center of the arc to the center of its base.
 *
 * @see {@link https://en.wikipedia.org/wiki/Sagitta_(geometry)}
 *
 * @param {number} radius The radius in degrees of the arc.
 * @param {number} theta The angle of the arc.
 *
 * @return {number} The sagitta of the provided arc.
 */
export default (radius, theta) => {
  const halfChord = radius * Math.sin(degreesToRadians(theta / 2));
  const delta = Math.sqrt((radius ** 2) - (halfChord ** 2));

  return (theta > 180) ? radius + delta : radius - delta;
};
