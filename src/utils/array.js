
export function includesArray (array, element) {
  let included = false
  let i = 0

  while (i < array.length && !included) {
    if (array[i].length === element.length) {
      let same = true
      for (let index = 0; index < element.length; index++) {
        if (element[index] !== array[i][index]) {
          same = false
          break
        }
      }

      if (same) included = true
    }

    i++
  }

  return included
}

export function mergeAsArray (...params) {
  const array = []
  params.forEach(function (param) {
    if (Array.isArray(param)) param.forEach(elem => array.push(elem))
    else array.push(param)
  })

  return array
}
