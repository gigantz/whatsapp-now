const path = require('path');

// simple webpack config
module.exports = {
  target: 'web',
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
    content: path.join(__dirname, 'src', 'content.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  optimization: {
    minimize: true,
  },
};
