module.exports = {
  context: __dirname,
  entry: {
    circletype: './src/entry.js'
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
    filename: './dist/[name].min.js',
    libraryTarget: 'umd',
  },
};
