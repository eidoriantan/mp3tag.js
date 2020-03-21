
const MP3Tag = require('../../../dist/mp3tag')
const assert = require('assert')

const v23Bytes = new Uint8Array([
  73, 68, 51, 3, 0, 0, 0, 0, 0, 33,
  84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
  1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  255, 251, 176, 0, 0
])

const v24Bytes = new Uint8Array([
  73, 68, 51, 4, 0, 0, 0, 0, 0, 25,
  84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
  3, 65, 76, 66, 85, 77, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  255, 251, 176, 0, 0
])

describe('Writing ID3v2 Frames', function () {
  it('Write array frames v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TPE1',
      value: ['ART1', 'ART2']
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 66,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      84, 80, 69, 49, 0, 0, 0, 23, 0, 0,
      1, 255, 254, 65, 0, 82, 0, 84, 0, 49, 0, 47, 0,
      65, 0, 82, 0, 84, 0, 50, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid array v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TPE1',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /TPE1 value is not an array/)
  })

  it('Write array frames v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TPE1',
      value: ['ART1', 'ART2']
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 46,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      84, 80, 69, 49, 0, 0, 0, 11, 0, 0,
      3, 65, 82, 84, 49, 0, 65, 82, 84, 50, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid array v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TPE1',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /TPE1 value is not an array/)
  })

  it('Write number frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TBPM',
      value: 100
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 48,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      84, 66, 80, 77, 0, 0, 0, 5, 0, 0,
      0, 49, 48, 48, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid number v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TBPM',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /TBPM value is not a number/)
  })

  it('Write number frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TBPM',
      value: 100
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 40,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      84, 66, 80, 77, 0, 0, 0, 5, 0, 0,
      0, 49, 48, 48, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid number v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TBPM',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /TBPM value is not a number/)
  })

  it('Write set frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TRCK',
      value: {
        position: 1,
        total: 2
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 48,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      84, 82, 67, 75, 0, 0, 0, 5, 0, 0,
      0, 49, 47, 50, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid set v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TRCK',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /TRCK position\/total is not a number/)
  })

  it('Write set frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TRCK',
      value: {
        position: 1,
        total: 2
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 40,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      84, 82, 67, 75, 0, 0, 0, 5, 0, 0,
      0, 49, 47, 50, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple set frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TRCK',
      value: [{
        position: 1,
        total: 2
      }, {
        position: 1,
        total: 3
      }]
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 44,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      84, 82, 67, 75, 0, 0, 0, 9, 0, 0,
      0, 49, 47, 50, 0, 49, 47, 51, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid set v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TRCK',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /TRCK position\/total is not a number/)
  })

  it('Throws if invalid time v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TYER',
      value: '123a'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /TYER is not 4 numeric characters/)
  })

  it('Throws if invalid time v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TDRC',
      value: '123a'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /Time Frames should follow ISO 8601/)
  })

  it('Write url frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WPUB',
      value: 'https://github.com'
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 62,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      87, 80, 85, 66, 0, 0, 0, 19, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid url v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WPUB',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /URL is not a valid URL/)

    mp3tag.frames[1] = {
      id: 'WPUB',
      value: 2
    }

    assert.throws(function () {
      mp3tag.save()
    }, /WPUB value is not a string/)
  })

  it('Write url frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WPUB',
      value: 'https://github.com'
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 54,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      87, 80, 85, 66, 0, 0, 0, 19, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid url v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WPUB',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /URL is not a valid URL/)

    mp3tag.frames[1] = {
      id: 'WPUB',
      value: 2
    }

    assert.throws(function () {
      mp3tag.save()
    }, /WPUB value is not a string/)
  })

  it('Write txxx frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TXXX',
      value: {
        description: 'DESC',
        text: 'TEXT'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 68,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      84, 88, 88, 88, 0, 0, 0, 25, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 84, 0, 69, 0, 88, 0, 84, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple txxx frames v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TXXX',
      value: {
        description: 'DESC',
        text: 'TEXT'
      }
    }, {
      id: 'TXXX',
      value: {
        description: 'DESC2',
        text: 'TEXT'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 105,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      84, 88, 88, 88, 0, 0, 0, 25, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 84, 0, 69, 0, 88, 0, 84, 0, 0, 0,
      84, 88, 88, 88, 0, 0, 0, 27, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      255, 254, 84, 0, 69, 0, 88, 0, 84, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid txxx v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TXXX',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined text\/description is not a string/)

    mp3tag.frames[1] = {
      id: 'TXXX',
      value: {
        description: 'DUPLICATE',
        text: 'TEXT'
      }
    }

    mp3tag.frames[2] = {
      id: 'TXXX',
      value: {
        description: 'DUPLICATE',
        text: 'TEXT'
      }
    }

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined description should not duplicate/)
  })

  it('Write txxx frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TXXX',
      value: {
        description: 'DESC',
        text: 'TEXT'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 46,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      84, 88, 88, 88, 0, 0, 0, 11, 0, 0,
      3, 68, 69, 83, 67, 0, 84, 69, 88, 84, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple txxx frames v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TXXX',
      value: {
        description: 'DESC',
        text: 'TEXT'
      }
    }, {
      id: 'TXXX',
      value: {
        description: 'DESC2',
        text: 'TEXT'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 68,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      84, 88, 88, 88, 0, 0, 0, 11, 0, 0,
      3, 68, 69, 83, 67, 0, 84, 69, 88, 84, 0,
      84, 88, 88, 88, 0, 0, 0, 12, 0, 0,
      3, 68, 69, 83, 67, 50, 0, 84, 69, 88, 84, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid txxx v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'TXXX',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined text\/description is not a string/)

    mp3tag.frames[1] = {
      id: 'TXXX',
      value: {
        description: 'DUPLICATE',
        text: 'TEXT'
      }
    }

    mp3tag.frames[2] = {
      id: 'TXXX',
      value: {
        description: 'DUPLICATE',
        text: 'TEXT'
      }
    }

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined description should not duplicate/)
  })

  it('Write wxxx frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WXXX',
      value: {
        description: 'DESC',
        url: 'https://github.com'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 74,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      87, 88, 88, 88, 0, 0, 0, 31, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple wxxx frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WXXX',
      value: {
        description: 'DESC',
        url: 'https://github.com'
      }
    }, {
      id: 'WXXX',
      value: {
        description: 'DESC2',
        url: 'https://github.com'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 117,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      87, 88, 88, 88, 0, 0, 0, 31, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      87, 88, 88, 88, 0, 0, 0, 33, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid wxxx v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WXXX',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined text\/description is not a string/)

    mp3tag.frames[1] = {
      id: 'WXXX',
      value: {
        description: 'DUPLICATE',
        url: 'https://github.com'
      }
    }

    mp3tag.frames[2] = {
      id: 'WXXX',
      value: {
        description: 'DUPLICATE',
        url: 'https://github.com'
      }
    }

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined description should not duplicate/)
  })

  it('Write wxxx frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WXXX',
      value: {
        description: 'DESC',
        url: 'https://github.com'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 59,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      87, 88, 88, 88, 0, 0, 0, 24, 0, 0,
      3, 68, 69, 83, 67, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple wxxx frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WXXX',
      value: {
        description: 'DESC',
        url: 'https://github.com'
      }
    }, {
      id: 'WXXX',
      value: {
        description: 'DESC2',
        url: 'https://github.com'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 94,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      87, 88, 88, 88, 0, 0, 0, 24, 0, 0,
      3, 68, 69, 83, 67, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      87, 88, 88, 88, 0, 0, 0, 25, 0, 0,
      3, 68, 69, 83, 67, 50, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid wxxx v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'WXXX',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined text\/description is not a string/)

    mp3tag.frames[1] = {
      id: 'WXXX',
      value: {
        description: 'DUPLICATE',
        url: 'https://github.com'
      }
    }

    mp3tag.frames[2] = {
      id: 'WXXX',
      value: {
        description: 'DUPLICATE',
        url: 'https://github.com'
      }
    }

    assert.throws(function () {
      mp3tag.save()
    }, /User-defined description should not duplicate/)
  })

  it('Write ipls frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'IPLS',
      value: ['PER1', 'PER2']
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 68,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      73, 80, 76, 83, 0, 0, 0, 25, 0, 0,
      1, 255, 254, 80, 0, 69, 0, 82, 0, 49, 0, 0, 0,
      255, 254, 80, 0, 69, 0, 82, 0, 50, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write langDesc frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'USLT',
      value: {
        language: 'eng',
        descriptor: 'DESC',
        text: 'LYRICS'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 73,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      85, 83, 76, 84, 0, 0, 0, 30, 0, 0,
      1, 101, 110, 103, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 76, 0, 89, 0, 82, 0, 73, 0, 67, 0, 83, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple langDesc frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'USLT',
      value: {
        language: 'eng',
        descriptor: 'DESC',
        text: 'LYRICS'
      }
    }, {
      id: 'USLT',
      value: {
        language: 'jpn',
        descriptor: 'DESC2',
        text: '歌詞'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 107,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      85, 83, 76, 84, 0, 0, 0, 30, 0, 0,
      1, 101, 110, 103, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 76, 0, 89, 0, 82, 0, 73, 0, 67, 0, 83, 0,
      85, 83, 76, 84, 0, 0, 0, 24, 0, 0,
      1, 106, 112, 110, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      255, 254, 76, 107, 94, 138,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid langDesc v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'USLT',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /Language\/descriptor\/text is not a string/)
  })

  it('Write langDesc frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'USLT',
      value: {
        language: 'eng',
        descriptor: 'DESC',
        text: 'LYRICS'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 50,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      85, 83, 76, 84, 0, 0, 0, 15, 0, 0,
      3, 101, 110, 103, 68, 69, 83, 67, 0,
      76, 89, 82, 73, 67, 83,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple langDesc frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'USLT',
      value: {
        language: 'eng',
        descriptor: 'DESC',
        text: 'LYRICS'
      }
    }, {
      id: 'USLT',
      value: {
        language: 'jpn',
        descriptor: 'DESC2',
        text: '歌詞'
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 76,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      85, 83, 76, 84, 0, 0, 0, 15, 0, 0,
      3, 101, 110, 103, 68, 69, 83, 67, 0,
      76, 89, 82, 73, 67, 83,
      85, 83, 76, 84, 0, 0, 0, 16, 0, 0,
      3, 106, 112, 110, 68, 69, 83, 67, 50, 0,
      230, 173, 140, 232, 169, 158,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid langDesc v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'USLT',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /Language\/descriptor\/text is not a string/)
  })

  it('Write apic frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        description: 'DESC',
        type: 3,
        data: new Uint8Array([255, 216, 255, 226, 255, 217])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 74,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      65, 80, 73, 67, 0, 0, 0, 31, 0, 0,
      1, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 216, 255, 226, 255, 217,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple apic frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        description: 'DESC',
        type: 3,
        data: new Uint8Array([255, 216, 255, 226, 255, 217])
      }
    }, {
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        description: 'DESC2',
        type: 0,
        data: new Uint8Array([255, 216, 255, 226, 255, 217])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 117,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      65, 80, 73, 67, 0, 0, 0, 31, 0, 0,
      1, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 216, 255, 226, 255, 217,
      65, 80, 73, 67, 0, 0, 0, 33, 0, 0,
      1, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      0, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      255, 216, 255, 226, 255, 217,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid apic v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'APIC',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /MIME, type, or description is invalid/)
  })

  it('Write apic frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        description: 'DESC',
        type: 3,
        data: new Uint8Array([255, 216, 255, 226, 255, 217])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 59,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      65, 80, 73, 67, 0, 0, 0, 24, 0, 0,
      3, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 68, 69, 83, 67, 0,
      255, 216, 255, 226, 255, 217,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple apic frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        description: 'DESC',
        type: 3,
        data: new Uint8Array([255, 216, 255, 226, 255, 217])
      }
    }, {
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        description: 'DESC2',
        type: 0,
        data: new Uint8Array([255, 216, 255, 226, 255, 217])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 94,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      65, 80, 73, 67, 0, 0, 0, 24, 0, 0,
      3, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 68, 69, 83, 67, 0,
      255, 216, 255, 226, 255, 217,
      65, 80, 73, 67, 0, 0, 0, 25, 0, 0,
      3, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      0, 68, 69, 83, 67, 50, 0,
      255, 216, 255, 226, 255, 217,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if invalid apic v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'APIC',
      value: 'INVALID'
    })

    assert.throws(function () {
      mp3tag.save()
    }, /MIME, type, or description is invalid/)
  })

  it('Write geob frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC',
        object: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 95,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      71, 69, 79, 66, 0, 0, 0, 52, 0, 0,
      1, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      255, 254, 102, 0, 105, 0, 108, 0, 101, 0,
      46, 0, 116, 0, 120, 0, 116, 0, 0, 0,
      255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple geob frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC',
        object: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    }, {
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC2',
        object: new Uint8Array([9, 10, 11, 12, 13, 14, 15, 16])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 1, 31,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      71, 69, 79, 66, 0, 0, 0, 52, 0, 0,
      1, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      255, 254, 102, 0, 105, 0, 108, 0, 101, 0,
      46, 0, 116, 0, 120, 0, 116, 0, 0, 0,
      255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      71, 69, 79, 66, 0, 0, 0, 54, 0, 0,
      1, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      255, 254, 102, 0, 105, 0, 108, 0, 101, 0,
      46, 0, 116, 0, 120, 0, 116, 0, 0, 0,
      255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      9, 10, 11, 12, 13, 14, 15, 16,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Throws if multiple content geob frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer)
    mp3tag.read()
    mp3tag.frames.push({
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC',
        object: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    }, {
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC',
        object: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    })

    assert.throws(function () {
      mp3tag.save()
    }, /GEOB description should not duplicate/)

    mp3tag.frames[2].value.description = 'DESC2'

    assert.throws(function () {
      mp3tag.save()
    }, /GEOB object should not duplicate/)
  })

  it('Write geob frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC',
        object: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 69,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      71, 69, 79, 66, 0, 0, 0, 34, 0, 0,
      3, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      102, 105, 108, 101, 46, 116, 120, 116, 0,
      68, 69, 83, 67, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple geob frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC',
        object: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    }, {
      id: 'GEOB',
      value: {
        format: 'text/plain',
        filename: 'file.txt',
        description: 'DESC2',
        object: new Uint8Array([9, 10, 11, 12, 13, 14, 15, 16])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 114,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      71, 69, 79, 66, 0, 0, 0, 34, 0, 0,
      3, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      102, 105, 108, 101, 46, 116, 120, 116, 0,
      68, 69, 83, 67, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      71, 69, 79, 66, 0, 0, 0, 35, 0, 0,
      3, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      102, 105, 108, 101, 46, 116, 120, 116, 0,
      68, 69, 83, 67, 50, 0,
      9, 10, 11, 12, 13, 14, 15, 16,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write ufid frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'UFID',
      value: {
        ownerId: 'github',
        id: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 58,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      85, 70, 73, 68, 0, 0, 0, 15, 0, 0,
      103, 105, 116, 104, 117, 98, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write multiple ufid frame v2.3', function () {
    const mp3tag = new MP3Tag(v23Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'UFID',
      value: {
        ownerId: 'github',
        id: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    }, {
      id: 'UFID',
      value: {
        ownerId: 'github2',
        id: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 0b00100000, 0, 0, 0, 84,
      84, 65, 76, 66, 0, 0, 0, 15, 0, 0,
      1, 255, 254, 65, 0, 76, 0, 66, 0, 85, 0, 77, 0, 0, 0,
      85, 70, 73, 68, 0, 0, 0, 15, 0, 0,
      103, 105, 116, 104, 117, 98, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      85, 70, 73, 68, 0, 0, 0, 16, 0, 0,
      103, 105, 116, 104, 117, 98, 50, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(actual, expected)
  })

  it('Write ufid frame v2.4', function () {
    const mp3tag = new MP3Tag(v24Bytes.buffer, { padding: 8 })
    mp3tag.read()
    mp3tag.frames.push({
      id: 'UFID',
      value: {
        ownerId: 'github',
        id: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    })

    mp3tag.save()
    const actual = new Uint8Array(mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 4, 0, 0b00100000, 0, 0, 0, 50,
      84, 65, 76, 66, 0, 0, 0, 7, 0, 0,
      3, 65, 76, 66, 85, 77, 0,
      85, 70, 73, 68, 0, 0, 0, 15, 0, 0,
      103, 105, 116, 104, 117, 98, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      0, 0, 0, 0, 0, 0, 0, 0,
      255, 251, 176, 0, 0
    ])

    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(actual, expected)
  })
})
