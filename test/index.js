
const MP3Tag = require('../dist/mp3tag.js')
const assert = require('assert')

describe('mp3tag.js Usage', function () {
  it('Throws if not an audio file', function () {
    const textBuffer = new Uint8Array([1, 2, 3, 4, 5])
    assert.throws(function () {
      const mp3tag = new MP3Tag(textBuffer.buffer)
      return mp3tag.read()
    }, /This format is not yet supported/)
  })
})
