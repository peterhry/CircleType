import radiansToDegrees from './utils/radiansToDegrees';
import getRect from './utils/getRect';
import splitNode from './utils/splitNode';
import sagitta from './utils/sagitta';

const { PI, max } = Math;

/**
 * A CircleType instance creates a circular text element.
 *
 * @param  {HTMLElement} elem A target HTML element.
 *
 * @example
 * // Instantiate `CircleType` with an HTML element.
 * const circleType = new CircleType(document.getElementById('myElement'));
 *
 * // Set the text radius and direction. Note: setter methods are chainable.
 * circleType.radius(200).dir(-1);
 */
class CircleType {
  constructor(elem) {
    this.element = elem;
    this.originalHTML = this.element.innerHTML;

    const container = document.createElement('div');
    container.setAttribute('aria-label', elem.innerText);
    container.style.position = 'relative';
    this.container = container;

    this._letters = splitNode(elem);
    this._letters.forEach(letter => container.appendChild(letter));

    this.element.innerHTML = '';
    this.element.appendChild(container);

    const { fontSize, lineHeight } = window.getComputedStyle(this.element);

    this._fontSize = parseFloat(fontSize);
    this._lineHeight = parseFloat(lineHeight) || this._fontSize;
    this._metrics = this._letters.map(getRect);

    const totalWidth = this._metrics.reduce((sum, { width }) => sum + width, 0);
    this._minRadius = (totalWidth / PI / 2) + this._lineHeight;

    this._dir = 1;
    this._radius = this._minRadius;

    this._invalidate();
  }

  /**
   * Gets the text radius in pixels. The default radius is the radius required
   * for the text to form a complete circle.
   *
   * @name radius
   * @function
   * @instance
   * @memberof CircleType
   * @return {Number} The current text radius.
   *
   * @example
   * const circleType = new CircleType(document.getElementById('myElement'));
   *
   * circleType.radius();
   * // > 150
   */

  /**
   * Sets the desired text radius. The minimum radius is the radius required
   * for the text to form a complete circle. If `value` is less than the minimum
   * radius, the minimum radius is used.
   *
   * @name radius
   * @function
   * @instance
   * @memberof CircleType
   * @param  {Number} value A new text radius in pixels.
   * @return {Number}       The current instance.
   *
   * @example
   * const circleType = new CircleType(document.getElementById('myElement'));
   *
   * // Set the radius to 150 pixels.
   * circleType.radius(150);
   */
  radius(value) {
    if (value !== undefined) {
      this._radius = max(this._minRadius, value);

      this._invalidate();

      return this;
    }

    return this._radius;
  }

  /**
   * Gets the text direction. `1` is clockwise, `-1` is counter-clockwise.
   *
   * @name dir
   * @function
   * @instance
   * @memberof CircleType
   * @return {Number} The current text radius.
   *
   * @example
   * const circleType = new CircleType(document.getElementById('myElement'));
   *
   * circleType.dir();
   * // > 1 (clockwise)
   */

  /**
   * Sets the text direction. `1` is clockwise, `-1` is counter-clockwise.
   *
   * @name dir
   * @function
   * @instance
   * @memberof CircleType
   * @param  {Number} value A new text direction.
   * @return {CircleType}   The current instance.
   *
   * @example
   * const circleType = new CircleType(document.getElementById('myElement'));
   *
   * // Set the direction to counter-clockwise.
   * circleType.dir(-1);
   *
   * // Set the direction to clockwise.
   * circleType.dir(1);
   */
  dir(value) {
    if (value !== undefined) {
      this._dir = value;

      this._invalidate();

      return this;
    }

    return this._dir;
  }

  /**
   * Schedules a task to recalculate the height of the element. This should be
   * called if the font size is ever changed.
   *
   * @return {CircleType} The current instance.
   *
   * @example
   * const circleType = new CircleType(document.getElementById('myElement'));
   *
   * circleType.refresh();
   */
  refresh() {
    return this._invalidate();
  }

  /**
   * Removes the CircleType effect from the element, restoring it to its
   * original state.
   *
   * @return {CircleType} This instance.
   *
   * @example
   * const circleType = new CircleType(document.getElementById('myElement'));
   *
   * // Restore `myElement` to its original state.
   * circleType.destroy();
   */
  destroy() {
    this.element.innerHTML = this.originalHTML;

    return this;
  }

  /**
   * Invalidates the current state and schedules a task to refresh the layout
   * in the next animation frame.
   *
   * @private
   *
   * @return {CircleType} This instance.
   */
  _invalidate() {
    cancelAnimationFrame(this._raf);

    this._raf = requestAnimationFrame(() => {
      this._layout();
    });

    return this;
  }

  /**
   * Rotates and positions the letters.
   *
   * @private
   *
   * @return {CircleType} This instance.
   */
  _layout() {
    const originY = this._dir === -1 ? (-this._radius + this._lineHeight) : this._radius;

    const origin = `center ${originY / this._fontSize}em`;

    const innerRadius = this._radius - this._lineHeight;
    const { rotations, sum } = this._metrics.reduce((data, { width }) => {
      const rotation = radiansToDegrees(width / innerRadius);

      return {
        sum: data.sum + rotation,
        rotations: [
          ...data.rotations,
          data.sum + (rotation / 2),
        ],
      };
    }, { sum: 0, rotations: [] });

    this._letters.forEach((letter, index) => {
      const { style } = letter;
      const rotate = ((sum * -0.5) + rotations[index]) * this._dir;
      const translateX = (this._metrics[index].width * -0.5) / this._fontSize;
      const transform = `translateX(${translateX}em) rotate(${rotate}deg)`;

      style.position = 'absolute';
      style.bottom = this._dir === -1 ? 0 : 'auto';
      style.left = '50%';
      style.transform = transform;
      style.transformOrigin = origin;
      style.webkitTransform = transform;
      style.webkitTransformOrigin = origin;
    });

    const sagInner = sagitta(innerRadius, sum) + this._lineHeight;
    const sagOuter = sagitta(this._radius, sum);

    this.container.style.height = `${max(sagInner, sagOuter) / this._fontSize}em`;

    return this;
  }
}

export default CircleType;
