import getRect from '../getRect';

describe('getRect', () => {
  // it('gets the size and position of the provided element', () => {
  //   const element = document.createElement('a');

  //   expect(getRect(element)).toMatchObject(element.getBoundingClientRect());
  // });

  // it('uses `getBoundingClientRect` to generate its result', () => {
  //   const rect = { anyKey: 'any value' };
  //   const getBoundingClientRect = jest.fn().mockReturnValue(rect);
  //   const element = { getBoundingClientRect };
  //   const result = getRect(element);

  //   expect(result).toMatchObject(rect);
  //   expect(getBoundingClientRect).toHaveBeenCalledTimes(1);
  // });

  it('offsets the returned position relative to `window`', () => {
    const top = 415;
    const left = 604;
    const pageXOffset = 3000;
    const pageYOffset = 9000;
    const getBoundingClientRect = jest.fn().mockReturnValue({ left, top });
    const element = { getBoundingClientRect };

    global.pageXOffset = pageXOffset;
    global.pageYOffset = pageYOffset;

    const result = getRect(element);

    expect(result.left).toBe(left + pageXOffset);
    expect(result.top).toBe(top + pageYOffset);
  });

  it('does not mutate the rect returned by `getBoundingClientRect`', () => {
    const rect = { left: 0, top: 0 };
    const pageXOffset = 3000;
    const pageYOffset = 9000;
    const getBoundingClientRect = jest.fn().mockReturnValue(rect);
    const element = { getBoundingClientRect };

    global.pageXOffset = pageXOffset;
    global.pageYOffset = pageYOffset;

    const result = getRect(element);

    expect(result).not.toBe(rect);
    expect(rect.left).not.toBe(pageXOffset);
    expect(rect.top).not.toBe(pageYOffset);
  });
});
