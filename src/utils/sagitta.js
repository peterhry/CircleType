import degreesToRadians from './degreesToRadians';

/**
 * Gets the [sagitta][1] of an arc. The sagitta is the distance from the center
 * of the arc to the center of its base.
 *
 * [1]: https://en.wikipedia.org/wiki/Sagitta_(geometry)

 * @param  {Number} radius The radius of the arc.
 * @param  {Number} theta  The angle of the arc.
 *
 * @return {Number}        The sagitta value.
 */
export default (radius, theta) => {
  const halfChord = radius * Math.sin(degreesToRadians(theta / 2));
  const delta = Math.sqrt((radius ** 2) - (halfChord ** 2));

  return (theta > 180) ? radius + delta : radius - delta;
};
