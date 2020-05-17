const webpack = require('webpack');
const PACKAGE = require('./package.json');

const banner = `${PACKAGE.name} ${PACKAGE.version}
${PACKAGE.description}
Copyright © 2014-${new Date().getFullYear()} ${PACKAGE.author}
Licensed ${PACKAGE.license}
${PACKAGE.homepage}`;

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
    filename: './[name].min.js',
    library: 'CircleType',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.BannerPlugin(banner)
  ],
};
