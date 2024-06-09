
import BufferView from '../viewer.mjs'

import { getHeaderFlags, getFrameFlags } from './flags.mjs'
import * as frames from './frames.mjs'

import {
  setBit, decodeSynch, encodeSynch, synch, mergeBytes
} from '../utils/bytes.mjs'

export function hasID3v2 (buffer) {
  const view = new BufferView(buffer)
  return view.getString(0, 3).string === 'ID3'
}

export function decode (buffer, tagOffset, parseUnsupported) {
  const view = new BufferView(buffer, tagOffset)
  const version = view.getUint8(3, 2)
  const size = decodeSynch(view.getUint32(6))
  const flags = getHeaderFlags(view.getUint8(5), version[0])
  const details = { version, flags, size }
  const tags = {}

  if (version[0] !== 2 && version[0] !== 3 && version[0] !== 4) {
    throw new Error('Unknown ID3v2 major version')
  }

  const frameHeaderSize = version[0] === 2 ? 6 : 10
  let offset = 10
  let limit = size

  const pushTag = (tag) => {
    const singleFrame = ['USER', 'OWNE', 'MCDI', 'RVAD', 'SYTC', 'ETCO', 'PCNT']
    switch (typeof tag.value) {
      case 'number':
      case 'string':
        tag.value = tag.value.toString()
        if (tags[tag.id] && !singleFrame.includes(tag.id)) {
          tags[tag.id] += '\\\\' + tag.value
        } else {
          tags[tag.id] = tag.value
        }
        break

      case 'object':
        if (singleFrame.includes(tag.id)) tags[tag.id] = tag.value
        else {
          if (tags[tag.id]) tags[tag.id].push(tag.value)
          else tags[tag.id] = [tag.value]
        }
        break
    }
  }

  while (offset < size) {
    const frameBytes = view.getUint8(offset, limit)
    const frame = decodeFrame(frameBytes, { version, flags, parseUnsupported })
    if (!frame) break

    offset += frame.size + frameHeaderSize
    limit -= frame.size + frameHeaderSize

    if (frame.id === 'SEEK') {
      const seekedTags = decode(buffer, offset + frame.value, parseUnsupported)
      for (const id in seekedTags) pushTag({ id, value: seekedTags[id] })
    } else pushTag({ id: frame.id, value: frame.value })
  }

  return { tags, details }
}

function decodeFrame (bytes, options) {
  const view = new BufferView(bytes)
  if (view.getUint8(0) === 0x00) return false

  const frame = {}
  const { version, flags, parseUnsupported } = options
  const sizeByte = version[0] === 2 ? view.getUint24(3) : view.getUint32(4)

  frame.id = view.getUint8String(0, version[0] === 2 ? 3 : 4)
  frame.flags = version[0] === 2 ? {} : getFrameFlags(view.getUint8(8, 2), version[0])
  frame.size = version[0] === 4 ? decodeSynch(sizeByte) : sizeByte

  const frameSpec = frames[frame.id]
  if (!frameSpec && !parseUnsupported) return

  let offset = version[0] === 2 ? 6 : 10
  let actualSize = frame.size
  let dataLength = frame.size
  let contents

  if (frame.flags.dataLengthIndicator) {
    actualSize = decodeSynch(view.getUint32(offset))
    offset += 4
    dataLength -= 4
  }

  let unsynchedData = flags.unsynchronisation
  if (version === 4) unsynchedData = frame.flags.unsynchronisation

  if (unsynchedData) {
    const uint8 = view.getUint8(offset, dataLength)
    const unsynched = synch(Array.isArray(uint8) ? uint8 : [uint8])
    contents = new Uint8Array(unsynched)
  } else {
    const uint8 = view.getUint8(offset, actualSize)
    contents = new Uint8Array(Array.isArray(uint8) ? uint8 : [uint8])
  }

  if (!frameSpec && parseUnsupported) {
    frame.value = Array.from(contents)
    return frame
  }

  frame.value = frameSpec.parse(contents.buffer, version[0])
  return frame
}

export function validate (tags, strict, options) {
  // TODO: `skipUnsupported` is deprecated.
  const { version, skipUnsupported, unsupported } = options
  const includeUnsupported = unsupported || !skipUnsupported

  if (version !== 2 && version !== 3 && version !== 4) {
    throw new Error('Unknown provided version')
  }

  for (const id in tags) {
    const frameSpec = frames[id]
    const isSupported = frameSpec && frameSpec.version.includes(version)

    if (strict && !isSupported && includeUnsupported) {
      throw new Error(`${id} is not supported in ID3v2.${version}`)
    }

    try {
      if (isSupported || frameSpec) frameSpec.validate(tags[id], version, strict)
      else if (includeUnsupported) frames.unsupported.validate(tags[id], version, strict)
    } catch (error) {
      throw new Error(`${error.message} at ${id}`)
    }
  }

  return true
}

export function encode (tags, options) {
  // TODO: `skipUnsupported` is deprecated.
  const { version, padding, unsynch, skipUnsupported, unsupported } = options
  const includeUnsupported = unsupported || !skipUnsupported

  const headerBytes = [0x49, 0x44, 0x33, version, 0]
  let flagsByte = 0
  const sizeView = new BufferView(4)
  const paddingBytes = new Uint8Array(padding)
  const framesBytes = []

  for (const id in tags) {
    const frameSpec = frames[id]
    const isSupported = frameSpec && frameSpec.version.includes(version)

    if (!isSupported && !includeUnsupported) continue

    const bytes = !isSupported && includeUnsupported
      ? frames.unsupported.write(tags[id], { id, version, unsynch })
      : frameSpec.write(tags[id], { id, version, unsynch })

    bytes.forEach(byte => framesBytes.push(byte))
  }

  if (unsynch) flagsByte = setBit(flagsByte, 7)
  sizeView.setUint32(0, encodeSynch(framesBytes.length))

  return mergeBytes(
    headerBytes, flagsByte, sizeView.getUint8(0, 4), framesBytes, paddingBytes
  ).buffer
}
