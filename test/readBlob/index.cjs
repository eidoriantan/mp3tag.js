/* eslint-env mocha */
/* global Blob */

const assert = require('assert')
const MP3Tag = require('../../dist/mp3tag.js')
const { bytes } = require('../globals.cjs')

/**
 * Create a Blob from a Uint8Array fixture
 */
function createBlob (uint8) {
  return new Blob([uint8])
}

/**
 * Create a minimal ID3v2.3 tag with a TIT2 frame
 */
function createID3v2Tag (title) {
  const titleBytes = Buffer.from(title, 'utf8')
  const frameSize = 1 + titleBytes.length

  const header = new Uint8Array([
    0x49, 0x44, 0x33, 0x03, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00
  ])

  const frame = new Uint8Array(10 + frameSize)
  frame[0] = 0x54; frame[1] = 0x49; frame[2] = 0x54; frame[3] = 0x32
  frame[4] = (frameSize >> 24) & 0xFF
  frame[5] = (frameSize >> 16) & 0xFF
  frame[6] = (frameSize >> 8) & 0xFF
  frame[7] = frameSize & 0xFF
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

/**
 * Create a minimal AIFF file with optional ID3 chunk
 */
function createAIFF (id3Data) {
  const commChunk = new Uint8Array([
    0x43, 0x4F, 0x4D, 0x4D,
    0x00, 0x00, 0x00, 0x12,
    0x00, 0x01,
    0x00, 0x00, 0x00, 0x10,
    0x00, 0x10,
    0x40, 0x0E, 0xAC, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ])

  const ssndChunk = new Uint8Array([
    0x53, 0x53, 0x4E, 0x44,
    0x00, 0x00, 0x00, 0x18,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ])

  let totalSize = 4 + commChunk.length + ssndChunk.length
  let id3Chunk = null

  if (id3Data) {
    const id3Size = id3Data.length
    const needsPadding = id3Size % 2 !== 0
    id3Chunk = new Uint8Array(8 + id3Size + (needsPadding ? 1 : 0))
    id3Chunk[0] = 0x49; id3Chunk[1] = 0x44; id3Chunk[2] = 0x33; id3Chunk[3] = 0x20
    id3Chunk[4] = (id3Size >> 24) & 0xFF
    id3Chunk[5] = (id3Size >> 16) & 0xFF
    id3Chunk[6] = (id3Size >> 8) & 0xFF
    id3Chunk[7] = id3Size & 0xFF
    id3Chunk.set(id3Data, 8)
    totalSize += id3Chunk.length
  }

  const formHeader = new Uint8Array(12)
  formHeader[0] = 0x46; formHeader[1] = 0x4F; formHeader[2] = 0x52; formHeader[3] = 0x4D
  formHeader[4] = (totalSize >> 24) & 0xFF
  formHeader[5] = (totalSize >> 16) & 0xFF
  formHeader[6] = (totalSize >> 8) & 0xFF
  formHeader[7] = totalSize & 0xFF
  formHeader[8] = 0x41; formHeader[9] = 0x49; formHeader[10] = 0x46; formHeader[11] = 0x46

  const result = new Uint8Array(12 + totalSize - 4)
  let offset = 0
  result.set(formHeader, offset); offset += formHeader.length
  result.set(commChunk, offset); offset += commChunk.length
  result.set(ssndChunk, offset); offset += ssndChunk.length
  if (id3Chunk) result.set(id3Chunk, offset)

  return result
}

/**
 * Create a minimal MP4 file with ID32 box
 */
function createMP4WithID32 () {
  const id3Header = [
    0x49, 0x44, 0x33, 0x03, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x15
  ]
  const tit2Frame = [
    0x54, 0x49, 0x54, 0x32,
    0x00, 0x00, 0x00, 0x0B,
    0x00, 0x00,
    0x00,
    0x54, 0x65, 0x73, 0x74, 0x20,
    0x54, 0x69, 0x74, 0x6C, 0x65
  ]
  const id3Data = [...id3Header, ...tit2Frame]

  const id32Size = 8 + 4 + 2 + id3Data.length
  const id32Box = [
    (id32Size >> 24) & 0xFF, (id32Size >> 16) & 0xFF,
    (id32Size >> 8) & 0xFF, id32Size & 0xFF,
    0x49, 0x44, 0x33, 0x32,
    0x00, 0x00, 0x00, 0x00,
    0x55, 0xC4,
    ...id3Data
  ]

  const hdlrBox = [
    0x00, 0x00, 0x00, 0x21,
    0x68, 0x64, 0x6C, 0x72,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x6D, 0x64, 0x69, 0x72,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00
  ]

  const metaSize = 8 + 4 + hdlrBox.length + id32Box.length
  const metaBox = [
    (metaSize >> 24) & 0xFF, (metaSize >> 16) & 0xFF,
    (metaSize >> 8) & 0xFF, metaSize & 0xFF,
    0x6D, 0x65, 0x74, 0x61,
    0x00, 0x00, 0x00, 0x00,
    ...hdlrBox, ...id32Box
  ]

  const udtaSize = 8 + metaBox.length
  const udtaBox = [
    (udtaSize >> 24) & 0xFF, (udtaSize >> 16) & 0xFF,
    (udtaSize >> 8) & 0xFF, udtaSize & 0xFF,
    0x75, 0x64, 0x74, 0x61,
    ...metaBox
  ]

  const mvhdBox = [
    0x00, 0x00, 0x00, 0x70,
    0x6D, 0x76, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x00,
    ...new Array(100).fill(0)
  ]

  const moovSize = 8 + mvhdBox.length + udtaBox.length
  const moovBox = [
    (moovSize >> 24) & 0xFF, (moovSize >> 16) & 0xFF,
    (moovSize >> 8) & 0xFF, moovSize & 0xFF,
    0x6D, 0x6F, 0x6F, 0x76,
    ...mvhdBox, ...udtaBox
  ]

  const ftypBox = [
    0x00, 0x00, 0x00, 0x14,
    0x66, 0x74, 0x79, 0x70,
    0x4D, 0x34, 0x41, 0x20,
    0x00, 0x00, 0x00, 0x00,
    0x4D, 0x34, 0x41, 0x20
  ]

  const mdatBox = [
    0x00, 0x00, 0x00, 0x6C,
    0x6D, 0x64, 0x61, 0x74,
    ...new Array(100).fill(0xAA)
  ]

  return new Uint8Array([...ftypBox, ...moovBox, ...mdatBox])
}

/**
 * Create a minimal AAC (ADTS) file with ID3v2 prepended
 */
function createAACFixture (title) {
  const id3Tag = createID3v2Tag(title)

  // ADTS frame header: 0xFF 0xF1 = sync(0xFFF) + MPEG-4 + layer=0 + no CRC
  const adtsFrame = new Uint8Array([
    0xFF, 0xF1, 0x50, 0x80, 0x02, 0x00, 0x1C
  ])

  const result = new Uint8Array(id3Tag.length + adtsFrame.length)
  result.set(id3Tag, 0)
  result.set(adtsFrame, id3Tag.length)
  return result
}

describe('readBlob', function () {
  before(function () {
    if (typeof Blob === 'undefined') this.skip()
  })

  describe('MP3', function () {
    it('Reads ID3v2 and ID3v1 tags', async function () {
      const blob = createBlob(bytes)
      const tags = await MP3Tag.readBlob(blob)

      assert.ok(tags.v2)
      assert.ok(tags.v1)
      assert.ok(tags.v2.TIT2)
      assert.strictEqual(tags.v1.title, 'TITLE')
    })

    it('Matches readBuffer output', async function () {
      const blob = createBlob(bytes)
      const tags = await MP3Tag.readBlob(blob)
      const bufferTags = MP3Tag.readBuffer(bytes.buffer)

      assert.strictEqual(tags.title, bufferTags.title)
      assert.strictEqual(tags.artist, bufferTags.artist)
      assert.strictEqual(tags.album, bufferTags.album)
      assert.strictEqual(tags.year, bufferTags.year)
      assert.strictEqual(tags.track, bufferTags.track)
      assert.strictEqual(tags.genre, bufferTags.genre)
    })

    it('Reads only ID3v1 when no ID3v2 header', async function () {
      // Build a buffer: MP3 audio + ID3v1 at the end (no ID3v2 prepended)
      const audio = new Uint8Array([
        0xFF, 0xFB, 0xE0, 0x00, 0x00, 0x00, 0x00, 0x00
      ])
      const id3v1 = new Uint8Array(128)
      id3v1[0] = 0x54; id3v1[1] = 0x41; id3v1[2] = 0x47 // "TAG"
      id3v1[3] = 0x48; id3v1[4] = 0x65; id3v1[5] = 0x6C
      id3v1[6] = 0x6C; id3v1[7] = 0x6F // "Hello" as title

      const combined = new Uint8Array(audio.length + id3v1.length)
      combined.set(audio, 0)
      combined.set(id3v1, audio.length)

      const blob = createBlob(combined)
      const tags = await MP3Tag.readBlob(blob)

      assert.strictEqual(typeof tags.v2, 'undefined')
      assert.ok(tags.v1)
      assert.strictEqual(tags.v1.title, 'Hello')
      assert.strictEqual(tags.title, 'Hello')
    })
  })

  describe('AIFF', function () {
    it('Reads ID3 chunk from AIFF', async function () {
      const id3Data = createID3v2Tag('AIFF Song')
      const aiff = createAIFF(id3Data)

      const blob = createBlob(aiff)
      const tags = await MP3Tag.readBlob(blob)

      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'AIFF Song')
      assert.strictEqual(tags.title, 'AIFF Song')
    })

    it('Contains AIFF-specific details', async function () {
      const id3Data = createID3v2Tag('Test')
      const aiff = createAIFF(id3Data)

      const blob = createBlob(aiff)
      const tags = await MP3Tag.readBlob(blob)

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.aiff)
      assert.strictEqual(typeof tags.v2Details.aiff.chunkOffset, 'number')
      assert.strictEqual(typeof tags.v2Details.aiff.chunkSize, 'number')
    })

    it('Returns empty tags for AIFF without ID3 chunk', async function () {
      const aiff = createAIFF(null)

      const blob = createBlob(aiff)
      const tags = await MP3Tag.readBlob(blob)

      assert.strictEqual(typeof tags.v2, 'undefined')
      assert.strictEqual(tags.title, '')
    })
  })

  describe('MP4', function () {
    it('Reads ID32 box from MP4', async function () {
      const mp4 = createMP4WithID32()

      const blob = createBlob(mp4)
      const tags = await MP3Tag.readBlob(blob)

      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'Test Title')
      assert.strictEqual(tags.title, 'Test Title')
    })

    it('Contains MP4-specific details', async function () {
      const mp4 = createMP4WithID32()

      const blob = createBlob(mp4)
      const tags = await MP3Tag.readBlob(blob)

      assert.ok(tags.v2Details)
      assert.ok(tags.v2Details.mp4)
      assert.strictEqual(tags.v2Details.mp4.language, 'und')
    })
  })

  describe('AAC', function () {
    it('Reads ID3v2 from AAC and detects ADTS', async function () {
      const aac = createAACFixture('AAC Song')

      const blob = createBlob(aac)
      const tags = await MP3Tag.readBlob(blob)

      assert.ok(tags.v2)
      assert.strictEqual(tags.v2.TIT2, 'AAC Song')
      assert.strictEqual(tags.title, 'AAC Song')
      assert.ok(tags.v2Details.aac)
      assert.strictEqual(tags.v2Details.aac.format, 'ADTS')
    })

    it('Does not read ID3v1 for AAC', async function () {
      const aac = createAACFixture('AAC Only')

      const blob = createBlob(aac)
      const tags = await MP3Tag.readBlob(blob)

      assert.strictEqual(typeof tags.v1, 'undefined')
    })
  })
})
