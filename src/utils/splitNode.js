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

  return [ ...node.innerText.trim() ].map(char => {
    const parent = wrapperElement.cloneNode();

    parent.insertAdjacentHTML('afterbegin', char === ' ' ? '&nbsp;' : char);

    return parent;
  });
};
