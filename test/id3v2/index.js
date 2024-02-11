
/* eslint-env mocha */

const assert = require('assert')

const MP3Tag = require('../../dist/mp3tag.js')
const { bytes, bytesUnsupported } = require('../globals.js')

describe('ID3v2', function () {
  describe('MP3 with supported frames', function () {
    beforeEach(function () {
      this.mp3tag = new MP3Tag(bytes.buffer)
      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.errorCode > -1) throw this.mp3tag.error
    })

    it('Read data', function () {
      assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
      assert.deepStrictEqual(this.mp3tag.tags.v2.TIT2, 'title')
      assert.deepStrictEqual(this.mp3tag.tags.title, 'title')
      assert.deepStrictEqual(this.mp3tag.tags.artist, '')
      assert.deepStrictEqual(this.mp3tag.tags.album, '')
      assert.deepStrictEqual(this.mp3tag.tags.year, '')
      assert.deepStrictEqual(this.mp3tag.tags.comment, '')
      assert.deepStrictEqual(this.mp3tag.tags.track, '')
      assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    })

    it('Validate data', function () {
      this.mp3tag.tags.v2.TIT2 = 'NEWLINE\r\n'
      this.mp3tag.save({
        strict: true,
        id3v1: { include: false }
      })

      assert.throws(() => {
        const error = this.mp3tag.error
        if (error !== '') throw new Error(error)
      }, {
        name: 'Error',
        message: this.mp3tag.error
      })
    })

    it('Write data', function () {
      this.mp3tag.tags.title = 'NEW TITLE'
      this.mp3tag.tags.artist = 'NEW ARTIST'
      this.mp3tag.save({ strict: true })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
      assert.deepStrictEqual(this.mp3tag.tags.v2.TIT2, 'NEW TITLE')
      assert.deepStrictEqual(this.mp3tag.tags.title, 'NEW TITLE')
      assert.deepStrictEqual(this.mp3tag.tags.artist, 'NEW ARTIST')
      assert.deepStrictEqual(this.mp3tag.tags.album, '')
      assert.deepStrictEqual(this.mp3tag.tags.year, '')
      assert.deepStrictEqual(this.mp3tag.tags.comment, '')
      assert.deepStrictEqual(this.mp3tag.tags.track, '')
      assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    })

    it('Write complex single tags', function () {
      this.mp3tag.tags.v2.SYTC = {
        format: 2,
        data: [
          { bpm: 0, time: 200 },
          { bpm: 130, time: 10000 },
          { bpm: 260, time: 2000000 }
        ]
      }
      this.mp3tag.tags.v2.ETCO = {
        format: 2,
        data: [
          { event: 1, time: 200 },
          { event: 2, time: 10000 },
          { event: 3, time: 2000000 }
        ]
      }
      this.mp3tag.save({ strict: true })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2.SYTC, {
        format: 2,
        data: [
          { bpm: 0, time: 200 },
          { bpm: 130, time: 10000 },
          { bpm: 260, time: 2000000 }
        ]
      })
      assert.deepStrictEqual(this.mp3tag.tags.v2.ETCO, {
        format: 2,
        data: [
          { event: 1, time: 200 },
          { event: 2, time: 10000 },
          { event: 3, time: 2000000 }
        ]
      })
    })

    it('Write complex multi tag', function () {
      this.mp3tag.tags.v2.SYLT = [
        {
          format: 2,
          type: 3,
          descriptor: 'DESCRIPTOR',
          language: 'eng',
          data: [
            { line: 'LINE1', time: 200 },
            { line: 'LINE2', time: 10000 },
            { line: 'LINE3', time: 2000000 }
          ]
        },
        {
          format: 2,
          type: 4,
          descriptor: 'DESCRIPTOR2',
          language: 'eng',
          lyrics: '[0:00.200] LINE4\n[0:10.000] LINE5\n[33:20.000] LINE6\n'
        }
      ]
      this.mp3tag.save({ strict: true })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2.SYLT, [
        {
          format: 2,
          type: 3,
          descriptor: 'DESCRIPTOR',
          language: 'eng',
          data: [
            { line: 'LINE1', time: 200 },
            { line: 'LINE2', time: 10000 },
            { line: 'LINE3', time: 2000000 }
          ],
          lyrics: '[0:00.200] LINE1\n[0:10.000] LINE2\n[33:20.000] LINE3\n'
        },
        {
          format: 2,
          type: 4,
          descriptor: 'DESCRIPTOR2',
          language: 'eng',
          data: [
            { line: 'LINE4', time: 200 },
            { line: 'LINE5', time: 10000 },
            { line: 'LINE6', time: 2000000 }
          ],
          lyrics: '[0:00.200] LINE4\n[0:10.000] LINE5\n[33:20.000] LINE6\n'
        }
      ])
    })

    it('Write data (unsynched)', function () {
      const geob = {
        format: 'application/octet-stream',
        filename: 'file.bin',
        description: 'TEST',
        object: [255, 254, 1, 2, 255, 0]
      }

      this.mp3tag.tags.title = ''
      this.mp3tag.tags.v2.GEOB = [geob]
      this.mp3tag.save({
        strict: true,
        id3v2: { unsynch: true, padding: 0 }
      })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
      assert.deepStrictEqual(this.mp3tag.tags.title, '')
      assert.deepStrictEqual(this.mp3tag.tags.artist, '')
      assert.deepStrictEqual(this.mp3tag.tags.album, '')
      assert.deepStrictEqual(this.mp3tag.tags.year, '')
      assert.deepStrictEqual(this.mp3tag.tags.comment, '')
      assert.deepStrictEqual(this.mp3tag.tags.track, '')
      assert.deepStrictEqual(this.mp3tag.tags.genre, '')
      assert.deepStrictEqual(this.mp3tag.tags.v2.GEOB, [geob])
    })
  })

  describe('MP3 with unsupported frames', function () {
    beforeEach(function () {
      this.mp3tag = new MP3Tag(bytesUnsupported.buffer)
      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.errorCode > -1) throw this.mp3tag.error
    })

    it('Throws error with unsupported frames', function () {
      this.mp3tag.save({
        strict: true,
        id3v1: { include: false },
        id3v2: {
          include: true,
          version: 4,
          skipUnsupported: false
        }
      });

      assert.throws(() => {
        const error = this.mp3tag.error
        if (error !== '') throw new Error(error)
      }, {
        name: 'Error',
        message: this.mp3tag.error
      })
    })

    it('Skips unsupported frames', function () {
      this.mp3tag.save({
        strict: true,
        id3v1: { include: false },
        id3v2: {
          include: true,
          version: 4
        }
      });

      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.errorCode > -1) throw this.mp3tag.error

      assert.strictEqual(this.mp3tag.tags.v2.TDRC, '2024')
      assert.strictEqual(this.mp3tag.tags.v2.TYER, undefined)
    })
  })
})
