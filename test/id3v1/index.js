
const assert = require('assert')

const MP3Tag = require('../../dist/mp3tag.js')
const { bytes } = require('../globals.js')

describe('ID3v1', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read({ id3v2: false })
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.mp3tag.tags.title, 'TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.artist, 'ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.album, 'ALBUM')
    assert.deepStrictEqual(this.mp3tag.tags.year, '2020')
    assert.deepStrictEqual(this.mp3tag.tags.comment, 'COMMENT')
    assert.deepStrictEqual(this.mp3tag.tags.track, '1')
    assert.deepStrictEqual(this.mp3tag.tags.genre, 'Other')
  })

  it('Validate data', function () {
    this.mp3tag.tags.title = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    this.mp3tag.save({
      strict: true,
      id3v2: { include: false }
    })

    assert.throws(() => {
      if (this.mp3tag.errorCode > -1) throw new Error(this.mp3tag.error)
    }, {
      name: 'Error',
      message: this.mp3tag.error
    })
  })

  it('Write data', function () {
    this.mp3tag.tags.title = 'NEW TITLE'
    this.mp3tag.save({
      strict: true,
      id3v2: { include: false }
    })
    this.mp3tag.read()

    assert.deepStrictEqual(this.mp3tag.tags.title, 'NEW TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.artist, 'ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.album, 'ALBUM')
    assert.deepStrictEqual(this.mp3tag.tags.year, '2020')
    assert.deepStrictEqual(this.mp3tag.tags.comment, 'COMMENT')
    assert.deepStrictEqual(this.mp3tag.tags.track, '1')
    assert.deepStrictEqual(this.mp3tag.tags.genre, 'Other')
  })
})
