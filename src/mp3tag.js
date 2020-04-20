
import ID3v1 from './id3v1'
import ID3v2 from './id3v2'
import TagError from './error'
import { GENRE } from './globals'

import { getAudio } from './utils/audio'
import { isBuffer } from './utils/types'

export default class MP3Tag {
  static get ID3v1 () { return ID3v1 }
  static get ID3v2 () { return ID3v2 }
  static get genre () { return GENRE }

  get frames () {
    console.warn('frames are deprecated. Please use the tagger\'s instead')
    return this.tagger.frames
  }

  set frames (value) {
    console.warn('frames are deprecated. Please use the tagger\'s instead')
    this.tagger.frames = value
  }

  constructor (buffer, options = {}) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not an instance of Buffer')
    }

    this.name = 'MP3Tag'
    this.version = '1.4.1'
    this.buffer = buffer
    this.options = options
    this.tagger = {}
  }

  read () {
    if (ID3v2.isID3v2(this.buffer)) {
      this.tagger = new ID3v2(this.buffer, this.options)
      this.tagger.read()
    } else if (ID3v1.isID3v1(this.buffer)) {
      this.tagger = new ID3v1(this.buffer)
      this.tagger.read()
    } else {
      this.tagger = new ID3v2(this.buffer, this.options)
      if (this.tagger.getAudio().length > 0) this.save()
      else throw new TagError(1)
    }

    return this.tagger
  }

  save () {
    const old = this.buffer
    this.tagger.options = this.options
    this.buffer = this.tagger.save()
    return old
  }

  getFrames () {
    console.warn('getFrames is deprecated. Please use the tagger\'s instead')
    return this.tagger.getFrames()
  }

  addFrame (id, value) {
    console.warn('addFrame is deprecated. Please use the tagger\'s instead')
    return this.tagger.addFrame(id, value)
  }

  removeFrame (id, index = null) {
    console.warn('removeFrame is deprecated. Please use the tagger\'s instead')
    return this.tagger.removeFrame(id, index)
  }

  editFrame (id, value, index = 0, replace = true) {
    console.warn('editFrame is deprecated. Please use the tagger\'s instead')
    return this.tagger.editFrame(id, value, index, replace)
  }

  existsFrame (id) {
    console.warn('existsFrame is deprecated. Please use the tagger\'s instead')
    return this.tagger.existsFrame(id)
  }

  getAudio () { return new Uint8Array(getAudio(this.buffer)) }

  getBlob (type = 'audio/mpeg') {
    return new Blob([this.buffer], { type: type })
  }
}
