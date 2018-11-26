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
  const asdf = ({ target, }) => { console.log(target.value) }
  return <Div>
    <Section title='Package Manager'>
      <select name='packageManager' value={props.state.packageManager} onChange={props.handlePacManChange}>
        <option value='npm'>NPM</option>
        <option value='yarn'>Yarn</option>
      </select>
    </Section>
    <Section title='Webpack Options'>
      <LabelledInput onChange={props.onChange} state={props.state} name='webpackEntry'>Entry file: </LabelledInput>
      <LabelledInput onChange={props.onChange} state={props.state} name='webpackOutputPath'>Output path: </LabelledInput>
      <LabelledInput onChange={props.onChange} state={props.state} name='webpackOutputFilename'>Output filename: </LabelledInput>
    </Section>

    {/* <LeftAlignedSection title='Loaders'> */}
      {/* <LabelledCheckbox> ES6+</LabelledCheckbox> */}
      {/* <LabelledCheckbox> React with JSX</LabelledCheckbox> */}
    {/* </LeftAlignedSection> */}
  </Div>
}
