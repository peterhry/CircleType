module.exports = {
  context: __dirname,
  entry: {
    circletype: './js/circletype.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ]
      },
    ],
  },

  output: {
    filename: './js/[name].min.js',
    libraryTarget: 'umd',
    library: 'CircleType'
  },
};
