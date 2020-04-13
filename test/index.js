
import MP3Tag from '../src/mp3tag'
import BufferView from '../src/viewer'
import assert from 'assert'

describe('BufferView', function () {
  it('constructor', function () {
    const viewer = new BufferView([1, 2, 3, 4, 5])
    assert.deepStrictEqual(viewer.byteLength, 5)
  })

  it('getUint8()', function () {
    const uint8 = new Uint8Array([1, 2, 3, 4, 5])
    const viewer = new BufferView(uint8)

    assert.deepStrictEqual(viewer.getUint8(0), 1)
    assert.deepStrictEqual(viewer.getUint8(0, 2), [1, 2])
    assert.deepStrictEqual(viewer.getUint8(1), 2)
    assert.deepStrictEqual(viewer.getUint8(1, 2), [2, 3])
  })

  it('getUint16()', function () {
    const uint16 = new Uint16Array([256, 257, 258, 259, 260])
    const viewer = new BufferView(uint16)

    assert.deepStrictEqual(viewer.getUint16(0), 1)
    assert.deepStrictEqual(viewer.getUint16(0, 2, true), 256)
    assert.deepStrictEqual(viewer.getUint16(2, 2, true), 257)
    assert.deepStrictEqual(viewer.getUint16(2, 4, true), [257, 258])
  })

  it('Read UTF-8', function () {
    const uint8 = new Uint8Array([49, 48, 48, 229, 134, 134])
    const viewer = new BufferView(uint8)

    assert.deepStrictEqual(viewer.getString(0, 6, 'utf-8').string, '100円')
  })

  it('Read null-terminated string UTF-8', function () {
    const uint8 = new Uint8Array([49, 48, 48, 229, 134, 134, 0, 1, 2])
    const viewer = new BufferView(uint8)

    const cstring = viewer.getCString(0, 'utf-8')
    assert.deepStrictEqual(cstring.string, '100円')
    assert.deepStrictEqual(cstring.length, 7)
  })

  it('Read ASCII', function () {
    const uint8 = new Uint8Array([49, 48, 48, 48])
    const viewer = new BufferView(uint8)

    assert.deepStrictEqual(viewer.getString(0, 4, 'ascii').string, '1000')
  })

  it('Read null-terminated string ASCII', function () {
    const uint8 = new Uint8Array([49, 48, 48, 48, 0, 1, 2])
    const viewer = new BufferView(uint8)

    const cstring = viewer.getCString(0, 'ascii')
    assert.deepStrictEqual(cstring.string, '1000')
    assert.deepStrictEqual(cstring.length, 5)
  })

  it('Read UTF-16', function () {
    const uint8 = new Uint8Array([255, 254, 49, 0, 48, 0, 48, 0, 48, 0])
    const viewer = new BufferView(uint8)

    assert.deepStrictEqual(viewer.getString(0, 10, 'utf-16').string, '1000')
  })

  it('Read UTF-16', function () {
    const uint8 = new Uint8Array([254, 255, 0, 49, 0, 48, 0, 48, 0, 48])
    const viewer = new BufferView(uint8)

    assert.deepStrictEqual(viewer.getString(0, 10, 'utf-16').string, '1000')
  })

  it('Read null-terminated UTF-16', function () {
    const uint8 = new Uint8Array([255, 254, 49, 0, 48, 0, 48, 0, 0, 0, 1, 2])
    const viewer = new BufferView(uint8)

    const cstring = viewer.getCString(0, 'utf-16')
    assert.deepStrictEqual(cstring.string, '100')
    assert.deepStrictEqual(cstring.length, 10)
  })
})

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

    const taggers = ['id3v1', 'id3v2']
    if (success) taggers.forEach(tagger => require(`./taggers/${tagger}`))
  })
})
