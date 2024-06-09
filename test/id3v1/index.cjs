/* eslint-env mocha */

const assert = require('assert')

const MP3Tag = require('../../dist/mp3tag.js')
const { bytes } = require('../globals.cjs')

describe('ID3v1', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read({ id3v1: true, id3v2: false })
    if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.mp3tag.tags.v1.title, 'TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.v1.artist, 'ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.v1.album, 'ALBUM')
    assert.deepStrictEqual(this.mp3tag.tags.v1.year, '2020')
    assert.deepStrictEqual(this.mp3tag.tags.v1.comment, 'COMMENT')
    assert.deepStrictEqual(this.mp3tag.tags.v1.track, '1')
    assert.deepStrictEqual(this.mp3tag.tags.v1.genre, 'Other')
  })

  it('Validate data', function () {
    this.mp3tag.tags.title = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: true },
      id3v2: { include: false }
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
    this.mp3tag.tags.v1.title = 'NEW TITLE'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: true },
      id3v2: { include: false }
    })
    this.mp3tag.read()

    assert.deepStrictEqual(this.mp3tag.tags.v1.title, 'NEW TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.v1.artist, 'ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.v1.album, 'ALBUM')
    assert.deepStrictEqual(this.mp3tag.tags.v1.year, '2020')
    assert.deepStrictEqual(this.mp3tag.tags.v1.comment, 'COMMENT')
    assert.deepStrictEqual(this.mp3tag.tags.v1.track, '1')
    assert.deepStrictEqual(this.mp3tag.tags.v1.genre, 'Other')
  })
})
