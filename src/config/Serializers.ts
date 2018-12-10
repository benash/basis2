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

const serializeArray = (arr: Array<any>, indent: Indent) =>
  serializeContainer(arr, Surround.Array, indent, (a, ind) => a.map(el => serializeAny(el, ind)))

const serializeObject = (o: object, indent: Indent) =>
  serializeContainer(o, Surround.Object, indent, (o, ind) =>
    Object.entries(o).map(([key, val]) => `${key}: ${serializeAny(val, ind)}`))

function serializeContainer(container: any, surround: Surround, indent: Indent, fn: (c, ind) => string[] ) {
  const singleLine = serializeFixedIndentContainer(container, surround, Indent.SingleLine, fn)

  if (singleLine.length <= singleLineMaxSize) {
    return singleLine
  }

  return serializeFixedIndentContainer(container, surround, indent, fn)
}

const serializeFixedIndentContainer = (c: any, surround: Surround, indent: Indent, fn: (c, indent: Indent) => string[]) => {
  return indent.serializeElements(surround, fn(c, indent.increase()))
}
