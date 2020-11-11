
export function isBuffer (param) {
  return param instanceof ArrayBuffer ||
    (typeof Buffer !== 'undefined' && param instanceof Buffer)
}
