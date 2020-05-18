
import TagError from './error.mjs'
import BufferView from './viewer.mjs'

import * as ID3v1 from './id3v1/index.mjs'
import * as ID3v2 from './id3v2/index.mjs'

import { mergeBytes } from './utils/bytes.mjs'
import { overwriteDefault, mergeObjects } from './utils/objects.mjs'
import { isBuffer } from './utils/types.mjs'

export default class MP3Tag {
  constructor (buffer, verbose = false) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not ArrayBuffer/Buffer')
    }

    this.name = 'MP3Tag'
    this.version = '2.2.0'
    this.verbose = verbose
    this.error = ''
    this.errorCode = -1

    this.buffer = buffer
    this.tags = {}
  }

  static readBuffer (buffer, options = {}, verbose = false) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not ArrayBuffer/Buffer')
    }

    let tags = {}
    options = overwriteDefault(options, {
      id3v1: true,
      id3v2: true
    })

    if (options.id3v1 && ID3v1.hasID3v1(buffer)) {
      if (verbose) console.log('ID3v1 found, reading...')
      const v1Tags = ID3v1.decode(buffer)
      if (verbose) console.log('ID3v1 reading finished')
      tags = mergeObjects(tags, v1Tags)
    }

    if (options.id3v2 && ID3v2.hasID3v2(buffer)) {
      if (verbose) console.log('ID3v2 found, reading...')
      const v2Tags = ID3v2.decode(buffer)
      if (verbose) console.log('ID3v2 reading finished')
      tags = mergeObjects(tags, v2Tags)
    }

    tags = mergeTags(tags)
    Object.defineProperties(tags, {
      title: {
        get: function () { return this.TIT2 || '' },
        set: function (value) { this.TIT2 = value }
      },
      artist: {
        get: function () { return this.TPE1 || '' },
        set: function (value) { this.TPE1 = value }
      },
      album: {
        get: function () { return this.TALB || '' },
        set: function (value) { this.TALB = value }
      },
      year: {
        get: function () {
          return this.TYER || (this.TDRC && this.TDRC.substr(0, 4)) || ''
        },
        set: function (value) { this.TYER = value }
      },
      comment: {
        get: function () { return (this.COMM && this.COMM[0].text) || '' },
        set: function (value) {
          const comment = { language: 'eng', descriptor: '', text: value }
          if (Array.isArray(this.COMM)) this.COMM[0] = comment
          else this.COMM = [comment]
        }
      },
      track: {
        get: function () {
          return (this.TRCK && this.TRCK.split('/')[0]) || ''
        },
        set: function (value) { this.TRCK = value }
      },
      genre: {
        get: function () { return this.TCON || '' },
        set: function (value) { this.TCON = value }
      }
    })

    return tags
  }

  read (options = {}) {
    this.tags = {}
    this.error = ''
    this.errorCode = -1
    let tags

    try {
      tags = MP3Tag.readBuffer(this.buffer, options, this.verbose)
    } catch (error) {
      if (error instanceof TagError) {
        this.error = error.message
        this.errorCode = error.code
      } else throw error
    }

    this.tags = tags
    return this.tags
  }

  static writeBuffer (buffer, tags, options = {}, verbose = false) {
    const defaultVersion = tags.v2Version ? tags.v2Version[0] : 4
    tags = mergeTags(tags)
    options = overwriteDefault(options, {
      strict: false,
      id3v1: { include: true },
      id3v2: {
        include: true,
        unsynch: true,
        version: defaultVersion,
        padding: 2048,
        footer: true
      }
    })

    let audio = new Uint8Array(MP3Tag.getAudioBuffer(buffer))

    if (options.id3v1.include) {
      if (verbose) console.log('Validating ID3v1...')
      ID3v1.validate(tags, options.strict)

      if (verbose) console.log('Writing ID3v1...')
      const encoded = ID3v1.encode(tags)
      const tagBytes = new Uint8Array(encoded)
      audio = mergeBytes(audio, tagBytes)
    }

    if (options.id3v2.include) {
      if (verbose) console.log('Transforming ID3v2...')
      tags = ID3v2.transform(tags, options.id3v2.version)

      if (verbose) console.log('Validating ID3v2...')
      ID3v2.validate(tags, options.strict, options.id3v2)

      if (verbose) console.log('Writing ID3v2...')
      const encoded = ID3v2.encode(tags, options.id3v2)

      if (options.id3v2.version === 4 && options.id3v2.footer) {
        const header = new Uint8Array(encoded.header)
        const footer = new Uint8Array(encoded.footer)
        audio = mergeBytes(header, audio)

        if (ID3v1.hasID3v1(audio.buffer)) {
          const id3v1 = audio.subarray(audio.length - 128)
          const notId3v1 = audio.subarray(0, audio.length - 128)
          audio = mergeBytes(notId3v1, footer, id3v1)
        } else audio = mergeBytes(audio, footer)
      } else {
        const tagBytes = new Uint8Array(encoded)
        audio = mergeBytes(tagBytes, audio)
      }
    }

    return audio.buffer
  }

  save (options = {}) {
    this.error = ''
    this.errorCode = -1
    let buffer

    try {
      buffer = MP3Tag.writeBuffer(this.buffer, this.tags, options, this.verbose)
    } catch (error) {
      if (error instanceof TagError) {
        this.error = error.message
        this.errorCode = error.code
      } else throw error
    }

    if (this.errorCode < 0) this.buffer = buffer
    return this.buffer
  }

  remove () {
    this.tags = {}
    this.error = ''
    this.errorCode = -1
    this.buffer = this.getAudio()
    return true
  }

  static getAudioBuffer (buffer) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not ArrayBuffer/Buffer')
    }

    if (ID3v1.hasID3v1(buffer)) {
      buffer = buffer.slice(0, buffer.byteLength - 128)
    }

    const view = new BufferView(buffer)
    let start = 0
    let end = view.byteLength
    let i = 0

    while (i < view.byteLength) {
      if (view.getUint8(i) === 0xff && view.getUint8(i + 1) === 0xfb) {
        start = i
        break
      } else i++
    }

    i = start
    while (i < view.byteLength) {
      if (view.getUint8(i) === 0x33 && view.getUint8(i + 1) === 0x44 &&
        view.getUint8(i + 2) === 0x49) {
        end = i
        break
      } else i++
    }

    return buffer.slice(start, end)
  }

  getAudio () {
    return MP3Tag.getAudioBuffer(this.buffer)
  }

  log (message) { if (this.verbose) console.log(message) }
}

function mergeTags (tags) {
  tags = mergeObjects({}, tags)
  tags.TIT2 = tags.TIT2 || tags.title
  tags.TPE1 = tags.TPE1 || tags.artist
  tags.TALB = tags.TALB || tags.album
  tags.TYER = tags.TYER || (tags.TDRC && tags.TDRC.substr(0, 4)) || tags.year
  tags.COMM = tags.COMM || (tags.comment && [{
    language: 'eng',
    descriptor: '',
    text: tags.comment
  }])
  tags.TRCK = tags.TRCK || tags.track
  tags.TCON = tags.TCON || tags.genre

  tags.title = tags.TIT2 || ''
  tags.artist = tags.TPE1 || ''
  tags.album = tags.TALB || ''
  tags.year = tags.TYER || ''
  tags.comment = (tags.COMM && tags.COMM[0].text) || ''
  tags.track = (tags.TRCK && tags.TRCK.split('/')[0]) || ''
  tags.genre = tags.TCON || ''

  return tags
}
