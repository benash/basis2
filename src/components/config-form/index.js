import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import LabelledInput from './LabelledInput'
import LabelledCheckbox from './LabelledCheckbox'

const Div = styled.div`
  display: inline-block;
`

const LeftAlignedSection = styled(Section)`
  text-align: left;
`

export default (props) => {
  return <Div>
    <Section title='Webpack Options'>
      <LabelledInput onChange={props.onChange} name='webpackEntry' value={props.state.webpackEntry}>Entry file: </LabelledInput>
      <LabelledInput onChange={props.onChange} name='webpackOutputPath' value={props.state.webpackOutputPath}>Output path: </LabelledInput>
      <LabelledInput onChange={props.onChange} name='webpackOutputFilename' value={props.state.webpackOutputFilename}>Output filename: </LabelledInput>
    </Section>

    <LeftAlignedSection title='Loaders'>
      <LabelledCheckbox> ES6+</LabelledCheckbox>
      <LabelledCheckbox> React with JSX</LabelledCheckbox>
    </LeftAlignedSection>
  </Div>
}
