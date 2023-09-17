
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

export function unsynch (synch) {
  const bytes = []
  let i = 0

  while (i < synch.length) {
    bytes.push(synch[i])
    if (synch[i] === 0xff && (synch[i + 1] >= 0xe0 || synch[i + 1] === 0x00)) {
      bytes.push(0)
    }

    i++
  }

  return bytes
}

export function dataBlock (data, max) {
  data = data || []
  const bytes = []
  const length = data.length
  const offset = max - length

  for (let i = 0; i < offset; i++) bytes.push(0)
  for (let i = 0; i < length; i++) bytes.push(data[i])

  return bytes
}

export function bytesToLong (bytes) {
  let value = 0
  for (let i = 0; i < bytes.length; i++) {
    value = (value * 256) + bytes[i]
  }
  return value
}

export function longToBytes (long) {
  const bytes = []
  while (long > 0) {
    const byte = long & 0xff
    bytes.unshift(byte)
    long = (long - byte) / 256
  }
  return bytes
}
