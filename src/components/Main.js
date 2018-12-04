import React from 'react'

import ConfigForm from './config-form'
import GeneratedCode from './generated-code'
import styled from 'styled-components'
import Config from '../stores/config';

const StyledMain = styled.main`
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

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.store = new Config()
  }

  render() {
    return <StyledMain>
      <section>
        <ConfigForm store={this.store}/>
      </section>
      <section>
        <GeneratedCode store={this.store} />
      </section>
    </StyledMain>
  }
}
