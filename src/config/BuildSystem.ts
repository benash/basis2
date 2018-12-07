import { HasDependencies, HasConfigs, } from './interfaces';
import { ConfigFile } from './ConfigFile';
import { object } from 'prop-types';
import { serialize } from './Serializers';

interface BuildSystem extends HasDependencies, HasConfigs {}

export class NoopBuildSystem implements BuildSystem {
  devDependencies: Array<string> = []
  configs() {
    return []
  }
}

export class WebpackBuildSystem implements BuildSystem {
  constructor(private config: WebpackConfig) {}

  devDependencies: Array<string> = [
    'webpack',
    'webpack-cli',
  ]

  configs() {
    return [ new WebpackConfigFile(this.config) ]
  }
  
}

export class WebpackConfig {
  constructor(
    public entry: string,
    public outputFilename: string,
    public outputPath: string,
  ) { }
}

class JsConfigFile implements ConfigFile {
  language: string = 'js'
  contents: string
  constructor(public name: string, private requires: Require[], private exports: object) {
    this.contents = requires.map(r => r.toString()).join('\n') + '\n\nmodule.exports = ' + serialize(exports)
  }
}

class Require {
  constructor(private name: string) {}
  toString() {
    return `const ${this.name} = require('${this.name}')`
  }
}

class WebpackConfigFile extends JsConfigFile {
  name: string = 'webpack.config.js'
  language: string = 'js'
  contents: string
  
  constructor(config: WebpackConfig) {
    super('webpack.config.js', [new Require('path')], {
      entry: config.entry,
      output: {
        filename: config.outputFilename,
        path: `path.resolve(__dirname, ${config.outputPath})`
      }
    })
  }
}