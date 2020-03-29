
export function includes (array, object) {
  let included = false
  let i = 0

  while (i < array.length && !included) {
    if (objectEqual(array[i], object)) {
      included = true
      break
    }

    i++
  }

  return included
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

export function toArray (...params) {
  const array = []
  params.forEach(function (param) {
    if (Array.isArray(param)) param.forEach(elem => array.push(elem))
    else array.push(param)
  })

  return array
}
