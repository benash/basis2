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

  const PreWrapped = styled(Section)`
    code {
      white-space: pre-wrap;
    }
  `

  const webpackConfig = `const path = require('path')

  module.exports = {
    entry: '${props.state.webpackEntry}',
    output: {
      filename: '${props.state.webpackOutputFilename}',
      path: path.resolve(__dirname, '${props.state.webpackOutputPath}'),
    },
  }`

  return <div className='generated-code'>
    <Section filename='webpack.config.js' language='js'>
      {webpackConfig}
    </Section>
    <PreWrapped filename='yarn commands' language='console'>{yarnCommands}</PreWrapped>
    <Section filename='.babelrc' language='json'>
      {JSON.stringify(babelConfig, null, 2)}
    </Section>
  </div>
}
