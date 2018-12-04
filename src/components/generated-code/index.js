import React from 'react'
import PropTypes from 'prop-types'

import Section from './Section'
import { observer } from 'mobx-react';

@observer
class GeneratedCode extends React.Component {
  static propTypes = {
    store: PropTypes.any
  }

  render() {
    const store = this.props.store

    return <div className='generated-code'>
      <Section filename='package installation' language='console'>$ {store.packageManagerString}</Section>
      <Section filename='webpack.config.js' language='js'>{store.webpackConfig}</Section>
      <Section filename='.babelrc' language='json'>{store.transpiler.config.toString}</Section>
    </div>
  }
}

export default GeneratedCode
