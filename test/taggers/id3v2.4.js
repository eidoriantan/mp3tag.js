
import MP3Tag from '../../src/mp3tag'
import assert from 'assert'

describe('ID3v2.4', function () {
  beforeEach(function () {
    const uint8 = new Uint8Array([
      73, 68, 51, 4, 0, 0, 0, 0, 0, 25,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    this.mp3tag = new MP3Tag(uint8.buffer, { padding: 0 })
    this.mp3tag.read()
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.mp3tag.tagger.major, 4)
    assert.deepStrictEqual(this.mp3tag.frames[0].id, 'TALB')
    assert.deepStrictEqual(this.mp3tag.frames[0].value, 'ALBUM')
  })

  it('Write data', function () {
    this.mp3tag.frames.push({ id: 'TPE1', value: ['ARTIST1'] })
    this.mp3tag.save()

    const actual = new Uint8Array(this.mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 36,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      84, 80, 69, 49, 0, 0, 0, 9, 0, 0,
      3, 65, 82, 84, 73, 83, 84, 49, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(actual, expected)
  })
})
