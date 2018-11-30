import React from 'react'

import GeneratedCode from './generated-code'

export default class extends React.Component {
  packageList() { return ['webpack', 'webpack-cli',] }
  packageInstallationCommand(pacMan) {
    return pacMan === 'yarn' ? 'yarn add' : 'npm install'
  }

  packageInstallationString(pacMan) { return `${this.packageInstallationCommand(pacMan)} ${this.packageList().join(' ')}` }

  render() {
    const pac = this.packageInstallationString(this.props.state.packageManager)
    return <GeneratedCode state={this.props.state} packageInstallationString={pac}></GeneratedCode>
  }
}
