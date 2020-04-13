
import MP3Tag from '../../src/mp3tag'
import assert from 'assert'

describe('ID3v2.3', function () {
  beforeEach(function () {
    const uint8 = new Uint8Array([
      73, 68, 51, 3, 0, 0, 0, 0, 0, 33,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    this.mp3tag = new MP3Tag(uint8.buffer, { padding: 0 })
    this.tagger = this.mp3tag.read()
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.tagger.major, 3)
    assert.deepStrictEqual(this.tagger.frames[0].id, 'TALB')
    assert.deepStrictEqual(this.tagger.frames[0].value, 'ALBUM')

    const frames = this.tagger.getFrames()
    assert.deepStrictEqual(frames.TALB, ['ALBUM'])
  })

  it('Write data', function () {
    this.tagger.addFrame('TPE1', ['ARTIST1'])
    this.mp3tag.save()

    const actual = new Uint8Array(this.mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0, 0, 0, 0, 54,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      84, 80, 69, 49, 0, 0, 0, 19, 0, 0,
      1, 255, 254, 65, 0, 82, 0, 84, 0, 73, 0, 83, 0, 84, 0, 49, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(actual, expected)
  })
})
