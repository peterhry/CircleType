import radiansToDegrees from './radiansToDegrees';

const { PI } = Math;

describe('radiansToDegrees', () => {
  it('converts radians to degrees', () => {
    expect(radiansToDegrees(0)).toEqual(0);
    expect(radiansToDegrees(PI)).toEqual(180);
    expect(radiansToDegrees(PI * 2)).toEqual(360);
  });
});
