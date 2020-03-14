
import * as flags from './id3v2/flags'
import * as frames from './id3v2/frames'

import { decodeSynch, encodeSynch, mergeBytes, unsynch } from './utils/bytes'
import BufferView from './utils/viewer'
import TagError from './error'

const options = {
  padding: 2048,
  writer: {
    version: false
  }
}

export default class ID3v2 {
  get options () { return options }
  set options (value) {
    for (const key in options) {
      if (value[key] !== undefined) options[key] = value[key]
    }
  }

  constructor (buffer, options = {}) {
    this.buffer = buffer
    this.options = options
    this.frames = []
  }

  read () {
    const mediaView = new BufferView(this.buffer)
    if (mediaView.getUint8String(0, 3) !== 'ID3') throw new TagError(200)

    const version = mediaView.getUint8(3, 2)
    switch (version[0]) {
      case 3: case 4:
        this.major = version[0]
        this.minor = version[1]
        break

      default:
        throw new TagError(201, version[0])
    }

    this.size = decodeSynch(mediaView.getUint32(6))
    this.flags = flags.getHeaderFlags(this.major, mediaView.getUint8(5))
    this.frames = []

    let offset = 10
    while (offset < this.size) {
      const frameView = mediaView.getUint8(offset, this.size)
      const frame = decodeFrame.call(this, frameView)

      if (frame) {
        this.frames.push(frame)
        offset += frame.size + 10
      } else break
    }

    return this.frames
  }

  validate () {
    const tagger = this
    this.frames.forEach(function (frame) {
      const frameDesc = frames[frame.id]
      if (frameDesc) frameDesc.validate.call(tagger, frame)
      else throw new TagError(202, frame.id)
    })

    return true
  }

  save () {
    if (this.frames.length === 0) return this.getAudio()
    if (!this.validate()) return false

    this.major = this.options.writer.version || 3
    this.minor = 0

    const headerBytes = [0x49, 0x44, 0x33, this.major, this.minor, 0b00100000]
    const sizeView = new BufferView(new ArrayBuffer(4))
    const paddingBytes = new Uint8Array(this.options.padding)
    const audioBytes = this.getAudio()
    const framesBytes = []
    const tagger = this

    this.frames.forEach(function (frame) {
      const frameDesc = frames[frame.id]
      if (!frameDesc.version.includes(tagger.major)) {
        throw new TagError(204, frame.id)
      }

      const bytes = frameDesc.write.call(tagger, frame)
      bytes.forEach(byte => framesBytes.push(byte))
    })

    sizeView.setUint32(0, encodeSynch(framesBytes.length + paddingBytes.length))
    const resultBytes = mergeBytes(
      headerBytes, sizeView.getUint8(0, 4),
      framesBytes, paddingBytes, audioBytes
    )

    this.buffer = resultBytes.buffer
    this.read()

    return this.buffer
  }

  getAudio () {
    const audioData = new Uint8Array(this.buffer)
    let i = 0

    while (i < audioData.length) {
      if (audioData[i] === 0xff && audioData[i + 1] === 0xfb) {
        return new Uint8Array(this.buffer.slice(i))
      } else i++
    }

    return new Uint8Array(0)
  }
}

function decodeFrame (bytes) {
  const frameView = new BufferView(bytes.buffer)
  if (frameView.getUint8(0) === 0x00) return false

  const frame = {}
  frame.id = frameView.getUint8String(0, 4)

  if (this.major === 3) frame.size = frameView.getUint32(4)
  else if (this.major === 4) frame.size = decodeSynch(frameView.getUint32(4))
  else throw new TagError(201, this.major)

  frame.flags = flags.getFrameFlags(this.major, frameView.getUint8(8, 2))

  const frameDesc = frames[frame.id]
  let offset = 10
  let actualSize = frame.size
  let dataLength = frame.size
  let contentBytes = []

  if (!frameDesc) {
    console.warn(`Skipping unsupported frame: ${frame.id}`)
    return frame
  }

  if (frame.flags.dataLengthIndicator) {
    actualSize = decodeSynch(frameView.getUint32(offset))
    offset += 4
    dataLength -= 4
  }

  if ((this.major === 3 && this.flags.unsynchronisation) || (this.major === 4 &&
    (this.flags.unsynchronisation || frame.flags.unsynchronisation))) {
    const uint8 = frameView.getUint8(offset, dataLength)
    const unsynched = unsynch(uint8)
    contentBytes = new ArrayBuffer(actualSize)
    new Uint8Array(contentBytes).set(unsynched)
  } else {
    contentBytes = frameView.buffer.slice(offset, offset + actualSize)
  }

  frame.value = frameDesc.parse.call(this, new BufferView(contentBytes))
  return frame
}
