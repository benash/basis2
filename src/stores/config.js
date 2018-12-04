import { observable, computed } from 'mobx'

import YarnDevDependenciesCommand from './yarn-dev-dependencies-command'
import NpmDevDependenciesCommand from './npm-dev-dependencies-command'

export default class Config {
  id = Math.random()
  @observable packageManager = 'yarn'
  @observable webpackEntry = './src/index.js'
  @observable webpackOutputPath = 'dist'
  @observable webpackOutputFilename = 'bundle.js'
  @observable useBabel = false

  @computed get devDependencies() { return ['webpack', 'webpack-cli',] }
  @computed get dependencies() { return [] }

  @computed get packageManagerString() {
    const command = this.packageManager === 'yarn' ?
      new YarnDevDependenciesCommand(this.devDependencies) :
      new NpmDevDependenciesCommand(this.devDependencies)
    return command.toString
  }

  @computed get webpackConfig() {
    return `const path = require('path')

module.exports = {
  entry: '${this.webpackEntry}',
  output: {
    filename: '${this.webpackOutputFilename}',
    path: path.resolve(__dirname, '${this.webpackOutputPath}'),
  },
}`
  }
  
  @computed get transpiler() {
    if (this.useBabel) {
      return new BabelTranspiler()
    }

    return new NoopTranspiler()
  }
}

class JsonConfigFile {
  constructor({ filename, contents, }) {
    this.filename = filename
    this.contents = contents
  }

  get toString() {
    return JSON.stringify(this.contents, null, 2)
  }
}

class BabelTranspiler {
  devDependencies = [ 'babel-loader', '@babel/core', '@babel/preset-env', 'webpack', ]
  dependencies = []

  config = new JsonConfigFile({
    filename: '.babelrc',
    contents: {
      presets: [
        '@babel/preset-env', 
      ],
    },
  })
}

class NoopTranspiler {
  devDependencies = []
  dependencies = []

  config = new NoopConfigFile()
}

class NoopConfigFile {
  get toString() {
    return ''
  }
}