import * as React from 'react'

import Config from './Config'
import { observer } from 'mobx-react';
import ConfigStore from '../../config/ConfigStore';

@observer
class GeneratedCode extends React.Component<{store: ConfigStore}> {
  render() {
    return <div className='generated-code'>
      {this.props.store.configFiles.map(file => <Config file={file} key={file.name} /> )}
    </div>
  }
}

export default GeneratedCode
