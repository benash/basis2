import camelCase from 'lodash.camelcase'
import upperfirst from 'lodash.upperfirst'

export abstract class Require {
  constructor(protected val: string) {}
  abstract serialize(): string
}

export class CamelizedRequire extends Require {
  camelize(s: string) { return upperfirst(camelCase(s)) }
  serialize() { return `const ${this.camelize(this.val)} = require('${this.val}')`}
}

export class PlainRequire extends Require {
  serialize() { return `const ${this.val} = require('${this.val}')`}
}
