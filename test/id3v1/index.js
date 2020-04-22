
import MP3Tag from '../../src/mp3tag.mjs'
import assert from 'assert'

import { bytes } from '../globals.js'

describe('ID3v1', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read({ id3v2: false })
  })

  it('Read data', function () {
    assert.deepStrictEqual(this.mp3tag.tags, {
      v1Version: 1,
      v1Size: 128,
      title: 'TITLE',
      artist: 'ARTIST',
      album: 'ALBUM',
      year: '2020',
      comment: 'COMMENT',
      track: '1',
      genre: 'Other'
    })
  })

  it('Validate data', function () {
    this.mp3tag.tags.title = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    this.mp3tag.save({
      strict: true,
      id3v2: { include: false }
    })

    assert.throws(() => {
      if (this.mp3tag.errorCode > -1) throw new Error(this.mp3tag.error)
    }, {
      name: 'Error',
      message: this.mp3tag.error
    })
  })

  it('Write data', function () {
    this.mp3tag.tags.title = 'NEW TITLE'
    this.mp3tag.save({
      strict: true,
      id3v2: { include: false }
    })
    this.mp3tag.read()

    assert.deepStrictEqual(this.mp3tag.tags, {
      v1Version: 1,
      v1Size: 128,
      title: 'NEW TITLE',
      artist: 'ARTIST',
      album: 'ALBUM',
      year: '2020',
      comment: 'COMMENT',
      track: '1',
      genre: 'Other'
    })
  })
})
