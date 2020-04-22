
import TagError from '../error.mjs'
import BufferView from '../viewer.mjs'

import { getHeaderFlags, getFrameFlags } from './flags.mjs'
import * as frames from './frames.mjs'

import { timeRegex } from '../utils/date.mjs'
import { isBuffer } from '../utils/types.mjs'
import {
  setBit, decodeSynch, encodeSynch, synch, mergeBytes
} from '../utils/bytes.mjs'

export function hasID3v2 (buffer) {
  if (!isBuffer(buffer)) throw new TypeError('buffer is not ArrayBuffer/Buffer')

  const view = new BufferView(buffer)
  return view.getString(0, 3, 'ascii').string === 'ID3'
}

export function decode (buffer, tagOffset = 0) {
  const view = new BufferView(buffer, tagOffset)
  if (!hasID3v2(view.buffer)) throw new TagError(200)

  const version = view.getUint8(3, 2)
  const size = decodeSynch(view.getUint32(6))
  const flags = getHeaderFlags(view.getUint8(5), version[0])
  const tags = {
    v2Version: version,
    v2Size: size,
    v2Flags: flags
  }

  if (version[0] !== 3 && version[0] !== 4) {
    throw new TagError(200, 'Unknown version')
  }

  let offset = 10
  let limit = size

  const pushTag = (tag) => {
    const singleFrame = ['OWNE', 'MCDI', 'SYTC']
    switch (typeof tag.value) {
      case 'number':
      case 'string':
        tag.value = tag.value.toString()
        if (tags[tag.id]) tags[tag.id] += '\\\\' + tag.value
        else tags[tag.id] = tag.value
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
    const frame = decodeFrame(frameBytes, { version, flags })
    if (!frame) break

    offset += frame.size + 10
    limit -= frame.size + 10

    if (frame.id === 'SEEK') {
      const seekedTags = decode(buffer, offset + frame.value)
      for (const id in seekedTags) pushTag({ id, value: seekedTags[id] })
    } else pushTag({ id: frame.id, value: frame.value })
  }

  tags.title = tags.TIT2
  tags.artist = tags.TPE1
  tags.album = tags.TALB
  tags.year = version === 3 ? tags.TYER : (tags.TDRC && tags.TDRC.substr(0, 4))
  tags.comment = tags.COMM && tags.COMM[0].text
  tags.track = tags.TRCK && tags.TRCK.split('/')[0]
  tags.genre = tags.TCON

  return tags
}

function decodeFrame (bytes, options) {
  const view = new BufferView(bytes)
  if (view.getUint8(0) === 0x00) return false

  const frame = {}
  const { version, flags } = options

  frame.id = view.getUint8String(0, 4)
  frame.flags = getFrameFlags(view.getUint8(8, 2), version[0])
  const sizeByte = view.getUint32(4)
  frame.size = version[0] === 4 ? decodeSynch(sizeByte) : sizeByte

  const frameSpec = frames[frame.id]
  let offset = 10
  let actualSize = frame.size
  let dataLength = frame.size
  let contents

  if (!frameSpec) {
    console.warn(`Skipping unsupported frame: ${frame.id}`)
    return frame
  }

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

  frame.value = frameSpec.parse(contents.buffer, version[0])
  return frame
}

export function validate (tags, strict, options) {
  const { version } = options
  if (version !== 3 && version !== 4) throw new TagError(200, 'Unknown version')

  for (const id in tags) {
    if (!Object.keys(frames).includes(id)) continue

    const frameSpec = frames[id]
    if (strict && !frameSpec.version.includes(version)) throw new TagError(203)

    try {
      frameSpec.validate(tags[id], version, strict)
    } catch (error) {
      if (error instanceof TagError) error.message = `${error.message} at ${id}`
      throw error
    }
  }

  return true
}

export function encode (tags, options) {
  const { version, padding, unsynch } = options
  tags.TIT2 = tags.TIT2 || (tags.title !== '' ? tags.title : undefined)
  tags.TPE1 = tags.TPE1 || (tags.artist !== '' ? tags.artist : undefined)
  tags.TALB = tags.TALB || (tags.album !== '' ? tags.album : undefined)

  if (version === 3) {
    tags.TYER = tags.TYER || (tags.year !== '' ? tags.year : undefined)
  } else if (version === 4) {
    tags.TDRC = tags.TDRC || (tags.year !== '' ? tags.year : undefined)
  }

  tags.COMM = tags.COMM || (tags.comment !== '' ? [{
    language: 'eng',
    descriptor: '',
    text: tags.comment
  }] : undefined)

  tags.TRCK = tags.TRCK || (tags.track !== '' ? tags.track : undefined)
  tags.TCON = tags.TCON || (tags.genre !== '' ? tags.genre : undefined)

  const ids = Object.keys(frames)
  const tagIds = Object.keys(tags).filter(key => ids.includes(key))
  const filtered = {}

  if (tagIds.length === 0) return new ArrayBuffer(0)
  tagIds.forEach(id => {
    if (tags[id] !== undefined) filtered[id] = tags[id]
  })

  const headerBytes = [0x49, 0x44, 0x33, version, 0]
  let flagsByte = 0
  const sizeView = new BufferView(4)
  const paddingBytes = new Uint8Array(padding)
  const framesBytes = []

  for (const id in filtered) {
    const frameSpec = frames[id]
    const bytes = frameSpec.write(filtered[id], { id, version, unsynch })
    bytes.forEach(byte => framesBytes.push(byte))
  }

  if (unsynch) flagsByte = setBit(flagsByte, 7)
  sizeView.setUint32(0, encodeSynch(framesBytes.length))

  return mergeBytes(
    headerBytes, flagsByte, sizeView.getUint8(0, 4), framesBytes, paddingBytes
  ).buffer
}

export function transform (tags, version) {
  if (version === 3) return transformv4tov3(tags)
  else if (version === 4) return transformv3tov4(tags)
  else return new TagError(200, 'Unknown version')
}

function transformv4tov3 (tags) {
  const transformed = {}
  for (const id in tags) {
    switch (id) {
      case 'TIPL':
        transformed.IPLS = tags[id]
        break

      case 'TDRC': {
        const date = timeRegex.exec(tags[id])
        if (date[2]) transformed.TYER = date[2]
        if (date[4] && date[6]) transformed.TDAT = date[6] + date[4]
        if (date[8] && date[10]) transformed.TIME = date[8] + date[10]
        break
      }

      case 'TDOR':
        transformed.TORY = tags[id]
        break

      case 'TSIZ':
        break

      default:
        transformed[id] = tags[id]
    }
  }

  return transformed
}

function transformv3tov4 (tags) {
  const transformed = {}
  const tdrc = {}

  for (const id in tags) {
    switch (id) {
      case 'IPLS':
        transformed.TIPL = tags[id]
        break

      case 'TDAT':
        tdrc.date = tags[id]
        break

      case 'TIME':
        tdrc.time = tags[id]
        break

      case 'TORY':
        transformed.TDOR = tags[id]
        break

      case 'TRDA':
        break

      case 'TYER':
        tdrc.year = tags[id]
        break

      default:
        transformed[id] = tags[id]
    }
  }

  let dateStr = ''
  if (tdrc.year) dateStr += tdrc.year
  if (tdrc.date) {
    dateStr += '-' + tdrc.date.substr(2, 4) + '-' + tdrc.date.substr(0, 2)
  }

  if (tdrc.time) {
    dateStr += 'T' + tdrc.time.substr(0, 2) + ':' + tdrc.time.substr(2, 4) +
      ':00'
  }

  if (dateStr !== '') transformed.TDRC = dateStr
  return transformed
}
