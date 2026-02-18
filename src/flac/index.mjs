
import { createPrependHandler } from '../prepend/index.mjs'

function detect (view, offset) {
  if (offset + 4 > view.byteLength) return false
  return view.getUint8(offset) === 0x66 &&
    view.getUint8(offset + 1) === 0x4C &&
    view.getUint8(offset + 2) === 0x61 &&
    view.getUint8(offset + 3) === 0x43
}

const handler = createPrependHandler({
  detect,
  formatKey: 'flac',
  formatName: 'FLAC'
})

export const hasFLAC = handler.hasFormat
export const hasID3 = handler.hasID3
export const decode = handler.decode
export const validate = handler.validate
export const encode = handler.encode
export const getAudioBuffer = handler.getAudioBuffer
