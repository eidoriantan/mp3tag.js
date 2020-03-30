
import MP3Tag from '../src/mp3tag'
import assert from 'assert'

describe('mp3tag.js Usage', function () {
  it('Throws if not an audio file', function () {
    const uint8 = new Uint8Array([1, 2, 3, 4, 5])
    assert.throws(function () {
      const mp3tag = new MP3Tag(uint8.buffer)
      return mp3tag.read()
    }, /This format is not yet supported/)
  })

  it('Get the MP3 audio file by getting its file signature', function () {
    const uint8 = new Uint8Array([1, 2, 3, 0, 0, 0, 0, 255, 251, 176, 0, 0])
    const mp3tag = new MP3Tag(uint8.buffer)
    mp3tag.read()

    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([255, 251, 176, 0, 0])

    assert.deepStrictEqual(actual, expected)
  })

  after(function () {
    const tests = this.test.parent.tests
    let success = true

    for (let i = 0; i < tests.length; i++) {
      if (tests[i].state === 'failed') {
        success = false
        break
      }
    }

    if (success) {
      require('./taggers/id3v2')
    }
  })
})
