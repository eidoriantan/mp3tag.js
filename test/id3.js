
import MP3Tag from '../src/mp3tag.mjs'
import assert from 'assert'

import { bytes } from './globals.js'

describe('ID3', function () {
  beforeEach(function () {
    this.mp3tag = new MP3Tag(bytes.buffer)
    this.mp3tag.read()
  })

  it('Read ID3v1 and ID3v2', function () {
    const actual = this.mp3tag.tags
    const expected = {
      v1Version: 1,
      v1Size: 128,
      title: 'title',
      artist: 'ARTIST',
      album: 'ALBUM',
      year: '2020',
      comment: 'COMMENT',
      track: '1',
      genre: 'Other',
      v2Version: [3, 0],
      v2Size: 25,
      v2Flags: {
        unsynchronisation: false,
        extendedHeader: false,
        experimentalIndicator: false
      },
      TIT2: 'title'
    }

    assert.deepStrictEqual(actual, expected)
  })

  it('Write ID3v1 and ID3v2', function () {
    this.mp3tag.save({ id3v2: { unsynch: false, padding: 0 } })
    this.mp3tag.read()

    const actual = this.mp3tag.tags
    const expected = {
      v1Version: 1,
      v1Size: 128,
      title: 'title',
      artist: 'ARTIST',
      album: 'ALBUM',
      year: '2020',
      comment: 'COMMENT',
      track: '1',
      genre: 'Other',
      v2Version: [3, 0],
      v2Size: 167,
      v2Flags: {
        unsynchronisation: false,
        extendedHeader: false,
        experimentalIndicator: false
      },
      TIT2: 'title',
      TPE1: 'ARTIST',
      TALB: 'ALBUM',
      TYER: '2020',
      COMM: [{
        language: 'eng',
        descriptor: '',
        text: 'COMMENT'
      }],
      TRCK: '1',
      TCON: 'Other'
    }

    assert.deepStrictEqual(actual, expected)
  })
})
