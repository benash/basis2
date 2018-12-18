import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import Section from './Section'
import LabelledInput from './LabelledInput'
import Select from './Select'
import LabelledCheckbox from './LabelledCheckbox'
import ConfigStore from '../../config/ConfigStore'

const InlineBlockDiv = styled.div`
  display: inline-block;
`

const LeftAlignedSection = styled(Section)`
  text-align: left;
`

@observer
class ConfigForm extends React.Component<{ store: ConfigStore }> {
  render() {
    const store = this.props.store
    const { webpackConfig } = this.props.store
    return (
      <InlineBlockDiv>
        <Section title='Package Manager'>
          <Select container={store} name='packageManagerName'>
            <option value='npm'>NPM</option>
            <option value='yarn'>Yarn</option>
          </Select>
        </Section>
        <LeftAlignedSection title='Transpilation'>
          <LabelledCheckbox container={store} name='useBabel'> Use Babel</LabelledCheckbox>
        </LeftAlignedSection>
        <Section title='Webpack Options'>
          <LabelledInput container={webpackConfig} name='entry'>Entry file: </LabelledInput>
          <LabelledInput container={webpackConfig} name='outputPath'>Output path: </LabelledInput>
          <LabelledInput container={webpackConfig} name='outputFilename'>Output Filename: </LabelledInput>
          <LabelledCheckbox container={webpackConfig} name='loadCss'> Load CSS</LabelledCheckbox>
          <LabelledCheckbox container={webpackConfig} name='loadImages'> Load Images</LabelledCheckbox>
          <LabelledCheckbox container={webpackConfig} name='loadFonts'> Load Fonts</LabelledCheckbox>
          <LabelledCheckbox container={webpackConfig} name='loadCsv'> Load CSV</LabelledCheckbox>
          <LabelledCheckbox container={webpackConfig} name='loadXml'> Load XML</LabelledCheckbox>
          <LabelledCheckbox container={webpackConfig} name='useCleanPlugin'> Clean output path</LabelledCheckbox>
          <LabelledCheckbox container={webpackConfig} name='useHtmlPlugin'> Create HTML files</LabelledCheckbox>
        </Section>
      </InlineBlockDiv>
    )
  }
}

export default ConfigForm
