
import TagError from './error'
import BufferView from './viewer'

import * as flags from './id3v2/flags'
import * as frames from './id3v2/frames'

import { getAudio } from './utils/audio'
import { decodeSynch, encodeSynch, mergeBytes, synch } from './utils/bytes'
import { isBuffer } from './utils/types'

export default class ID3v2 {
  static isID3v2 (buffer) {
    const view = new BufferView(buffer)
    return view.getString(0, 3, 'ascii').string === 'ID3'
  }

  constructor (buffer, options = {}) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not an instance of Buffer')
    }

    this.name = 'ID3v2'
    this.buffer = buffer
    this.options = {
      padding: options.padding !== undefined ? options.padding : 4096,
      version: options.version !== undefined ? options.version : false
    }
    this.frames = []
  }

  read (tagOffset = 0) {
    const view = new BufferView(this.buffer, tagOffset)
    if (view.getString(0, 3, 'ascii').string !== 'ID3') throw new TagError(200)

    const version = view.getUint8(3, 2)
    switch (version[0]) {
      case 3: case 4:
        this.major = version[0]
        this.minor = version[1]
        break

      default:
        throw new TagError(201, version[0])
    }

    this.size = decodeSynch(view.getUint32(6))
    this.flags = flags.getHeaderFlags(view.getUint8(5), this.major)
    this.frames = []

    let offset = 10
    let limit = this.size

    while (offset < this.size) {
      const frameBytes = view.getUint8(offset, limit)
      const frame = decodeFrame.call(this, frameBytes)
      if (!frame) break

      offset += frame.size + 10
      limit -= frame.size + 10

      if (frame.id === 'SEEK') {
        this.read(offset + frame.value)
      } else {
        this.frames.push(frame)
      }
    }

    return this.frames
  }

  validate () {
    if (this.major !== 3 && this.major !== 4) {
      throw new TagError(201, this.major)
    }

    const framesObj = this.getFrames()
    for (const id in framesObj) {
      const frameDesc = frames[id]
      if (!frameDesc) throw new TagError(202, id)
      if (!frameDesc.version.includes(this.major)) throw new TagError(204, id)

      try {
        frames.validateID(id)
        frameDesc.validate(framesObj[id], this.major)
      } catch (e) {
        throw new TagError(203, `ID: ${id}, Message: ${e.message}`)
      }
    }

    return true
  }

  save () {
    if (this.frames.length === 0) return this.getAudio().buffer

    this.major = this.options.version || this.major || 3
    this.minor = 0

    if (!this.validate()) return false
    const framesObj = this.getFrames()
    const headerBytes = [0x49, 0x44, 0x33, this.major, this.minor, 0]
    const sizeView = new BufferView(4)
    const paddingBytes = new Uint8Array(this.options.padding)
    const audioBytes = this.getAudio()
    const framesBytes = []

    for (const id in framesObj) {
      const frameDesc = frames[id]
      const bytes = frameDesc.write(framesObj[id], id, this.major)
      bytes.forEach(byte => framesBytes.push(byte))
    }

    sizeView.setUint32(0, encodeSynch(framesBytes.length + paddingBytes.length))
    this.buffer = mergeBytes(
      headerBytes, sizeView.getUint8(0, 4),
      framesBytes, paddingBytes, audioBytes
    ).buffer

    this.read()
    return this.buffer
  }

  getFrames () {
    const object = {}
    this.frames.forEach(function (frame) {
      if (typeof object[frame.id] !== 'undefined') {
        object[frame.id].push(frame.value)
      } else {
        object[frame.id] = [frame.value]
      }
    })

    return object
  }

  addFrame (id, value) {
    const oldFrames = [...this.frames]
    this.frames.push({ id, value })

    try {
      this.validate()
    } catch (e) {
      this.frames = oldFrames
      throw new TagError(203, e.message)
    }
  }

  removeFrame (id, index = null) {
    const array = this.frames
    let counts = 0

    this.frames.forEach(function (frame, i) {
      if (frame.id !== id) return false
      if (index === null || counts === index) array[i] = undefined
      counts++
    })

    this.frames = array.filter(elem => elem !== undefined)
  }

  editFrame (id, value, index = 0, replace = true) {
    const array = this.frames
    let counts = 0

    this.frames.forEach(function (frame, i) {
      if (frame.id !== id) return false
      if (counts === index) {
        if (Array.isArray(array[i])) array[i].push(value)
        else if (replace) array[i] = { id: id, value: value }
      }

      counts++
    })

    this.frames = array
  }

  existsFrame (id) {
    let found = false
    this.frames.forEach(function (frame) {
      if (frame.id === id) found = true
    })

    return found
  }

  getAudio () {
    return new Uint8Array(getAudio(this.buffer))
  }
}

function decodeFrame (bytes) {
  const frameView = new BufferView(bytes)
  if (frameView.getUint8(0) === 0x00) return false

  const frame = {}
  frame.id = frameView.getUint8String(0, 4)

  switch (this.major) {
    case 3:
      frame.size = frameView.getUint32(4)
      break

    case 4:
      frame.size = decodeSynch(frameView.getUint32(4))
      break

    default:
      throw new TagError(201, this.major)
  }

  frame.flags = flags.getFrameFlags(frameView.getUint8(8, 2), this.major)
  const frameDesc = frames[frame.id]
  let offset = 10
  let actualSize = frame.size
  let dataLength = frame.size
  let contentBuffer = []

  if (!frameDesc) {
    console.warn(`Skipping unsupported frame: ${frame.id}`)
    return frame
  }

  if (frame.flags.dataLengthIndicator) {
    actualSize = decodeSynch(frameView.getUint32(offset))
    offset += 4
    dataLength -= 4
  }

  let unsynchedData = this.flags.unsynchronisation
  if (this.major === 4) unsynchedData = frame.flags.unsynchronisation

  if (unsynchedData) {
    const uint8 = frameView.getUint8(offset, dataLength)
    const unsynched = synch(uint8)
    contentBuffer = new Uint8Array(unsynched)
  } else {
    contentBuffer = frameView.getUint8(offset, actualSize)
  }

  frame.value = frameDesc.parse(new BufferView(contentBuffer), this.major)
  return frame
}
