import { HasDependencies, HasConfigs } from './interfaces'
import { JsonConfigFile } from './ConfigFile'

interface Transpiler extends HasDependencies, HasConfigs {}

export class BabelTranspiler implements Transpiler {
  devDependencies: string[] = [ 'babel-loader', '@babel/core', '@babel/preset-env' ]
  dependencies = []
  configs() {
    return [
      new JsonConfigFile('.babelrc', 'json', {
        presets: [
          '@babel/preset-env',
        ],
      }),
    ]
  }
}

export class NoopTranspiler implements Transpiler {
  devDependencies: string[] = []
  dependencies = []
  configs() { return [] }
}
