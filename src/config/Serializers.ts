const singleIndent = '  '

export const serialize = (o: object) => `{\n${serializeInner(o, 1)}}\n`

function serializeEntry([key, val], level: number) {
  const indent = singleIndent.repeat(level)
  return `${indent}${key}: ${serializeRec(val, level + 1)},\n`
}

function serializeInner(o: object, level: number) {
  return Object.entries(o).map(entry => serializeEntry(entry, level)).join('')
}

function serializeRec(a: any, level: number) {
  if (typeof a === 'string') {
    return `'${a}'`
  }
  else if (a instanceof Object) {
    const endIndent = singleIndent.repeat(level - 1)
    return '{\n' + serializeInner(a, level) + `${endIndent}}`
  }
  return `${a}`
}