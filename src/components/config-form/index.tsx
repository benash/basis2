import * as React from 'react'
import styled from 'styled-components'

import Section from './Section'
import LabelledInput from './LabelledInput'
import Select from './Select'
import LabelledCheckbox from './LabelledCheckbox'
import { observer } from 'mobx-react'

const Div = styled.div`
  display: inline-block;
`

const LeftAlignedSection = styled(Section)`
  text-align: left;
`

export default observer(({store}) => {
  return <Div>
    <Section title='Package Manager'>
      <Select store={store} name='packageManagerName'>
        <option value='npm'>NPM</option>
        <option value='yarn'>Yarn</option>
      </Select>
    </Section>
    <LeftAlignedSection title='Transpilation'>
      <LabelledCheckbox container={store} name='useBabel'> Use Babel</LabelledCheckbox>
    </LeftAlignedSection>
    <Section title='Webpack Options'>
      <LabelledInput container={store.webpackConfig} name='entry'>Entry file: </LabelledInput>
      <LabelledInput container={store.webpackConfig} name='outputPath'>Output path: </LabelledInput>
      <LabelledInput container={store.webpackConfig} name='outputFilename'>Output Filename: </LabelledInput>
      <LabelledCheckbox container={store.webpackConfig} name='loadCss'> Load CSS</LabelledCheckbox>
      <LabelledCheckbox container={store.webpackConfig} name='loadImages'> Load Images</LabelledCheckbox>
      <LabelledCheckbox container={store.webpackConfig} name='loadFonts'> Load Fonts</LabelledCheckbox>
      <LabelledCheckbox container={store.webpackConfig} name='loadCsv'> Load CSV</LabelledCheckbox>
      <LabelledCheckbox container={store.webpackConfig} name='loadXml'> Load XML</LabelledCheckbox>
      <LabelledCheckbox container={store.webpackConfig} name='useCleanPlugin'> Clean output path</LabelledCheckbox>
      <LabelledCheckbox container={store.webpackConfig} name='useHtmlPlugin'> Create HTML files</LabelledCheckbox>
    </Section>
  </Div>
})
