import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const StyledLabel = styled.label`
  display: block;
  text-align: left;
`

interface Props {
  name: string
  container: {[key: string]: any}
}

@observer
export class LabelledCheckbox extends React.Component<Props> {
  render() {
    const { name, container } = this.props
    return (
      <StyledLabel>
        <input
          type='checkbox'
          name={name}
          checked={container[name]}
          onChange={({ target }) => container[name] = target.checked}
        />
        {this.props.children}
      </StyledLabel>
    )
  }
}
