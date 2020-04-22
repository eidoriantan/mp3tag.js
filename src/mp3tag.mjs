
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
    this.version = '2.0.0-alpha'
    this.verbose = verbose
    this.error = ''
    this.errorCode = -1

    this.buffer = buffer
    this.tags = {}
  }

  read (options = {}) {
    this.tags = {}
    this.error = ''
    this.errorCode = -1

    options = overwriteDefault(options, {
      id3v1: true,
      id3v2: true
    })

    let v1Tags = {}
    let v2Tags = {}

    try {
      if (options.id3v1 && ID3v1.hasID3v1(this.buffer)) {
        this.log('ID3v1 found, reading...')
        v1Tags = ID3v1.decode(this.buffer)
        this.log('ID3v1 reading finished')
      }

      if (options.id3v2 && ID3v2.hasID3v2(this.buffer)) {
        this.log('ID3v2 found, reading...')
        v2Tags = ID3v2.decode(this.buffer)
        this.log('ID3v2 reading finished')
      }
    } catch (error) {
      if (error instanceof TagError) {
        this.error = error.message
        this.errorCode = error.code
      } else throw error
    }

    if (this.errorCode < 0) this.tags = mergeObjects(v1Tags, v2Tags)
    return this.tags
  }

  save (options = {}) {
    this.error = ''
    this.errorCode = -1

    const defaultVersion = this.tags.v2Version ? this.tags.v2Version[0] : 4
    options = overwriteDefault(options, {
      strict: false,
      id3v1: { include: true },
      id3v2: {
        include: true,
        unsynch: true,
        version: defaultVersion,
        padding: 2048
      }
    })

    let audio = new Uint8Array(this.getAudio())
    try {
      if (options.id3v1.include) {
        this.log('Validating ID3v1...')
        ID3v1.validate(this.tags, options.strict)

        this.log('Writing ID3v1...')
        const tagBytes = new Uint8Array(ID3v1.encode(this.tags))
        audio = mergeBytes(audio, tagBytes)
      }

      if (options.id3v2.include) {
        this.log('Transforming ID3v2...')
        this.tags = ID3v2.transform(this.tags, options.id3v2.version)

        this.log('Validating ID3v2...')
        ID3v2.validate(this.tags, options.strict, options.id3v2)

        this.log('Writing ID3v2...')
        const encoded = ID3v2.encode(this.tags, options.id3v2)
        const tagBytes = new Uint8Array(encoded)
        audio = mergeBytes(tagBytes, audio)
      }
    } catch (error) {
      if (error instanceof TagError) {
        this.error = error.message
        this.errorCode = error.code
      } else throw error
    }

    if (this.errorCode < 0) this.buffer = audio.buffer
    return this.buffer
  }

  getAudio () {
    let buffer = this.buffer
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not ArrayBuffer/Buffer')
    }

    if (ID3v1.hasID3v1(buffer)) {
      buffer = buffer.slice(0, buffer.byteLength - 128)
    }

    const view = new BufferView(buffer)
    let start = 0
    let i = 0

    while (i < view.byteLength) {
      if (view.getUint8(i) === 0xff && view.getUint8(i + 1) === 0xfb) {
        start = i
        break
      } else i++
    }

    return buffer.slice(start)
  }

  log (message) { if (this.verbose) console.log(message) }
}
