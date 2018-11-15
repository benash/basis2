import React from 'react'
import styled from 'styled-components'

const LabelledCheckbox = styled.label`
  display: block;
  text-align: left;
`

export default (props) => {
  return <LabelledCheckbox>
    <input type="checkbox"></input>{props.children}
  </LabelledCheckbox>
}
