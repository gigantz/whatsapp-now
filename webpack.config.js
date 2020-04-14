const path = require('path');

module.exports = {
  target: 'web',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  optimization: {
    minimize: true
  }
};