import React from 'react'
import styled from 'styled-components'

import Section from './Section'

export default class extends React.Component {
  render() {
    const webpackConfig = `const path = require('path')

  module.exports = {
    entry: '${this.props.state.webpackEntry}',
    output: {
      filename: '${this.props.state.webpackOutputFilename}',
      path: path.resolve(__dirname, '${this.props.state.webpackOutputPath}'),
    },
  }`

    const pack = `$ ${this.props.packageInstallationString}`

    return <div className='generated-code'>
      <Section filename='package installation' language='console'>{pack}</Section>
      <Section filename='webpack.config.js' language='js'>{webpackConfig}</Section>
    </div>
  }
}
