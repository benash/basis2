import React from 'react'

import ConfigForm from './config-form'
import GeneratedCode from './generated-code'
import styled from 'styled-components'

const Main = styled.main`
  display: flex;
  text-align: center;
  margin: 0;

  > section {
    width: 50%;
    margin: 2em;
  }

  h3 {
    text-align: left;
  }
`

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      packageManager: 'yarn',
      webpackEntry: './src/index.js',
      webpackOutputPath: 'dist',
      webpackOutputFilename: 'bundle.js',
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handlePacManChange = this.handlePacManChange.bind(this)
  }

  handleFormChange({ target, }) {
    this.setState({
      [target.name]: target.value,
    })
  }

  packageList() { return [ 'webpack', 'webpack-cli', ] }
  packageInstallationCommand(pacMan) {
    console.log(pacMan)
    return pacMan === 'yarn' ? 'yarn add' : 'npm install'
  }

  packageInstallationString(pacMan) { return `${this.packageInstallationCommand(pacMan)} ${this.packageList().join(' ')}` }

  handlePacManChange({ target, }) {
    this.setState({
      packageInstallationString: this.packageInstallationString(target.value),
    })
  }

  render() {
    return <Main>
      <section>
        <ConfigForm onChange={this.handleFormChange} handlePacManChange={this.handlePacManChange} state={this.state}/>
      </section>
      <section>
        <GeneratedCode state={this.state} packageInstallationString={this.state.packageInstallationString} />
      </section>
    </Main>
  }
}
