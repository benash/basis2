const singleIndent = '  '
const indentFor = (level: number) => singleIndent.repeat(level)

export const serializeObject = (o: object, level: number) =>
  '{\n' + serializeObjectEntries(o, level + 1) + indentFor(level) + '}'

const serializeObjectEntries = (o: object, level: number) =>
  Object.entries(o).map(entry => serializeObjectEntry(entry, level)).join('')

const serializeObjectEntry = ([key, val], level: number) =>
  `${indentFor(level)}${key}: ${serializeAny(val, level)},\n`

const hasComplexElements = (a: any[]) => a.some(el => el instanceof Array || el instanceof Object)

const serializeArray = (a: Array<any>, level: number) => hasComplexElements(a) ?
  serializeArrayMultipleLines(a, level) : 
  serializeArraySingleLine(a, level)

const serializeArrayMultipleLines = (a: Array<any>, level: number) =>
  '[\n' + serializeArrayElements(a, level + 1).join(',\n') + '\n' + indentFor(level) + ']'

const serializeArraySingleLine = (a: Array<any>, level: number) =>
  '[ ' + serializeArrayElements(a, 0).join(', ') + ' ]'

const serializeArrayElements = (a: Array<any>, level: number) =>
  a.map(element => serializeArrayElement(element, level))

const serializeArrayElement = (val: any, level: number) =>
  `${indentFor(level)}${serializeAny(val, level)}`

function serializeAny(a: any, level: number) {
  if (a instanceof RegExp || typeof a === 'string') {
    return a
  }
  if (a instanceof Array) {
    return serializeArray(a, level)
  }

  const endIndent = singleIndent.repeat(level)
  if (a instanceof Object) {
    return serializeObject(a, level)
  }
  return a
}
