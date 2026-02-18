
import { createPrependHandler } from '../prepend/index.mjs'

function detect (view, offset) {
  if (offset + 4 > view.byteLength) return false
  // 'MAC ' (with trailing space)
  return view.getUint8(offset) === 0x4D &&
    view.getUint8(offset + 1) === 0x41 &&
    view.getUint8(offset + 2) === 0x43 &&
    view.getUint8(offset + 3) === 0x20
}

const handler = createPrependHandler({
  detect,
  formatKey: 'ape',
  formatName: 'APE'
})

export const hasAPE = handler.hasFormat
export const hasID3 = handler.hasID3
export const decode = handler.decode
export const validate = handler.validate
export const encode = handler.encode
export const getAudioBuffer = handler.getAudioBuffer
