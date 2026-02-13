/* eslint-env mocha */
const assert = require('assert')
const MP3Tag = require('../../dist/mp3tag.js')

/**
 * Helper to create a minimal AAC/ADTS file with optional ID3v2 prepended
 * ADTS structure:
 * - Optional ID3v2 tag at beginning
 * - ADTS frames, each starting with sync word 0xFFF (12 bits)
 * - ADTS header is 7 bytes (no CRC) or 9 bytes (with CRC)
 */
function createAAC (options = {}) {
  const { id3Data = null } = options

  // Minimal ADTS frame (7 byte header + some audio data)
  // ADTS header bits:
  // - syncword (12): 0xFFF
  // - ID (1): 0 = MPEG-4
  // - layer (2): 00 = always 0 for ADTS
  // - protection_absent (1): 1 = no CRC
  // - profile (2): 01 = AAC LC
  // - sampling_frequency_index (4): 0100 = 44100 Hz
  // - private_bit (1): 0
  // - channel_configuration (3): 010 = stereo
  // - original_copy (1): 0
  // - home (1): 0
  // - copyright_id_bit (1): 0
  // - copyright_id_start (1): 0
  // - aac_frame_length (13): depends on data
  // - adts_buffer_fullness (11): 0x7FF = VBR
  // - number_of_raw_data_blocks (2): 00 = 1 block

  // Frame with 16 bytes of audio data (7 header + 16 audio = 23 bytes)
  const frameLength = 23
  const adtsFrame = new Uint8Array([
    0xFF, // sync bits 0-7
    0xF1, // sync bits 8-11 (0xF), ID=0, layer=00, protection_absent=1
    0x50, // profile=01 (AAC LC), sampling=0100 (44100), private=0, channel MSB=0
    0x80 | ((frameLength >> 11) & 0x03), // channel LSB=10, original=0, home=0, frame_length bits 12-11
    (frameLength >> 3) & 0xFF, // frame_length bits 10-3
    ((frameLength & 0x07) << 5) | 0x1F, // frame_length bits 2-0, buffer_fullness bits 10-6
    0xFC, // buffer_fullness bits 5-0, num_blocks=00
    // 16 bytes of audio data (silence)
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ])

  if (id3Data) {
    // Prepend ID3v2 to ADTS
    const result = new Uint8Array(id3Data.length + adtsFrame.length)
    result.set(id3Data, 0)
    result.set(adtsFrame, id3Data.length)
    return Buffer.from(result)
  }

  return Buffer.from(adtsFrame)
}

/**
 * Create a minimal ID3v2.3 tag
 */
function createID3v2Tag (title = 'Test Title') {
  const titleBytes = Buffer.from(title, 'utf8')
  const frameSize = 1 + titleBytes.length // encoding byte + text

  // ID3v2.3 header (10 bytes)
  const header = new Uint8Array([
    0x49, 0x44, 0x33, // 'ID3'
    0x03, 0x00, // version 2.3
    0x00, // flags
    0x00, 0x00, 0x00, 0x00 // size (placeholder)
  ])

  // TIT2 frame
  const frame = new Uint8Array(10 + frameSize)
  frame[0] = 0x54 // 'T'
  frame[1] = 0x49 // 'I'
  frame[2] = 0x54 // 'T'
  frame[3] = 0x32 // '2'
  // Frame size (big-endian)
  frame[4] = (frameSize >> 24) & 0xFF
  frame[5] = (frameSize >> 16) & 0xFF
  frame[6] = (frameSize >> 8) & 0xFF
  frame[7] = frameSize & 0xFF
  frame[8] = 0x00 // flags
  frame[9] = 0x00 // flags
  frame[10] = 0x00 // encoding: ISO-8859-1
  frame.set(titleBytes, 11)

  // Update ID3 size (syncsafe)
  const tagSize = frame.length
  header[6] = (tagSize >> 21) & 0x7F
  header[7] = (tagSize >> 14) & 0x7F
  header[8] = (tagSize >> 7) & 0x7F
  header[9] = tagSize & 0x7F

  // Combine
  const result = new Uint8Array(header.length + frame.length)
  result.set(header, 0)
  result.set(frame, header.length)

  return result
}

