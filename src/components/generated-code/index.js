import React from 'react'
import styled from 'styled-components'

import Section from './Section'

export default (props) => {
  const yarnCommands = '$ yarn add babel-plugin-react-css-modules html5-boilerplate react react-dom react-highlight.js styled-components '

  const babelConfig = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      'babel-plugin-styled-components',
    ],
  }
  const plaintext = 'node_modules\ndist\n'

  const js = `const path = require('path')
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
      { test: /\.scss$/,
        use: [ 'style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
          },
        }, 'sass-loader', ], },
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
`
  const PreWrapped = styled.div`
    code {
      white-space: pre-wrap;
    }
  `

  const PreWrapped2 = styled(Section)`
    code {
      white-space: pre-wrap;
    }
  `

  return <div className="generated-code">
    <Section filename='webpack.config.js' language='js'>
      {js}
    </Section>
    <PreWrapped2 filename='yarn commands' language='console'>
      {yarnCommands}
    </PreWrapped2>
    <Section filename='.babelrc' language='json'>
      {JSON.stringify(babelConfig, null, 2)}
    </Section>
    <Section filename='.gitignore' language='plaintext'>
      {plaintext}
    </Section>
  </div>
}
