import { HasDependencies, HasConfigs, } from './interfaces';
import { ConfigFile } from './ConfigFile';
import { object } from 'prop-types';

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

const singleIndent = '  '

const serialize = (o: object) => `{\n${serializeInner(o, 1)}}\n`

function serializeInner(o: object, level: number) {
  const indent = singleIndent.repeat(level)
  return Object.entries(o).map(entry =>
    `${indent}${entry[0]}: ${serializeRec(entry[1], level + 1)}`
  ).join('\n') + '\n'
}

function serializeRec(a: any, level: number) {
  const endIndent = singleIndent.repeat(level - 1)

  if (typeof a === 'string') {
    return `'${a}',`
  }
  else if (a instanceof Object) {
    return '{\n' + serializeInner(a, level) + `${endIndent}},`
  }

  return `${a},`
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