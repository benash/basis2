import * as _merge from 'lodash.merge'
import { serializeObject } from './Serializers'

interface PartialJsConfigFileI {
  requires: string[]
  configObj: object
}

export class PartialJsConfigFile {
  constructor(protected partialFile: PartialJsConfigFileI) { }
  merge(other: PartialJsConfigFile): PartialJsConfigFile {
    return new PartialJsConfigFile({
      requires: this.partialFile.requires.concat(other.partialFile.requires),
      configObj: _merge(this.partialFile.configObj, other.partialFile.configObj),
    })
  }
  serialize() {
    return this.serializeRequires() +
      '\nmodule.exports = ' + serializeObject(this.partialFile.configObj, 0)
  }
  serializeRequires() {
    return this.partialFile.requires.map(r => this.serializeRequire(r)).join('')
  }
  serializeRequire = (s: string) => `const ${s} = require('${s}')\n`
  static empty() {
    return new PartialJsConfigFile({
      requires: [],
      configObj: {},
    })
  }
}