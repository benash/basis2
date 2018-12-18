import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const StyledLabel = styled.label`
  display: block;
  text-align: right;
`

@observer
export class LabelledInput extends React.Component<{name: string, container: {[key: string]: any}}> {
  render() {
    const { name, container } = this.props
    return (
      <StyledLabel>
        {this.props.children}
        <input
          name={name}
          value={container[name]}
          onChange={({ currentTarget }) => container[name] = currentTarget.value}
        />
      </StyledLabel>
    )
  }
}
