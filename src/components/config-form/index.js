import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import LabelledInput from './LabelledInput'
import Select from './Select'
import LabelledCheckbox from './LabelledCheckbox'
import { observer } from 'mobx-react';

const Div = styled.div`
  display: inline-block;
`

const LeftAlignedSection = styled(Section)`
  text-align: left;
`

export default observer((props) => {
  return <Div>
    <Section title='Package Manager'>
      <Select store={props.store} name='packageManagerName'>
        <option value='npm'>NPM</option>
        <option value='yarn'>Yarn</option>
      </Select>
    </Section>
    <LeftAlignedSection title='Transpilation'>
      <LabelledCheckbox store={props.store} name='useBabel'> Use Babel</LabelledCheckbox>
    </LeftAlignedSection>
    <Section title='Webpack Options'>
      <LabelledInput store={props.store} name='webpackEntry'>Entry file: </LabelledInput>
      <LabelledInput store={props.store} name='webpackOutputPath'>Output path: </LabelledInput>
      <LabelledInput store={props.store} name='webpackOutputFilename'>Output Filename: </LabelledInput>
    </Section>

    {/* <LeftAlignedSection title='Loaders'> */}
      {/* <LabelledCheckbox> ES6+</LabelledCheckbox> */}
      {/* <LabelledCheckbox> React with JSX</LabelledCheckbox> */}
    {/* </LeftAlignedSection> */}
  </Div>
})
