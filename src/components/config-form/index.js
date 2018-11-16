import React from 'react'

import ConfigForm from './Section'
import LabelledInput from './LabelledInput'
import LabelledCheckbox from './LabelledCheckbox'

export default (props) => {
  return <div>
    <ConfigForm title='Webpack Options'>
      <LabelledInput value='./src/index.js'>Entry file: </LabelledInput>
      <LabelledInput value='dist'>Output path: </LabelledInput>
      <LabelledInput value='bundle.js'>Output filename: </LabelledInput>
    </ConfigForm>

    <ConfigForm title='Loaders'>
      <LabelledCheckbox> ES6+</LabelledCheckbox>
      <LabelledCheckbox> React with JSX</LabelledCheckbox>
    </ConfigForm>
  </div>
}
