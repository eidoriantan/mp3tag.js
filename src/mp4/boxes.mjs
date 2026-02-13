
import BufferView from '../viewer.mjs'
import { mergeBytes } from '../utils/bytes.mjs'

/**
 * Parse an MP4 box header at the given offset
 * @param {BufferView} view
 * @param {number} offset
 * @returns {{ size: number, type: string, headerSize: number, dataStart: number, end: number } | null}
 */
export function parseBoxHeader (view, offset) {
  if (offset + 8 > view.byteLength) return null

  let size = view.getUint32(offset)
  const type = view.getUint8String(offset + 4, 4)
  let headerSize = 8

  // Extended size (64-bit)
  if (size === 1) {
    if (offset + 16 > view.byteLength) return null
    // Read 64-bit size (we only support up to 32-bit for practical purposes)
    const highBits = view.getUint32(offset + 8)
    const lowBits = view.getUint32(offset + 12)
    if (highBits > 0) {
      // File too large to handle
      return null
    }
    size = lowBits
    headerSize = 16
  } else if (size === 0) {
    // Box extends to end of file
    size = view.byteLength - offset
  }

  return {
    size,
    type,
    headerSize,
    dataStart: offset + headerSize,
    end: offset + size
  }
}

/**
 * Find a box of the given type within a range
 * @param {BufferView} view
 * @param {number} start - Start offset
 * @param {number} end - End offset
 * @param {string} type - Box type to find (e.g., 'moov', 'mdat')
 * @returns {{ size: number, type: string, headerSize: number, dataStart: number, end: number, offset: number } | null}
 */
export function findBox (view, start, end, type) {
  let offset = start

  while (offset < end) {
    const box = parseBoxHeader(view, offset)
    if (!box) return null

    if (box.type === type) {
      return { ...box, offset }
    }

    offset = box.end
  }

  return null
}

/**
 * Navigate moov > udta > meta > ID32 box hierarchy
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {{ offset: number, size: number, dataStart: number, end: number, language: string, id3Offset: number, id3Size: number } | null}
 */
export function findID32Box (buffer) {
  const view = new BufferView(buffer)

  const moov = findBox(view, 0, view.byteLength, 'moov')
  if (!moov) return null

  const udta = findBox(view, moov.dataStart, moov.end, 'udta')
  if (!udta) return null

  const meta = findBox(view, udta.dataStart, udta.end, 'meta')
  if (!meta) return null

  // meta box has 4-byte version/flags after header
  const id32 = findBox(view, meta.dataStart + 4, meta.end, 'ID32')
  if (!id32) return null

  // ID32 box structure:
  // [4 bytes] size
  // [4 bytes] 'ID32'
  // [1 byte]  version (0)
  // [3 bytes] flags (0)
  // [3 bytes] language (packed 5-bit chars)
  // [N bytes] ID3v2 data
  const languageBytes = view.getUint8(id32.dataStart + 4, 2)
  const langValue = (languageBytes[0] << 8) | languageBytes[1]
  const language = decodeLanguage(langValue)

  const id3Offset = id32.dataStart + 4 + 2 // version/flags + language
  const id3Size = id32.end - id3Offset

  return {
    offset: id32.offset,
    size: id32.size,
    dataStart: id32.dataStart,
    end: id32.end,
    language,
    id3Offset,
    id3Size
  }
}

/**
 * Parse ID32 box and extract ID3v2 data
 * @param {BufferView} view
 * @param {number} offset - Start of ID32 box
 * @param {number} size - Size of ID32 box
 * @returns {{ language: string, id3Data: ArrayBuffer }}
 */
export function parseID32Box (view, offset, size) {
  // Skip header (8 bytes), version/flags (4 bytes)
  const dataStart = offset + 8
  const languageBytes = view.getUint8(dataStart + 4, 2)
  const langValue = (languageBytes[0] << 8) | languageBytes[1]
  const language = decodeLanguage(langValue)

  const id3Offset = dataStart + 4 + 2
  const id3Size = size - 8 - 4 - 2

  const id3Bytes = view.getUint8(id3Offset, id3Size)
  const id3Data = new Uint8Array(Array.isArray(id3Bytes) ? id3Bytes : [id3Bytes]).buffer

  return { language, id3Data }
}

