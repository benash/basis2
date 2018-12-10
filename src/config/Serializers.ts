const singleLineMaxSize = 70

class Surround {
  constructor(public l: string, public r: string) {}

  static get Array() { return new Surround('[', ']') }
  static get Object() { return new Surround('{', '}') }
}

class Indent {
  constructor(
    public hSeparator: string,
    public vSeparator: string,
    public level: number
  ) {}

  get hIndent() {
    return this.hSeparator.repeat(this.level)
  }

  get vIndent() {
    return this.vSeparator
  }

  serializeElements(surround: Surround, elements: string[]) {
    console.log(typeof elements)
    return surround.l + this.vIndent +
      this.hIndent + elements.join(',' + this.vIndent + this.hIndent) + this.vIndent +
      this.decrease().hIndent + surround.r
  }

  increase() {
    return new Indent(this.hSeparator, this.vSeparator, this.level + 1)
  }

  decrease() {
    return new Indent(this.hSeparator, this.vSeparator, Math.max(0, this.level - 1))
  }

  static multiLine(level: number) { 
    return new Indent('  ', '\n', level)
  }

  static get SingleLine() {
    return new Indent('', '', 0)
  }

  // 'Vertical' spaces used to pad the insides of literals
  static get SingleLinePadded() {
    return new Indent('', ' ', 0)
  }
}

export const serialize = (a: any) =>
  serializeAny(a, Indent.multiLine(1))

const serializeObject = (o: object, indent: Indent) => {
  const singleLine = serializeFixedIndentObject(o, Indent.SingleLinePadded)
  
  if (singleLine.length <= singleLineMaxSize) {
    return singleLine
  }

  return serializeFixedIndentObject(o, indent)
}

const serializeObjectEntries = (o: object, indent: Indent) =>
  Object.entries(o).map(entry => serializeObjectEntry(entry, indent))

const serializeObjectEntry = ([key, val], indent: Indent) =>
  `${key}: ${serializeAny(val, indent)}`

const serializeArray = (a: Array<any>, indent: Indent) => {
  const singleLine = serializeFixedIndentArray(a, Indent.SingleLine)

  if (singleLine.length <= singleLineMaxSize) {
    return singleLine
  }

  return serializeFixedIndentArray(a, indent)
}

const serializeFixedIndentObject = (o: object, indent: Indent) => {
  return indent.serializeElements(Surround.Object, serializeObjectEntries(o, indent.increase()))
}
const serializeFixedIndentArray = (a: any[], indent: Indent) => {
  return indent.serializeElements(Surround.Array, serializeArrayElements(a, indent.increase()))
}

const serializeArrayElements = (a: Array<any>, indent: Indent) =>
  a.map(element => serializeAny(element, indent))

function serializeAny(a: any, indent: Indent) {
  if (a instanceof RegExp) {
    return a
  }
  if (a instanceof Array) {
    return serializeArray(a, indent)
  }
  if (a instanceof Object) {
    return serializeObject(a, indent)
  }
  return a
}
