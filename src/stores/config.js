import { observable, computed } from 'mobx'

export default class Config {
  id = Math.random()
  @observable packageManagerName = 'yarn'
  @observable useWebpack = true
  @observable webpackEntry = './src/index.js'
  @observable webpackOutputPath = 'dist'
  @observable webpackOutputFilename = 'bundle.js'
  @observable useBabel = false

  @computed get buildSystem() {
    if (this.useWebpack) {
      return new WebpackBuildSystem()
    }

    return NoopBuildSystem()
  }

  @computed get devDependencies() {
    return this.buildSystem.devDependencies.concat(this.transpiler.devDependencies)
  }

  // @computed get dependencies() { return [] }

  @computed get packageManager() {
    switch (this.packageManagerName) {
      case 'yarn':
        return new YarnPackageManager()
      case 'npm':
        return new NpmPackageManager()
      default:
        return new NoopPackageManager()
    }
  }

  @computed get packageManagerString() {
    return this.packageManager.getDevDepCommand(this.devDependencies)
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

// Package managers
class YarnPackageManager {
  getDevDepCommand(deps) {
    return `yarn add -D ${deps.join(' ')}`
  }
}

class NpmPackageManager {
  getDevDepCommand(deps) {
    return `npm install -D ${deps.join(' ')}`
  }
}

class NoopPackageManager {
  getDevDepCommand(deps) { /* eslint no-unused-vars: 0 */
    return ''
  }
}

// Build systems
class NoopBuildSystem {
  get devDependencies() {
    return []
  }
}

class WebpackBuildSystem {
  get devDependencies() {
    return [
      'webpack',
      'webpack-cli',
    ]
  }
}

// Transpilers
class BabelTranspiler {
  devDependencies = [ 'babel-loader', '@babel/core', '@babel/preset-env', ]
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

// Config files
class JsonConfigFile {
  constructor({ filename, contents, }) {
    this.filename = filename
    this.contents = contents
  }

  get toString() {
    return JSON.stringify(this.contents, null, 2)
  }
}

class NoopConfigFile {
  get toString() {
    return ''
  }
}