import radiansToDegrees from '../radiansToDegrees';

const { PI } = Math;

describe('radiansToDegrees', () => {
  it('converts radians to degrees', () => {
    expect(radiansToDegrees(0)).toBe(0);
    expect(radiansToDegrees(1)).toBe(180 / PI);
    expect(radiansToDegrees(PI)).toBe(180);
    expect(radiansToDegrees(PI * 2)).toBe(360);
    expect(radiansToDegrees(-1)).toBe(-180 / PI);
  });
});
