const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', },
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader', ], },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader', ], },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist', ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
