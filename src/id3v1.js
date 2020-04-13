
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
}
