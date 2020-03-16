
export function mergeAsArray (...params) {
  const array = []
  params.forEach(function (param) {
    if (Array.isArray(param)) param.forEach(elem => array.push(elem))
    else array.push(param)
  })

  return array
}
