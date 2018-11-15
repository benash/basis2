import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  form {
    display: inline-block;
  }
`

export default (props) => {
  return <Section>
    <h3>{props.title}</h3>
    <form>
      {props.children}
    </form>
  </Section>
}
