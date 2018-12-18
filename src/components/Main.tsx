import React from 'react'
import styled from 'styled-components'

import ConfigStore from '../config/ConfigStore'
import ConfigForm from './config-form'
import GeneratedCode from './generated-code'

const Main = styled.main`
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

export default class extends React.Component {
  private store = new ConfigStore()

  public render() {
    return (
      <Main>
        <section>
          <ConfigForm store={this.store} />
        </section>
        <section>
          <GeneratedCode store={this.store} />
        </section>
      </Main>
    )
  }
}