describe('AAC', function () {
  describe('AAC Detection', function () {
    it('Detects AAC/ADTS container', function () {
      const buffer = createAAC()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ aac: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Detects AAC with prepended ID3v2', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createAAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ aac: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Does not detect MP3 as AAC', function () {
      // MP3 has layer bits = 01 (Layer III), AAC has layer bits = 00
      const mp3Buffer = Buffer.from([0xFF, 0xFB, 0xE0, 0x00]) // MP3 Layer III header
      const mp3tag = new MP3Tag(mp3Buffer)
      const tags = mp3tag.read({ aac: true, id3v1: false, id3v2: false, mp4: false, aiff: false })
      // Should not be detected as AAC (layer bits are 01, not 00)
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Does not detect AIFF as AAC', function () {
      const formHeader = Buffer.from('FORMxxxxAIFF')
      const mp3tag = new MP3Tag(formHeader)
      mp3tag.read({ aac: true, aiff: false })
      // AIFF won't have ADTS sync
      assert.strictEqual(typeof mp3tag.tags.v2, 'undefined')
    })
  })

  describe('Reading ID3 from AAC', function () {
    it('Reads ID3v2 tags from prepended tag', function () {
      const id3Data = createID3v2Tag('AAC Test Song')
      const buffer = createAAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aac: true })

      assert.strictEqual(mp3tag.error, '')
      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'AAC Test Song')
    })

    it('Returns empty tags when no ID3v2 exists', function () {
      const buffer = createAAC()
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aac: true })

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Contains AAC-specific details', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createAAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aac: true })

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.aac)
      assert.strictEqual(tags.v2Details.aac.format, 'ADTS')
    })
  })

  describe('Writing ID3 to AAC', function () {
    it('Writes ID3v2 tags to AAC without existing ID3', function () {
      const buffer = createAAC()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'New Title', TPE1: 'New Artist' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      // Verify the new buffer
      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ aac: true })
      assert.strictEqual(tags.v2.TIT2, 'New Title')
      assert.strictEqual(tags.v2.TPE1, 'New Artist')
    })

    it('Replaces existing ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Old Title')
      const buffer = createAAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags.v2.TIT2 = 'Updated Title'
      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      // Verify the update
      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ aac: true })
      assert.strictEqual(tags.v2.TIT2, 'Updated Title')
    })

    it('Preserves audio data after ID3v2', function () {
      const buffer = createAAC()
      const originalAudioSize = buffer.length
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'Test' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })

      // The ADTS sync word should be present after the ID3v2 tag
      const mp3tag2 = new MP3Tag(newBuffer)
      const audioBuffer = mp3tag2.getAudio()
      // Audio should start with ADTS sync
      assert.strictEqual(audioBuffer[0], 0xFF)
      assert.strictEqual(audioBuffer[1] & 0xF0, 0xF0)
      assert.strictEqual(audioBuffer.length, originalAudioSize)
    })
  })

  describe('AAC Audio Buffer', function () {
    it('Extracts audio without ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createAAC({ id3Data })
      const audioBuffer = MP3Tag.getAudioBuffer(buffer)

      // Should start with ADTS sync word
      assert.strictEqual(audioBuffer[0], 0xFF)
      assert.strictEqual(audioBuffer[1] & 0xF0, 0xF0)
      // Layer bits should be 00 for AAC
      assert.strictEqual((audioBuffer[1] >> 1) & 0x03, 0)
    })
  })

  describe('Convenience Properties', function () {
    it('Title getter/setter works with AAC', function () {
      const id3Data = createID3v2Tag('Original')
      const buffer = createAAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aac: true })

      assert.strictEqual(tags.title, 'Original')
      tags.title = 'Modified'
      assert.strictEqual(tags.v2.TIT2, 'Modified')
    })
  })

  describe('Edge Cases', function () {
    it('Handles AAC option set to false', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createAAC({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      // With aac: false, it should try to read as MP3 (which might still work for ID3v2)
      const tags = mp3tag.read({ aac: false, id3v2: true })

      // ID3v2 should still be readable since it's prepended like MP3
      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'Test')
    })

    it('Throws error when writing without v2 tags', function () {
      const buffer = createAAC()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {}
      mp3tag.save({ id3v2: { include: true } })
      assert.ok(mp3tag.error.includes('No ID3v2 tags to write'))
    })
  })
})
