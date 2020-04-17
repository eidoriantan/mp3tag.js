
export function isBitSet (byte, bit) {
  return (byte & (1 << bit)) > 0
}

export function setBit (byte, bit) {
  return byte | (1 << bit)
}

export function decodeSynch (synch) {
  let out = 0
  let mask = 0x7F000000

  while (mask) {
    out >>= 1
    out |= synch & mask
    mask >>= 8
  }

  return out
}

export function encodeSynch (size) {
  let out = 0
  let mask = 0x7F

  while (mask ^ 0x7FFFFFFF) {
    out = size & ~mask
    out <<= 1
    out |= size & mask
    mask = ((mask + 1) << 8) - 1
    size = out
  }

  return out
}

export function mergeBytes (...params) {
  const merged = []
  params.forEach(function (param) {
    if (param.forEach) param.forEach(byte => merged.push(byte))
    else merged.push(param)
  })

  return new Uint8Array(merged)
}

export function synch (unsynch) {
  const bytes = []
  let i = 0

  while (i < unsynch.length) {
    bytes.push(unsynch[i])
    if (unsynch[i] === 0xff && unsynch[i + 1] === 0x00) i++
    i++
  }

  return bytes
}
