
import { decodeUTF8 } from './strings'

export default class BufferView extends DataView {
  getString (offset, maxlength, format) {
    const bytes = this.getUint8(offset, maxlength)
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

        string = this.getUint16String(offset, maxlength, le)
        break
      }

      default:
        string = this.getUint8String(offset, maxlength)
    }

    if (string.match(/^[\s\S]+(\0)$/)) {
      string = string.substr(0, string.length - 1)
    }

    return string
  }

  getCString (offset, format) {
    const terminated = []
    let bytes = []
    let bytesPerChar = 1

    if (format === 'utf-16' || format === 'utf-16be') {
      bytes = this.getUint16(offset, this.byteLength - offset)
    } else {
      bytes = this.getUint8(offset, this.byteLength - offset)
    }

    for (let i = 0; i < bytes.length; i++) {
      if (bytes[i] !== 0x00) terminated.push(bytes[i])
      else break
    }

    bytesPerChar = bytes.BYTES_PER_ELEMENT
    const length = terminated.length * bytesPerChar
    const string = this.getString(offset, length, format)

    return { string: string, length: length + bytesPerChar }
  }

  getUint8String (offset, length) {
    const bytes = this.getUint8(offset, length)
    let string = ''

    for (let i = 0; i < bytes.length; i++) {
      const character = String.fromCharCode(bytes[i])
      string += character
    }

    return string
  }

  getUint8CString (offset) {
    const bytes = this.getUint8(offset, this.byteLength - offset)
    let string = ''

    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i]
      if (byte !== 0x00) {
        const character = String.fromCharCode(byte)
        string += character
      } else break
    }

    return string
  }

  getUint16String (offset, length, le = true) {
    const bytes = this.getUint16(offset, length, le)
    let string = ''

    for (let i = 0; i < bytes.length; i++) {
      const character = String.fromCharCode(bytes[i])
      string += character
    }

    return string
  }

  getUint16CString (offset, le = false) {
    const bytes = this.getUint16(offset, this.byteLength - offset, le)
    let string = ''

    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i]
      if (byte !== 0x0000) {
        const character = String.fromCharCode(byte)
        string += character
      } else break
    }

    return string
  }

  getUint8 (offset, length = 1) {
    const end = offset + length
    const bytes = new Uint8Array(length)
    let i = 0

    while (offset < this.byteLength && offset < end) {
      bytes[i] = DataView.prototype.getUint8.call(this, offset++)
      i++
    }

    return length === 1 ? bytes[0] : bytes
  }

  getUint16 (offset, length = 1, le = false) {
    const end = offset + length
    const bytes = new Uint16Array(length / 2)
    let i = 0

    while (offset < this.byteLength && offset < end) {
      bytes[i] = DataView.prototype.getUint16.call(this, offset, le)
      offset += 2
      i++
    }

    return length === 1 ? bytes[0] : bytes
  }
}
