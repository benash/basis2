import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ReactHighlight from 'react-highlight.js'

Highlight.propTypes = {
  className: PropTypes.string,
  language: PropTypes.string.isRequired,
  children: PropTypes.node,
}

function Highlight(props) {
  return <ReactHighlight className={props.className} language={props.language}>
    {React.Children.toArray(props.children).join('')}
  </ReactHighlight>
}

export default styled(Highlight)`
  font-size: 0.8em;
`
