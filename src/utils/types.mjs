
export function isBuffer (param) {
  if (param instanceof ArrayBuffer) return true
  else if (typeof Buffer !== 'undefined' && param instanceof Buffer) return true

  return false
}
