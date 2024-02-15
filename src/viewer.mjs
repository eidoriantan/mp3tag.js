
import { decodeUTF8 } from './utils/strings.mjs'
import { isBuffer } from './utils/types.mjs'

export default class BufferView extends DataView {
  static isViewable (param) {
    if (isBuffer(param) || Array.isArray(param) || ArrayBuffer.isView(param)) {
      return true
    }

    return false
  }

  constructor (...params) {
    if (typeof params[0] === 'number' || Array.isArray(params[0])) {
      params[0] = new Uint8Array(params[0])
    }

    if (ArrayBuffer.isView(params[0])) {
      params[0] = params[0].buffer
    }

    super(...params)
  }

  getString (offset, maxlength, format = 'windows1251') {
    let string = ''
    let bytes = this.getUint8(offset, maxlength)
    if (!Array.isArray(bytes)) bytes = [bytes]

    switch (format) {
      case 'utf8':
      case 'utf-8':
        string = decodeUTF8(bytes)
        break

      case 'utf16':
      case 'utf16be':
      case 'utf-16':
      case 'utf-16be': {
        let le = null

        if (bytes[0] === 0xff && bytes[1] === 0xfe) le = true
        else if (bytes[0] === 0xfe && bytes[1] === 0xff) le = false

        if (le !== null) {
          offset += 2
          maxlength -= 2
        }

        string = this.getUint16String(offset, maxlength, le === true)
        break
      }

      case 'windows1251':
      default:
        string = this.getUint8String(offset, maxlength)
    }

    return {
      string: string.endsWith('\0')
        ? string.substring(0, string.length - 1)
        : string,
      length: bytes.length
    }
  }

  getCString (offset, format = 'windows1251') {
    let bytes, bytesPerChar
    let limit = this.byteLength - offset

    switch (format) {
      case 'utf16':
      case 'utf16be':
      case 'utf-16':
      case 'utf-16be':
        bytesPerChar = 2
        bytes = this.getUint16(offset, limit)
        break

      default:
        bytesPerChar = 1
        bytes = this.getUint8(offset, limit)
    }

    if (!Array.isArray(bytes)) bytes = [bytes]
    for (let i = 0; i < bytes.length; i++) {
      if (bytes[i] === 0x00) {
        limit = (i + 1) * bytesPerChar
        break
      }
    }

    return this.getString(offset, limit, format)
  }

  getUint8String (offset, length) {
    let bytes = this.getUint8(offset, length)
    let string = ''

    if (!Array.isArray(bytes)) bytes = [bytes]
    for (let i = 0; i < bytes.length; i++) {
      const character = String.fromCharCode(bytes[i])
      string += character
    }

    return string
  }

  getUint16String (offset, length, le = false) {
    let bytes = this.getUint16(offset, length, le)
    let string = ''

    if (!Array.isArray(bytes)) bytes = [bytes]
    for (let i = 0; i < bytes.length; i++) {
      const character = String.fromCharCode(bytes[i])
      string += character
    }

    return string
  }

  getUint8 (offset, length = 1) {
    const limit = offset + length
    const bytes = []

    if (this.byteLength - limit < 0) return false
    for (let i = offset; i < limit; i++) {
      const byte = DataView.prototype.getUint8.call(this, i)
      bytes.push(byte)
    }

    return bytes.length === 1 ? bytes[0] : bytes
  }

  getUint16 (offset, length = 2, le = false) {
    if (length % 2 !== 0) length -= 1
    const limit = offset + length
    const bytes = []

    if (this.byteLength - limit < 0) return false
    for (let i = offset; i < limit; i += 2) {
      const byte = DataView.prototype.getUint16.call(this, i, le)
      bytes.push(byte)
    }

    return bytes.length === 1 ? bytes[0] : bytes
  }

  getUint24 (offset, length = 3, le = false) {
    while (length % 3 !== 0) length -= 1
    const limit = offset + length
    const bytes = []

    if (this.byteLength - limit < 0 || length <= 0) return false
    for (let i = offset; i < limit; i += 3) {
      const a = DataView.prototype.getUint16.call(this, i, le)
      const b = DataView.prototype.getUint8.call(this, i + 2)
      const byte = le ? (b << 16) + a : (a << 8) + b
      bytes.push(byte)
    }

    return bytes.length === 1 ? bytes[0] : bytes
  }

  setUint24 (offset, value, le = false) {
    if (value > 16777215) return false

    if (le) {
      DataView.prototype.setUint16.call(this, offset + 1, value >> 8, le)
      DataView.prototype.setUint8.call(this, offset, value & 0xFF)
    } else {
      DataView.prototype.setUint16.call(this, offset, value >> 8, le)
      DataView.prototype.setUint8.call(this, offset + 2, value & 0xFF)
    }
  }
}
