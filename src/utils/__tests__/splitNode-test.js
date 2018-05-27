import splitNode from '../splitNode';

const createNode = (text, tag = 'p') => {
  const node = document.createElement(tag);

  node.innerText = text;

  return node;
};

describe('splitNode', () => {
  it('splits a node into `<span>`s contains chars of the node\'s text', () => {
    const testText = 'Test';
    const { length } = testText;
    const node = createNode(testText);
    const spans = splitNode(node);

    expect(spans).toBeInstanceOf(Array);
    expect(spans).toHaveLength(length);

    spans.forEach((span, i) => {
      expect(span).toBeInstanceOf(HTMLSpanElement);
      expect(span.innerHTML).toBe(testText.charAt(i));
    });
  });

  it('ignores space chars before and after the real text', () => {
    const testText = 'Test';
    const { length } = testText;
    const node = createNode(`   ${testText}       `);
    const spans = splitNode(node);

    expect(spans).toHaveLength(length);
  });

  it('converts space chars to `&nbsp;`', () => {
    const testText = 'Some piece of text with space chars in it.';
    const node = createNode(testText);
    const spans = splitNode(node);

    spans.forEach((span, i) => {
      if (testText.charAt(i) === ' ') {
        expect(span.innerHTML).toBe('&nbsp;');
      }
    });
  });

  it('handles nodes with no text content', () => {
    expect(splitNode(createNode(''))).toHaveLength(0);
  });

  it('handles nodes with only space chars', () => {
    expect(splitNode(createNode('   '))).toHaveLength(0);
  });

  it('accepts a custom splitter function', () => {
    const spans = splitNode(
      createNode('one-two-three-four'),
      string => string.split('-'),
    );
    expect(spans).toHaveLength(4);
  });

  it('handles all emojis (chars whose length might be `2`)', () => {
    const emojis = [ '🙂', '🤓', '👹', '🙉', '💩' ];
    const testText = emojis.join('');
    const { length } = emojis;
    const node = createNode(testText);
    const spans = splitNode(node);

    expect(spans).toHaveLength(length);

    for (let i = 0; i < length; i += 1) {
      const span = spans[i];

      expect(span).toBeInstanceOf(HTMLSpanElement);
      expect(span.innerHTML).toBe(emojis[i]);
    }
  });
});
