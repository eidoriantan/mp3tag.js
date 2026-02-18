
import BufferView from '../viewer.mjs'
import * as ID3v2 from '../id3v2/index.mjs'
import { mergeBytes } from '../utils/bytes.mjs'
import { encoding2Index } from '../utils/strings.mjs'

/**
 * Factory for creating format handlers that use prepended ID3v2 tags.
 * All handlers follow the same pattern: ID3v2 tag sits before the audio data.
 *
 * @param {object} config
 * @param {function} config.detect - (view, offset) => boolean, checks magic bytes at offset
 * @param {string} config.formatKey - key in details object (e.g. 'flac')
 * @param {string} config.formatName - human-readable name (e.g. 'FLAC')
 * @returns {{ hasFormat, hasID3, decode, validate, encode, getAudioBuffer }}
 */
export function createPrependHandler ({ detect, formatKey, formatName }) {
  function hasFormat (buffer) {
    const view = new BufferView(buffer)
    if (view.byteLength < 4) return false

    let offset = 0

    // Skip ID3v2 tag if present
    if (ID3v2.hasID3v2(buffer)) {
      const { details } = ID3v2.decode(buffer)
      offset = details.size + 10
    }

    return detect(view, offset)
  }

  function hasID3 (buffer) {
    return ID3v2.hasID3v2(buffer)
  }

  function decode (buffer, options = {}) {
    const { unsupported = false } = options

    if (!ID3v2.hasID3v2(buffer)) {
      return null
    }

    const { tags, details } = ID3v2.decode(buffer, 0, unsupported)

    details[formatKey] = {
      format: formatName
    }

    return { tags, details }
  }

  function validate (tags, strict, options) {
    return ID3v2.validate(tags, strict, options)
  }

  function encode (buffer, tags, options = {}) {
    const defaultVersion = tags.v2Details ? tags.v2Details.version[0] : 3
    const defaultEncoding = 'utf-8'

    const id3v2Options = {
      version: defaultVersion,
      padding: options.id3v2?.padding ?? 1024,
      unsynch: true,
      unsupported: false,
      encoding: defaultEncoding,
      ...options.id3v2
    }

    id3v2Options.encodingIndex = encoding2Index(id3v2Options.encoding)

    if (options.strict !== false) {
      ID3v2.validate(tags.v2, options.strict, id3v2Options)
    }

    // Get audio data without existing ID3 tags
    const audioData = new Uint8Array(getAudioBuffer(buffer))

    // Encode new ID3v2 tag
    const id3Data = new Uint8Array(ID3v2.encode(tags.v2, id3v2Options))

    // Prepend ID3v2 tag to audio
    const result = mergeBytes(id3Data, audioData)

    return typeof Buffer !== 'undefined' ? Buffer.from(result.buffer) : result.buffer
  }

  function getAudioBuffer (buffer) {
    const view = new BufferView(buffer)
    let offset = 0

    // Skip ID3v2 tag if present
    if (ID3v2.hasID3v2(buffer)) {
      const { details } = ID3v2.decode(buffer)
      offset = details.size + 10
    }

    // Find first occurrence of format magic bytes
    while (offset < view.byteLength) {
      if (detect(view, offset)) {
        break
      }
      offset++
    }

    const sliced = buffer.slice(offset)
    return typeof Buffer !== 'undefined' ? Buffer.from(sliced) : sliced
  }

  return { hasFormat, hasID3, decode, validate, encode, getAudioBuffer }
}
