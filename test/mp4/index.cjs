/* eslint-env mocha */

const assert = require('assert')

const MP3Tag = require('../../dist/mp3tag.js')

// Minimal MP4 test file with ftyp, moov (with udta/meta/ID32), and mdat
// The ID32 box contains a simple ID3v2.3 tag with TIT2 frame
const mp4WithID32 = createMP4WithID32()

// Minimal MP4 without ID32 (just ftyp, moov with minimal structure, mdat)
const mp4WithoutID32 = createMP4WithoutID32()

// Minimal MP4 without meta box (ftyp, moov with udta but no meta, mdat)
const mp4WithoutMeta = createMP4WithoutMeta()

// Minimal MP4 without udta box (ftyp, moov without udta, mdat)
const mp4WithoutUdta = createMP4WithoutUdta()

/**
 * Create an MP4 file with an ID32 box containing ID3v2.3 tags
 */
function createMP4WithID32 () {
  // ID3v2.3 header + TIT2 frame with "Test Title"
  const id3Header = [
    0x49, 0x44, 0x33, // "ID3"
    0x03, 0x00, // Version 2.3
    0x00, // Flags
    0x00, 0x00, 0x00, 0x15 // Size (21 bytes synchsafe)
  ]

  // TIT2 frame: "Test Title"
  const tit2Frame = [
    0x54, 0x49, 0x54, 0x32, // "TIT2"
    0x00, 0x00, 0x00, 0x0B, // Size: 11 bytes
    0x00, 0x00, // Flags
    0x00, // Encoding: ISO-8859-1
    0x54, 0x65, 0x73, 0x74, 0x20, // "Test "
    0x54, 0x69, 0x74, 0x6C, 0x65 // "Title"
  ]

  const id3Data = [...id3Header, ...tit2Frame]

  // ID32 box: header + version/flags + language + ID3 data
  // Language: 'und' (undetermined) = 0x55C4
  const id32Size = 8 + 4 + 2 + id3Data.length
  const id32Box = [
    (id32Size >> 24) & 0xFF, (id32Size >> 16) & 0xFF,
    (id32Size >> 8) & 0xFF, id32Size & 0xFF,
    0x49, 0x44, 0x33, 0x32, // "ID32"
    0x00, 0x00, 0x00, 0x00, // version/flags
    0x55, 0xC4, // language: 'und'
    ...id3Data
  ]

  // hdlr box for meta
  const hdlrBox = [
    0x00, 0x00, 0x00, 0x21, // Size: 33
    0x68, 0x64, 0x6C, 0x72, // "hdlr"
    0x00, 0x00, 0x00, 0x00, // version/flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x6D, 0x64, 0x69, 0x72, // handler_type: "mdir"
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00 // name (null-terminated)
  ]

  // meta box: header + version/flags + hdlr + ID32
  const metaSize = 8 + 4 + hdlrBox.length + id32Box.length
  const metaBox = [
    (metaSize >> 24) & 0xFF, (metaSize >> 16) & 0xFF,
    (metaSize >> 8) & 0xFF, metaSize & 0xFF,
    0x6D, 0x65, 0x74, 0x61, // "meta"
    0x00, 0x00, 0x00, 0x00, // version/flags
    ...hdlrBox,
    ...id32Box
  ]

  // udta box
  const udtaSize = 8 + metaBox.length
  const udtaBox = [
    (udtaSize >> 24) & 0xFF, (udtaSize >> 16) & 0xFF,
    (udtaSize >> 8) & 0xFF, udtaSize & 0xFF,
    0x75, 0x64, 0x74, 0x61, // "udta"
    ...metaBox
  ]

  // mvhd box (minimal movie header)
  const mvhdBox = [
    0x00, 0x00, 0x00, 0x70, // Size: 112
    0x6D, 0x76, 0x68, 0x64, // "mvhd"
    0x00, 0x00, 0x00, 0x00, // version/flags
    ...new Array(100).fill(0) // minimal content
  ]

  // moov box
  const moovSize = 8 + mvhdBox.length + udtaBox.length
  const moovBox = [
    (moovSize >> 24) & 0xFF, (moovSize >> 16) & 0xFF,
    (moovSize >> 8) & 0xFF, moovSize & 0xFF,
    0x6D, 0x6F, 0x6F, 0x76, // "moov"
    ...mvhdBox,
    ...udtaBox
  ]

  // ftyp box
  const ftypBox = [
    0x00, 0x00, 0x00, 0x14, // Size: 20
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    0x4D, 0x34, 0x41, 0x20, // "M4A "
    0x00, 0x00, 0x00, 0x00, // minor version
    0x4D, 0x34, 0x41, 0x20 // compatible brand: "M4A "
  ]

  // mdat box with some dummy audio data
  const mdatData = new Array(100).fill(0xAA)
  const mdatSize = 8 + mdatData.length
  const mdatBox = [
    (mdatSize >> 24) & 0xFF, (mdatSize >> 16) & 0xFF,
    (mdatSize >> 8) & 0xFF, mdatSize & 0xFF,
    0x6D, 0x64, 0x61, 0x74, // "mdat"
    ...mdatData
  ]

  return new Uint8Array([...ftypBox, ...moovBox, ...mdatBox])
}

