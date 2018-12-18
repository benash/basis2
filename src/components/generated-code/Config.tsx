import React from 'react'
import styled from 'styled-components'

import { ConfigFile } from '../../config/ConfigFile'
import Highlight from '../Highlight'

const StyledSection = styled.section`
  text-align: left;
`

export default class extends React.Component<{ file: ConfigFile }> {
  public render() {
    const { name, contents, language } = this.props.file

    return (
      <StyledSection>
        <h3>{name}</h3>
        <Highlight language={language}>
          {contents}
        </Highlight>
      </StyledSection>
    )
  }
}