/**
 * Build an ID32 box from ID3v2 data
 * @param {ArrayBuffer|Uint8Array} id3Data - Raw ID3v2 bytes
 * @param {string} language - ISO-639-2/T language code (default: 'und')
 * @returns {Uint8Array}
 */
export function buildID32Box (id3Data, language = 'und') {
  const id3Bytes = id3Data instanceof Uint8Array ? id3Data : new Uint8Array(id3Data)
  const langEncoded = encodeLanguage(language)

  // Box size: 8 (header) + 4 (version/flags) + 2 (language) + ID3 data
  const boxSize = 8 + 4 + 2 + id3Bytes.length

  const header = new BufferView(8)
  header.setUint32(0, boxSize)
  header.setUint8(4, 'I'.charCodeAt(0))
  header.setUint8(5, 'D'.charCodeAt(0))
  header.setUint8(6, '3'.charCodeAt(0))
  header.setUint8(7, '2'.charCodeAt(0))

  const versionFlags = new Uint8Array(4) // All zeros for version 0, flags 0

  const langBytes = new Uint8Array(2)
  langBytes[0] = (langEncoded >> 8) & 0xFF
  langBytes[1] = langEncoded & 0xFF

  return mergeBytes(
    new Uint8Array(header.buffer),
    versionFlags,
    langBytes,
    id3Bytes
  )
}

/**
 * Encode a 3-character ISO-639-2/T language code to packed 5-bit format
 * @param {string} lang - 3-character language code (e.g., 'und', 'eng')
 * @returns {number} - 16-bit packed value
 */
export function encodeLanguage (lang) {
  if (!lang || lang.length !== 3) lang = 'und'
  lang = lang.toLowerCase()

  const c1 = lang.charCodeAt(0) - 0x60
  const c2 = lang.charCodeAt(1) - 0x60
  const c3 = lang.charCodeAt(2) - 0x60

  return ((c1 & 0x1F) << 10) | ((c2 & 0x1F) << 5) | (c3 & 0x1F)
}

/**
 * Decode packed 5-bit language code to 3-character string
 * @param {number} packed - 16-bit packed value
 * @returns {string} - 3-character language code
 */
export function decodeLanguage (packed) {
  const c1 = ((packed >> 10) & 0x1F) + 0x60
  const c2 = ((packed >> 5) & 0x1F) + 0x60
  const c3 = (packed & 0x1F) + 0x60

  return String.fromCharCode(c1, c2, c3)
}

/**
 * Build a minimal moov/udta/meta structure with ID32 box
 * @param {Uint8Array} id32Box - The ID32 box data
 * @returns {Uint8Array}
 */
function buildMetaStructure (id32Box) {
  // hdlr box for meta (required by spec)
  const hdlrData = new BufferView(25)
  hdlrData.setUint32(0, 33) // size
  hdlrData.setUint8(4, 'h'.charCodeAt(0))
  hdlrData.setUint8(5, 'd'.charCodeAt(0))
  hdlrData.setUint8(6, 'l'.charCodeAt(0))
  hdlrData.setUint8(7, 'r'.charCodeAt(0))
  // version/flags: 0
  // pre_defined: 0
  hdlrData.setUint8(16, 'm'.charCodeAt(0))
  hdlrData.setUint8(17, 'd'.charCodeAt(0))
  hdlrData.setUint8(18, 'i'.charCodeAt(0))
  hdlrData.setUint8(19, 'r'.charCodeAt(0))
  // reserved: 0, 0, 0
  // name: null-terminated empty string (implicit with remaining zeros)

  const hdlrBox = new Uint8Array(33)
  new DataView(hdlrBox.buffer).setUint32(0, 33)
  hdlrBox[4] = 'h'.charCodeAt(0)
  hdlrBox[5] = 'd'.charCodeAt(0)
  hdlrBox[6] = 'l'.charCodeAt(0)
  hdlrBox[7] = 'r'.charCodeAt(0)
  // version/flags at 8-11: 0
  // pre_defined at 12-15: 0
  hdlrBox[16] = 'm'.charCodeAt(0)
  hdlrBox[17] = 'd'.charCodeAt(0)
  hdlrBox[18] = 'i'.charCodeAt(0)
  hdlrBox[19] = 'r'.charCodeAt(0)
  // reserved 20-31: 0
  hdlrBox[32] = 0 // name: null terminator

  // meta box: header (8) + version/flags (4) + hdlr + ID32
  const metaSize = 8 + 4 + hdlrBox.length + id32Box.length
  const metaHeader = new Uint8Array(12)
  new DataView(metaHeader.buffer).setUint32(0, metaSize)
  metaHeader[4] = 'm'.charCodeAt(0)
  metaHeader[5] = 'e'.charCodeAt(0)
  metaHeader[6] = 't'.charCodeAt(0)
  metaHeader[7] = 'a'.charCodeAt(0)
  // version/flags at 8-11: 0

  const metaBox = mergeBytes(metaHeader, hdlrBox, id32Box)

  // udta box: header (8) + meta
  const udtaSize = 8 + metaBox.length
  const udtaHeader = new Uint8Array(8)
  new DataView(udtaHeader.buffer).setUint32(0, udtaSize)
  udtaHeader[4] = 'u'.charCodeAt(0)
  udtaHeader[5] = 'd'.charCodeAt(0)
  udtaHeader[6] = 't'.charCodeAt(0)
  udtaHeader[7] = 'a'.charCodeAt(0)

  return mergeBytes(udtaHeader, metaBox)
}