/**
 * Create an MP4 file without ID32 box (has meta but no ID32)
 */
function createMP4WithoutID32 () {
  // hdlr box for meta
  const hdlrBox = [
    0x00, 0x00, 0x00, 0x21, // Size: 33
    0x68, 0x64, 0x6C, 0x72, // "hdlr"
    0x00, 0x00, 0x00, 0x00, // version/flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x6D, 0x64, 0x69, 0x72, // handler_type: "mdir"
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00 // name (null-terminated)
  ]

  // meta box without ID32
  const metaSize = 8 + 4 + hdlrBox.length
  const metaBox = [
    (metaSize >> 24) & 0xFF, (metaSize >> 16) & 0xFF,
    (metaSize >> 8) & 0xFF, metaSize & 0xFF,
    0x6D, 0x65, 0x74, 0x61, // "meta"
    0x00, 0x00, 0x00, 0x00, // version/flags
    ...hdlrBox
  ]

  // udta box
  const udtaSize = 8 + metaBox.length
  const udtaBox = [
    (udtaSize >> 24) & 0xFF, (udtaSize >> 16) & 0xFF,
    (udtaSize >> 8) & 0xFF, udtaSize & 0xFF,
    0x75, 0x64, 0x74, 0x61, // "udta"
    ...metaBox
  ]

  // mvhd box
  const mvhdBox = [
    0x00, 0x00, 0x00, 0x70, // Size: 112
    0x6D, 0x76, 0x68, 0x64, // "mvhd"
    0x00, 0x00, 0x00, 0x00, // version/flags
    ...new Array(100).fill(0)
  ]

  // moov box
  const moovSize = 8 + mvhdBox.length + udtaBox.length
  const moovBox = [
    (moovSize >> 24) & 0xFF, (moovSize >> 16) & 0xFF,
    (moovSize >> 8) & 0xFF, moovSize & 0xFF,
    0x6D, 0x6F, 0x6F, 0x76, // "moov"
    ...mvhdBox,
    ...udtaBox
  ]

  // ftyp box
  const ftypBox = [
    0x00, 0x00, 0x00, 0x14, // Size: 20
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    0x4D, 0x34, 0x41, 0x20, // "M4A "
    0x00, 0x00, 0x00, 0x00, // minor version
    0x4D, 0x34, 0x41, 0x20 // compatible brand: "M4A "
  ]

  // mdat box
  const mdatData = new Array(100).fill(0xAA)
  const mdatSize = 8 + mdatData.length
  const mdatBox = [
    (mdatSize >> 24) & 0xFF, (mdatSize >> 16) & 0xFF,
    (mdatSize >> 8) & 0xFF, mdatSize & 0xFF,
    0x6D, 0x64, 0x61, 0x74, // "mdat"
    ...mdatData
  ]

  return new Uint8Array([...ftypBox, ...moovBox, ...mdatBox])
}

