import { merge as _merge } from '../utils'
import { serialize } from './Serializers'
import { Require } from './Require'

interface PartialJsConfigFileI {
  requires: Require[]
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
    return this.partialFile.requires.map(r => r.serialize()).join('\n') +
      '\n\nmodule.exports = ' + serialize(this.partialFile.configObj)
  }

  static empty() {
    return new PartialJsConfigFile({
      requires: [],
      configObj: {},
    })
  }
}