/**
 * Rebuild MP4 buffer with new or updated ID32 box
 * @param {ArrayBuffer|Buffer} buffer - Original MP4 buffer
 * @param {Uint8Array} id32Box - New ID32 box
 * @returns {ArrayBuffer}
 */
export function rebuildMP4WithID32 (buffer, id32Box) {
  const view = new BufferView(buffer)
  const originalBytes = new Uint8Array(buffer)

  // Find existing structure
  const moov = findBox(view, 0, view.byteLength, 'moov')

  if (!moov) {
    throw new Error('No moov box found in MP4 file')
  }

  // Check for existing path
  const udta = findBox(view, moov.dataStart, moov.end, 'udta')
  const meta = udta ? findBox(view, udta.dataStart, udta.end, 'meta') : null
  const existingID32 = meta ? findBox(view, meta.dataStart + 4, meta.end, 'ID32') : null

  if (existingID32) {
    // Replace existing ID32 box
    return replaceID32Box(originalBytes, view, existingID32, id32Box)
  } else if (meta) {
    // Insert ID32 into existing meta box
    return insertID32IntoMeta(originalBytes, view, moov, udta, meta, id32Box)
  } else if (udta) {
    // Create meta with ID32 and insert into udta
    return insertMetaIntoUdta(originalBytes, view, moov, udta, id32Box)
  } else {
    // Create udta/meta/ID32 structure and insert into moov
    return insertUdtaIntoMoov(originalBytes, view, moov, id32Box)
  }
}

/**
 * Replace an existing ID32 box
 */
function replaceID32Box (originalBytes, view, existingID32, newID32Box) {
  const sizeDiff = newID32Box.length - existingID32.size

  // Build new buffer
  const beforeID32 = originalBytes.slice(0, existingID32.offset)
  const afterID32 = originalBytes.slice(existingID32.end)
  let result = mergeBytes(beforeID32, newID32Box, afterID32)

  // Update parent box sizes
  result = updateParentSizes(result, existingID32.offset, sizeDiff)

  // Update chunk offsets (stco/co64) that point to data after the change
  result = updateChunkOffsets(result, existingID32.offset, sizeDiff)

  return result.buffer
}

/**
 * Insert ID32 box into existing meta box
 */
function insertID32IntoMeta (originalBytes, view, moov, udta, meta, id32Box) {
  // Insert at end of meta box (before meta.end)
  const insertPoint = meta.end
  const sizeDiff = id32Box.length

  const before = originalBytes.slice(0, insertPoint)
  const after = originalBytes.slice(insertPoint)
  let result = mergeBytes(before, id32Box, after)

  // Update meta, udta, moov sizes
  result = updateBoxSize(result, meta.offset, meta.size + sizeDiff)
  result = updateBoxSize(result, udta.offset, udta.size + sizeDiff)
  result = updateBoxSize(result, moov.offset, moov.size + sizeDiff)

  // Update chunk offsets (stco/co64) that point to data after the insertion
  result = updateChunkOffsets(result, insertPoint, sizeDiff)

  return result.buffer
}

