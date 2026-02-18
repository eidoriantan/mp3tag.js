
import { createPrependHandler } from '../prepend/index.mjs'

function detect (view, offset) {
  if (offset + 12 > view.byteLength) return false
  // 'RIFF' at offset 0, 'WAVE' at offset 8
  return view.getUint8(offset) === 0x52 &&
    view.getUint8(offset + 1) === 0x49 &&
    view.getUint8(offset + 2) === 0x46 &&
    view.getUint8(offset + 3) === 0x46 &&
    view.getUint8(offset + 8) === 0x57 &&
    view.getUint8(offset + 9) === 0x41 &&
    view.getUint8(offset + 10) === 0x56 &&
    view.getUint8(offset + 11) === 0x45
}

const handler = createPrependHandler({
  detect,
  formatKey: 'wav',
  formatName: 'WAV'
})

export const hasWAV = handler.hasFormat
export const hasID3 = handler.hasID3
export const decode = handler.decode
export const validate = handler.validate
export const encode = handler.encode
export const getAudioBuffer = handler.getAudioBuffer
