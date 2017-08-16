import charming from 'charming';

/*
 * CircleType 2.0.0
 * Peter Hrynkow
 * Copyright 2014, Licensed GPL & MIT
 *
*/

/* globals $ */

const vendors = ['webkit', 'Moz', 'O', 'ms'];
const { PI, floor, max } = Math;
const radiansToDegrees = radians => radians * (180 / PI);

class CircleType {
  static get defaultOptions() {
    return {
      dir: 1,
      position: 'relative',
    };
  }

  static _getBounds(elem) {
    const { top, left, width, height } = elem.getBoundingClientRect();

    return {
      top: top + window.pageYOffset,
      left: left + window.pageXOffset,
      width,
      height,
    };
  }

  constructor(elem, options = {}) {
    this.elem = elem;
    this.options = { ...CircleType.defaultOptions, ...options };
    this.originalHTML = this.elem.innerHTML;

    const txt = this.elem.innerHTML.replace(/^\s+|\s+$/g, '').replace(/\s/g, '&nbsp;');

    this.elem.innerHTML = txt;

    const container = document.createElement('div');
    container.innerHTML = txt;
    container.style.position = this.options.position;
    this.elem.innerHTML = '';
    this.elem.appendChild(container);

    charming(container);

    this.container = container;
    this.letters = [...elem.getElementsByTagName('span')];
    this.center = floor(this.letters.length / 2);

    this.letters.forEach((letter) => {
      const style = letter.style;

      style.position = 'absolute';
      style.left = '50%';
      style.bottom = this.options.dir === -1 ? 0 : 'auto';
    });


    const computedStyle = window.getComputedStyle(this.elem);

    this.fontSize = parseInt(computedStyle.fontSize, 10);
    this.lineHeight = parseInt(computedStyle.lineHeight, 10) || this.fontSize;

    this.metrics = this.letters.map(CircleType._getBounds);

    const totalWidth = this.metrics.reduce((sum, { width }) => sum + width, 0);
    this.minRadius = (totalWidth / PI / 2) + this.lineHeight;

    this._layout();
  }

  refresh() {
    this._layout();
  }

  destroy() {
    this.elem.innerHTML = this.originalHTML;
    this.elem.CircleTypeInstance = null;
  }

  _layout() {
    const { radius, callback, dir, fluid } = this.options;
    const { letters, elem, metrics, lineHeight, fontSize, minRadius } = this;

    let finalRadius = radius;

    if (fluid) {
      finalRadius = max(elem.offsetWidth / 2, minRadius);
    } else if (!radius) {
      finalRadius = minRadius;
    }

    const originY = dir === -1 ? (-finalRadius + lineHeight) : finalRadius;

    const origin = `center ${originY / fontSize}em`;

    const innerRadius = finalRadius - lineHeight;


    const { rotations, sum } = metrics.reduce((data, { width }) => {
      const rotation = radiansToDegrees(width / innerRadius);

      return {
        sum: data.sum + rotation,
        rotations: [
          ...data.rotations,
          data.sum + (rotation / 2),
        ],
      };
    }, { sum: 0, rotations: [] });


    letters.forEach((letter, index) => {
      const { style } = letter;
      const rotate = ((sum / -2) + rotations[index]) * dir;
      const translateX = (metrics[index].width / -2) / this.fontSize;

      vendors.forEach((vendor) => {
        style[`${vendor}Transform`] = `translateX(${translateX}em) rotate(${rotate}deg)`;
        style[`${vendor}TransformOrigin`] = origin;
      });
    });

    this._updateHeight();

    if (typeof callback === 'function') {
      callback.apply(elem);
    }
  }

  _updateHeight() {
    const { letters, center } = this;
    const mid = CircleType._getBounds(letters[center]);
    const first = CircleType._getBounds(letters[0]);
    const height = first.height + Math.abs(first.top - mid.top);

    this.container.style.height = `${height}px`;
  }
}

$.fn.circleType = function (options) {
  return this.each(function () {
    if (options === 'refresh') {
      return this.CircleTypeInstance.refresh();
    }

    this.CircleTypeInstance = new CircleType(this, options);

    return this.CircleTypeInstance;
  });
};


export default CircleType;
