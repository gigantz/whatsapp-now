const path = require('path');

module.exports = {
  target: 'web',
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
    content: path.join(__dirname, 'src', 'content.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  optimization: {
    minimize: true
  }
};