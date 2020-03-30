
import { decodeUTF8 } from './strings'

export default class BufferView extends DataView {
  constructor (buffer) {
    if (typeof buffer === 'number') { buffer = new Uint8Array(buffer) }
    if (Array.isArray(buffer)) { buffer = new Uint8Array(buffer) }
    if (ArrayBuffer.isView(buffer)) { buffer = buffer.buffer }
    super(buffer)
  }

  getString (offset, maxlength, format) {
    let bytes = this.getUint8(offset, maxlength)
    if (!Array.isArray(bytes)) bytes = [bytes]

    let string = ''

    switch (format) {
      case 'utf-8':
        string = decodeUTF8(bytes)
        break

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

      default:
        string = this.getUint8String(offset, maxlength)
    }

    return {
      string: string[string.length - 1] === '\0'
        ? string.substr(0, string.length - 1) : string,
      length: bytes.length
    }
  }

  getCString (offset, format) {
    let bytes, bytesPerChar
    let limit = this.byteLength - offset

    switch (format) {
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
}
