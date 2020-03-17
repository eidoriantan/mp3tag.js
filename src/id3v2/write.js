
import { mergeAsArray } from '../utils/array'
import { encodeSynch, mergeBytes } from '../utils/bytes'
import { encodeString } from '../utils/strings'
import BufferView from '../utils/viewer'
import TagError from '../error'

/**
 *  @see http://id3.org/id3v2.3.0
 */

function getHeaderBytes (id, size, version) {
  const idBytes = encodeString(id, 'ascii')
  const sizeView = new BufferView(new ArrayBuffer(4))

  switch (version) {
    case 3:
      sizeView.setUint32(0, size)
      break

    case 4:
      sizeView.setUint32(0, encodeSynch(size))
      break

    default:
      throw new TagError(201, version)
  }

  return mergeBytes(idBytes, sizeView.getUint8(0, 4), 0, 0)
}

/**
 *  Frames writers
 *  @param {Object} frame - Frame id and its value
 *  @param {number} version - Frame will be written with this version
 */

export function textFrame (frame, version) {
  let encoding = 0
  let strBytes = []

  switch (version) {
    case 3:
      encoding = 1
      strBytes = encodeString(frame.value + '\0', 'utf-16')
      break

    case 4:
      encoding = 3
      if (Array.isArray(frame.value)) {
        frame.value.forEach(function (string) {
          const encoded = encodeString(string + '\0', 'utf-8')
          encoded.forEach(byte => strBytes.push(byte))
        })
      } else {
        strBytes = encodeString(frame.value + '\0', 'utf-8')
      }
      break

    default:
      throw new TagError(201, version)
  }

  const header = getHeaderBytes(frame.id, strBytes.length + 1, version)
  return mergeBytes(header, encoding, strBytes)
}

export function arrayFrame (frame, version) {
  switch (version) {
    case 3:
      frame.value = frame.value.join('/')
      break

    case 4:
      break

    default:
      throw new TagError(201, version)
  }

  return textFrame(frame, version)
}

export function asciiFrame (frame, version) {
  const strBytes = encodeString(frame.value.toString() + '\0', 'ascii')
  const header = getHeaderBytes(frame.id, strBytes.length + 1, version)

  return mergeBytes(header, 0, strBytes)
}

export function setFrame (frame, version) {
  switch (version) {
    case 3:
      frame.value = frame.value.position + '/' + frame.value.total
      break

    case 4: {
      const array = mergeAsArray(frame.value)
      const value = []
      array.forEach(function (elem) {
        value.push(elem.position + '/' + elem.total)
      })
      frame.value = value.join('\0')
      break
    }

    default:
      throw new TagError(201, version)
  }

  return asciiFrame(frame, version)
}

export function urlFrame (frame, version) {
  const strBytes = encodeString(frame.value + '\0', 'ascii')
  const header = getHeaderBytes(frame.id, strBytes.length, version)

  return mergeBytes(header, strBytes)
}

export function txxxFrame (frame, version) {
  const bytes = []
  const array = mergeAsArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    let descBytes = []
    let strBytes = []

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(elem.description + '\0', 'utf-16')
        strBytes = encodeString(elem.text + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(elem.description + '\0', 'utf-8')
        strBytes = encodeString(elem.text + '\0', 'utf-8')
        break

      default:
        throw new TagError(201, version)
    }

    const size = descBytes.length + strBytes.length + 1
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, descBytes, strBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function wxxxFrame (frame, version) {
  const bytes = []
  const array = mergeAsArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    let descBytes = []
    let strBytes = []

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(elem.description + '\0', 'utf-16')
        strBytes = encodeString(elem.url, 'ascii')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(elem.description + '\0', 'utf-8')
        strBytes = encodeString(elem.url, 'ascii')
        break

      default:
        throw new TagError(201, version)
    }

    const size = descBytes.length + strBytes.length + 1
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, descBytes, strBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function iplsFrame (frame, version) {
  let encoding
  const strBytes = []

  switch (version) {
    case 3:
      encoding = 1
      frame.value.forEach(function (string) {
        const encoded = encodeString(string + '\0', 'utf-16')
        encoded.forEach(byte => strBytes.push(byte))
      })
      break

    case 4:
    default:
      throw new TagError(201, version)
  }

  const size = strBytes.length + 1
  const header = getHeaderBytes(frame.id, size, version)
  return mergeBytes(header, encoding, strBytes)
}

export function langDescFrame (frame, version) {
  const bytes = []
  const array = mergeAsArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    const langBytes = encodeString(elem.language, 'ascii')
    let descBytes = []
    let textBytes = []

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(elem.descriptor + '\0', 'utf-16')
        textBytes = encodeString(elem.text, 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(elem.descriptor + '\0', 'utf-8')
        textBytes = encodeString(elem.text, 'utf-8')
        break

      default:
        throw new TagError(201, version)
    }

    const size = descBytes.length + textBytes.length + 4
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, langBytes, descBytes, textBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function apicFrame (frame, version) {
  const bytes = []
  const array = mergeAsArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    const mimeBytes = encodeString(elem.format + '\0', 'ascii')
    const imageBytes = new Uint8Array(elem.data)
    let strBytes = []

    switch (version) {
      case 3:
        encoding = 1
        strBytes = encodeString(elem.description + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        strBytes = encodeString(elem.description + '\0', 'utf-8')
        break

      default:
        throw new TagError(201, version)
    }

    const size = mimeBytes.length + strBytes.length + imageBytes.length + 2
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(
      header, encoding, mimeBytes, elem.type, strBytes, imageBytes
    )

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}
