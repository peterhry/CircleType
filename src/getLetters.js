/**
 * Splits `text` into individual span elements.
 *
 * @param  {String} text  A string of text to convert.
 *
 * @return {Array}        An array of letter elements.
 */
export default text => (
  text.trim().split('').map((letter) => {
    const span = document.createElement('span');

    span.innerHTML = letter === ' ' ? '&nbsp;' : letter;

    return span;
  })
);
