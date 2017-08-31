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

    expect(spans).toHaveLength(length);

    for (let i = 0; i < length; i++) {
      const span = spans[i];

      expect(span).toBeInstanceOf(HTMLSpanElement);
      expect(span.innerHTML).toBe(testText.charAt(i));
    }
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
    const { length } = testText;
    const node = createNode(testText);
    const spans = splitNode(node);

    for (let i = 0; i < length; i++) {
      if (testText.charAt(i) === ' ') {
        expect(spans[i].innerHTML).toBe('&nbsp;');
      }
    }
  });

  it('handles any node', () => {
    const testText = 'Some piece of text with space chars in it.';
    const { length } = testText;
    const nodeTypes = ['div', 'a', 'time', 'asdf'];
    const nodes = nodeTypes.map(type => createNode(testText, type));

    for (const node of nodes) {
      const spans = splitNode(node);

      expect(spans).toHaveLength(length);
    }
  });

  it('handles nodes with no text content', () => {
    expect(splitNode(createNode(''))).toHaveLength(0);
  });

  it('handles nodes with only space chars', () => {
    expect(splitNode(createNode('   '))).toHaveLength(0);
  });

  it('allows chars to be wrapped by any tag', () => {
    const testText = 'X';
    const node = createNode(testText);
    const [ anchor ] = splitNode(node, 'a');
    const [ div ] = splitNode(node, 'div');
    const [ button ] = splitNode(node, 'button');
    const [ unknown ] = splitNode(node, 'asdf');

    expect(anchor).toBeInstanceOf(HTMLAnchorElement);
    expect(div).toBeInstanceOf(HTMLDivElement);
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(unknown).toBeInstanceOf(HTMLUnknownElement);
  });

  it('handles all emojis (chars whose length might be `2`)', () => {
    const emojis = ['🙂', '🤓', '👹', '🙉', '💩'];
    const testText = emojis.join('');
    const { length } = emojis;
    const node = createNode(testText);
    const spans = splitNode(node);

    expect(spans).toHaveLength(length);

    for (let i = 0; i < length; i++) {
      const span = spans[i];

      expect(span).toBeInstanceOf(HTMLSpanElement);
      expect(span.innerHTML).toBe(emojis[i]);
    }
  });
});
