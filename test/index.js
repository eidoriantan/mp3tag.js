
/* eslint-env mocha */

const path = require('path')
const assert = require('assert')

const MP3Tag = require('../dist/mp3tag.js')
const { bytes } = require('./globals.js')

describe('MP3Tag', function () {
  it('Get audio', function () {
    const mp3tag = new MP3Tag(bytes.buffer)
    mp3tag.read()

    const actual = new Uint8Array(mp3tag.getAudio())
    const expected = new Uint8Array([
      255, 251, 224, 0, 0, 0, 0, 0, 170, 170, 170, 170, 170, 170
    ])

    assert.deepStrictEqual(actual, expected)
  })

  it('Remove tags', function () {
    const mp3tag = new MP3Tag(bytes.buffer)
    mp3tag.read()
    mp3tag.remove()

    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      255, 251, 224, 0, 0, 0, 0, 0, 170, 170, 170, 170, 170, 170
    ])

    assert.deepStrictEqual(actual, expected)
    assert.deepStrictEqual(mp3tag.tags, {})
  })

  after(function () {
    const extendTests = ['id3v1/index.js', 'id3v2/index.js', 'id3/index.js']
    const tests = this.test.parent.tests
    let failed = false

    for (let i = 0; !failed && i < tests.length; i++) {
      failed = tests[i].state === 'failed'
    }

    if (failed) return false
    extendTests.forEach(test => {
      const filepath = path.resolve(__dirname, test)
      require(filepath)
    })
  })
})
