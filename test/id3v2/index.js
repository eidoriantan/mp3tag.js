
import MP3Tag from '../../src/mp3tag.mjs'
import assert from 'assert'

import { bytes } from '../globals.js'

describe('ID3v2', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read({ id3v1: false })
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.mp3tag.tags, {
      title: 'title',
      artist: '',
      album: '',
      year: '',
      comment: '',
      track: '',
      genre: '',
      v2Version: [3, 0],
      v2Size: 25,
      v2Flags: {
        unsynchronisation: false,
        extendedHeader: false,
        experimentalIndicator: false
      },
      TIT2: 'title'
    })
  })

  it('Validate data', function () {
    this.mp3tag.tags.TIT2 = 'NEWLINE\r\n'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false }
    })

    assert.throws(() => {
      if (this.mp3tag.errorCode > -1) throw new Error(this.mp3tag.error)
    }, {
      name: 'Error',
      message: this.mp3tag.error
    })
  })

  it('Transform data', function () {
    this.mp3tag.tags.TYER = '2020'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false },
      id3v2: { unsynch: false, version: 4 }
    })
    this.mp3tag.read()

    assert.deepStrictEqual(this.mp3tag.tags, {
      title: 'title',
      artist: '',
      album: '',
      year: '2020',
      comment: '',
      track: '',
      genre: '',
      v2Version: [4, 0],
      v2Size: 33,
      v2Flags: {
        unsynchronisation: false,
        extendedHeader: false,
        footerPresent: false,
        experimentalIndicator: false
      },
      TIT2: 'title',
      TDRC: '2020'
    })
  })

  it('Write data', function () {
    this.mp3tag.tags.TIT2 = 'NEW TITLE'
    this.mp3tag.tags.title = 'IGNORED'
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false },
      id3v2: { unsynch: false }
    })
    this.mp3tag.read()

    assert.deepStrictEqual(this.mp3tag.tags, {
      title: 'NEW TITLE',
      artist: '',
      album: '',
      year: '',
      comment: '',
      track: '',
      genre: '',
      v2Version: [3, 0],
      v2Size: 33,
      v2Flags: {
        unsynchronisation: false,
        extendedHeader: false,
        experimentalIndicator: false
      },
      TIT2: 'NEW TITLE'
    })
  })

  it('Write data (unsynched)', function () {
    const geob = {
      format: 'application/octet-stream',
      filename: 'file.bin',
      description: 'TEST',
      object: [255, 254, 1, 2, 255, 0]
    }

    this.mp3tag.tags.title = ''
    this.mp3tag.tags.TIT2 = ''
    this.mp3tag.tags.GEOB = [geob]
    this.mp3tag.save({
      strict: true,
      id3v1: { include: false },
      id3v2: { padding: 0 }
    })
    this.mp3tag.read()

    assert.deepStrictEqual(this.mp3tag.tags, {
      title: '',
      artist: '',
      album: '',
      year: '',
      comment: '',
      track: '',
      genre: '',
      v2Version: [3, 0],
      v2Size: 78,
      v2Flags: {
        unsynchronisation: true,
        extendedHeader: false,
        experimentalIndicator: false
      },
      GEOB: [geob]
    })

    const actual = new Uint8Array(this.mp3tag.buffer)
    const expected = new Uint8Array([
      73, 68, 51, 3, 0, 128, 0, 0, 0, 78,
      71, 69, 79, 66, 0, 0, 0, 68, 0, 0,
      1, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 111, 99, 116,
      101, 116, 45, 115, 116, 114, 101, 97, 109, 0,
      255, 0, 254, 102, 0, 105, 0, 108, 0, 101, 0, 46, 0, 98, 0, 105, 0, 110, 0,
      0, 0, 255, 0, 254, 84, 0, 69, 0, 83, 0, 84, 0, 0, 0,
      255, 0, 254, 1, 2, 255, 0, 0,
      255, 251, 224, 0, 0, 0, 0, 0, 170, 170, 170, 170, 170, 170
    ])

    assert.deepStrictEqual(actual, expected)
  })
})
