
import { createPrependHandler } from '../prepend/index.mjs'

function detect (view, offset) {
  if (offset + 4 > view.byteLength) return false
  return view.getUint8(offset) === 0x77 &&
    view.getUint8(offset + 1) === 0x76 &&
    view.getUint8(offset + 2) === 0x70 &&
    view.getUint8(offset + 3) === 0x6B
}

const handler = createPrependHandler({
  detect,
  formatKey: 'wavpack',
  formatName: 'WavPack'
})

export const hasWavPack = handler.hasFormat
export const hasID3 = handler.hasID3
export const decode = handler.decode
export const validate = handler.validate
export const encode = handler.encode
export const getAudioBuffer = handler.getAudioBuffer
