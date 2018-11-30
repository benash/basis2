import React from 'react'

import ConfigForm from './config-form'
import GeneratedCodeWrapper from './generated-code-wrapper'
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
  }

  handleFormChange({ target, }) {
    this.setState({
      [target.name]: target.value,
    })
  }

  render() {
    return <Main>
      <section>
        <ConfigForm onChange={this.handleFormChange} state={this.state}/>
      </section>
      <section>
        <GeneratedCodeWrapper state={this.state} />
      </section>
    </Main>
  }
}
