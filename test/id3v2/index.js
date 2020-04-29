
import MP3Tag from '../../src/mp3tag.mjs'
import assert from 'assert'

import { bytes } from '../globals.js'

describe('ID3v2', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read({ id3v1: false })
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.mp3tag.tags.v2Version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.title, 'title')
    assert.deepStrictEqual(this.mp3tag.tags.artist, '')
    assert.deepStrictEqual(this.mp3tag.tags.album, '')
    assert.deepStrictEqual(this.mp3tag.tags.year, '')
    assert.deepStrictEqual(this.mp3tag.tags.comment, '')
    assert.deepStrictEqual(this.mp3tag.tags.track, '')
    assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    assert.deepStrictEqual(this.mp3tag.tags.TIT2, 'title')
  })

  it('Validate data', function () {
    this.mp3tag.tags.TIT2 = 'NEWLINE\r\n'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false }
    })

    assert.throws(() => {
      if (this.mp3tag.errorCode > -1) throw new Error(this.mp3tag.error)
    }, { name: 'Error', message: this.mp3tag.error })
  })

  it('Transform data', function () {
    this.mp3tag.tags.TYER = '2020'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false },
      id3v2: { unsynch: false, version: 4 }
    })
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error

    this.mp3tag.read()
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error

    assert.deepStrictEqual(this.mp3tag.tags.v2Version, [4, 0])
    assert.deepStrictEqual(this.mp3tag.tags.title, 'title')
    assert.deepStrictEqual(this.mp3tag.tags.artist, '')
    assert.deepStrictEqual(this.mp3tag.tags.album, '')
    assert.deepStrictEqual(this.mp3tag.tags.year, '2020')
    assert.deepStrictEqual(this.mp3tag.tags.comment, '')
    assert.deepStrictEqual(this.mp3tag.tags.track, '')
    assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    assert.deepStrictEqual(this.mp3tag.tags.TIT2, 'title')
    assert.deepStrictEqual(this.mp3tag.tags.TDRC, '2020')
  })

  it('Write data', function () {
    this.mp3tag.tags.title = 'NEW TITLE'
    this.mp3tag.tags.artist = 'NEW ARTIST'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false },
      id3v2: { unsynch: false }
    })
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error

    this.mp3tag.read()
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error

    assert.deepStrictEqual(this.mp3tag.tags.v2Version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.title, 'NEW TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.artist, 'NEW ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.album, '')
    assert.deepStrictEqual(this.mp3tag.tags.year, '')
    assert.deepStrictEqual(this.mp3tag.tags.comment, '')
    assert.deepStrictEqual(this.mp3tag.tags.track, '')
    assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    assert.deepStrictEqual(this.mp3tag.tags.TIT2, 'NEW TITLE')
  })

  it('Write data (unsynched)', function () {
    const geob = {
      format: 'application/octet-stream',
      filename: 'file.bin',
      description: 'TEST',
      object: [255, 254, 1, 2, 255, 0]
    }

    this.mp3tag.tags.title = ''
    this.mp3tag.tags.GEOB = [geob]
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false },
      id3v2: { padding: 0 }
    })
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error
    this.mp3tag.read()
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error

    assert.deepStrictEqual(this.mp3tag.tags.v2Version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.title, '')
    assert.deepStrictEqual(this.mp3tag.tags.artist, '')
    assert.deepStrictEqual(this.mp3tag.tags.album, '')
    assert.deepStrictEqual(this.mp3tag.tags.year, '')
    assert.deepStrictEqual(this.mp3tag.tags.comment, '')
    assert.deepStrictEqual(this.mp3tag.tags.track, '')
    assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    assert.deepStrictEqual(this.mp3tag.tags.GEOB, [geob])
  })
})
