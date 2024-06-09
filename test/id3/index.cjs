/* eslint-env mocha */

const assert = require('assert')

const MP3Tag = require('../../dist/mp3tag.js')
const { bytes } = require('../globals.cjs')

describe('ID3', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read()
  })

  it('Read ID3v1 and ID3v2', function () {
    assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.v2.TIT2, 'title')
    assert.deepStrictEqual(this.mp3tag.tags.title, 'title')
    assert.deepStrictEqual(this.mp3tag.tags.artist, 'ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.album, 'ALBUM')
    assert.deepStrictEqual(this.mp3tag.tags.year, '2020')
    assert.deepStrictEqual(this.mp3tag.tags.comment, 'COMMENT')
    assert.deepStrictEqual(this.mp3tag.tags.track, '1')
    assert.deepStrictEqual(this.mp3tag.tags.genre, 'Other')
  })

  it('Write ID3v1 and ID3v2', function () {
    this.mp3tag.tags.title = 'NEW TITLE'
    this.mp3tag.tags.artist = 'NEW ARTIST'
    this.mp3tag.save({
      id3v1: { include: true },
      id3v2: { padding: 0 }
    })

    assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
    assert.deepStrictEqual(this.mp3tag.tags.v2.TIT2, 'NEW TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.v2.TPE1, 'NEW ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.title, 'NEW TITLE')
    assert.deepStrictEqual(this.mp3tag.tags.artist, 'NEW ARTIST')
    assert.deepStrictEqual(this.mp3tag.tags.album, 'ALBUM')
    assert.deepStrictEqual(this.mp3tag.tags.year, '2020')
    assert.deepStrictEqual(this.mp3tag.tags.comment, 'COMMENT')
    assert.deepStrictEqual(this.mp3tag.tags.track, '1')
    assert.deepStrictEqual(this.mp3tag.tags.genre, 'Other')
  })
})
