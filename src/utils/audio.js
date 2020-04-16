
import BufferView from '../viewer'

export function getAudio (buffer) {
  if (!BufferView.isViewable(buffer)) {
    throw new TypeError('buffer is not viewable')
  }

  const view = new BufferView(buffer)
  let start = null
  let end = view.byteLength
  let i = 0

  while (i < view.byteLength) {
    if (view.getUint8(i) === 0xff && view.getUint8(i + 1) === 0xfb) {
      start = i
      break
    } else i++
  }

  const tag = end - 128
  if (tag > -1 && view.getString(tag, 3, 'ascii').string === 'TAG') {
    end -= 128
  }

  return start !== null ? view.buffer.slice(start, end) : new ArrayBuffer(0)
}