/**
 * Create an MP4 file without meta box (has udta but no meta)
 */
function createMP4WithoutMeta () {
  // udta box without meta
  const udtaSize = 8
  const udtaBox = [
    (udtaSize >> 24) & 0xFF, (udtaSize >> 16) & 0xFF,
    (udtaSize >> 8) & 0xFF, udtaSize & 0xFF,
    0x75, 0x64, 0x74, 0x61 // "udta"
  ]

  // mvhd box
  const mvhdBox = [
    0x00, 0x00, 0x00, 0x70, // Size: 112
    0x6D, 0x76, 0x68, 0x64, // "mvhd"
    0x00, 0x00, 0x00, 0x00, // version/flags
    ...new Array(100).fill(0)
  ]

  // moov box
  const moovSize = 8 + mvhdBox.length + udtaBox.length
  const moovBox = [
    (moovSize >> 24) & 0xFF, (moovSize >> 16) & 0xFF,
    (moovSize >> 8) & 0xFF, moovSize & 0xFF,
    0x6D, 0x6F, 0x6F, 0x76, // "moov"
    ...mvhdBox,
    ...udtaBox
  ]

  // ftyp box
  const ftypBox = [
    0x00, 0x00, 0x00, 0x14, // Size: 20
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    0x4D, 0x34, 0x41, 0x20, // "M4A "
    0x00, 0x00, 0x00, 0x00, // minor version
    0x4D, 0x34, 0x41, 0x20 // compatible brand: "M4A "
  ]

  // mdat box
  const mdatData = new Array(100).fill(0xAA)
  const mdatSize = 8 + mdatData.length
  const mdatBox = [
    (mdatSize >> 24) & 0xFF, (mdatSize >> 16) & 0xFF,
    (mdatSize >> 8) & 0xFF, mdatSize & 0xFF,
    0x6D, 0x64, 0x61, 0x74, // "mdat"
    ...mdatData
  ]

  return new Uint8Array([...ftypBox, ...moovBox, ...mdatBox])
}

/**
 * Create an MP4 file without udta box
 */
function createMP4WithoutUdta () {
  // mvhd box
  const mvhdBox = [
    0x00, 0x00, 0x00, 0x70, // Size: 112
    0x6D, 0x76, 0x68, 0x64, // "mvhd"
    0x00, 0x00, 0x00, 0x00, // version/flags
    ...new Array(100).fill(0)
  ]

  // moov box without udta
  const moovSize = 8 + mvhdBox.length
  const moovBox = [
    (moovSize >> 24) & 0xFF, (moovSize >> 16) & 0xFF,
    (moovSize >> 8) & 0xFF, moovSize & 0xFF,
    0x6D, 0x6F, 0x6F, 0x76, // "moov"
    ...mvhdBox
  ]

  // ftyp box
  const ftypBox = [
    0x00, 0x00, 0x00, 0x14, // Size: 20
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    0x4D, 0x34, 0x41, 0x20, // "M4A "
    0x00, 0x00, 0x00, 0x00, // minor version
    0x4D, 0x34, 0x41, 0x20 // compatible brand: "M4A "
  ]

  // mdat box
  const mdatData = new Array(100).fill(0xAA)
  const mdatSize = 8 + mdatData.length
  const mdatBox = [
    (mdatSize >> 24) & 0xFF, (mdatSize >> 16) & 0xFF,
    (mdatSize >> 8) & 0xFF, mdatSize & 0xFF,
    0x6D, 0x64, 0x61, 0x74, // "mdat"
    ...mdatData
  ]

  return new Uint8Array([...ftypBox, ...moovBox, ...mdatBox])
}

/**
 * Create a video-style MP4 file (isom brand) with ID32 box
 * This tests that video MP4 containers work the same as M4A
 */
