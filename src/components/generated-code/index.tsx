import { observer } from 'mobx-react'
import * as React from 'react'

import { Config } from './Config'
import { ConfigStore } from '../../config/ConfigStore'

export const GeneratedCode = observer((props: {store: ConfigStore}) => (
  <>
    {props.store.configFiles.map(file => <Config file={file} key={file.name} />)}
  </>
))
