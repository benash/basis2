import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react';

const LabelledCheckbox = styled.label`
  display: block;
  text-align: left;
`

export default observer((props) => {
  return <LabelledCheckbox>
    <input
      type='checkbox'
      name={props.name}
      checked={props.container[props.name]}
      onChange={({ target }) => props.container[props.name] = target.checked }>
    </input>
    {props.children}
  </LabelledCheckbox>
})
