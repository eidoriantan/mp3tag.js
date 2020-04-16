
import TagError from './error'
import BufferView from './viewer'

import { getAudio } from './utils/audio'
import { mergeBytes } from './utils/bytes'
import { encodeString } from './utils/strings'
import { isBuffer } from './utils/types'

export default class ID3v1 {
  static isID3v1 (buffer) {
    const offset = buffer.byteLength - 128

    if (offset > -1) {
      const view = new BufferView(buffer, offset)
      return view.getString(0, 3, 'ascii').string === 'TAG'
    } else return false
  }

  constructor (buffer) {
    if (!isBuffer(buffer)) {
      throw new TypeError('buffer is not an instance of Buffer')
    }

    this.name = 'ID3v1'
    this.buffer = buffer
    this.title = ''
    this.artist = ''
    this.album = ''
    this.year = ''
    this.comment = ''
    this.track = undefined
    this.genre = -1
  }

  read () {
    if (!ID3v1.isID3v1(this.buffer)) throw new TagError(100)

    const offset = this.buffer.byteLength - 128
    const view = new BufferView(this.buffer, offset)

    this.title = view.getString(3, 30, 'utf-8').string.replace(/\0/g, '')
    this.artist = view.getString(33, 30, 'utf-8').string.replace(/\0/g, '')
    this.album = view.getString(63, 30, 'utf-8').string.replace(/\0/g, '')
    this.year = view.getString(93, 4, 'utf-8').string.replace(/\0/g, '')

    this.track = view.getUint8(126) || undefined
    this.comment = view.getString(97, typeof this.track !== 'undefined'
      ? 28 : 30, 'utf-8').string.replace(/\0/g, '')

    this.genre = view.getUint8(127)
  }

  validate () {
    if (typeof this.title !== 'string' || typeof this.artist !== 'string' ||
      typeof this.album !== 'string' || typeof this.year !== 'string' ||
      typeof this.comment !== 'string') {
      throw new TagError(103, 'Title/Artist/Album/Year/Comment is not a string')
    }

    if (this.title.length > 30) {
      throw new TagError(103, 'Title length exceeds 30')
    }

    if (this.artist.length > 30) {
      throw new TagError(103, 'Artist length exceeds 30')
    }

    if (this.album.length > 30) {
      throw new TagError(103, 'Album length exceeds 30')
    }

    if (this.year.length > 4) {
      throw new TagError(103, 'Year length exceeds 4')
    }

    if (typeof this.track !== 'undefined') {
      if (typeof this.track !== 'number') {
        throw new TagError(103, 'Track is not a number')
      } else if (this.track > 255 || this.track < 1) {
        throw new TagError(103, 'Track should be in range of 1 - 255')
      }

      if (this.comment.length > 28) {
        throw new TagError(103, 'Comment length exceeds 28')
      }
    } else if (this.comment.length > 30) {
      throw new TagError(103, 'Comment length exceeds 30')
    }

    if (typeof this.genre !== 'number') {
      throw new TagError(103, 'Genre is not a number')
    } else if (this.genre > 255 || this.genre < 0) {
      throw new TagError(103, 'Genre should be in range of 0 - 255')
    }

    return true
  }

  save () {
    if (!this.validate()) return false

    const audio = this.getAudio()

    let title = this.title
    let artist = this.artist
    let album = this.album
    let year = this.year
    let comment = this.comment
    const track = this.track
    const genre = this.genre

    while (title.length < 30) title += '\0'
    while (artist.length < 30) artist += '\0'
    while (album.length < 30) album += '\0'
    while (year.length < 4) year += '\0'

    if (typeof track !== 'undefined') {
      while (comment.length < 28) comment += '\0'
      comment += '\0' + String.fromCharCode(track)
    } else {
      while (comment.length < 30) comment += '\0'
    }

    this.buffer = mergeBytes(
      audio, 0x54, 0x41, 0x47,
      encodeString(title, 'utf-8'),
      encodeString(artist, 'utf-8'),
      encodeString(album, 'utf-8'),
      encodeString(year, 'utf-8'),
      encodeString(comment, 'utf-8'),
      genre
    ).buffer

    this.read()
    return this.buffer
  }

  getAudio () {
    return new Uint8Array(getAudio(this.buffer))
  }
}
