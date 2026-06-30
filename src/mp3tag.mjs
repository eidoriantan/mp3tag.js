
import BufferView from './viewer.mjs'

import * as ID3v1 from './id3v1/index.mjs'
import * as ID3v2 from './id3v2/index.mjs'
import * as MP4 from './mp4/index.mjs'
import * as AIFF from './aiff/index.mjs'
import * as AAC from './aac/index.mjs'

import { mergeBytes, decodeSynch } from './utils/bytes.mjs'
import { overwriteDefault } from './utils/objects.mjs'
import { isBuffer } from './utils/types.mjs'
import { findBox, decodeLanguage } from './mp4/boxes.mjs'
import { encoding2Index } from './utils/strings.mjs'

// Container/stream formats that embed an ID3v2 tag. Checked before the raw
// MP3 ID3v1/ID3v2 path. AIFF is listed before MP4 because its `FORM` signature
// is more specific. Each entry exposes a uniform interface over its module so
// read/write/getAudio can share a single loop instead of one branch per format.
const CONTAINERS = [
  { name: 'aiff', label: 'AIFF', module: AIFF, detect: AIFF.hasAIFF, hasID3: AIFF.hasID3 },
  { name: 'mp4', label: 'MP4', module: MP4, detect: MP4.hasMP4, hasID3: MP4.hasID32 },
  { name: 'aac', label: 'AAC/ADTS', module: AAC, detect: AAC.hasAAC, hasID3: AAC.hasID3 }
]

export default class MP3Tag {
  get name () { return 'MP3Tag' }
  set name (value) { throw new Error('Unable to set this property') }

  get version () { return '3.17.0' }
  set version (value) { throw new Error('Unable to set this property') }

