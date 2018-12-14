import React from 'react'
import styled from 'styled-components'

import ConfigStore from '../config/ConfigStore'
import ConfigForm from './config-form'
import GeneratedCode from './generated-code'

class Main extends React.Component<{className: string}> {
  public a = this.props.className
  private store = new ConfigStore()

  public render = () => (
    <main className={this.props.className}>
      <section>
        <ConfigForm store={this.store} />
      </section>
      <section>
        <GeneratedCode store={this.store} />
      </section>
    </main>
  )
}

export default styled(Main)`
  display: flex;
  text-align: center;
  margin: 0;

  > section {
    width: 50%;
    margin: 2em;
  }

  h3 {
    text-align: left;
  }
`
