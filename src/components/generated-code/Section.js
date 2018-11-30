import React from 'react'
import styled from 'styled-components'

import Highlight from 'react-highlight.js'

const Section = styled.section`
  text-align: left;
`

const StyledHighlight = styled(Highlight)`
  font-size: 0.8em;
`

export default (props) => {
  return <Section className={props.className}>
    <h3>{props.filename}</h3>
    <StyledHighlight language={props.language}>
      {React.Children.toArray(props.children).join('')}
    </StyledHighlight>
  </Section>
}
