import React from 'react'

import Form from './ConfigOptions'
import GeneratedCode from './GeneratedCode'
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
    ${'' /* margin-left: 15%; */}
  }

  .generated-code {
    text-align: left;
    pre {
      font-size: 0.8em;
    }
  }
`

export default (props) => {
  return <Main>
    <Form />
    <GeneratedCode />
  </Main>
}
