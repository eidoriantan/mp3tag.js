
import TagError from './error'
import BufferView from './viewer'

export default class ID3v1 {
  static isID3v1 (buffer) {
    const offset = buffer.byteLength - 128

    if (offset > -1) {
      const view = new BufferView(buffer, offset)
      return view.getString(0, 3, 'ascii').string === 'TAG'
    } else return false
  }

  constructor (buffer) {
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
}
