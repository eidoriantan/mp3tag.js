
import BufferView from '../viewer.mjs'
import * as ID3v2 from '../id3v2/index.mjs'
import { mergeBytes } from '../utils/bytes.mjs'
import { encodeID3v2 } from '../utils/container.mjs'

/**
 * AAC/ADTS File Structure:
 * - Optional ID3v2 tag at beginning (like MP3)
 * - ADTS frames, each starting with sync word 0xFFF (12 bits)
 * - ADTS header is 7 bytes (no CRC) or 9 bytes (with CRC)
 *
 * ID3v2 tags are prepended to the file, same as MP3.
 */

/**
 * Detect if buffer is an AAC/ADTS file
 * Checks for ADTS sync word (0xFFF) after skipping any ID3v2 header
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {boolean}
 */
export function hasAAC (buffer) {
  const view = new BufferView(buffer)
  if (view.byteLength < 4) return false

  let offset = 0

  // Skip ID3v2 tag if present
  if (ID3v2.hasID3v2(buffer)) {
    const { details } = ID3v2.decode(buffer)
    offset = details.size + 10 // ID3v2 header (10) + tag size
  }

  // Check for ADTS sync word: 0xFFF (first 12 bits)
  if (offset + 2 > view.byteLength) return false

  const syncWord = (view.getUint8(offset) << 4) | (view.getUint8(offset + 1) >> 4)
  if (syncWord !== 0xFFF) return false

  // ADTS has layer bits = 00 (bits 1-2 of byte 1), while MP3 has layer 01/10/11
  // This distinguishes ADTS from MP3 which also has 0xFFF sync
  const layer = (view.getUint8(offset + 1) >> 1) & 0x03
  return layer === 0
}

/**
 * Check if AAC buffer has ID3v2 tag
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {boolean}
 */
export function hasID3 (buffer) {
  return ID3v2.hasID3v2(buffer)
}

/**
 * Decode ID3v2 tags from AAC file
 * @param {ArrayBuffer|Buffer} buffer
 * @param {object} options
 * @param {boolean} [options.unsupported=false]
 * @returns {{ tags: object, details: object } | null}
 */
export function decode (buffer, options = {}) {
  const { unsupported = false } = options

  if (!ID3v2.hasID3v2(buffer)) {
    return null
  }

  const { tags, details } = ID3v2.decode(buffer, 0, unsupported)

  details.aac = {
    format: 'ADTS'
  }

  return { tags, details }
}

/**
 * Encode ID3v2 tags into AAC buffer
 * @param {ArrayBuffer|Buffer} buffer
 * @param {object} tags
 * @param {object} options
 * @returns {ArrayBuffer}
 */
export function encode (buffer, tags, options = {}) {
  // Unsynchronisation is recommended for AAC; default to 1024 bytes of padding
  const id3Data = encodeID3v2(tags, options, { padding: 1024, unsynch: true })

  // Get audio data without existing ID3 tags
  const audioData = new Uint8Array(getAudioBuffer(buffer))

  // Prepend ID3v2 tag to audio
  const result = mergeBytes(id3Data, audioData)

  return typeof Buffer !== 'undefined' ? Buffer.from(result.buffer) : result.buffer
}

/**
 * Get audio buffer without ID3 tags
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {ArrayBuffer}
 */
export function getAudioBuffer (buffer) {
  const view = new BufferView(buffer)
  let offset = 0

  // Skip ID3v2 tag if present
  if (ID3v2.hasID3v2(buffer)) {
    const { details } = ID3v2.decode(buffer)
    offset = details.size + 10
  }

  // Find first ADTS sync word
  while (offset + 2 <= view.byteLength) {
    const syncWord = (view.getUint8(offset) << 4) | (view.getUint8(offset + 1) >> 4)
    if (syncWord === 0xFFF) {
      break
    }
    offset++
  }

  const sliced = buffer.slice(offset)
  return typeof Buffer !== 'undefined' ? Buffer.from(sliced) : sliced
}