/**
 * Insert meta box (with ID32) into existing udta box
 */
function insertMetaIntoUdta (originalBytes, view, moov, udta, id32Box) {
  const metaStructure = buildMetaWithID32(id32Box)
  const insertPoint = udta.end
  const sizeDiff = metaStructure.length

  const before = originalBytes.slice(0, insertPoint)
  const after = originalBytes.slice(insertPoint)
  let result = mergeBytes(before, metaStructure, after)

  // Update udta, moov sizes
  result = updateBoxSize(result, udta.offset, udta.size + sizeDiff)
  result = updateBoxSize(result, moov.offset, moov.size + sizeDiff)

  // Update chunk offsets (stco/co64) that point to data after the insertion
  result = updateChunkOffsets(result, insertPoint, sizeDiff)

  return result.buffer
}

/**
 * Insert udta box (with meta/ID32) into moov box
 */
function insertUdtaIntoMoov (originalBytes, view, moov, id32Box) {
  const udtaStructure = buildMetaStructure(id32Box)
  const insertPoint = moov.end
  const sizeDiff = udtaStructure.length

  const before = originalBytes.slice(0, insertPoint)
  const after = originalBytes.slice(insertPoint)
  let result = mergeBytes(before, udtaStructure, after)

  // Update moov size
  result = updateBoxSize(result, moov.offset, moov.size + sizeDiff)

  // Update chunk offsets (stco/co64) that point to data after the insertion
  result = updateChunkOffsets(result, insertPoint, sizeDiff)

  return result.buffer
}

/**
 * Build a meta box containing only hdlr and ID32
 */
function buildMetaWithID32 (id32Box) {
  // hdlr box for meta
  const hdlrBox = new Uint8Array(33)
  new DataView(hdlrBox.buffer).setUint32(0, 33)
  hdlrBox[4] = 'h'.charCodeAt(0)
  hdlrBox[5] = 'd'.charCodeAt(0)
  hdlrBox[6] = 'l'.charCodeAt(0)
  hdlrBox[7] = 'r'.charCodeAt(0)
  hdlrBox[16] = 'm'.charCodeAt(0)
  hdlrBox[17] = 'd'.charCodeAt(0)
  hdlrBox[18] = 'i'.charCodeAt(0)
  hdlrBox[19] = 'r'.charCodeAt(0)
  hdlrBox[32] = 0

  // meta box: header (8) + version/flags (4) + hdlr + ID32
  const metaSize = 8 + 4 + hdlrBox.length + id32Box.length
  const metaHeader = new Uint8Array(12)
  new DataView(metaHeader.buffer).setUint32(0, metaSize)
  metaHeader[4] = 'm'.charCodeAt(0)
  metaHeader[5] = 'e'.charCodeAt(0)
  metaHeader[6] = 't'.charCodeAt(0)
  metaHeader[7] = 'a'.charCodeAt(0)

  return mergeBytes(metaHeader, hdlrBox, id32Box)
}

/**
 * Update a box's size field
 */
function updateBoxSize (bytes, offset, newSize) {
  const result = new Uint8Array(bytes)
  new DataView(result.buffer).setUint32(offset, newSize)
  return result
}

/**
 * Update parent box sizes after a size change
 */
function updateParentSizes (bytes, changedOffset, sizeDiff) {
  if (sizeDiff === 0) return bytes

  const view = new BufferView(bytes)
  const result = new Uint8Array(bytes)
  const resultView = new DataView(result.buffer)

  // Find and update moov
  const moov = findBox(view, 0, view.byteLength, 'moov')
  if (moov && changedOffset >= moov.offset && changedOffset < moov.end) {
    resultView.setUint32(moov.offset, moov.size + sizeDiff)

    // Find and update udta
    const udta = findBox(view, moov.dataStart, moov.end, 'udta')
    if (udta && changedOffset >= udta.offset && changedOffset < udta.end) {
      resultView.setUint32(udta.offset, udta.size + sizeDiff)

      // Find and update meta
      const meta = findBox(view, udta.dataStart, udta.end, 'meta')
      if (meta && changedOffset >= meta.offset && changedOffset < meta.end) {
        resultView.setUint32(meta.offset, meta.size + sizeDiff)
      }
    }
  }

  return result
}

