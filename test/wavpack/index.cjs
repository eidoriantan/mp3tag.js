/* eslint-env mocha */
const assert = require('assert')
const MP3Tag = require('../../dist/mp3tag.js')

/**
 * Helper to create a minimal WavPack file with optional ID3v2 prepended
 * WavPack magic: 'wvpk' (0x7776706B)
 */
function createWavPack (options = {}) {
  const { id3Data = null } = options

  // Minimal WavPack block header (32 bytes)
  const wpData = new Uint8Array([
    0x77, 0x76, 0x70, 0x6B, // 'wvpk'
    0x20, 0x00, 0x00, 0x00, // block size (32 bytes total - 8 = 24)
    0x10, 0x04, // version
    0x00, // track number
    0x00, // index number
    0x00, 0x00, 0x00, 0x00, // total samples
    0x00, 0x00, 0x00, 0x00, // block index
    0x00, 0x00, 0x00, 0x00, // block samples
    0x04, 0x40, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // CRC
  ])

  if (id3Data) {
    const result = new Uint8Array(id3Data.length + wpData.length)
    result.set(id3Data, 0)
    result.set(wpData, id3Data.length)
    return Buffer.from(result)
  }

  return Buffer.from(wpData)
}

function createID3v2Tag (title = 'Test Title') {
  const titleBytes = Buffer.from(title, 'utf8')
  const frameSize = 1 + titleBytes.length

  const header = new Uint8Array([
    0x49, 0x44, 0x33, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ])

  const frame = new Uint8Array(10 + frameSize)
  frame[0] = 0x54; frame[1] = 0x49; frame[2] = 0x54; frame[3] = 0x32
  frame[4] = (frameSize >> 24) & 0xFF
  frame[5] = (frameSize >> 16) & 0xFF
  frame[6] = (frameSize >> 8) & 0xFF
  frame[7] = frameSize & 0xFF
  frame[8] = 0x00; frame[9] = 0x00
  frame[10] = 0x00
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

describe('WavPack', function () {
  describe('WavPack Detection', function () {
    it('Detects WavPack container', function () {
      const buffer = createWavPack()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ wavpack: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Detects WavPack with prepended ID3v2', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWavPack({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ wavpack: true })
      assert.strictEqual(mp3tag.error, '')
    })
  })

  describe('Reading ID3 from WavPack', function () {
    it('Reads ID3v2 tags from prepended tag', function () {
      const id3Data = createID3v2Tag('WavPack Test Song')
      const buffer = createWavPack({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wavpack: true })

      assert.strictEqual(mp3tag.error, '')
      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'WavPack Test Song')
    })

    it('Returns empty tags when no ID3v2 exists', function () {
      const buffer = createWavPack()
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wavpack: true })

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Contains WavPack-specific details', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWavPack({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wavpack: true })

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.wavpack)
      assert.strictEqual(tags.v2Details.wavpack.format, 'WavPack')
    })
  })

  describe('Writing ID3 to WavPack', function () {
    it('Writes ID3v2 tags to WavPack without existing ID3', function () {
      const buffer = createWavPack()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'New Title', TPE1: 'New Artist' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ wavpack: true })
      assert.strictEqual(tags.v2.TIT2, 'New Title')
      assert.strictEqual(tags.v2.TPE1, 'New Artist')
    })

    it('Replaces existing ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Old Title')
      const buffer = createWavPack({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags.v2.TIT2 = 'Updated Title'
      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ wavpack: true })
      assert.strictEqual(tags.v2.TIT2, 'Updated Title')
    })

    it('Preserves audio data after ID3v2', function () {
      const buffer = createWavPack()
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
      assert.strictEqual(audioBuffer[0], 0x77) // 'w'
      assert.strictEqual(audioBuffer[1], 0x76) // 'v'
      assert.strictEqual(audioBuffer[2], 0x70) // 'p'
      assert.strictEqual(audioBuffer[3], 0x6B) // 'k'
      assert.strictEqual(audioBuffer.length, originalAudioSize)
    })
  })

  describe('WavPack Audio Buffer', function () {
    it('Extracts audio without ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWavPack({ id3Data })
      const audioBuffer = MP3Tag.getAudioBuffer(buffer)

      assert.strictEqual(audioBuffer[0], 0x77) // 'w'
      assert.strictEqual(audioBuffer[1], 0x76) // 'v'
      assert.strictEqual(audioBuffer[2], 0x70) // 'p'
      assert.strictEqual(audioBuffer[3], 0x6B) // 'k'
    })
  })

  describe('Convenience Properties', function () {
    it('Title getter/setter works with WavPack', function () {
      const id3Data = createID3v2Tag('Original')
      const buffer = createWavPack({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wavpack: true })

      assert.strictEqual(tags.title, 'Original')
      tags.title = 'Modified'
      assert.strictEqual(tags.v2.TIT2, 'Modified')
    })
  })

  describe('Edge Cases', function () {
    it('Handles wavpack option set to false', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWavPack({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wavpack: false, id3v2: true })

      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'Test')
    })

    it('Throws error when writing without v2 tags', function () {
      const buffer = createWavPack()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {}
      mp3tag.save({ id3v2: { include: true } })
      assert.ok(mp3tag.error.includes('No ID3v2 tags to write'))
    })
  })
})
