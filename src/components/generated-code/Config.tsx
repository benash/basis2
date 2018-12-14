import * as React from 'react'
import styled from 'styled-components'

import Highlight from '../Highlight'
import { ConfigFile } from '../../config/ConfigFile'

class Config extends React.Component<{ className: string, file: ConfigFile }> {
  render() {
    const { name, contents, language } = this.props.file

    return (
      <section className={this.props.className}>
        <h3>{name}</h3>
        <Highlight language={language}>
          {contents}
        </Highlight>
      </section>
    )
  }
}

export default styled(Config)`
  text-align: left;
`
