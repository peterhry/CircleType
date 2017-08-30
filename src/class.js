import radiansToDegrees from './radiansToDegrees';
import getLetters from './getLetters';
import getHeight from './getHeight';

const { PI, max } = Math;

/**
 * A CircleType instance creates a circular text element.
 *
 * @param  {HTMLElement} elem A target HTML element.
 */
class CircleType {
  constructor(elem) {
    this._dir = 1;
    this.element = elem;
    this.originalHTML = this.element.innerHTML;

    const txt = this.element.innerText;

    const container = document.createElement('div');
    container.setAttribute('aria-label', txt);
    container.style.position = 'relative';
    this.container = container;

    this._letters = getLetters(txt);
    this._letters.forEach(letter => container.appendChild(letter));

    this.element.innerHTML = '';
    this.element.appendChild(container);

    const { fontSize, lineHeight } = window.getComputedStyle(this.element);

    this._fontSize = parseInt(fontSize, 10);
    this._lineHeight = parseInt(lineHeight, 10) || this._fontSize;
    this._metrics = this._letters.map(getBounds);

    const totalWidth = this._metrics.reduce((sum, { width }) => sum + width, 0);
    this._minRadius = (totalWidth / PI / 2) + this._lineHeight;

    this._invalidate();
  }

  /**
   * Gets or sets the radius.
   *
   * @public
   *
   * @param  {Number=} value A radius value
   *
   * @return {Number}        The radius
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
   * Gets or sets the direction.
   *
   * @public
   *
   * @param  {Number=} value A direction value (1|-1)
   *
   * @return {Number}        The direction
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
   * Public method to invalidate the layout.
   *
   * @public
   */
  refresh() {
    return this._invalidate();
  }

  /**
   * Removes the CircleType effect from the element, restoring it to its
   * original state.
   *
   * @public
   *
   * @return {CircleType} This instance.
   */
  destroy() {
    this.element.innerHTML = this.originalHTML;

    return this;
  }

  /**
   * Invalidates the current state, scheduling a task to refresh the layout in
   * the next animation frame.
   *
   * @private
   *
   * @return {CircleType} This instance.
   */
  _invalidate() {
    requestAnimationFrame(() => {
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
    const finalRadius = !this._radius ? this._minRadius : this._radius;

    const originY = this._dir === -1 ? (-finalRadius + this._lineHeight) : finalRadius;

    const origin = `center ${originY / this._fontSize}em`;

    const innerRadius = finalRadius - this._lineHeight;
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

    this.container.style.height = `${getHeight(this._letters)}px`;

    return this;
  }
}

export default CircleType;