function createVideoMP4WithID32 () {
  // ID3v2.3 header + TIT2 frame with "Video Title"
  const id3Header = [
    0x49, 0x44, 0x33, // "ID3"
    0x03, 0x00, // Version 2.3
    0x00, // Flags
    0x00, 0x00, 0x00, 0x16 // Size (22 bytes synchsafe)
  ]

  // TIT2 frame: "Video Title"
  const tit2Frame = [
    0x54, 0x49, 0x54, 0x32, // "TIT2"
    0x00, 0x00, 0x00, 0x0C, // Size: 12 bytes
    0x00, 0x00, // Flags
    0x00, // Encoding: ISO-8859-1
    0x56, 0x69, 0x64, 0x65, 0x6F, 0x20, // "Video "
    0x54, 0x69, 0x74, 0x6C, 0x65 // "Title"
  ]

  const id3Data = [...id3Header, ...tit2Frame]
  const id32Size = 8 + 4 + 2 + id3Data.length
  const id32Box = [
    (id32Size >> 24) & 0xFF, (id32Size >> 16) & 0xFF,
    (id32Size >> 8) & 0xFF, id32Size & 0xFF,
    0x49, 0x44, 0x33, 0x32, // "ID32"
    0x00, 0x00, 0x00, 0x00, // version/flags
    0x55, 0xC4, // language: 'und'
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
    ...hdlrBox,
    ...id32Box
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
    ...mvhdBox,
    ...udtaBox
  ]

  // Video-style ftyp with "isom" brand
  const ftypBox = [
    0x00, 0x00, 0x00, 0x18, // Size: 24
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    0x69, 0x73, 0x6F, 0x6D, // "isom" (video brand)
    0x00, 0x00, 0x02, 0x00, // minor version
    0x69, 0x73, 0x6F, 0x6D, // compatible brand: "isom"
    0x69, 0x73, 0x6F, 0x32 // compatible brand: "iso2"
  ]

  const mdatData = new Array(100).fill(0xBB)
  const mdatSize = 8 + mdatData.length
  const mdatBox = [
    (mdatSize >> 24) & 0xFF, (mdatSize >> 16) & 0xFF,
    (mdatSize >> 8) & 0xFF, mdatSize & 0xFF,
    0x6D, 0x64, 0x61, 0x74,
    ...mdatData
  ]

  return new Uint8Array([...ftypBox, ...moovBox, ...mdatBox])
}

/**
 * Create a container with a specific ftyp brand and title
 * Used to test M4V, MOV, and other container variants
 */
function createContainerWithBrand (brand, title) {
  // Encode title to bytes
  const titleBytes = []
  for (let i = 0; i < title.length; i++) {
    titleBytes.push(title.charCodeAt(i))
  }

  // ID3v2.3 header + TIT2 frame
  const frameSize = 1 + titleBytes.length // encoding byte + title
  const tagSize = 10 + frameSize // frame header (10) + frame content
  const id3Header = [
    0x49, 0x44, 0x33, // "ID3"
    0x03, 0x00, // Version 2.3
    0x00, // Flags
    0x00, 0x00, 0x00, tagSize // Size (synchsafe)
  ]

  const tit2Frame = [
    0x54, 0x49, 0x54, 0x32, // "TIT2"
    (frameSize >> 24) & 0xFF, (frameSize >> 16) & 0xFF,
    (frameSize >> 8) & 0xFF, frameSize & 0xFF,
    0x00, 0x00, // Flags
    0x00, // Encoding: ISO-8859-1
    ...titleBytes
  ]

  const id3Data = [...id3Header, ...tit2Frame]
  const id32Size = 8 + 4 + 2 + id3Data.length
  const id32Box = [
    (id32Size >> 24) & 0xFF, (id32Size >> 16) & 0xFF,
    (id32Size >> 8) & 0xFF, id32Size & 0xFF,
    0x49, 0x44, 0x33, 0x32, // "ID32"
    0x00, 0x00, 0x00, 0x00, // version/flags
    0x55, 0xC4, // language: 'und'
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
    ...hdlrBox,
    ...id32Box
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
    ...mvhdBox,
    ...udtaBox
  ]

  // ftyp with specified brand
  const brandBytes = [
    brand.charCodeAt(0),
    brand.charCodeAt(1),
    brand.charCodeAt(2),
    brand.charCodeAt(3)
  ]
  const ftypBox = [
    0x00, 0x00, 0x00, 0x14, // Size: 20
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    ...brandBytes, // major brand
    0x00, 0x00, 0x00, 0x00, // minor version
    ...brandBytes // compatible brand
  ]

  const mdatData = new Array(50).fill(0xCC)
  const mdatSize = 8 + mdatData.length
  const mdatBox = [
    (mdatSize >> 24) & 0xFF, (mdatSize >> 16) & 0xFF,
    (mdatSize >> 8) & 0xFF, mdatSize & 0xFF,
    0x6D, 0x64, 0x61, 0x74,
    ...mdatData
  ]

  return new Uint8Array([...ftypBox, ...moovBox, ...mdatBox])
}