  constructor (buffer, verbose = false) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not ArrayBuffer/Buffer')
    }

    this.verbose = verbose
    this.buffer = buffer
    this.tags = {}
    this.error = ''
  }

  static readBuffer (buffer, options = {}, verbose = false) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not ArrayBuffer/Buffer')
    }

    const tags = {}
    options = overwriteDefault(options, {
      id3v1: true,
      id3v2: true,
      mp4: true,
      aiff: true,
      aac: true,
      unsupported: false,
      encoding: 'utf-8'
    })

    // Container/stream formats embed their ID3v2 tag in a format-specific
    // location. When one matches we read its ID3v2 data and skip the raw
    // ID3v1/ID3v2 path below.
    let container = null
    for (const fmt of CONTAINERS) {
      if (options[fmt.name] && fmt.detect(buffer)) {
        container = fmt
        break
      }
    }

    if (container) {
      if (verbose) console.log(`${container.label} container detected`)
      if (container.hasID3(buffer)) {
        if (verbose) console.log('ID3v2 found, reading...')
        const { unsupported } = options
        const result = container.module.decode(buffer, { unsupported })
        if (result) {
          if (verbose) console.log('ID3v2 reading finished')
          tags.v2 = { ...result.tags }
          tags.v2Details = result.details
        }
      }
    } else {
      if (options.id3v1 && ID3v1.hasID3v1(buffer)) {
        if (verbose) console.log('ID3v1 found, reading...')
        const { tags: v1Tags, details } = ID3v1.decode(buffer, options.encoding)
        if (verbose) console.log('ID3v1 reading finished')
        tags.v1 = { ...v1Tags }
        tags.v1Details = details
      }

      if (options.id3v2 && ID3v2.hasID3v2(buffer)) {
        if (verbose) console.log('ID3v2 found, reading...')
        const { unsupported } = options
        const { tags: v2Tags, details } = ID3v2.decode(buffer, 0, unsupported)
        if (verbose) console.log('ID3v2 reading finished')
        tags.v2 = { ...v2Tags }
        tags.v2Details = details
      }
    }

    Object.defineProperties(tags, {
      title: {
        get: function () {
          return (this.v2 && (this.v2.TIT2 || this.v2.TT2)) ||
            (this.v1 && this.v1.title) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TT2' : 'TIT2'] = value
          }
          if (this.v1) this.v1.title = value
        }
      },
      artist: {
        get: function () {
          return (this.v2 && (this.v2.TPE1 || this.v2.TP1)) ||
            (this.v1 && this.v1.artist) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TP1' : 'TPE1'] = value
          }
          if (this.v1) this.v1.artist = value
        }
      },
      album: {
        get: function () {
          return (this.v2 && (this.v2.TALB || this.v2.TAL)) ||
            (this.v1 && this.v1.album) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TAL' : 'TALB'] = value
          }
          if (this.v1) this.v1.album = value
        }
      },
      year: {
        get: function () {
          return (this.v2 && (this.v2.TYER || this.v2.TDRC || this.v2.TYE)) ||
            (this.v1 && this.v1.year) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            if (version === 2) this.v2.TYE = value
            else if (version === 3) this.v2.TYER = value
            else if (version === 4) this.v2.TDRC = value
          }
          if (this.v1) this.v1.year = value
        }
      },
      comment: {
        get: function () {
          let text = ''
          if (this.v2 && (this.v2.COMM || this.v2.COM)) {
            const comm = this.v2.COMM || this.v2.COM
            if (Array.isArray(comm) && comm.length > 0) text = comm[0].text
          } else if (this.v1 && this.v1.comment) text = this.v1.comment
          return text
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'COM' : 'COMM'] = [{
              language: 'eng',
              descriptor: '',
              text: value
            }]
          }
          if (this.v1) this.v1.comment = value
        }
      },
      track: {
        get: function () {
          return (this.v2 && (
            (this.v2.TRCK && this.v2.TRCK.split('/')[0]) ||
            (this.v2.TRK && this.v2.TRK.split('/')[0])
          )) || (this.v1 && this.v1.track) || ''
        },
        set: function (value) {
          if (this.v2 && value !== '') {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TRK' : 'TRCK'] = value
          }
          if (this.v1) this.v1.track = value
        }
      },
      genre: {
        get: function () {
          return (this.v2 && (this.v2.TCON || this.v2.TCO)) ||
            (this.v1 && this.v1.genre) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TCO' : 'TCON'] = value
          }
          if (this.v1) this.v1.genre = value
        }
      }
    })

    return tags
  }

  static async readBlob (blob, options = {}) {
    options = overwriteDefault(options, {
      id3v1: true,
      id3v2: true,
      mp4: true,
      aiff: true,
      aac: true,
      unsupported: false,
      encoding: 'utf-8'
    })

    const size = blob.size
    const tags = {}
    async function read (offset, length) {
      return blob.slice(offset, offset + length).arrayBuffer()
    }

    const containerProps = {
      title: {
        get: function () {
          return (this.v2 && (this.v2.TIT2 || this.v2.TT2)) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TT2' : 'TIT2'] = value
          }
        }
      },
      artist: {
        get: function () {
          return (this.v2 && (this.v2.TPE1 || this.v2.TP1)) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TP1' : 'TPE1'] = value
          }
        }
      },
      album: {
        get: function () {
          return (this.v2 && (this.v2.TALB || this.v2.TAL)) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TAL' : 'TALB'] = value
          }
        }
      },
      year: {
        get: function () {
          return (this.v2 && (this.v2.TYER || this.v2.TDRC || this.v2.TYE)) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            if (version === 2) this.v2.TYE = value
            else if (version === 3) this.v2.TYER = value
            else if (version === 4) this.v2.TDRC = value
          }
        }
      },
      comment: {
        get: function () {
          let text = ''
          if (this.v2 && (this.v2.COMM || this.v2.COM)) {
            const comm = this.v2.COMM || this.v2.COM
            if (Array.isArray(comm) && comm.length > 0) text = comm[0].text
          }
          return text
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'COM' : 'COMM'] = [{
              language: 'eng',
              descriptor: '',
              text: value
            }]
          }
        }
      },
      track: {
        get: function () {
          return (this.v2 && (
            (this.v2.TRCK && this.v2.TRCK.split('/')[0]) ||
            (this.v2.TRK && this.v2.TRK.split('/')[0])
          )) || ''
        },
        set: function (value) {
          if (this.v2 && value !== '') {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TRK' : 'TRCK'] = value
          }
        }
      },
      genre: {
        get: function () {
          return (this.v2 && (this.v2.TCON || this.v2.TCO)) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TCO' : 'TCON'] = value
          }
        }
      }
    }

    const mp3Props = {
      title: {
        get: function () {
          return (this.v2 && (this.v2.TIT2 || this.v2.TT2)) ||
            (this.v1 && this.v1.title) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TT2' : 'TIT2'] = value
          }
          if (this.v1) this.v1.title = value
        }
      },
      artist: {
        get: function () {
          return (this.v2 && (this.v2.TPE1 || this.v2.TP1)) ||
            (this.v1 && this.v1.artist) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TP1' : 'TPE1'] = value
          }
          if (this.v1) this.v1.artist = value
        }
      },
      album: {
        get: function () {
          return (this.v2 && (this.v2.TALB || this.v2.TAL)) ||
            (this.v1 && this.v1.album) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TAL' : 'TALB'] = value
          }
          if (this.v1) this.v1.album = value
        }
      },
      year: {
        get: function () {
          return (this.v2 && (this.v2.TYER || this.v2.TDRC || this.v2.TYE)) ||
            (this.v1 && this.v1.year) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            if (version === 2) this.v2.TYE = value
            else if (version === 3) this.v2.TYER = value
            else if (version === 4) this.v2.TDRC = value
          }
          if (this.v1) this.v1.year = value
        }
      },
      comment: {
        get: function () {
          let text = ''
          if (this.v2 && (this.v2.COMM || this.v2.COM)) {
            const comm = this.v2.COMM || this.v2.COM
            if (Array.isArray(comm) && comm.length > 0) text = comm[0].text
          } else if (this.v1 && this.v1.comment) text = this.v1.comment
          return text
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'COM' : 'COMM'] = [{
              language: 'eng',
              descriptor: '',
              text: value
            }]
          }
          if (this.v1) this.v1.comment = value
        }
      },
      track: {
        get: function () {
          return (this.v2 && (
            (this.v2.TRCK && this.v2.TRCK.split('/')[0]) ||
            (this.v2.TRK && this.v2.TRK.split('/')[0])
          )) || (this.v1 && this.v1.track) || ''
        },
        set: function (value) {
          if (this.v2 && value !== '') {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TRK' : 'TRCK'] = value
          }
          if (this.v1) this.v1.track = value
        }
      },
      genre: {
        get: function () {
          return (this.v2 && (this.v2.TCON || this.v2.TCO)) ||
            (this.v1 && this.v1.genre) || ''
        },
        set: function (value) {
          if (this.v2) {
            const version = this.v2Details.version[0]
            this.v2[version === 2 ? 'TCO' : 'TCON'] = value
          }
          if (this.v1) this.v1.genre = value
        }
      }
    }

    const headerLen = Math.min(12, size)
    if (headerLen < 4) {
      Object.defineProperties(tags, mp3Props)
      return tags
    }

    const header = await read(0, headerLen)
    const hv = new BufferView(header)

    // AIFF
    if (options.aiff && headerLen >= 12 && hv.getUint8String(0, 4) === 'FORM') {
      const formType = hv.getUint8String(8, 4)

      if (formType === 'AIFF' || formType === 'AIFC') {
        // Walk AIFF chunks to find ID3
        let chunkOffset = 12
        let id3ChunkOffset = -1
        let id3ChunkSize = 0

        while (chunkOffset + 8 <= size) {
          const chunkHeader = await read(chunkOffset, 8)
          const cv = new BufferView(chunkHeader)
          const chunkId = cv.getUint8String(0, 4)
          const chunkSize = cv.getUint32(4)

          if (chunkId === 'ID3 ') {
            id3ChunkOffset = chunkOffset
            id3ChunkSize = chunkSize
            break
          }

          chunkOffset += 8 + chunkSize
          if (chunkSize % 2 !== 0) chunkOffset += 1
        }

        if (id3ChunkOffset >= 0) {
          const id3Buffer = await read(id3ChunkOffset + 8, id3ChunkSize)

          if (ID3v2.hasID3v2(id3Buffer)) {
            const { tags: v2Tags, details } = ID3v2.decode(id3Buffer, 0, options.unsupported)
            details.aiff = {
              chunkOffset: id3ChunkOffset,
              chunkSize: id3ChunkSize
            }
            tags.v2 = { ...v2Tags }
            tags.v2Details = details
          }
        }

        Object.defineProperties(tags, containerProps)
        return tags
      }
    }

    // MP4
    if (options.mp4 && headerLen >= 8 && hv.getUint8String(4, 4) === 'ftyp') {
      // Walk top-level boxes to find moov
      let boxOffset = 0
      let moovOffset = -1
      let moovSize = 0

      while (boxOffset + 8 <= size) {
        const boxHeader = await read(boxOffset, 8)
        const bv = new BufferView(boxHeader)
        let bSize = bv.getUint32(0)
        const bType = bv.getUint8String(4, 4)

        if (bSize === 0) bSize = size - boxOffset
        if (bSize < 8) break

        if (bType === 'moov') {
          moovOffset = boxOffset
          moovSize = bSize
          break
        }

        boxOffset += bSize
      }

      if (moovOffset >= 0) {
        const moovBuffer = await read(moovOffset, moovSize)
        const mv = new BufferView(moovBuffer)

        // Navigate moov > udta > meta > ID32
        const udta = findBox(mv, 8, moovSize, 'udta')
        const meta = udta ? findBox(mv, udta.dataStart, udta.end, 'meta') : null
        const id32 = meta ? findBox(mv, meta.dataStart + 4, meta.end, 'ID32') : null

        if (id32) {
          const languageBytes = mv.getUint8(id32.dataStart + 4, 2)
          const langValue = (languageBytes[0] << 8) | languageBytes[1]
          const language = decodeLanguage(langValue)

          const id3Start = id32.dataStart + 4 + 2
          const id3Size = id32.end - id3Start
          const id3Buffer = moovBuffer.slice(id3Start, id3Start + id3Size)

          if (ID3v2.hasID3v2(id3Buffer)) {
            const { tags: v2Tags, details } = ID3v2.decode(id3Buffer, 0, options.unsupported)
            details.mp4 = {
              language,
              id32Offset: moovOffset + id32.offset,
              id32Size: id32.size
            }
            tags.v2 = { ...v2Tags }
            tags.v2Details = details
          }
        }
      }

      Object.defineProperties(tags, containerProps)
      return tags
    }

    // ID3v2 at byte 0 (MP3 or AAC)
    if (options.id3v2 && headerLen >= 10 && hv.getUint8String(0, 3) === 'ID3') {
      const tagSize = decodeSynch(hv.getUint32(6))
      const fullSize = 10 + tagSize

      const readLen = Math.min(fullSize + 4, size)
      const tagBuffer = await read(0, readLen)

      const { tags: v2Tags, details } = ID3v2.decode(tagBuffer, 0, options.unsupported)
      tags.v2 = { ...v2Tags }
      tags.v2Details = details

      let isAAC = false
      if (options.aac && readLen >= fullSize + 2) {
        const tv = new BufferView(tagBuffer)
        const b0 = tv.getUint8(fullSize)
        const b1 = tv.getUint8(fullSize + 1)
        const syncWord = (b0 << 4) | (b1 >> 4)
        if (syncWord === 0xFFF) {
          const layer = (b1 >> 1) & 0x03
          if (layer === 0) {
            isAAC = true
            details.aac = { format: 'ADTS' }
          }
        }
      }

      if (!isAAC && options.id3v1 && size >= 128) {
        const tail = await read(size - 128, 128)
        if (ID3v1.hasID3v1(tail)) {
          const { tags: v1Tags, details: v1Details } = ID3v1.decode(tail, options.encoding)
          tags.v1 = { ...v1Tags }
          tags.v1Details = v1Details
        }
      }

      Object.defineProperties(tags, isAAC ? containerProps : mp3Props)
      return tags
    }

    // No ID3v2: check for ID3v1
    if (options.id3v1 && size >= 128) {
      const tail = await read(size - 128, 128)
      if (ID3v1.hasID3v1(tail)) {
        const { tags: v1Tags, details } = ID3v1.decode(tail, options.encoding)
        tags.v1 = { ...v1Tags }
        tags.v1Details = details
      }
    }

    Object.defineProperties(tags, mp3Props)
    return tags
  }

  read (options = {}) {
    this.tags = {}
    this.error = ''

    try {
      this.tags = MP3Tag.readBuffer(this.buffer, options, this.verbose)
    } catch (error) {
      this.error = error.message
    }

    return this.tags
  }

  static writeBuffer (buffer, tags, options = {}, verbose = false) {
    const defaultVersion = tags.v2Details ? tags.v2Details.version[0] : 3
    const defaultEncoding = 'utf-8'

    options = overwriteDefault(options, {
      strict: false,
      encoding: defaultEncoding,
      emptyAudioNone: false,
      id3v1: {
        include: false,
        encoding: typeof options.id3v1 !== 'undefined' ? options.id3v1.encoding : defaultEncoding
      },
      id3v2: {
        include: true,
        unsynch: false,
        version: defaultVersion,
        padding: 2048,
        unsupported: false,
        encoding: typeof options.id3v2 !== 'undefined' ? options.id3v2.encoding : defaultEncoding
      },
      mp4: {
        language: 'und'
      }
    })

    // Container/stream formats embed the ID3v2 tag in their own structure and
    // are rewritten in place by the format module. The `mp4` option is ignored
    // by encoders that don't use it.
    for (const fmt of CONTAINERS) {
      if (!fmt.detect(buffer)) continue

      if (typeof tags.v2 === 'undefined') {
        throw new Error(`No ID3v2 tags to write to ${fmt.label}`)
      }

      if (verbose) console.log(`Writing ID3v2 to ${fmt.label} container...`)
      options.id3v2.encoding = options.id3v2.encoding || options.encoding
      const result = fmt.module.encode(buffer, tags, {
        strict: options.strict,
        id3v2: options.id3v2,
        mp4: options.mp4
      })

      return typeof Buffer !== 'undefined' ? Buffer.from(result) : result
    }

    let audio = new Uint8Array(MP3Tag.getAudioBuffer(buffer, options.emptyAudioNone))

    if (options.id3v1.include && typeof tags.v1 !== 'undefined') {
      if (verbose) console.log('Validating ID3v1...')
      const encoding = options.id3v1.encoding || options.encoding
      ID3v1.validate(tags.v1, options.strict, encoding)

      if (verbose) console.log('Writing ID3v1...')
      const encoded = ID3v1.encode(tags.v1, encoding)
      const tagBytes = new Uint8Array(encoded)
      audio = mergeBytes(audio, tagBytes)
    }

    if (options.id3v2.include && typeof tags.v2 !== 'undefined') {
      if (verbose) console.log('Validating ID3v2...')
      options.id3v2.encoding = options.id3v2.encoding || options.encoding
      options.id3v2.encodingIndex = encoding2Index(options.id3v2.encoding)
      ID3v2.validate(tags.v2, options.strict, options.id3v2)

      if (verbose) console.log('Writing ID3v2...')
      const encoded = ID3v2.encode(tags.v2, options.id3v2)
      const tagBytes = new Uint8Array(encoded)
      audio = mergeBytes(tagBytes, audio)
    }

    return typeof Buffer !== 'undefined' ? Buffer.from(audio.buffer) : audio.buffer
  }

  save (options = {}) {
    this.error = ''
    let buffer = this.buffer

    try {
      buffer = MP3Tag.writeBuffer(this.buffer, this.tags, options, this.verbose)
    } catch (error) {
      this.error = error.message
    }

    if (this.error === '') this.buffer = buffer
    return this.buffer
  }

  remove () {
    this.tags = {}
    this.error = ''
    this.buffer = this.getAudio()
    return true
  }

  static getAudioBuffer (buffer, emptyNone = false) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not ArrayBuffer/Buffer')
    }

    // Container/stream formats extract their audio data via the format module
    // (e.g. AIFF returns the whole file, MP4 extracts mdat, AAC strips ID3v2).
    for (const fmt of CONTAINERS) {
      if (fmt.detect(buffer)) return fmt.module.getAudioBuffer(buffer)
    }

    if (ID3v1.hasID3v1(buffer)) {
      buffer = buffer.slice(0, buffer.byteLength - 128)
    }

    let i = 0
    if (ID3v2.hasID3v2(buffer)) {
      const { details } = ID3v2.decode(buffer)
      const { size } = details
      i = size
    }

    const view = new BufferView(buffer)
    let start = 0

    while (i < view.byteLength) {
      if (view.getUint8(i) === 0xff && view.getUint8(i + 1) >= 0xf0) {
        start = i
        break
      } else i++
    }

    if (emptyNone && start === 0) {
      return typeof Buffer !== 'undefined' ? Buffer.alloc(0) : new ArrayBuffer(0)
    }

    const sliced = buffer.slice(start)
    return typeof Buffer !== 'undefined' ? Buffer.from(sliced) : sliced
  }

  getAudio (emptyNone = false) { return MP3Tag.getAudioBuffer(this.buffer, emptyNone) }
}
