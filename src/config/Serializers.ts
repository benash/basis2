class Surround {
  constructor(public left: string, public right: string) {}
}

abstract class SerializableContainer<T, E> {
  static singleLineMaxSize = 60

  constructor(protected container: T) {}

  abstract surround: Surround
  abstract compactIndent: Indent
  abstract get elements(): E[]
  protected abstract serializeElement(e: E, indent: Indent): string

  serialize(indent: Indent) {
    const singleLine = this.serializeFixedIndent(this.compactIndent)

    if (singleLine.length <= SerializableContainer.singleLineMaxSize) {
      return singleLine
    }

    return this.serializeFixedIndent(indent)
  }

  serializeFixedIndent(indent: Indent) {
    return this.surround.left + indent.leftPadding + indent.horizontal +
      this.elements
        .map(e => this.serializeElement(e, indent.increase()))
        .join(',' + indent.vertical + indent.horizontal) +
      indent.rightPadding + indent.decrease().horizontal + this.surround.right
  }
}

class SerializableArray extends SerializableContainer<Array<any>, any> {
  surround = new Surround('[', ']')
  compactIndent = Indent.SingleLineUnpadded

  get elements() { return this.container }

  serializeElement(e, indent) {
    return serializeAny(e, indent)
  }
}

class SerializableObject extends SerializableContainer<Object, [string, any]> {
  surround = new Surround('{', '}')
  compactIndent = Indent.SingleLinePadded

  get elements() { return Object.entries(this.container) }

  serializeElement([key, val]: [string, any], indent) {
    return `${key}: ${serializeAny(val, indent)}`
  }
}

class Indent {
  constructor(
    public hSeparator: string,
    public vSeparator: string,
    public leftPadding: string,
    public rightPadding: string,
    public level: number
  ) {}

  get horizontal() {
    return this.hSeparator.repeat(this.level)
  }

  get vertical() {
    return this.vSeparator
  }

  increase() {
    return new Indent(
      this.hSeparator,
      this.vSeparator,
      this.leftPadding,
      this.rightPadding,
      this.level + 1,
    )
  }

  decrease() {
    return new Indent(
      this.hSeparator,
      this.vSeparator,
      this.leftPadding,
      this.rightPadding,
      Math.max(0, this.level - 1)
    )
  }

  static MultiLine(level: number) { 
    return new Indent(
      '  ',
      '\n',
      '\n',
      '\n',
      level,
    )
  }

  // 'Vertical' spaces used to pad the insides of literals
  static get SingleLinePadded() {
    return new Indent(
      '',
      ' ',
      ' ',
      ' ',
      0,
    )
  }

  static get SingleLineUnpadded() {
    return new Indent(
      '',
      ' ',
      '',
      '',
      0,
    )
  }
}

export const serialize = (a: any) =>
  serializeAny(a, Indent.MultiLine(1))

function serializeAny(a: any, indent: Indent) {
  if (a instanceof RegExp) {
    return a
  }
  if (a instanceof Array) {
    return new SerializableArray(a).serialize(indent)
  }
  if (a instanceof Object) {
    return new SerializableObject(a).serialize(indent)
  }
  return a
}
