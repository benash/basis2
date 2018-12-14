import { observer } from 'mobx-react'
import * as React from 'react'

import ConfigStore from '../../config/ConfigStore'
import Config from './Config'

const GeneratedCode = (props: {store: ConfigStore}) => {
  return (
  <div className='generated-code'>
    {props.store.configFiles.map(file => <Config file={file} key={file.name} />)}
  </div>
)
  }
export default observer(GeneratedCode)
