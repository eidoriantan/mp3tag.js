
export const ENCODINGS = ['windows1251', 'utf-16', 'utf-16be', 'utf-8']

export function decodeUTF8 (bytes) {
  let string = ''
  let i = 0
  let c = 0
  let c2 = 0
  let c3 = 0

  i += bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf ? 3 : 0
  while (i < bytes.length) {
    c = bytes[i++]
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        string += String.fromCharCode(c)
        break

      case 12: case 13:
        c2 = bytes[i++]
        string += String.fromCharCode(((c & 0x1f) << 6) | (c2 & 0x3f))
        break

      case 14:
        c2 = bytes[i++]
        c3 = bytes[i++]
        string += String.fromCharCode(((c & 0x0f) << 12) | ((c2 & 0x3f) << 6) |
          ((c3 & 0x3f) << 0))
        break

      default:
        string += ''
    }
  }

  return string
}

export function encodeUTF8 (string) {
  const bytes = []
  for (let i = 0; i < string.length; i++) {
    let charCode = string.charCodeAt(i)
    if (charCode < 0x80) {
      bytes.push(charCode)
    } else if (charCode < 0x800) {
      bytes.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f))
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      bytes.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f))
    } else {
      i++
      charCode = 0x10000 + (((charCode & 0x3ff) << 10) |
        (string.charCodeAt(i) & 0x3ff))
      bytes.push(0xf0 | (charCode >> 18), 0x80 | ((charCode >> 12) & 0x3f),
        0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f))
    }
  }

  return bytes
}

export function encodeString (string, format = 'windows1251') {
  let bytes = []
  switch (format) {
    case 'utf8':
    case 'utf-8':
      bytes = encodeUTF8(string)
      break

    case 'utf16':
    case 'utf16be':
    case 'utf-16':
    case 'utf-16be': {
      const buffer = new ArrayBuffer(string.length * 2)
      const uint16 = new Uint16Array(buffer)
      const uint8 = new Uint8Array(buffer)

      for (let i = 0; i < string.length; i++) {
        uint16[i] = string.charCodeAt(i)
      }

      bytes = [0xff, 0xfe]
      uint8.forEach(byte => bytes.push(byte))
      break
    }

    case 'windows1251':
    default:
      for (let i = 0; i < string.length; i++) {
        bytes.push(string.charCodeAt(i))
      }
  }

  return bytes
}
