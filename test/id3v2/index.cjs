/* eslint-env mocha */

const assert = require('assert')

const MP3Tag = require('../../dist/mp3tag.js')
const { bytes, bytesInvalid, bytesUnsupported, bytesv2 } = require('../globals.cjs')

describe('ID3v2', function () {
  describe('ID3v2.2', function () {
    beforeEach(function () {
      this.mp3tag = new MP3Tag(bytesv2.buffer)
      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)
    })

    it('Read data', function () {
      assert.deepStrictEqual(this.mp3tag.tags.v2.TT2, 'title')
      assert.deepStrictEqual(this.mp3tag.tags.v2.TP1, 'artist')
      assert.deepStrictEqual(this.mp3tag.tags.title, 'title')
    })

    it('Validate data', function () {
      this.mp3tag.tags.v2.TT2 = 'NEWLINE\r\n'
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
      this.mp3tag.tags.v2.TT2 = 'NEW TITLE'
      this.mp3tag.tags.artist = 'NEW ARTIST'
      this.mp3tag.save({ strict: true, id3v2: { padding: 0 } })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [2, 0])
      assert.deepStrictEqual(this.mp3tag.tags.v2.TT2, 'NEW TITLE')
      assert.deepStrictEqual(this.mp3tag.tags.title, 'NEW TITLE')
      assert.deepStrictEqual(this.mp3tag.tags.artist, 'NEW ARTIST')
      assert.deepStrictEqual(this.mp3tag.tags.album, '')
      assert.deepStrictEqual(this.mp3tag.tags.year, '')
      assert.deepStrictEqual(this.mp3tag.tags.comment, '')
      assert.deepStrictEqual(this.mp3tag.tags.track, '')
      assert.deepStrictEqual(this.mp3tag.tags.genre, '')
    })

    it('Write data with different encodings', function () {
      this.mp3tag.tags.v2.TT2 = 'NEW TITLE'
      this.mp3tag.tags.artist = 'NEW ARTIST'
      this.mp3tag.save({
        strict: true,
        encoding: 'utf-16',
        id3v2: {
          padding: 0
        }
      })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      const bytes = new Uint8Array(this.mp3tag.buffer)
      const titleBytes = bytes.subarray(16, 39)
      const expectedTitle = new Uint8Array([
        1, 255, 254, 78, 0, 69, 0, 87,
        0, 32, 0, 84, 0, 73, 0, 84,
        0, 76, 0, 69, 0, 0, 0
      ])

      assert.deepStrictEqual(titleBytes, expectedTitle)
    })
  })

  describe('MP3 with supported frames', function () {
    beforeEach(function () {
      this.mp3tag = new MP3Tag(bytes.buffer)
      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)
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

    it('Writes RVA2 volume adjustment in big-endian (§4.11)', function () {
      // Regression test: previously the writer used `new Int16Array([v]).buffer`
      // which is host-byte-order (little-endian on x86), producing corrupted
      // output on every platform. Read path used `getInt16(offset, true)`,
      // so round-trips self-matched but no other v2.4 reader could decode.
      // This test asserts the actual bytes on disk are big-endian per spec.
      this.mp3tag.tags.v2.RVA2 = [{
        identification: 'test',
        channels: [
          { type: 1, volumeadjust: 0x1234, bitspeak: 0, peakvolume: [] },
          { type: 2, volumeadjust: -1, bitspeak: 0, peakvolume: [] }
        ]
      }]
      this.mp3tag.save({ id3v2: { version: 4 } })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      // Inspect raw bytes after save. Find "RVA2" in the buffer and check
      // the volume-adjust bytes for channel 1 (type=1) are 0x12 0x34 (BE).
      const buf = new Uint8Array(this.mp3tag.buffer)
      let offset = -1
      for (let i = 0; i + 4 <= buf.length; i++) {
        if (buf[i] === 0x52 && buf[i + 1] === 0x56 && buf[i + 2] === 0x41 && buf[i + 3] === 0x32) {
          offset = i
          break
        }
      }
      if (offset < 0) throw new Error('RVA2 frame not found in saved buffer')
      // RVA2 frame layout: 4-byte ID + 4-byte size + 2-byte flags
      // + identification string "test" + '\0' + channel data.
      // Channel data = type(1) + volumeadjust(2) + bitspeak(1) + peakvolume(0).
      // Find the identification terminator.
      const dataStart = offset + 10 + 'test'.length + 1
      // Channel 1: positive value 0x1234 → bytes 0x12 0x34 (BE).
      assert.strictEqual(buf[dataStart], 1, 'first channel type')
      assert.strictEqual(buf[dataStart + 1], 0x12, 'channel 1 volume high byte (BE)')
      assert.strictEqual(buf[dataStart + 2], 0x34, 'channel 1 volume low byte (BE)')
      // Channel 2: negative value -1 → two's-complement 0xFFFF → 0xFF 0xFF.
      // Crucial second assertion: a naive implementation that only swapped
      // bytes for positive values would pass the 0x1234 check but fail
      // here, because sign-extension and masking must also be correct.
      assert.strictEqual(buf[dataStart + 4], 2, 'second channel type')
      assert.strictEqual(buf[dataStart + 5], 0xff, 'channel 2 volume high byte (BE, -1)')
      assert.strictEqual(buf[dataStart + 6], 0xff, 'channel 2 volume low byte (BE, -1)')

      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)
      assert.deepStrictEqual(this.mp3tag.tags.v2.RVA2, [{
        identification: 'test',
        channels: [
          { type: 1, volumeadjust: 0x1234, bitspeak: 0, peakvolume: [] },
          { type: 2, volumeadjust: -1, bitspeak: 0, peakvolume: [] }
        ]
      }])
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

  describe('MP3 with invalid frames', function () {
    beforeEach(function () {
      this.mp3tag = new MP3Tag(bytesInvalid.buffer)
      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)
    })

    it('Throws error with invalid frames', function () {
      this.mp3tag.save({
        strict: true,
        id3v1: { include: false },
        id3v2: {
          include: true,
          version: 4,
          unsupported: true
        }
      })

      assert.throws(() => {
        const error = this.mp3tag.error
        if (error !== '') throw new Error(error)
      }, {
        name: 'Error',
        message: this.mp3tag.error
      })
    })

    it('Skips invalid frames', function () {
      this.mp3tag.save({
        strict: true,
        id3v1: { include: false },
        id3v2: {
          include: true,
          version: 4,
          unsupported: false
        }
      })

      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)

      assert.strictEqual(this.mp3tag.tags.v2.TDRC, '2024')
      assert.strictEqual(this.mp3tag.tags.v2.TYER, undefined)
    })
  })

  describe('MP3 with unsupported frames', function () {
    beforeEach(function () {
      this.mp3tag = new MP3Tag(bytesUnsupported.buffer)
    })

    it('Read unsupported frames as an array', function () {
      this.mp3tag.read({
        id3v1: false,
        unsupported: true
      })

      if (this.mp3tag.error) throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2Details.version, [3, 0])
      assert.deepStrictEqual(this.mp3tag.tags.v2.TIT2, 'title')
      assert.deepStrictEqual(this.mp3tag.tags.v2.UNSU, [
        [1, 2, 3, 4, 5]
      ])
    })

    it('Write unsupported frames', function () {
      this.mp3tag.read({
        id3v1: false,
        unsupported: true
      })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)

      this.mp3tag.save({
        id3v2: { unsupported: true }
      })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)

      this.mp3tag.read({
        id3v1: false,
        unsupported: true
      })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2.UNSU, [
        [1, 2, 3, 4, 5]
      ])
    })

    it('Skip unsupported frames', function () {
      this.mp3tag.read({ id3v1: false })
      if (this.mp3tag.error) throw new Error(this.mp3tag.error)

      assert.deepStrictEqual(this.mp3tag.tags.v2.UNSU, undefined)
    })
  })
})
