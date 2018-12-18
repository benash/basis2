import { observer } from 'mobx-react'
import * as React from 'react'

import { Config } from './Config'
import { ConfigStore } from '../../config/ConfigStore'

export const GeneratedCode = observer((props: {store: ConfigStore}) => (
  <div className='generated-code'>
    {props.store.configFiles.map(file => <Config file={file} key={file.name} />)}
  </div>
))
