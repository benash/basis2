import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ReactHighlight from 'react-highlight'

Highlight.propTypes = {
  className: PropTypes.string,
  language: PropTypes.string.isRequired,
  children: PropTypes.node,
}

const StyledHighlight = styled(ReactHighlight)`
  font-size: 0.8em;
`

export default function Highlight(props) {
  return <StyledHighlight className={props.language} language={props.language}>
    {React.Children.toArray(props.children).join('')}
  </StyledHighlight>
}
