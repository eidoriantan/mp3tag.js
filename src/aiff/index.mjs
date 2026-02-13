
import BufferView from '../viewer.mjs'
import * as ID3v2 from '../id3v2/index.mjs'
import { mergeBytes } from '../utils/bytes.mjs'
import { encoding2Index } from '../utils/strings.mjs'

/**
 * AIFF File Structure:
 * - "FORM" (4 bytes)
 * - Total size (4 bytes, big-endian) - size of file minus 8
 * - "AIFF" or "AIFC" (4 bytes)
 * - Chunks: each has 4-byte ID, 4-byte size (big-endian), data (padded to even)
 * - ID3v2 tags are stored in "ID3 " chunk (note trailing space)
 */

/**
 * Detect if buffer is an AIFF file
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {boolean}
 */
export function hasAIFF (buffer) {
  const view = new BufferView(buffer)
  if (view.byteLength < 12) return false

  const form = view.getUint8String(0, 4)
  const type = view.getUint8String(8, 4)

  return form === 'FORM' && (type === 'AIFF' || type === 'AIFC')
}

/**
 * Check if AIFF buffer contains an ID3 chunk
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {boolean}
 */
export function hasID3 (buffer) {
  return findID3Chunk(buffer) !== null
}

/**
 * Find the ID3 chunk in an AIFF file
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {{ offset: number, size: number, dataOffset: number } | null}
 */
export function findID3Chunk (buffer) {
  const view = new BufferView(buffer)
  if (view.byteLength < 12) return null

  // Skip FORM header (4) + size (4) + AIFF/AIFC (4)
  let offset = 12
  const fileEnd = view.byteLength

  while (offset + 8 <= fileEnd) {
    const chunkId = view.getUint8String(offset, 4)
    const chunkSize = view.getUint32(offset + 4)

    if (chunkId === 'ID3 ') {
      return {
        offset,
        size: chunkSize,
        dataOffset: offset + 8
      }
    }

    // Move to next chunk (chunks are padded to even byte boundaries)
    offset += 8 + chunkSize
    if (chunkSize % 2 !== 0) offset += 1
  }

  return null
}

/**
 * Decode ID3v2 tags from AIFF ID3 chunk
 * @param {ArrayBuffer|Buffer} buffer
 * @param {object} options
 * @param {boolean} [options.unsupported=false]
 * @returns {{ tags: object, details: object } | null}
 */
export function decode (buffer, options = {}) {
  const { unsupported = false } = options

  const id3Chunk = findID3Chunk(buffer)
  if (!id3Chunk) return null

  const view = new BufferView(buffer)
  const id3Bytes = view.getUint8(id3Chunk.dataOffset, id3Chunk.size)

  // getUint8 returns false if out of bounds
  if (id3Bytes === false) return null

  // Convert to array if single byte
  const bytesArray = Array.isArray(id3Bytes) ? id3Bytes : [id3Bytes]
  if (bytesArray.length === 0) return null

  const id3Data = new Uint8Array(bytesArray).buffer

  if (!ID3v2.hasID3v2(id3Data)) {
    return null
  }

  const { tags, details } = ID3v2.decode(id3Data, 0, unsupported)

  details.aiff = {
    chunkOffset: id3Chunk.offset,
    chunkSize: id3Chunk.size
  }

  return { tags, details }
}

/**
 * Validate tags for writing to AIFF
 * @param {object} tags
 * @param {boolean} strict
 * @param {object} options
 * @returns {boolean}
 */
export function validate (tags, strict, options) {
  return ID3v2.validate(tags, strict, options)
}

/**
 * Encode ID3v2 tags into AIFF buffer
 * @param {ArrayBuffer|Buffer} buffer
 * @param {object} tags
 * @param {object} options
 * @returns {ArrayBuffer}
 */
export function encode (buffer, tags, options = {}) {
  const defaultVersion = tags.v2Details ? tags.v2Details.version[0] : 3
  const defaultEncoding = 'utf-8'

  const id3v2Options = {
    version: defaultVersion,
    padding: 0,
    unsynch: false,
    unsupported: false,
    encoding: defaultEncoding,
    ...options.id3v2
  }

  id3v2Options.encodingIndex = encoding2Index(id3v2Options.encoding)

  if (options.strict !== false) {
    ID3v2.validate(tags.v2, options.strict, id3v2Options)
  }

  const id3Data = new Uint8Array(ID3v2.encode(tags.v2, id3v2Options))
  const id3Chunk = buildID3Chunk(id3Data)

  return rebuildAIFFWithID3(buffer, id3Chunk)
}

/**
 * Build an ID3 chunk for AIFF
 * @param {Uint8Array} id3Data
 * @returns {Uint8Array}
 */
function buildID3Chunk (id3Data) {
  const chunkSize = id3Data.length
  const header = new BufferView(8)

  // Chunk ID: "ID3 " (with trailing space)
  header.setUint8(0, 'I'.charCodeAt(0))
  header.setUint8(1, 'D'.charCodeAt(0))
  header.setUint8(2, '3'.charCodeAt(0))
  header.setUint8(3, ' '.charCodeAt(0))

  // Chunk size (big-endian)
  header.setUint32(4, chunkSize)

  // Pad to even length if necessary
  if (chunkSize % 2 !== 0) {
    return mergeBytes(new Uint8Array(header.buffer), id3Data, [0])
  }

  return mergeBytes(new Uint8Array(header.buffer), id3Data)
}

/**
 * Rebuild AIFF buffer with new ID3 chunk
 * @param {ArrayBuffer|Buffer} buffer
 * @param {Uint8Array} id3Chunk
 * @returns {ArrayBuffer}
 */
function rebuildAIFFWithID3 (buffer, id3Chunk) {
  const originalBytes = new Uint8Array(buffer)

  const existingID3 = findID3Chunk(buffer)

  let newBytes
  if (existingID3) {
    // Calculate existing chunk total size (including padding)
    let existingChunkTotal = 8 + existingID3.size
    if (existingID3.size % 2 !== 0) existingChunkTotal += 1

    // Replace existing ID3 chunk
    const before = originalBytes.slice(0, existingID3.offset)
    const after = originalBytes.slice(existingID3.offset + existingChunkTotal)
    newBytes = mergeBytes(before, id3Chunk, after)
  } else {
    // Append ID3 chunk at the end (before any padding)
    newBytes = mergeBytes(originalBytes, id3Chunk)
  }

  // Update FORM size field
  const newSize = newBytes.length - 8
  const result = new Uint8Array(newBytes)
  new DataView(result.buffer).setUint32(4, newSize)

  return typeof Buffer !== 'undefined' ? Buffer.from(result.buffer) : result.buffer
}

/**
 * Get audio data from AIFF (returns the entire file as AIFF is a container)
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {ArrayBuffer}
 */
export function getAudioBuffer (buffer) {
  // For AIFF, return the whole file as the audio is interleaved with metadata
  return buffer
}
