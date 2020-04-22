
export function includes (array, object) {
  let included = false
  let i = 0

  while (i < array.length && !included) {
    if (objectEqual(array[i], object)) {
      included = true
      break
    } else i++
  }

  return included
}

export function mergeObjects (obj1, obj2) {
  const filtered = obj1

  for (const key in obj2) {
    if (obj1[key] !== undefined && obj1[key] !== '') filtered[key] = obj1[key]
    if (obj2[key] !== undefined && obj2[key] !== '') filtered[key] = obj2[key]
  }

  return filtered
}

export function objectEqual (obj1, obj2) {
  for (const prop in obj1) {
    if (typeof obj1[prop] !== typeof obj2[prop]) return false

    switch (typeof (obj1[prop])) {
      case 'object':
        if (!objectEqual(obj1[prop], obj2[prop])) return false
        break

      case 'function':
        if (typeof obj2[prop] === 'undefined' ||
          obj1[prop].toString() !== obj2[prop].toString()) return false
        break

      default:
        if (obj1[prop] !== obj2[prop]) return false
    }
  }

  for (const prop in obj2) {
    if (typeof (obj1[prop]) === 'undefined') return false
  }

  return true
}

export function overwriteDefault (usrObj, defObj) {
  const object = {}
  for (const prop in defObj) {
    const defVal = defObj[prop]
    const usrVal = usrObj[prop]

    if (typeof usrVal === 'undefined') {
      object[prop] = defVal
      continue
    }

    switch (typeof defVal) {
      case 'object':
        object[prop] = overwriteDefault(usrVal, defVal)
        break

      default:
        object[prop] = typeof defVal === typeof usrVal ? usrVal : defVal
    }
  }

  return object
}
