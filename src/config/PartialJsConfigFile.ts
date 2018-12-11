import { merge as _merge } from '../utils'
import { Require } from './Require'
import prettier from 'prettier/standalone'
import babylon from 'prettier/parser-babylon'

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
    return `${this.serializedRequires}\n\n${this.serializedExports}`
  }

  get serializedRequires() {
    return this.partialFile.requires.map(r => r.serialize()).join('\n')
  }

  get serializedExports() {
    return `module.exports = ${Literal.serialize(this.partialFile.configObj)}`
  }

  get prettified() {
    return prettier.format(this.serialize(), {
      parser: 'babylon',
      plugins: [ babylon ],
      singleQuote: true,
      semi: false,
      printWidth: 70,
    })
  }

  static empty() {
    return new PartialJsConfigFile({
      requires: [],
      configObj: {},
    })
  }
}

export class Literal {
  constructor(private s: string) {}
  toJSON() {
    return `@@${this.s}@@`
  }

  static serialize(o) {
    return JSON.stringify(o)
      .replace(/\\\\/g, '\\')
      .replace(/"@@(.*?)@@"/g, '$1')
  }
}

export class RegExpLiteral extends Literal {
  constructor(private r: RegExp) { super(r.toString()) }
}
