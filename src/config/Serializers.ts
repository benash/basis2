const singleIndent = '  '
const indentFor = (level: number) => singleIndent.repeat(level)

export const serializeObject = (o: object, level: number) =>
  '{\n' + serializeObjectEntries(o, level + 1) + indentFor(level) + '}'

const serializeObjectEntries = (o: object, level: number) =>
  Object.entries(o).map(entry => serializeObjectEntry(entry, level)).join('')

const serializeObjectEntry = ([key, val], level: number) =>
  `${indentFor(level)}${key}: ${serializeAny(val, level)},\n`

const serializeArray = (a: Array<any>, level: number) =>
  '[\n' + serializeArrayElements(a, level + 1) + indentFor(level) + ']'

const serializeArrayElements = (a: Array<any>, level: number) =>
  a.map(element => serializeArrayElement(element, level)).join('')

const serializeArrayElement = (val: any, level: number) =>
  `${indentFor(level)}${serializeAny(val, level)},\n`

const quote = (s: string) => `'${s}'`

function serializeAny(a: any, level: number) {
  if (a instanceof RegExp) {
    return a
  }
  if (typeof a === 'string') {
    return quote(a)
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
