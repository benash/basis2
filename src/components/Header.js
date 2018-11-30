import React from 'react'

import styled from 'styled-components'

const Header = styled.header`
    background-color: ${props => props.theme.darkPurple};
    overflow: hidden;
    text-align: center;
    padding: 2em 0;
    line-height: 1;

    h1 {
      color: ${props => props.theme.lightGrey};
      margin: 0;
      font-weight: normal;
      font-size: 2.1em;
    }

    p {
      color: ${props => props.theme.lightPurple};
      font-weight: 300;
      font-family: 'Work Sans', sans-serif;
      margin-top: 0.6em;
      margin-bottom: 0;
    }
`

export default () => {
  return <Header>
    <h1>Config Generator</h1>
    <p>Create web projects easily. Without magic.</p>
  </Header>
}
