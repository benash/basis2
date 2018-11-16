import React from 'react'

import ConfigForm from './config-form'
import GeneratedCode from './generated-code'
import styled from 'styled-components'

const Main = styled.main`
  display: flex;
  text-align: center;
  margin: 0;

  > * {
    width: 50%;
    margin: 2em;
  }

  h3 {
    text-align: left;
  }
`

export default (props) => {
  return <Main>
    <ConfigForm />
    <GeneratedCode />
  </Main>
}
