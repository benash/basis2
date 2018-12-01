import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react';

const LabelledInput = styled.label`
  display: block;
  text-align: right;
`

export default observer((props) => {
  return <LabelledInput>
    {props.children}
    <input
      name={props.name}
      value={props.store[props.name]}
      onChange={({ target }) => props.store[props.name] = target.value}>
    </input>
  </LabelledInput>
})
