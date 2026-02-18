/* eslint-env mocha */
const assert = require('assert')
const MP3Tag = require('../../dist/mp3tag.js')

/**
 * Helper to create a minimal FLAC file with optional ID3v2 prepended
 * FLAC magic: 'fLaC' (0x664C6143)
 */
function createFLAC (options = {}) {
  const { id3Data = null } = options

  // Minimal FLAC data: magic + a STREAMINFO metadata block header + dummy data
  // STREAMINFO is block type 0, last-block flag set, length = 34
  const flacData = new Uint8Array([
    0x66, 0x4C, 0x61, 0x43, // 'fLaC'
    0x80, 0x00, 0x00, 0x22, // last metadata block, STREAMINFO, length=34
    // 34 bytes of dummy STREAMINFO
    0x00, 0x10, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x0A, 0xC4, 0x42, 0xF0, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00
  ])

  if (id3Data) {
    const result = new Uint8Array(id3Data.length + flacData.length)
    result.set(id3Data, 0)
    result.set(flacData, id3Data.length)
    return Buffer.from(result)
  }

  return Buffer.from(flacData)
}

function createID3v2Tag (title = 'Test Title') {
  const titleBytes = Buffer.from(title, 'utf8')
  const frameSize = 1 + titleBytes.length

  const header = new Uint8Array([
    0x49, 0x44, 0x33, // 'ID3'
    0x03, 0x00, // version 2.3
    0x00, // flags
    0x00, 0x00, 0x00, 0x00 // size (placeholder)
  ])

  const frame = new Uint8Array(10 + frameSize)
  frame[0] = 0x54; frame[1] = 0x49; frame[2] = 0x54; frame[3] = 0x32 // 'TIT2'
  frame[4] = (frameSize >> 24) & 0xFF
  frame[5] = (frameSize >> 16) & 0xFF
  frame[6] = (frameSize >> 8) & 0xFF
  frame[7] = frameSize & 0xFF
  frame[8] = 0x00; frame[9] = 0x00
  frame[10] = 0x00 // encoding: ISO-8859-1
  frame.set(titleBytes, 11)

  const tagSize = frame.length
  header[6] = (tagSize >> 21) & 0x7F
  header[7] = (tagSize >> 14) & 0x7F
  header[8] = (tagSize >> 7) & 0x7F
  header[9] = tagSize & 0x7F

  const result = new Uint8Array(header.length + frame.length)
  result.set(header, 0)
  result.set(frame, header.length)

  return result
}

describe('FLAC', function () {
  describe('FLAC Detection', function () {
    it('Detects FLAC container', function () {
      const buffer = createFLAC()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ flac: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Detects FLAC with prepended ID3v2', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createFLAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ flac: true })
      assert.strictEqual(mp3tag.error, '')
    })
  })

  describe('Reading ID3 from FLAC', function () {
    it('Reads ID3v2 tags from prepended tag', function () {
      const id3Data = createID3v2Tag('FLAC Test Song')
      const buffer = createFLAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ flac: true })

      assert.strictEqual(mp3tag.error, '')
      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'FLAC Test Song')
    })

    it('Returns empty tags when no ID3v2 exists', function () {
      const buffer = createFLAC()
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ flac: true })

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Contains FLAC-specific details', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createFLAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ flac: true })

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.flac)
      assert.strictEqual(tags.v2Details.flac.format, 'FLAC')
    })
  })

  describe('Writing ID3 to FLAC', function () {
    it('Writes ID3v2 tags to FLAC without existing ID3', function () {
      const buffer = createFLAC()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'New Title', TPE1: 'New Artist' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ flac: true })
      assert.strictEqual(tags.v2.TIT2, 'New Title')
      assert.strictEqual(tags.v2.TPE1, 'New Artist')
    })

    it('Replaces existing ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Old Title')
      const buffer = createFLAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags.v2.TIT2 = 'Updated Title'
      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ flac: true })
      assert.strictEqual(tags.v2.TIT2, 'Updated Title')
    })

    it('Preserves audio data after ID3v2', function () {
      const buffer = createFLAC()
      const originalAudioSize = buffer.length
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'Test' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })

      const mp3tag2 = new MP3Tag(newBuffer)
      const audioBuffer = mp3tag2.getAudio()
      // Audio should start with FLAC magic
      assert.strictEqual(audioBuffer[0], 0x66) // 'f'
      assert.strictEqual(audioBuffer[1], 0x4C) // 'L'
      assert.strictEqual(audioBuffer[2], 0x61) // 'a'
      assert.strictEqual(audioBuffer[3], 0x43) // 'C'
      assert.strictEqual(audioBuffer.length, originalAudioSize)
    })
  })

  describe('FLAC Audio Buffer', function () {
    it('Extracts audio without ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createFLAC({ id3Data })
      const audioBuffer = MP3Tag.getAudioBuffer(buffer)

      assert.strictEqual(audioBuffer[0], 0x66) // 'f'
      assert.strictEqual(audioBuffer[1], 0x4C) // 'L'
      assert.strictEqual(audioBuffer[2], 0x61) // 'a'
      assert.strictEqual(audioBuffer[3], 0x43) // 'C'
    })
  })

  describe('Convenience Properties', function () {
    it('Title getter/setter works with FLAC', function () {
      const id3Data = createID3v2Tag('Original')
      const buffer = createFLAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ flac: true })

      assert.strictEqual(tags.title, 'Original')
      tags.title = 'Modified'
      assert.strictEqual(tags.v2.TIT2, 'Modified')
    })
  })

  describe('Edge Cases', function () {
    it('Handles flac option set to false', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createFLAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ flac: false, id3v2: true })

      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'Test')
    })

    it('Throws error when writing without v2 tags', function () {
      const buffer = createFLAC()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {}
      mp3tag.save({ id3v2: { include: true } })
      assert.ok(mp3tag.error.includes('No ID3v2 tags to write'))
    })
  })
})
