
export function isBuffer (param) {
  return (typeof ArrayBuffer !== 'undefined' && param instanceof ArrayBuffer) ||
    (typeof Buffer !== 'undefined' && param instanceof Buffer)
}
