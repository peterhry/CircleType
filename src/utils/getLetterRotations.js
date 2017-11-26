import radiansToDegrees from './radiansToDegrees';

export default (metrics, r) => metrics.reduce((data, { width }) => {
  const rotation = radiansToDegrees(width / r);

  return {
    θ: data.θ + rotation,
    rotations: data.rotations.concat([ data.θ + (rotation / 2) ]),
  };
}, { θ: 0, rotations: [] });
