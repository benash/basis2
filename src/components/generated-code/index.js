import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import { observer } from 'mobx-react';

@observer
export default class extends React.Component {
  render() {
    return <div className='generated-code'>
      <Section filename='package installation' language='console'>$ {this.props.store.packageManagerString}</Section>
      <Section filename='webpack.config.js' language='js'>{this.props.store.webpackConfig}</Section>
    </div>
  }
}
