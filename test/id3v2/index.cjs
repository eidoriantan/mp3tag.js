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

    it('v2.3 unsynchronisation is applied at tag level (§5)', function () {
      // Regression test: previously the v2.3 writer unsynchronised each
      // frame body individually AND set the tag-level unsync flag. That
      // produced tags that were accidentally self-readable but violated
      // ID3v2.3 §5 — which defines unsync as a TAG-level operation over
      // the whole frame stream — and could not be read by any compliant
      // v2.3 parser that un-unsyncs at tag level.
      //
      // The correct behaviour: frame bodies are stored raw; the entire
      // concatenated frame stream (headers + bodies) is unsynchronised
      // once; the tag-level flag signals the reader to reverse it before
      // parsing.
      this.mp3tag.tags.v2.GEOB = [{
        format: 'application/octet-stream',
        filename: 'file.bin',
        description: 'TEST',
        object: [0xff, 0xfe, 0x01, 0x02, 0xff, 0x00, 0xff, 0xaa]
      }]
      this.mp3tag.save({
        strict: true,
        id3v2: { version: 3, unsynch: true, padding: 0 }
      })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      const buf = new Uint8Array(this.mp3tag.buffer)
      assert.strictEqual(buf[3], 3, 'major version')
      assert.strictEqual(buf[5] & 0x80, 0x80, 'tag-level unsync flag set')

      // The decisive on-disk assertion. A compliant v2.3 writer stores
      // the frame BODY raw (not per-frame unsynched), so the GEOB frame
      // size field in the header must equal the raw body size (49 bytes
      // for this fixture). The buggy writer stored an already-unsynched
      // body and declared its unsynched size (51 bytes: two 0x00 stuff
      // bytes inserted after 0xFF in the object). We find GEOB in the
      // tag-level un-unsynched stream and inspect its declared size.
      const size = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) |
                   ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f)
      const frameArea = Array.from(buf.slice(10, 10 + size))
      const synched = []
      for (let i = 0; i < frameArea.length; i++) {
        synched.push(frameArea[i])
        if (frameArea[i] === 0xff && frameArea[i + 1] === 0x00) i++
      }
      const geobAt = synched.findIndex((_, i) =>
        synched[i] === 0x47 && synched[i + 1] === 0x45 &&
        synched[i + 2] === 0x4f && synched[i + 3] === 0x42)
      assert.ok(geobAt >= 0, 'GEOB header found in un-unsynched stream')
      const declaredSize = (synched[geobAt + 4] << 24) |
                           (synched[geobAt + 5] << 16) |
                           (synched[geobAt + 6] << 8) |
                            synched[geobAt + 7]
      const rawBodySize =
        1 + // encoding byte
        ('application/octet-stream\0'.length) +
        ('file.bin\0'.length) +
        ('TEST\0'.length) +
        8 // object
      assert.strictEqual(declaredSize, rawBodySize,
        'GEOB size field must equal raw body length (§3.3), not unsynched length')

      // And the full round-trip still works.
      this.mp3tag.read()
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)
      assert.deepStrictEqual(this.mp3tag.tags.v2.GEOB, [{
        format: 'application/octet-stream',
        filename: 'file.bin',
        description: 'TEST',
        object: [0xff, 0xfe, 0x01, 0x02, 0xff, 0x00, 0xff, 0xaa]
      }])
    })

    it('Honors the per-frame unsynchronisation flag in ID3v2.4 (§4.1.2)', function () {
      // Companion to the v2.3 tag-level fix. The same decodeFrame branch
      // that ignored tag-level un-unsync for v2.3 also ignored the v2.4
      // per-frame unsync flag, because `version === 4` on an array is
      // always false. After the refactor in this commit, decodeFrame's
      // unsync path is driven solely by `frame.flags.unsynchronisation`
      // for v2.4 — this test guards that path.
      //
      // We write a v2.4 tag with unsync enabled, then clear the tag-level
      // unsync bit in the resulting buffer to simulate a standards-
      // compliant writer. The reader must still decode the per-frame flag
      // and un-unsynchronise the data.
      const object = [0xff, 0xfe, 0x01, 0x02, 0xff, 0x00, 0xff, 0xaa]
      this.mp3tag.tags.v2.GEOB = [{
        format: 'application/octet-stream',
        filename: 'file.bin',
        description: 'TEST',
        object
      }]
      this.mp3tag.save({
        strict: true,
        id3v2: { version: 4, unsynch: true, padding: 0 }
      })
      if (this.mp3tag.error !== '') throw new Error(this.mp3tag.error)

      // Clear the tag-level unsync flag (bit 7 of byte 5 in ID3 header)
      // so the reader MUST consult the per-frame flag to decode correctly.
      const buf = new Uint8Array(this.mp3tag.buffer)
      assert.strictEqual(buf[5] & 0x80, 0x80, 'tag-level unsync bit set by writer')
      buf[5] &= 0x7f

      const mp3 = new MP3Tag(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
      mp3.read({ id3v1: false })
      if (mp3.error !== '') throw new Error(mp3.error)

      assert.strictEqual(mp3.tags.v2Details.version[0], 4)
      assert.deepStrictEqual(mp3.tags.v2.GEOB, [{
        format: 'application/octet-stream',
        filename: 'file.bin',
        description: 'TEST',
        object
      }])
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
