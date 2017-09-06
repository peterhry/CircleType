import getRect from '../getRect';

describe('getRect', () => {
  it('gets the size and position of the provided element', () => {
    const element = document.createElement('a');

    expect(getRect(element)).toMatchObject(element.getBoundingClientRect());
  });

  it('uses `getBoundingClientRect` to generate its result', () => {
    const rect = { anyKey: 'any value' };
    const getBoundingClientRect = jest.fn().mockReturnValue(rect);
    const element = { getBoundingClientRect };
    const result = getRect(element);

    expect(result).toBe(rect);
    expect(getBoundingClientRect).toHaveBeenCalledTimes(1);
  });

  it('allows a passed in reference to offset the returned position', () => {
    const top = 415;
    const left = 604;
    const pageXOffset = 3000;
    const pageYOffset = 9000;
    const getBoundingClientRect = jest.fn().mockReturnValue({ left, top });
    const element = { getBoundingClientRect };
    const result = getRect(element, { pageXOffset, pageYOffset });

    expect(result.left).toBe(left + pageXOffset);
    expect(result.top).toBe(top + pageYOffset);
  });
});
