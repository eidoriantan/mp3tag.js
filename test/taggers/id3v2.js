
const MP3Tag = require('../../dist/mp3tag.js')
const assert = require('assert')

const v23Bytes = new Uint8Array([
  73, 68, 51, 3, 0, 0, 0, 0, 0, 33, // ID3 Header
  84, 65, 76, 66, 0, 0, 0, 15, 0, 0, // Frame "TALB" header
  1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0, // Frame content
  0, 0, 0, 0, 0, 0, 0, 0, // padding of 8 bytes
  255, 251, 176, 0, 0 // mp3
])

const v24Bytes = new Uint8Array([
  73, 68, 51, 4, 0, 0, 0, 0, 0, 25, // ID3 Header
  84, 65, 76, 66, 0, 0, 0, 7, 0, 0, // Frame "TALB" header
  3, 65, 76, 66, 85, 77, 0, // Frame content
  0, 0, 0, 0, 0, 0, 0, 0, // padding of 8 bytes
  255, 251, 176, 0, 0 // mp3
])

describe('ID3v2', function () {
  it('Read data v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TALB')
    assert.deepStrictEqual(mp3tag.frames[0].value, 'ALBUM')
  })

  it('Read data v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TALB')
    assert.deepStrictEqual(mp3tag.frames[0].value, 'ALBUM')
  })

  it('Read then write data v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 0 })

    mp3tag.read()
    mp3tag.frames.push({
      id: 'TPE1',
      value: ['ARTIST1']
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    // bit "5" in flags indicates that the tags are in experimental stage
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 54,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      84, 80, 69, 49, 0, 0, 0, 19, 0, 0,
      1, 255, 254, 65, 0, 82, 0, 84, 0, 73, 0, 83, 0, 84, 0, 49, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(actual, expected)
  })

  it('Read then write data v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, {
      padding: 0,
      version: 4
    })

    mp3tag.read()
    mp3tag.frames.push({
      id: 'TPE1',
      value: ['ARTIST1']
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    // bit "5" in flags indicates that the tags are in experimental stage
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

  it('Write data with padding with no tags v2.3', function () {
    const audioBytes = new Uint8Array([255, 251, 176, 0, 0])
    const mp3tag = new MP3Tag(audioBytes.buffer, {
      padding: 8,
      version: 3
    })

    mp3tag.read()
    mp3tag.frames = [{ id: 'TALB', value: 'ALBUM' }]
    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      // bit "5" in flags indicates that the tags are in experimental stage
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 33,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(actual, expected)
  })

  it('Write data with padding with no tags v2.4', function () {
    const audioBytes = new Uint8Array([255, 251, 176, 0, 0])
    const mp3tag = new MP3Tag(audioBytes.buffer, {
      padding: 8,
      version: 4
    })

    mp3tag.read()
    mp3tag.frames = [{ id: 'TALB', value: 'ALBUM' }]
    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      // bit "5" in flags indicates that the tags are in experimental stage
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 25,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

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
      require('./id3v2-frames-read')
      require('./id3v2-frames-write')
    }
  })
})
