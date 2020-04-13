
import MP3Tag from '../../src/mp3tag'
import assert from 'assert'

describe('ID3v1', function () {
  beforeEach(function () {
    const uint8 = new Uint8Array([
      255, 251, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170,
      84, 65, 71,
      84, 73, 84, 76, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // TITLE
      65, 82, 84, 73, 83, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // ARTIST
      65, 76, 66, 85, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // ALBUM
      50, 48, 50, 48, // 2020 (year)
      67, 79, 77, 77, 69, 78, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, // COMMENT
      0, 1, 1 // track and genre
    ])

    this.mp3tag = new MP3Tag(uint8.buffer)
    this.tagger = this.mp3tag.read()
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.tagger.title, 'TITLE')
    assert.deepStrictEqual(this.tagger.artist, 'ARTIST')
    assert.deepStrictEqual(this.tagger.album, 'ALBUM')
    assert.deepStrictEqual(this.tagger.year, '2020')
    assert.deepStrictEqual(this.tagger.comment, 'COMMENT')
    assert.deepStrictEqual(this.tagger.track, 1)
    assert.deepStrictEqual(this.tagger.genre, 1)
  })

  it('Write data', function () {
    this.tagger.title = 'NEWTITLE'
    this.mp3tag.save()

    const actual = new Uint8Array(this.mp3tag.buffer)
    const expected = new Uint8Array([
      255, 251, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170,
      84, 65, 71,
      78, 69, 87, 84, 73, 84, 76, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      65, 82, 84, 73, 83, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      65, 76, 66, 85, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      50, 48, 50, 48,
      67, 79, 77, 77, 69, 78, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1
    ])

    assert.deepStrictEqual(actual, expected)
  })
})
