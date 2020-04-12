
import ID3v2 from './id3v2'
import TagError from './error'

import { isBuffer } from './utils/types'

export default class MP3Tag {
  get frames () { return this.tagger.frames }
  set frames (value) { this.tagger.frames = value }

  constructor (buffer, options = {}) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not an instance of Buffer')
    }

    this.name = 'MP3Tag'
    this.version = '1.2.0'
    this.buffer = buffer
    this.options = options
    this.tagger = {}
  }

  read () {
    if (ID3v2.isID3v2(this.buffer)) {
      this.tagger = new ID3v2(this.buffer, this.options)
      this.tagger.read()
    } else {
      // Default to id3v2 and get the raw audio data for writing
      this.tagger = new ID3v2(this.buffer, this.options)
      if (this.tagger.getAudio().length > 0) this.save()
      else throw new TagError(1)
    }
  }

  save () {
    const old = this.buffer
    this.buffer = this.tagger.save()
    return old
  }

  getFrames () { return this.tagger.getFrames() }

  addFrame (id, value) { return this.tagger.addFrame(id, value) }

  removeFrame (id, index = null) { return this.tagger.removeFrame(id, index) }

  editFrame (id, value, index = 0, replace = true) {
    return this.tagger.editFrame(id, value, index, replace)
  }

  existsFrame (id) { return this.tagger.existsFrame(id) }

  getAudio () { return this.tagger.getAudio() }

  getBlob (type = 'audio/mpeg') {
    return new Blob([this.buffer], { type: type })
  }
}
