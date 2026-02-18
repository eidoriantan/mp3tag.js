/* eslint-env mocha */
const assert = require('assert')
const MP3Tag = require('../../dist/mp3tag.js')

/**
 * Helper to create a minimal OGG file with optional ID3v2 prepended
 * OGG magic: 'OggS' (0x4F676753)
 */
function createOGG (options = {}) {
  const { id3Data = null } = options

  // Minimal OGG page header (27 bytes base + segment table + payload)
  const oggData = new Uint8Array([
    0x4F, 0x67, 0x67, 0x53, // 'OggS'
    0x00, // stream structure version
    0x02, // header type flags (beginning of stream)
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // granule position
    0x01, 0x00, 0x00, 0x00, // stream serial number
    0x00, 0x00, 0x00, 0x00, // page sequence number
    0x00, 0x00, 0x00, 0x00, // CRC checksum (dummy)
    0x01, // number of segments
    0x08, // segment table (one segment, 8 bytes)
    // 8 bytes of payload
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ])

  if (id3Data) {
    const result = new Uint8Array(id3Data.length + oggData.length)
    result.set(id3Data, 0)
    result.set(oggData, id3Data.length)
    return Buffer.from(result)
  }

  return Buffer.from(oggData)
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

describe('OGG', function () {
  describe('OGG Detection', function () {
    it('Detects OGG container', function () {
      const buffer = createOGG()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ ogg: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Detects OGG with prepended ID3v2', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createOGG({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ ogg: true })
      assert.strictEqual(mp3tag.error, '')
    })
  })

  describe('Reading ID3 from OGG', function () {
    it('Reads ID3v2 tags from prepended tag', function () {
      const id3Data = createID3v2Tag('OGG Test Song')
      const buffer = createOGG({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ ogg: true })

      assert.strictEqual(mp3tag.error, '')
      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'OGG Test Song')
    })

    it('Returns empty tags when no ID3v2 exists', function () {
      const buffer = createOGG()
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ ogg: true })

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Contains OGG-specific details', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createOGG({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ ogg: true })

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.ogg)
      assert.strictEqual(tags.v2Details.ogg.format, 'OGG')
    })
  })

  describe('Writing ID3 to OGG', function () {
    it('Writes ID3v2 tags to OGG without existing ID3', function () {
      const buffer = createOGG()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'New Title', TPE1: 'New Artist' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ ogg: true })
      assert.strictEqual(tags.v2.TIT2, 'New Title')
      assert.strictEqual(tags.v2.TPE1, 'New Artist')
    })

    it('Replaces existing ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Old Title')
      const buffer = createOGG({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags.v2.TIT2 = 'Updated Title'
      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ ogg: true })
      assert.strictEqual(tags.v2.TIT2, 'Updated Title')
    })

    it('Preserves audio data after ID3v2', function () {
      const buffer = createOGG()
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
      assert.strictEqual(audioBuffer[0], 0x4F) // 'O'
      assert.strictEqual(audioBuffer[1], 0x67) // 'g'
      assert.strictEqual(audioBuffer[2], 0x67) // 'g'
      assert.strictEqual(audioBuffer[3], 0x53) // 'S'
      assert.strictEqual(audioBuffer.length, originalAudioSize)
    })
  })

  describe('OGG Audio Buffer', function () {
    it('Extracts audio without ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createOGG({ id3Data })
      const audioBuffer = MP3Tag.getAudioBuffer(buffer)

      assert.strictEqual(audioBuffer[0], 0x4F) // 'O'
      assert.strictEqual(audioBuffer[1], 0x67) // 'g'
      assert.strictEqual(audioBuffer[2], 0x67) // 'g'
      assert.strictEqual(audioBuffer[3], 0x53) // 'S'
    })
  })

  describe('Convenience Properties', function () {
    it('Title getter/setter works with OGG', function () {
      const id3Data = createID3v2Tag('Original')
      const buffer = createOGG({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ ogg: true })

      assert.strictEqual(tags.title, 'Original')
      tags.title = 'Modified'
      assert.strictEqual(tags.v2.TIT2, 'Modified')
    })
  })

  describe('Edge Cases', function () {
    it('Handles ogg option set to false', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createOGG({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ ogg: false, id3v2: true })

      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'Test')
    })

    it('Throws error when writing without v2 tags', function () {
      const buffer = createOGG()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {}
      mp3tag.save({ id3v2: { include: true } })
      assert.ok(mp3tag.error.includes('No ID3v2 tags to write'))
    })
  })
})
