import { observable, computed } from 'mobx'

export default class Config {
  id = Math.random()
  @observable packageManager = 'yarn'
  @observable webpackEntry = './src/index.js'
  @observable webpackOutputPath = 'dist'
  @observable webpackOutputFilename = 'bundle.js'

  packageList() { return ['webpack', 'webpack-cli',] }

  @computed get packageManagerString() {
    const prefix = this.packageManager === 'yarn' ? 'yarn add' : 'npm install'
    return `${prefix} ${this.packageList().join(' ')}`
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
}
