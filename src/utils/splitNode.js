/**
 * Splits the text of the provided element into its individual characters,
 * wrapping each in an `HTMLSpanElement`.
 *
 * @param {Node} node The node whose `innerText` will be split.
 * @param {Function} splitter An optional function used to split the node's text
 *                            content into individual characters
 *
 * @return {Element[]} The wrapped split chars.
 */
export default (node, splitter) => {
  const wrapperElement = document.createElement('span');
  const text = node.innerText.trim();
  const chars = splitter ? splitter(text) : [ ...text ];

  return chars.map(char => {
    const parent = wrapperElement.cloneNode();

    parent.insertAdjacentHTML('afterbegin', char === ' ' ? '&nbsp;' : char);

    return parent;
  });
};
