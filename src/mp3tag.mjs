
import BufferView from './viewer.mjs'

import * as ID3v1 from './id3v1/index.mjs'
import * as ID3v2 from './id3v2/index.mjs'
import * as MP4 from './mp4/index.mjs'
import * as AIFF from './aiff/index.mjs'
import * as AAC from './aac/index.mjs'

import { mergeBytes } from './utils/bytes.mjs'
import { overwriteDefault } from './utils/objects.mjs'
import { isBuffer } from './utils/types.mjs'
import { encoding2Index } from './utils/strings.mjs'

export default class MP3Tag {
  get name () { return 'MP3Tag' }
  set name (value) { throw new Error('Unable to set this property') }

  get version () { return '3.15.0' }
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

    // Check for AIFF container first (before MP4 since it's more specific)
    if (options.aiff && AIFF.hasAIFF(buffer)) {
      if (verbose) console.log('AIFF container detected')
      if (AIFF.hasID3(buffer)) {
        if (verbose) console.log('ID3 chunk found, reading...')
        const { unsupported } = options
        const result = AIFF.decode(buffer, { unsupported })
        if (result) {
          if (verbose) console.log('ID3 chunk reading finished')
          tags.v2 = { ...result.tags }
          tags.v2Details = result.details
        }
      }

      Object.defineProperties(tags, {
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
      })

      return tags
    }

    // Check for MP4 container
    if (options.mp4 && MP4.hasMP4(buffer)) {
      if (verbose) console.log('MP4 container detected')
      if (MP4.hasID32(buffer)) {
        if (verbose) console.log('ID32 box found, reading...')
        const { unsupported } = options
        const result = MP4.decode(buffer, { unsupported })
        if (result) {
          if (verbose) console.log('ID32 reading finished')
          tags.v2 = { ...result.tags }
          tags.v2Details = result.details
        }
      }

      Object.defineProperties(tags, {
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
      })

      return tags
    }

    // Check for AAC/ADTS (has ID3v2 prepended like MP3, but audio uses 0xFFF sync)
    if (options.aac && AAC.hasAAC(buffer)) {
      if (verbose) console.log('AAC/ADTS detected')
      if (AAC.hasID3(buffer)) {
        if (verbose) console.log('ID3v2 found in AAC, reading...')
        const { unsupported } = options
        const result = AAC.decode(buffer, { unsupported })
        if (result) {
          if (verbose) console.log('ID3v2 reading finished')
          tags.v2 = { ...result.tags }
          tags.v2Details = result.details
        }
      }

      Object.defineProperties(tags, {
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
      })

      return tags
    }

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

    // Handle AIFF containers separately
    if (AIFF.hasAIFF(buffer)) {
      if (typeof tags.v2 === 'undefined') {
        throw new Error('No ID3v2 tags to write to AIFF')
      }

      if (verbose) console.log('Writing ID3v2 to AIFF container...')
      options.id3v2.encoding = options.id3v2.encoding || options.encoding
      const result = AIFF.encode(buffer, tags, {
        strict: options.strict,
        id3v2: options.id3v2
      })

      return typeof Buffer !== 'undefined' ? Buffer.from(result) : result
    }

    // Handle MP4 containers separately
    if (MP4.hasMP4(buffer)) {
      if (typeof tags.v2 === 'undefined') {
        throw new Error('No ID3v2 tags to write to MP4')
      }

      if (verbose) console.log('Writing ID3v2 to MP4 container...')
      options.id3v2.encoding = options.id3v2.encoding || options.encoding
      const result = MP4.encode(buffer, tags, {
        strict: options.strict,
        id3v2: options.id3v2,
        mp4: options.mp4
      })

      return typeof Buffer !== 'undefined' ? Buffer.from(result) : result
    }

    // Handle AAC/ADTS files separately
    if (AAC.hasAAC(buffer)) {
      if (typeof tags.v2 === 'undefined') {
        throw new Error('No ID3v2 tags to write to AAC')
      }

      if (verbose) console.log('Writing ID3v2 to AAC/ADTS...')
      options.id3v2.encoding = options.id3v2.encoding || options.encoding
      const result = AAC.encode(buffer, tags, {
        strict: options.strict,
        id3v2: options.id3v2
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

    // Handle AIFF containers - return whole file (audio interleaved with metadata)
    if (AIFF.hasAIFF(buffer)) {
      return AIFF.getAudioBuffer(buffer)
    }

    // Handle MP4 containers - extract mdat contents
    if (MP4.hasMP4(buffer)) {
      return MP4.getAudioBuffer(buffer)
    }

    // Handle AAC/ADTS - strip ID3v2 and find ADTS sync
    if (AAC.hasAAC(buffer)) {
      return AAC.getAudioBuffer(buffer)
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
