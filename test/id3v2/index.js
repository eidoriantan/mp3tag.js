
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

  it('Write data', function () {
    this.mp3tag.tags.TIT2 = 'NEW TITLE'
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
})
