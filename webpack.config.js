const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

const styledComponentsTransformer = createStyledComponentsTransformer()

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), /* eslint no-undef: 0 */
  },
  module: {
    rules: [
      {
        test: /\.(t)sx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        },
      },
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader', ], },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader', ], },
      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', },
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
