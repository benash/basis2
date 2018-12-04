import React from 'react'
import PropTypes from 'prop-types'

export default function Section(props) {
  return <section className={props.className}>
    <h3>{props.title}</h3>
    <form>
      {props.children}
    </form>
  </section>
}

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}
