export function merge(dest: object, src: object) {
  const copy = overwrite({}, dest)
  return overwrite(copy, src)
}

function overwrite(dest: object, src: object): object  {
  Object.entries(src).forEach(e => mergeInto(dest, e))
  return dest
}

function mergeInto(dest: object, [key, val]) {
  if (dest.hasOwnProperty(key)) {
    dest[key] = mergeVals(dest[key], val)
  }
  else {
    dest[key] = val
  }
}

function mergeVals(dest: any, src: any) {
  if (
    typeof dest === 'number' ||
    typeof dest === 'string' ||
    typeof dest === 'boolean' ||
    dest instanceof RegExp
  ) {
    return clone(src)
  }

  if (dest instanceof Array) {
    if (src instanceof Array) {
      src.forEach(e => dest.push(clone(e)))
    }
    else {
      dest.concat(clone(src))
    }
    return dest
  }

  if (dest instanceof Object && src instanceof Object) {
    return overwrite(dest, src)
  }

  return 'bad merge attempt'
}

function clone(a: any) {
  return a
}

export function quote(s: string) {
  return `'${s}'`
}
