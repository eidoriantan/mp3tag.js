/* eslint-env mocha */
const assert = require('assert')
const MP3Tag = require('../../dist/mp3tag.js')

/**
 * Helper to create a minimal AIFF file with optional ID3 chunk
 * AIFF structure:
 * - FORM (4) + size (4) + AIFF (4)
 * - COMM chunk (4 + 4 + 18)
 * - SSND chunk (4 + 4 + 8 + audio)
 * - ID3 chunk (optional)
 */
function createAIFF (options = {}) {
  const { id3Data = null, type = 'AIFF' } = options

  // Minimal COMM chunk (18 bytes data)
  const commChunk = new Uint8Array([
    0x43, 0x4F, 0x4D, 0x4D, // 'COMM'
    0x00, 0x00, 0x00, 0x12, // size: 18
    0x00, 0x01, // numChannels: 1
    0x00, 0x00, 0x00, 0x10, // numSampleFrames: 16
    0x00, 0x10, // sampleSize: 16
    0x40, 0x0E, 0xAC, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // sampleRate: 44100 (80-bit extended)
  ])

  // Minimal SSND chunk with 16 bytes of silence
  const ssndChunk = new Uint8Array([
    0x53, 0x53, 0x4E, 0x44, // 'SSND'
    0x00, 0x00, 0x00, 0x18, // size: 24 (8 header + 16 audio)
    0x00, 0x00, 0x00, 0x00, // offset
    0x00, 0x00, 0x00, 0x00, // blockSize
    // 16 bytes of silence
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ])

  // Calculate total size
  let totalSize = 4 + commChunk.length + ssndChunk.length // AIFF + chunks
  let id3Chunk = null

  if (id3Data) {
    // ID3 chunk: ID3 (4) + size (4) + data + padding
    const id3Size = id3Data.length
    const needsPadding = id3Size % 2 !== 0
    id3Chunk = new Uint8Array(8 + id3Size + (needsPadding ? 1 : 0))
    id3Chunk[0] = 0x49 // 'I'
    id3Chunk[1] = 0x44 // 'D'
    id3Chunk[2] = 0x33 // '3'
    id3Chunk[3] = 0x20 // ' '
    // Size (big-endian)
    id3Chunk[4] = (id3Size >> 24) & 0xFF
    id3Chunk[5] = (id3Size >> 16) & 0xFF
    id3Chunk[6] = (id3Size >> 8) & 0xFF
    id3Chunk[7] = id3Size & 0xFF
    id3Chunk.set(id3Data, 8)
    totalSize += id3Chunk.length
  }

  // Create FORM header
  const formHeader = new Uint8Array(12)
  formHeader[0] = 0x46 // 'F'
  formHeader[1] = 0x4F // 'O'
  formHeader[2] = 0x52 // 'R'
  formHeader[3] = 0x4D // 'M'
  // Size (big-endian) - total size minus 8 (FORM + size field)
  const formSize = totalSize
  formHeader[4] = (formSize >> 24) & 0xFF
  formHeader[5] = (formSize >> 16) & 0xFF
  formHeader[6] = (formSize >> 8) & 0xFF
  formHeader[7] = formSize & 0xFF
  // Type
  formHeader[8] = type.charCodeAt(0)
  formHeader[9] = type.charCodeAt(1)
  formHeader[10] = type.charCodeAt(2)
  formHeader[11] = type.charCodeAt(3)

  // Combine all parts
  const result = new Uint8Array(12 + totalSize - 4)
  let offset = 0
  result.set(formHeader, offset)
  offset += formHeader.length
  result.set(commChunk, offset)
  offset += commChunk.length
  result.set(ssndChunk, offset)
  offset += ssndChunk.length
  if (id3Chunk) {
    result.set(id3Chunk, offset)
  }

  return Buffer.from(result)
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

describe('AIFF', function () {
  describe('AIFF Detection', function () {
    it('Detects AIFF container', function () {
      const buffer = createAIFF()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ aiff: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Detects AIFC container', function () {
      const buffer = createAIFF({ type: 'AIFC' })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read({ aiff: true })
      assert.strictEqual(mp3tag.error, '')
    })

    it('Does not detect non-AIFF as AIFF', function () {
      const buffer = Buffer.from([0xFF, 0xFB, 0xE0, 0x00]) // MP3 header
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aiff: true, id3v2: false, id3v1: false })
      // Should not be detected as AIFF (no FORM header)
      assert.strictEqual(typeof tags.v2, 'undefined')
    })
  })

  describe('Reading ID3 from AIFF', function () {
    it('Reads ID3v2 tags from ID3 chunk', function () {
      const id3Data = createID3v2Tag('AIFF Test Song')
      const buffer = createAIFF({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aiff: true })

      assert.strictEqual(mp3tag.error, '')
      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'AIFF Test Song')
    })

    it('Returns empty tags when no ID3 chunk exists', function () {
      const buffer = createAIFF()
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aiff: true })

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Contains AIFF-specific details', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createAIFF({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aiff: true })

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.aiff)
      assert.strictEqual(typeof tags.v2Details.aiff.chunkOffset, 'number')
      assert.strictEqual(typeof tags.v2Details.aiff.chunkSize, 'number')
    })
  })

  describe('Writing ID3 to AIFF', function () {
    it('Writes ID3v2 tags to AIFF without existing ID3', function () {
      const buffer = createAIFF()
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
      const tags = mp3tag2.read({ aiff: true })
      assert.strictEqual(tags.v2.TIT2, 'New Title')
      assert.strictEqual(tags.v2.TPE1, 'New Artist')
    })

    it('Replaces existing ID3 chunk', function () {
      const id3Data = createID3v2Tag('Old Title')
      const buffer = createAIFF({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags.v2.TIT2 = 'Updated Title'
      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })
      assert.strictEqual(mp3tag.error, '')

      // Verify the update
      const mp3tag2 = new MP3Tag(newBuffer)
      const tags = mp3tag2.read({ aiff: true })
      assert.strictEqual(tags.v2.TIT2, 'Updated Title')
    })

    it('Preserves FORM header structure', function () {
      const buffer = createAIFF()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {
        v2: { TIT2: 'Test' },
        v2Details: { version: [3, 0] }
      }

      const newBuffer = mp3tag.save({ id3v2: { include: true, padding: 0 } })

      // Check FORM header
      assert.strictEqual(String.fromCharCode(newBuffer[0], newBuffer[1], newBuffer[2], newBuffer[3]), 'FORM')
      assert.strictEqual(String.fromCharCode(newBuffer[8], newBuffer[9], newBuffer[10], newBuffer[11]), 'AIFF')
    })
  })

  describe('Convenience Properties', function () {
    it('Title getter/setter works with AIFF', function () {
      const id3Data = createID3v2Tag('Original')
      const buffer = createAIFF({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aiff: true })

      assert.strictEqual(tags.title, 'Original')
      tags.title = 'Modified'
      assert.strictEqual(tags.v2.TIT2, 'Modified')
    })
  })

  describe('Edge Cases', function () {
    it('Handles AIFF option set to false', function () {
      const id3Data = createID3v2Tag('Test')
      const buffer = createAIFF({ id3Data })
      const mp3tag = new MP3Tag(buffer)
      const tags = mp3tag.read({ aiff: false, id3v2: true })

      // Should not read AIFF-specific ID3, but may try to read as MP3
      // The buffer doesn't have a valid MP3 structure, so v2 should be undefined
      assert.strictEqual(typeof tags.v2, 'undefined')
    })

    it('Throws error when writing without v2 tags', function () {
      const buffer = createAIFF()
      const mp3tag = new MP3Tag(buffer)
      mp3tag.read()

      mp3tag.tags = {}
      mp3tag.save({ id3v2: { include: true } })
      assert.ok(mp3tag.error.includes('No ID3v2 tags to write'))
    })
  })
})
