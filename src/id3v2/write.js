
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

  if (version === 3) sizeView.setUint32(0, size)
  else if (version === 4) sizeView.setUint32(0, encodeSynch(size))

  return mergeBytes(idBytes, sizeView.getUint8(0, 4), 0, 0)
}

/**
 *  Frames writers
 *  @param {Object} frame - Frame id and its value
 *  @this ID3v2 tagger class
 */

export function textFrame (frame) {
  let encoding = 0
  let strBytes = []

  switch (this.major) {
    case 3:
      encoding = 1
      strBytes = encodeString(frame.value + '\0', 'utf-16')
      break

    case 4:
      encoding = 3
      strBytes = encodeString(frame.value + '\0', 'utf-8')
      break

    default:
      throw new TagError(201, this.major)
  }

  const header = getHeaderBytes(frame.id, strBytes.length + 1, this.major)
  return mergeBytes(header, encoding, strBytes)
}

export function arrayFrame (frame) {
  /**
   *  @TODO ID3v2.4 - Add another frame with the same ID instead of joining
   *  them with a separator
   */
  frame.value = frame.value.join('/')
  return textFrame.call(this, frame)
}

export function asciiFrame (frame) {
  const encoding = 0
  const strBytes = encodeString(frame.value.toString(), 'ascii')
  const header = getHeaderBytes(frame.id, strBytes.length + 1, this.major)

  return mergeBytes(header, encoding, strBytes)
}

export function setFrame (frame) {
  frame.value = frame.value.position + '/' + frame.value.total
  return textFrame.call(this, frame)
}

export function urlFrame (frame) {
  const strBytes = encodeString(frame.value, 'ascii')
  const header = getHeaderBytes(frame.id, strBytes.length, this.major)

  return mergeBytes(header, strBytes)
}

export function txxxFrame (frame) {
  let encoding = 0
  let descBytes = []
  let strBytes = []

  switch (this.major) {
    case 3:
      encoding = 1
      descBytes = encodeString(frame.value.description + '\0', 'utf-16')
      strBytes = encodeString(frame.value.text, 'utf-16')
      break

    case 4:
      encoding = 3
      descBytes = encodeString(frame.value.description + '\0', 'utf-8')
      strBytes = encodeString(frame.value.text, 'utf-8')
      break

    default:
      throw new TagError(201, this.major)
  }

  const size = descBytes.length + strBytes.length + 1
  const header = getHeaderBytes(frame.id, size, this.major)

  return mergeBytes(header, encoding, descBytes, strBytes)
}

export function wxxxFrame (frame) {
  let encoding = 0
  let descBytes = []
  let strBytes = []

  switch (this.major) {
    case 3:
      encoding = 1
      descBytes = encodeString(frame.value.description + '\0', 'utf-16')
      strBytes = encodeString(frame.value.text, 'ascii')
      break

    case 4:
      encoding = 3
      descBytes = encodeString(frame.value.description + '\0', 'utf-8')
      strBytes = encodeString(frame.value.text, 'ascii')
      break

    default:
      throw new TagError(201, this.major)
  }

  const size = descBytes.length + strBytes.length + 1
  const header = getHeaderBytes(frame.id, size, this.major)

  return mergeBytes(header, encoding, descBytes, strBytes)
}

export function langDescFrame (frame) {
  let encoding = 0
  const langBytes = encodeString(frame.value.language, 'ascii')
  let descBytes = []
  let textBytes = []

  switch (this.major) {
    case 3:
      encoding = 1
      descBytes = encodeString(frame.value.descriptor + '\0', 'utf-16')
      textBytes = encodeString(frame.value.text, 'utf-16')
      break

    case 4:
      encoding = 3
      descBytes = encodeString(frame.value.descriptor + '\0', 'utf-8')
      textBytes = encodeString(frame.value.text, 'utf-8')
      break

    default:
      throw new TagError(201, this.major)
  }

  const size = descBytes.length + textBytes.length + 4
  const header = getHeaderBytes(frame.id, size, this.major)

  return mergeBytes(header, encoding, langBytes, descBytes, textBytes)
}

export function apicFrame (frame) {
  let encoding = 0
  const mimeBytes = encodeString(frame.value.format + '\0', 'ascii')
  const imageBytes = new Uint8Array(frame.value.data)
  let strBytes = []

  switch (this.major) {
    case 3:
      encoding = 1
      strBytes = encodeString(frame.value.description + '\0', 'utf-16')
      break

    case 4:
      encoding = 3
      strBytes = encodeString(frame.value.description + '\0', 'utf-8')
      break

    default:
      throw new TagError(201, this.major)
  }

  const size = mimeBytes.length + strBytes.length + imageBytes.length + 2
  const header = getHeaderBytes(frame.id, size, this.major)

  return mergeBytes(
    header, encoding, mimeBytes, frame.value.type, strBytes, imageBytes
  )
}
