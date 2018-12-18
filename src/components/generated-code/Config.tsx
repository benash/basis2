import React from 'react'
import styled from 'styled-components'

import { ConfigFile } from '../../config/ConfigFile'
import { Highlight } from '../Highlight'

const StyledSection = styled.section`
  text-align: left;
`

export const Config: React.SFC<{file: ConfigFile }> = (props) => (
  <StyledSection>
    <h3>{props.file.name}</h3>
    <Highlight language={props.file.language}>
      {props.file.contents}
    </Highlight>
  </StyledSection>
)
