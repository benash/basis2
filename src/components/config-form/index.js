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
      <LabelledCheckbox container={props.store} name='useBabel'> Use Babel</LabelledCheckbox>
    </LeftAlignedSection>
    <Section title='Webpack Options'>
      <LabelledInput container={props.store.webpackConfig} name='entry'>Entry file: </LabelledInput>
      <LabelledInput container={props.store.webpackConfig} name='outputPath'>Output path: </LabelledInput>
      <LabelledInput container={props.store.webpackConfig} name='outputFilename'>Output Filename: </LabelledInput>
      <LabelledCheckbox container={props.store.webpackConfig} name='loadCss'> Load CSS</LabelledCheckbox>
    </Section>
  </Div>
})
