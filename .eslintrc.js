module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'no-underscore-dangle': 'off',
  },
};
