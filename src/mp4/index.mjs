
import BufferView from '../viewer.mjs'
import * as ID3v2 from '../id3v2/index.mjs'
import { encoding2Index } from '../utils/strings.mjs'

import {
  findID32Box,
  buildID32Box,
  rebuildMP4WithID32,
  findMdatBox,
  findBox
} from './boxes.mjs'

/**
 * Detect if buffer is an MP4 container by checking for 'ftyp' box
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {boolean}
 */
export function hasMP4 (buffer) {
  const view = new BufferView(buffer)
  if (view.byteLength < 8) return false
  return view.getUint8String(4, 4) === 'ftyp'
}

/**
 * Check if MP4 buffer contains an ID32 box
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {boolean}
 */
export function hasID32 (buffer) {
  return findID32Box(buffer) !== null
}

/**
 * Decode ID3v2 tags from MP4 ID32 box
 * @param {ArrayBuffer|Buffer} buffer
 * @param {object} options
 * @param {boolean} [options.unsupported=false] - Parse unsupported frames
 * @returns {{ tags: object, details: object } | null}
 */
export function decode (buffer, options = {}) {
  const { unsupported = false } = options

  const id32Info = findID32Box(buffer)
  if (!id32Info) return null

  const view = new BufferView(buffer)

  // Extract raw ID3v2 data from ID32 box
  const id3Bytes = view.getUint8(id32Info.id3Offset, id32Info.id3Size)
  const id3Data = new Uint8Array(Array.isArray(id3Bytes) ? id3Bytes : [id3Bytes]).buffer

  // Verify ID3v2 header exists
  if (!ID3v2.hasID3v2(id3Data)) {
    return null
  }

  // Decode using existing ID3v2 decoder
  const { tags, details } = ID3v2.decode(id3Data, 0, unsupported)

  // Add MP4-specific details
  details.mp4 = {
    language: id32Info.language,
    id32Offset: id32Info.offset,
    id32Size: id32Info.size
  }

  return { tags, details }
}

/**
 * Validate tags for writing to MP4
 * @param {object} tags - ID3v2 tags object
 * @param {boolean} strict - Strict validation mode
 * @param {object} options - Write options
 * @returns {boolean}
 */
export function validate (tags, strict, options) {
  return ID3v2.validate(tags, strict, options)
}

/**
 * Encode ID3v2 tags into MP4 buffer with ID32 box
 * @param {ArrayBuffer|Buffer} buffer - Original MP4 buffer
 * @param {object} tags - Tags object with v2 property
 * @param {object} options
 * @param {boolean} [options.strict=false] - Strict validation
 * @param {string} [options.encoding='utf-8'] - Text encoding
 * @param {object} [options.id3v2] - ID3v2 options
 * @param {object} [options.mp4] - MP4-specific options
 * @param {string} [options.mp4.language='und'] - ISO-639-2/T language code
 * @returns {ArrayBuffer}
 */
export function encode (buffer, tags, options = {}) {
  const defaultVersion = tags.v2Details ? tags.v2Details.version[0] : 3
  const defaultEncoding = 'utf-8'

  const id3v2Options = {
    version: defaultVersion,
    padding: 0, // No padding needed in ID32 box
    unsynch: false,
    unsupported: false,
    encoding: defaultEncoding,
    ...options.id3v2
  }

  id3v2Options.encodingIndex = encoding2Index(id3v2Options.encoding)

  const mp4Options = {
    language: 'und',
    ...options.mp4
  }

  // Validate tags
  if (options.strict !== false) {
    ID3v2.validate(tags.v2, options.strict, id3v2Options)
  }

  // Encode ID3v2 data
  const id3Data = ID3v2.encode(tags.v2, id3v2Options)

  // Build ID32 box
  const id32Box = buildID32Box(id3Data, mp4Options.language)

  // Rebuild MP4 with new ID32 box
  return rebuildMP4WithID32(buffer, id32Box)
}

/**
 * Get audio buffer from MP4 (extract mdat contents)
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {ArrayBuffer}
 */
export function getAudioBuffer (buffer) {
  const mdat = findMdatBox(buffer)
  if (!mdat) {
    // Return the original buffer if no mdat found
    return buffer
  }

  const view = new BufferView(buffer)
  const audioBytes = view.getUint8(mdat.dataStart, mdat.end - mdat.dataStart)
  const audioData = new Uint8Array(Array.isArray(audioBytes) ? audioBytes : [audioBytes])

  return typeof Buffer !== 'undefined' ? Buffer.from(audioData.buffer) : audioData.buffer
}

/**
 * Get the full MP4 buffer without ID32 tags (for rewriting)
 * This removes the ID32 box but keeps the rest of the MP4 structure intact
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {ArrayBuffer}
 */
export function getMP4WithoutID32 (buffer) {
  const id32Info = findID32Box(buffer)
  if (!id32Info) {
    // No ID32 to remove
    return buffer
  }

  const originalBytes = new Uint8Array(buffer)
  const view = new BufferView(buffer)

  // Find parent boxes to update their sizes
  const moov = findBox(view, 0, view.byteLength, 'moov')
  const udta = moov ? findBox(view, moov.dataStart, moov.end, 'udta') : null
  const meta = udta ? findBox(view, udta.dataStart, udta.end, 'meta') : null

  if (!moov || !udta || !meta) {
    return buffer
  }

  const sizeDiff = -id32Info.size

  // Remove ID32 box
  const before = originalBytes.slice(0, id32Info.offset)
  const after = originalBytes.slice(id32Info.end)
  const merged = new Uint8Array(before.length + after.length)
  merged.set(before, 0)
  merged.set(after, before.length)

  // Update parent box sizes
  const resultView = new DataView(merged.buffer)
  resultView.setUint32(meta.offset, meta.size + sizeDiff)
  resultView.setUint32(udta.offset, udta.size + sizeDiff)
  resultView.setUint32(moov.offset, moov.size + sizeDiff)

  return typeof Buffer !== 'undefined' ? Buffer.from(merged.buffer) : merged.buffer
}
