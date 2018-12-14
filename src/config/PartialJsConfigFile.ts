import babylon from 'prettier/parser-babylon'
import prettier from 'prettier/standalone'

import { merge as _merge } from '../utils'
import { Require } from './Require'

export class PartialJsConfigFile {
  static Empty() {
    return new PartialJsConfigFile([], {})
  }

  constructor(public requires: Require[], public configObj: object) { }

  merge(other: PartialJsConfigFile): PartialJsConfigFile {
    return new PartialJsConfigFile(
      this.requires.concat(other.requires),
      _merge(this.configObj, other.configObj),
    )
  }

  serialize() {
    return `${this.serializedRequires}\n\n${this.serializedExports}`
  }

  get serializedRequires() {
    return this.requires.map(r => r.serialize()).join('\n')
  }

  get serializedExports() {
    return `module.exports = ${Literal.serialize(this.configObj)}`
  }

  get prettified() {
    return prettier.format(this.serialize(), {
      parser: 'babylon',
      plugins: [ babylon ],
      printWidth: 70,
      semi: false,
      singleQuote: true,
    })
  }
}

export class Literal {
  static serialize(o: object) {
    return JSON.stringify(o)
      .replace(/~\\\\~/g, '\\')
      .replace(/"@@(.*?)@@"/g, '$1')
  }

  constructor(private s: string) {}

  toJSON() {
    return `@@${this.s}@@`
  }
}

export class RegExpLiteral extends Literal {
  constructor(private r: RegExp) {
    super(r.toString().replace(/\\/g, '~\\~'))
  }
}
