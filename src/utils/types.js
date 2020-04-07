
export function isBuffer (param) {
  if (param instanceof ArrayBuffer) return true
  if (typeof Buffer !== 'undefined' && param instanceof Buffer) return true

  return false
}
