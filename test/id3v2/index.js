
/* eslint-env mocha */

const assert = require('assert')

const MP3Tag = require('../../dist/mp3tag.js')
const { bytes } = require('../globals.js')

describe('ID3v2', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read({ id3v1: false })
    if (this.mp3tag.errorCode > -1) throw this.mp3tag.error
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.v2.TIT2, 'title')
    assert.deepStrictEqual(this.mp3tag.tags.title, 'title')
    assert.deepStrictEqual(this.mp3tag.tags.artist, '')
    assert.deepStrictEqual(this.mp3tag.tags.album, '')
    assert.deepStrictEqual(this.mp3tag.tags.year, '')
    assert.deepStrictEqual(this.mp3tag.tags.comment, '')
    assert.deepStrictEqual(this.mp3tag.tags.track, '')
    assert.deepStrictEqual(this.mp3tag.tags.genre, '')
  })

  it('Validate data', function () {
    this.mp3tag.tags.v2.TIT2 = 'NEWLINE\r\n'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false }
    })

    assert.throws(() => {
      const error = this.mp3tag.error
      if (error !== '') throw new Error(error)
    }, {
      name: 'Error',
      message: this.mp3tag.error
    })
  })

  it('Write data', function () {
    this.mp3tag.tags.title = 'NEW TITLE'
    this.mp3tag.tags.artist = 'NEW ARTIST'
    this.mp3tag.save({ strict: true })
    if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

    this.mp3tag.read()
    if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

    assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.v2.TIT2, 'NEW TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.title, 'NEW TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.artist, 'NEW ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.album, '')
    assert.deepStrictEqual(this.mp3tag.tags.year, '')
    assert.deepStrictEqual(this.mp3tag.tags.comment, '')
    assert.deepStrictEqual(this.mp3tag.tags.track, '')
    assert.deepStrictEqual(this.mp3tag.tags.genre, '')
  })

  it('Write data (unsynched)', function () {
    const geob = {
      format: 'application/octet-stream',
      filename: 'file.bin',
      description: 'TEST',
      object: [255, 254, 1, 2, 255, 0]
    }

    this.mp3tag.tags.title = ''
    this.mp3tag.tags.v2.GEOB = [geob]
    this.mp3tag.save({
      strict: true,
      id3v2: { unsynch: true, padding: 0 }
    })
    if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

    this.mp3tag.read()
    if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

    assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.title, '')
    assert.deepStrictEqual(this.mp3tag.tags.artist, '')
    assert.deepStrictEqual(this.mp3tag.tags.album, '')
    assert.deepStrictEqual(this.mp3tag.tags.year, '')
    assert.deepStrictEqual(this.mp3tag.tags.comment, '')
    assert.deepStrictEqual(this.mp3tag.tags.track, '')
    assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    assert.deepStrictEqual(this.mp3tag.tags.v2.GEOB, [geob])
  })
})
