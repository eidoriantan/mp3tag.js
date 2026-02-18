/* eslint-env mocha */
const assert = require('assert')
const MP3Tag = require('../../dist/mp3tag.js')

/**
 * Helper to create a minimal WAV file with optional ID3v2 prepended
 * WAV magic: 'RIFF' at offset 0, 'WAVE' at offset 8
 */
function createWAV (options = {}) {
  const { id3Data = null } = options

  // Minimal WAV: RIFF header + WAVE + fmt chunk + data chunk
  const audioPayload = new Uint8Array(16) // 16 bytes of silence
  const fmtChunkSize = 16
  const dataChunkSize = audioPayload.length
  const riffSize = 4 + (8 + fmtChunkSize) + (8 + dataChunkSize) // 'WAVE' + fmt chunk + data chunk

  const wavData = new Uint8Array(12 + 8 + fmtChunkSize + 8 + dataChunkSize)
  const view = new DataView(wavData.buffer)

  // RIFF header
  wavData[0] = 0x52; wavData[1] = 0x49; wavData[2] = 0x46; wavData[3] = 0x46 // 'RIFF'
  view.setUint32(4, riffSize, true) // file size - 8, little-endian
  wavData[8] = 0x57; wavData[9] = 0x41; wavData[10] = 0x56; wavData[11] = 0x45 // 'WAVE'

  // fmt chunk
  let offset = 12
  wavData[offset] = 0x66; wavData[offset + 1] = 0x6D; wavData[offset + 2] = 0x74; wavData[offset + 3] = 0x20 // 'fmt '
  view.setUint32(offset + 4, fmtChunkSize, true)
  view.setUint16(offset + 8, 1, true) // PCM format
  view.setUint16(offset + 10, 2, true) // stereo
  view.setUint32(offset + 12, 44100, true) // sample rate
  view.setUint32(offset + 16, 176400, true) // byte rate
  view.setUint16(offset + 20, 4, true) // block align
  view.setUint16(offset + 22, 16, true) // bits per sample

  // data chunk
  offset = 12 + 8 + fmtChunkSize
  wavData[offset] = 0x64; wavData[offset + 1] = 0x61; wavData[offset + 2] = 0x74; wavData[offset + 3] = 0x61 // 'data'
  view.setUint32(offset + 4, dataChunkSize, true)
  wavData.set(audioPayload, offset + 8)

  if (id3Data) {
    const result = new Uint8Array(id3Data.length + wavData.length)
    result.set(id3Data, 0)
    result.set(wavData, id3Data.length)
    return Buffer.from(result)
  }

  return Buffer.from(wavData)
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

describe('WAV', function () {
  describe('WAV Detection', function () {
    it('Detects WAV container', function () {
      const buffer = createWAV()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ wav: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Detects WAV with prepended ID3v2', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWAV({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ wav: true })
      assert.strictEqual(mp3tag.error, '')
    })
  })

  describe('Reading ID3 from WAV', function () {
    it('Reads ID3v2 tags from prepended tag', function () {
      const id3Data = createID3v2Tag('WAV Test Song')
      const buffer = createWAV({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wav: true })

      assert.strictEqual(mp3tag.error, '')
      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'WAV Test Song')
    })

    it('Returns empty tags when no ID3v2 exists', function () {
      const buffer = createWAV()
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wav: true })

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Contains WAV-specific details', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWAV({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wav: true })

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.wav)
      assert.strictEqual(tags.v2Details.wav.format, 'WAV')
    })
  })

  describe('Writing ID3 to WAV', function () {
    it('Writes ID3v2 tags to WAV without existing ID3', function () {
      const buffer = createWAV()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'New Title', TPE1: 'New Artist' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ wav: true })
      assert.strictEqual(tags.v2.TIT2, 'New Title')
      assert.strictEqual(tags.v2.TPE1, 'New Artist')
    })

    it('Replaces existing ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Old Title')
      const buffer = createWAV({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags.v2.TIT2 = 'Updated Title'
      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ wav: true })
      assert.strictEqual(tags.v2.TIT2, 'Updated Title')
    })

    it('Preserves audio data after ID3v2', function () {
      const buffer = createWAV()
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
      // Audio should start with RIFF magic
      assert.strictEqual(audioBuffer[0], 0x52) // 'R'
      assert.strictEqual(audioBuffer[1], 0x49) // 'I'
      assert.strictEqual(audioBuffer[2], 0x46) // 'F'
      assert.strictEqual(audioBuffer[3], 0x46) // 'F'
      assert.strictEqual(audioBuffer.length, originalAudioSize)
    })
  })

  describe('WAV Audio Buffer', function () {
    it('Extracts audio without ID3v2 tag', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWAV({ id3Data })
      const audioBuffer = MP3Tag.getAudioBuffer(buffer)

      assert.strictEqual(audioBuffer[0], 0x52) // 'R'
      assert.strictEqual(audioBuffer[1], 0x49) // 'I'
      assert.strictEqual(audioBuffer[2], 0x46) // 'F'
      assert.strictEqual(audioBuffer[3], 0x46) // 'F'
    })
  })

  describe('Convenience Properties', function () {
    it('Title getter/setter works with WAV', function () {
      const id3Data = createID3v2Tag('Original')
      const buffer = createWAV({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wav: true })

      assert.strictEqual(tags.title, 'Original')
      tags.title = 'Modified'
      assert.strictEqual(tags.v2.TIT2, 'Modified')
    })
  })

  describe('Edge Cases', function () {
    it('Handles wav option set to false', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createWAV({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ wav: false, id3v2: true })

      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'Test')
    })

    it('Throws error when writing without v2 tags', function () {
      const buffer = createWAV()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {}
      mp3tag.save({ id3v2: { include: true } })
      assert.ok(mp3tag.error.includes('No ID3v2 tags to write'))
    })
  })
})
