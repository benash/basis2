import React from 'react'
import styled from 'styled-components'
import ReactHighlight from 'react-highlight'

const StyledHighlight = styled(ReactHighlight)`
  font-size: 0.8em;
`

const Highlight: React.SFC<{ language: string }> = (props) => {
  return (
    <StyledHighlight className={props.language}>
      {React.Children.toArray(props.children).join('')}
    </StyledHighlight>
  )
}

export default Highlight
