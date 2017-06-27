var path = require('path');

module.exports = {
  entry: {
  	app: './client/initialize'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
