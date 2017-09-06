import getRect from '../getRect';

describe('getRect', () => {
  it('gets the size and position of the provided element', () => {
    const element = document.createElement('a');
    const rectShape = expect.objectContaining({
      height: expect.any(Number),
      left: expect.any(Number),
      top: expect.any(Number),
      width: expect.any(Number),
    });

    expect(getRect(element)).toMatchObject(rectShape);
  });

  it('uses `getBoundingClientRect` to generate its result', () => {
    const getBoundingClientRect = jest.fn().mockReturnThis();
    const element = { getBoundingClientRect };

    getRect(element);

    expect(getBoundingClientRect).toHaveBeenCalledTimes(1);
  });

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
});
