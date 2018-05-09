/**
 * Splits the text of the provided element into its individual chars, wrapping
 * each with an instance of the provided wrapper element.
 *
 * @param {Node} node The node whose `innerText` will be split.
 * @param {string} [wrapper='span'] The name of the element to wrap each char.
 *
 * @return {Element[]} The wrapped split chars.
 */
export default (node, wrapper = 'span') => {
  const wrapperElement = document.createElement(wrapper);

  const trimmedText = node.innerText.trim();
  const elements = [];

  // eslint-disable-next-line
  for (const char of trimmedText) {
    const parent = wrapperElement.cloneNode();

    parent.insertAdjacentHTML('afterbegin', char === ' ' ? '&nbsp;' : char);

    elements.push(parent);
  }

  return elements;
};
