import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Highlight from '../Highlight'

Section.propTypes = {
  className: PropTypes.string,
  filename: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  children: PropTypes.node,
}

function Section(props) {
  return <section className={props.className}>
    <h3>{props.filename}</h3>
    <Highlight language={props.language}>
      {props.children}
    </Highlight>
  </section>
}

export default styled(Section)`
  text-align: left;
`
