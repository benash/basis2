import React from 'react'
import styled from 'styled-components'

const LabelledInput = styled.label`
  display: block;
  text-align: right;
`

export default (props) => {
  return <LabelledInput>
    {props.children}<input name={props.name} value={props.state[props.name]} onChange={props.onChange}></input>
  </LabelledInput>
}
