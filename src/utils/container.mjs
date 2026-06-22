
import * as ID3v2 from '../id3v2/index.mjs'
import { encoding2Index } from './strings.mjs'

/**
 * Build the ID3v2 options, validate, and encode the v2 tags into bytes.
 * Shared by the container/stream format encoders (MP4, AIFF, AAC) which only
 * differ in their default padding/unsynch values.
 * @param {object} tags - Tags object with `v2`/`v2Details`
 * @param {object} options - Write options ({ strict, id3v2 })
 * @param {object} [defaults] - Format-specific id3v2 defaults (e.g. padding)
 * @returns {Uint8Array} Encoded ID3v2 bytes
 */
export function encodeID3v2 (tags, options, defaults = {}) {
  const id3v2Options = {
    version: tags.v2Details ? tags.v2Details.version[0] : 3,
    padding: 0,
    unsynch: false,
    unsupported: false,
    encoding: 'utf-8',
    ...defaults,
    ...options.id3v2
  }

  id3v2Options.encodingIndex = encoding2Index(id3v2Options.encoding)

  if (options.strict !== false) {
    ID3v2.validate(tags.v2, options.strict, id3v2Options)
  }

  return new Uint8Array(ID3v2.encode(tags.v2, id3v2Options))
}
