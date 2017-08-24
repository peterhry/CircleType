/*
 * CircleType 2.0.0
 * Peter Hrynkow
 * Copyright 2014, Licensed GPL & MIT
 *
*/

const vendors = ['webkit', 'Moz', 'O', 'ms'];
const { PI, floor, abs } = Math;

/**
 * Converts radians to degrees.
 *
 * @param  {Number} radians A radians value.
 *
 * @return {Number}         A degrees value.
 */
const radiansToDegrees = radians => radians * (180 / PI);

/**
 * Gets an element’s bounds relative to the document.
 *
 * @param  {HTMLElement} elem An element.
 *
 * @return {Object}
 */
const getBounds = (elem) => {
  const { top, left, width, height } = elem.getBoundingClientRect();

  return {
    top: top + window.pageYOffset,
    left: left + window.pageXOffset,
    width,
    height,
  };
};

/**
 * Splits `text` into individual span elements.
 *
 * @param  {String} text  A string of text to convert.
 *
 * @return {Array}        An array of letter elements.
 */
const getLetters = text => (
  text.trim().split('').map((letter) => {
    const span = document.createElement('span');
    const { style } = span;

    style.position = 'absolute';
    style.left = '50%';

    span.innerHTML = letter === ' ' ? '&nbsp;' : letter;

    return span;
  })
);

/**
 * Gets the combined height of all letter elements.
 *
 * @param  {Array} letters  An array of letter elements.
 *
 * @return {Number}         The total height.
 */
const getHeight = (letters) => {
  const center = floor(letters.length / 2);
  const mid = getBounds(letters[center]);
  const first = getBounds(letters[0]);
  const height = first.height + abs(first.top - mid.top);

  return height;
};

/**
 * A CircleType instance creates a circular text _elem
 *
 * @param  {HTMLElement} elem A target HTML element.
 */
class CircleType {
  constructor(elem) {
    this._dir = 1;
    this.element = elem;
    this.originalHTML = this.element.innerHTML;

    this._build();
    this._invalidate();
  }

  /**
   * Gets or sets the radius.
   *
   * @param  {Number=} value A radius value
   *
   * @return {Number}        The radius
   */
  radius(value) {
    if (typeof value !== 'undefined') {
      this._radius = value;

      this._invalidate();

      return this;
    }

    return this._radius;
  }

  /**
   * Gets or sets the direction.
   *
   * @param  {Number=} value A direction value (1|-1)
   *
   * @return {Number}        The direction
   */
  dir(value) {
    if (typeof value !== 'undefined') {
      this._dir = value;

      this._invalidate();

      return this;
    }

    return this._dir;
  }

  /**
   * Public method to invalidate the layout.
   */
  refresh() {
    return this._invalidate();
  }

  /**
   * Removes the CircleType effect from the element, restoring it to its
   * original state.
   *
   * @return {CircleType} This instance.
   */
  destroy() {
    this.element.innerHTML = this.originalHTML;

    return this;
  }

  /**
   * Invalidates the current state, scheduling a task to refresh the layout in
   * the next frame.
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
   * Builds the elements neccessary for the effect.
   *
   * @private
   *
   * @return {CircleType} This instance.
   */
  _build() {
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

    return this._layout();
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

      style.bottom = this._dir === -1 ? 0 : 'auto';

      vendors.forEach((vendor) => {
        style[`${vendor}Transform`] = `translateX(${translateX}em) rotate(${rotate}deg)`;
        style[`${vendor}TransformOrigin`] = origin;
      });
    });

    this.container.style.height = `${getHeight(this._letters)}px`;

    return this;
  }
}

export default CircleType;