describe('MP4', function () {
  describe('MP4 Detection', function () {
    it('Detects MP4 container by ftyp box', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      // Reading shouldn't throw for MP4
      mp3tag.read()
      assert.strictEqual(mp3tag.error, '')
    })

    it('Does not detect non-MP4 as MP4', function () {
      // ID3v2 header
      const mp3Bytes = new Uint8Array([
        0x49, 0x44, 0x33, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0xFF, 0xFB, 0x90, 0x00
      ])
      const mp3tag = new MP3Tag(mp3Bytes.buffer)
      mp3tag.read()
      // Should read as MP3 (no v2 tags since empty)
      assert.strictEqual(mp3tag.error, '')
    })

    it('Detects video MP4 container (isom brand)', function () {
      // Create MP4 with video-style ftyp (isom brand instead of M4A)
      const videoMP4 = createVideoMP4WithID32()
      const mp3tag = new MP3Tag(videoMP4.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.title, 'Video Title')
    })

    it('Detects M4V container (Apple video)', function () {
      const m4v = createContainerWithBrand('M4V ', 'M4V Title')
      const mp3tag = new MP3Tag(m4v.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.title, 'M4V Title')
    })

    it('Detects MOV container (QuickTime)', function () {
      const mov = createContainerWithBrand('qt  ', 'MOV Title')
      const mp3tag = new MP3Tag(mov.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.title, 'MOV Title')
    })
  })

  describe('Reading ID32 from MP4', function () {
    it('Reads ID3v2 tags from ID32 box', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.title, 'Test Title')
      assert.strictEqual(mp3tag.tags.v2.TIT2, 'Test Title')
    })

    it('Returns empty tags when no ID32 box exists', function () {
      const mp3tag = new MP3Tag(mp4WithoutID32.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.v2, undefined)
    })

    it('Contains MP4-specific details', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.error, '')
      assert.ok(mp3tag.tags.v2Details.mp4)
      assert.strictEqual(mp3tag.tags.v2Details.mp4.language, 'und')
    })

    it('Reports correct ID3v2 version', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.error, '')
      assert.deepStrictEqual(mp3tag.tags.v2Details.version, [3, 0])
    })
  })

  describe('Writing ID32 to MP4', function () {
    it('Writes ID3v2 tags to existing ID32 box', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read()

      mp3tag.tags.v2.TIT2 = 'New Title'
      mp3tag.tags.v2.TPE1 = 'New Artist'
      mp3tag.save({ id3v2: { padding: 0 } })

      assert.strictEqual(mp3tag.error, '')

      // Re-read to verify
      mp3tag.read()
      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.v2.TIT2, 'New Title')
      assert.strictEqual(mp3tag.tags.v2.TPE1, 'New Artist')
    })

    it('Creates ID32 box in MP4 without existing ID32', function () {
      const mp3tag = new MP3Tag(mp4WithoutID32.buffer)
      mp3tag.read()

      // Initialize v2 tags manually since none exist
      mp3tag.tags.v2 = { TIT2: 'Created Title' }
      mp3tag.tags.v2Details = { version: [3, 0] }
      mp3tag.save({ id3v2: { padding: 0 } })

      assert.strictEqual(mp3tag.error, '')

      // Re-read to verify
      mp3tag.read()
      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.v2.TIT2, 'Created Title')
    })

    it('Creates meta structure in MP4 without meta box', function () {
      const mp3tag = new MP3Tag(mp4WithoutMeta.buffer)
      mp3tag.read()

      mp3tag.tags.v2 = { TIT2: 'Created In Meta' }
      mp3tag.tags.v2Details = { version: [3, 0] }
      mp3tag.save({ id3v2: { padding: 0 } })

      assert.strictEqual(mp3tag.error, '')

      // Re-read to verify
      mp3tag.read()
      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.v2.TIT2, 'Created In Meta')
    })

    it('Creates udta/meta/ID32 structure in MP4 without udta', function () {
      const mp3tag = new MP3Tag(mp4WithoutUdta.buffer)
      mp3tag.read()

      mp3tag.tags.v2 = { TIT2: 'Created In Udta' }
      mp3tag.tags.v2Details = { version: [3, 0] }
      mp3tag.save({ id3v2: { padding: 0 } })

      assert.strictEqual(mp3tag.error, '')

      // Re-read to verify
      mp3tag.read()
      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.v2.TIT2, 'Created In Udta')
    })

    it('Preserves mdat box when writing', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read()

      const originalAudio = MP3Tag.getAudioBuffer(mp4WithID32.buffer)

      mp3tag.tags.v2.TIT2 = 'Modified Title'
      mp3tag.save({ id3v2: { padding: 0 } })

      const newAudio = MP3Tag.getAudioBuffer(mp3tag.buffer)

      // Audio data should be preserved
      assert.strictEqual(originalAudio.byteLength, newAudio.byteLength)
    })

    it('Respects language option when writing', function () {
      const mp3tag = new MP3Tag(mp4WithoutID32.buffer)
      mp3tag.read()

      mp3tag.tags.v2 = { TIT2: 'English Title' }
      mp3tag.tags.v2Details = { version: [3, 0] }
      mp3tag.save({
        id3v2: { padding: 0 },
        mp4: { language: 'eng' }
      })

      assert.strictEqual(mp3tag.error, '')

      // Re-read to verify language
      mp3tag.read()
      assert.strictEqual(mp3tag.error, '')
      assert.strictEqual(mp3tag.tags.v2Details.mp4.language, 'eng')
    })
  })

  describe('MP4 Audio Buffer', function () {
    it('Extracts mdat contents as audio buffer', function () {
      const audio = MP3Tag.getAudioBuffer(mp4WithID32.buffer)
      assert.ok(audio)
      assert.strictEqual(audio.byteLength, 100) // mdat data size
    })
  })

  describe('Convenience Properties', function () {
    it('Title getter/setter works with MP4', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read()

      assert.strictEqual(mp3tag.tags.title, 'Test Title')

      mp3tag.tags.title = 'New Title'
      assert.strictEqual(mp3tag.tags.v2.TIT2, 'New Title')
    })

    it('Artist getter/setter works with MP4', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read()

      mp3tag.tags.v2.TPE1 = 'Test Artist'
      assert.strictEqual(mp3tag.tags.artist, 'Test Artist')

      mp3tag.tags.artist = 'New Artist'
      assert.strictEqual(mp3tag.tags.v2.TPE1, 'New Artist')
    })
  })

  describe('Edge Cases', function () {
    it('Handles MP4 option set to false', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.read({ mp4: false })

      // Should not read MP4 tags
      assert.strictEqual(mp3tag.tags.v2, undefined)
    })

    it('Throws error when writing without v2 tags', function () {
      const mp3tag = new MP3Tag(mp4WithID32.buffer)
      mp3tag.tags = {}

      mp3tag.save()
      assert.notStrictEqual(mp3tag.error, '')
    })
  })
})