/**
 * Find mdat box (contains audio data)
 * @param {ArrayBuffer|Buffer} buffer
 * @returns {{ offset: number, dataStart: number, size: number, end: number } | null}
 */
export function findMdatBox (buffer) {
  const view = new BufferView(buffer)
  return findBox(view, 0, view.byteLength, 'mdat')
}

/**
 * Find all stco (Sample Table Chunk Offset) boxes in a buffer
 * stco contains 32-bit absolute file offsets to media chunks
 * @param {BufferView} view
 * @returns {Array<{ offset: number, entryCount: number, entriesOffset: number }>}
 */
export function findStcoBoxes (view) {
  const boxes = []
  findStcoBoxesRecursive(view, 0, view.byteLength, boxes)
  return boxes
}

/**
 * Recursively search for stco boxes
 */
function findStcoBoxesRecursive (view, start, end, boxes) {
  let offset = start

  while (offset < end) {
    const box = parseBoxHeader(view, offset)
    if (!box) break

    if (box.type === 'stco') {
      // stco structure: header (8) + version/flags (4) + entry_count (4) + entries (4 bytes each)
      const entryCount = view.getUint32(box.dataStart + 4)
      boxes.push({
        offset: box.offset,
        size: box.size,
        entryCount,
        entriesOffset: box.dataStart + 8 // After version/flags and entry_count
      })
    } else if (box.type === 'co64') {
      // co64 structure: header (8) + version/flags (4) + entry_count (4) + entries (8 bytes each)
      const entryCount = view.getUint32(box.dataStart + 4)
      boxes.push({
        offset: box.offset,
        size: box.size,
        entryCount,
        entriesOffset: box.dataStart + 8,
        is64bit: true
      })
    } else if (isContainerBox(box.type)) {
      // Recurse into container boxes
      let childStart = box.dataStart
      // meta box has 4 extra bytes for version/flags
      if (box.type === 'meta') {
        childStart += 4
      }
      findStcoBoxesRecursive(view, childStart, box.end, boxes)
    }

    offset = box.end
  }
}

/**
 * Check if a box type is a container that can have children
 */
function isContainerBox (type) {
  const containers = ['moov', 'trak', 'mdia', 'minf', 'stbl', 'udta', 'meta', 'edts', 'dinf']
  return containers.includes(type)
}

/**
 * Update all chunk offsets (stco/co64) by a delta value
 * This must be called after inserting/removing data that shifts the mdat position
 * @param {Uint8Array} bytes - The buffer to modify
 * @param {number} insertionPoint - The offset where data was inserted
 * @param {number} delta - The size change (positive for insertion, negative for removal)
 * @returns {Uint8Array}
 */
export function updateChunkOffsets (bytes, insertionPoint, delta) {
  if (delta === 0) return bytes

  const view = new BufferView(bytes)
  const result = new Uint8Array(bytes)
  const resultView = new DataView(result.buffer)

  const stcoBoxes = findStcoBoxes(view)

  for (const stco of stcoBoxes) {
    for (let i = 0; i < stco.entryCount; i++) {
      if (stco.is64bit) {
        // 64-bit offsets
        const offsetPos = stco.entriesOffset + (i * 8)
        const highBits = view.getUint32(offsetPos)
        const lowBits = view.getUint32(offsetPos + 4)
        // For simplicity, only handle offsets that fit in 32 bits
        if (highBits === 0) {
          const chunkOffset = lowBits
          // Only update offsets that are after the insertion point
          if (chunkOffset >= insertionPoint) {
            const newOffset = chunkOffset + delta
            resultView.setUint32(offsetPos, 0)
            resultView.setUint32(offsetPos + 4, newOffset)
          }
        }
      } else {
        // 32-bit offsets
        const offsetPos = stco.entriesOffset + (i * 4)
        const chunkOffset = view.getUint32(offsetPos)
        // Only update offsets that are after the insertion point
        if (chunkOffset >= insertionPoint) {
          resultView.setUint32(offsetPos, chunkOffset + delta)
        }
      }
    }
  }

  return result
}
