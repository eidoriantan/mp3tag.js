
import BufferView from '../viewer.mjs'
import { isBitSet, bytesToLong } from '../utils/bytes.mjs'
import { ENCODINGS } from '../utils/strings.mjs'

export function textFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const len = view.byteLength - 1

  return version === 3 || version === 2
    ? view.getCString(1, encoding).string.replace(/\//g, '\\\\')
    : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\')
}

export function setFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const len = view.byteLength - 1

  return version === 3 || version === 2
    ? view.getCString(1, encoding).string
    : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\')
}

export function iplsFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const len = view.byteLength - 1

  return view.getString(1, len, encoding).string
    .replace(/\0/g, '\\\\')
}

export function urlFrame (buffer, version) {
  const view = new BufferView(buffer)
  return view.getCString(0).string
}

export function txxxFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const description = view.getCString(1, encoding)
  const valueOffset = description.length + 1
  const valueLength = view.byteLength - valueOffset
  const value = view.getString(valueOffset, valueLength, encoding)

  return { description: description.string, text: value.string }
}

export function wxxxFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const description = view.getCString(1, encoding)
  const urlOffset = description.length + 1
  const urlLength = view.byteLength - urlOffset
  const url = view.getString(urlOffset, urlLength)

  return { description: description.string, url: url.string }
}

export function langDescFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const descriptor = view.getCString(4, encoding)
  const textOffset = descriptor.length + 4
  const textLength = view.byteLength - textOffset
  const text = view.getString(textOffset, textLength, encoding)

  return {
    language: view.getString(1, 3).string,
    descriptor: descriptor.string,
    text: text.string
  }
}

export function win1251Frame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const length = view.byteLength - 1

  return view.getString(1, length, encoding).string
}

export function apicFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const mime = view.getCString(1)
  const type = view.getUint8(mime.length + 1)
  const desc = view.getCString(mime.length + 2, encoding)
  const dataOffset = mime.length + desc.length + 2
  const dataLength = view.byteLength - dataOffset
  const data = view.getUint8(dataOffset, dataLength)
  const dataArr = Array.isArray(data) ? data : [data]

  return {
    format: mime.string,
    type,
    description: desc.string,
    data: dataArr
  }
}

export function geobFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const mime = view.getCString(1)
  const fname = view.getCString(mime.length + 1, encoding)
  const desc = view.getCString(fname.length + mime.length + 1, encoding)
  const binOffset = mime.length + fname.length + desc.length + 1
  const binLength = view.byteLength - binOffset
  const object = view.getUint8(binOffset, binLength)
  const dataArr = Array.isArray(object) ? object : [object]

  return {
    format: mime.string,
    filename: fname.string,
    description: desc.string,
    object: dataArr
  }
}

export function ufidFrame (buffer, version) {
  const view = new BufferView(buffer)
  const ownerId = view.getCString(0)
  const id = view.getUint8(ownerId.length, view.byteLength - ownerId.length)
  const dataArr = Array.isArray(id) ? id : [id]

  return { ownerId: ownerId.string, id: dataArr }
}

export function userFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]

  return {
    language: view.getString(1, 3).string,
    text: view.getString(4, view.byteLength - 4, encoding).string
  }
}

export function owneFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const currencyCode = view.getString(1, 3)
  const currency = view.getCString(4)
  const date = view.getString(currency.length + 4, 8)
  const sellerOffset = currency.length + date.length + 4
  const sellerLength = view.byteLength - sellerOffset
  const seller = view.getString(sellerOffset, sellerLength, encoding)

  return {
    currencyCode: currencyCode.string,
    currencyPrice: currency.string,
    date: date.string,
    seller: seller.string
  }
}

export function privFrame (buffer, version) {
  const view = new BufferView(buffer)
  const ownerId = view.getCString(0)
  const data = view.getUint8(ownerId.length, view.byteLength - ownerId.length)
  const dataArr = Array.isArray(data) ? data : [data]

  return { ownerId: ownerId.string, data: dataArr }
}

export function rvadFrame (buffer, version) {
  const view = new BufferView(buffer)
  const incdec = view.getUint8(0)
  const bitsvolume = view.getUint8(1)
  const datablocks = []
  const blocklength = Math.ceil(bitsvolume / 8)

  for (let i = 2; i < view.byteLength; i += blocklength) {
    datablocks.push(view.getUint8(i, blocklength))
  }

  return {
    bitsvolume,
    incdec: {
      right: isBitSet(incdec, 0),
      left: isBitSet(incdec, 1),
      rightback: isBitSet(incdec, 2),
      leftback: isBitSet(incdec, 3),
      center: isBitSet(incdec, 4),
      bass: isBitSet(incdec, 5)
    },
    volumechange: {
      right: typeof datablocks[0] !== 'undefined' ? datablocks[0] : [],
      left: typeof datablocks[1] !== 'undefined' ? datablocks[1] : [],
      rightback: typeof datablocks[4] !== 'undefined' ? datablocks[4] : [],
      leftback: typeof datablocks[5] !== 'undefined' ? datablocks[5] : [],
      center: typeof datablocks[8] !== 'undefined' ? datablocks[8] : [],
      bass: typeof datablocks[10] !== 'undefined' ? datablocks[10] : []
    },
    peakvolume: {
      right: typeof datablocks[2] !== 'undefined' ? datablocks[2] : [],
      left: typeof datablocks[3] !== 'undefined' ? datablocks[3] : [],
      rightback: typeof datablocks[6] !== 'undefined' ? datablocks[6] : [],
      leftback: typeof datablocks[7] !== 'undefined' ? datablocks[7] : [],
      center: typeof datablocks[9] !== 'undefined' ? datablocks[9] : [],
      bass: typeof datablocks[11] !== 'undefined' ? datablocks[11] : []
    }
  }
}

export function rva2Frame (buffer, version) {
  const view = new BufferView(buffer)
  const identification = view.getCString(0)
  const channels = []
  let read = identification.length

  while (read < view.byteLength) {
    const type = view.getUint8(read)
    const volumeadjust = view.getInt16(read + 1, true)
    const bitspeak = view.getUint8(read + 3)
    const length = Math.ceil(bitspeak / 8)
    const peakvolume = view.getUint8(read + 4, length)

    channels.push({
      type,
      volumeadjust,
      bitspeak,
      peakvolume: Array.isArray(peakvolume) ? peakvolume : [peakvolume]
    })

    read += 4 + length
  }

  return {
    identification: identification.string,
    channels
  }
}

export function signFrame (buffer, version) {
  const view = new BufferView(buffer)
  const data = view.getUint8(1, view.byteLength - 1)
  const dataArr = Array.isArray(data) ? data : [data]

  return {
    group: view.getUint8(0),
    signature: dataArr
  }
}

export function seekFrame (buffer, version) {
  const view = new BufferView(buffer)
  return view.getUint32(0)
}

function formatted (time, line) {
  const minutes = Math.floor(time / 60000).toString()
  let seconds = Math.floor(time % 60000 / 1000).toString()
  seconds = seconds.length === 1 ? '0' + seconds : seconds
  let ms = (time % 1000).toString()
  while (ms.length < 3) ms = '0' + ms
  return `[${minutes}:${seconds}.${ms}] ${line}\n`
}

export function syltFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[view.getUint8(0)]
  const language = view.getString(1, 3).string
  const format = view.getUint8(4)
  const type = view.getUint8(5)
  const _descriptor = view.getCString(6, encoding)
  const descriptor = _descriptor.string
  const dataOffset = _descriptor.length + 6
  const length = view.byteLength - dataOffset

  const raw = view.getUint8(dataOffset, length)
  const rview = new BufferView(Array.isArray(raw) ? raw : [raw])
  const data = []
  let lyrics = ''
  for (let i = 0; i < raw.length; i += 4) {
    const _line = rview.getCString(i, encoding)
    const line = _line.string
    const time = rview.getUint32(i + _line.length)
    data.push({ time, line })
    lyrics += formatted(time, line)
    i += _line.length
  }

  return {
    language,
    format,
    type,
    descriptor,
    data,
    lyrics
  }
}

export function mcdiFrame (buffer, version) {
  const view = new BufferView(buffer)
  const data = view.getUint8(0, view.byteLength)
  const dataArr = Array.isArray(data) ? data : [data]
  return { data: dataArr }
}

export function sytcFrame (buffer, version) {
  const view = new BufferView(buffer)
  const format = view.getUint8(0)
  const raw = view.getUint8(1, view.byteLength - 1)
  const rview = new BufferView(Array.isArray(raw) ? raw : [raw])
  const data = []
  for (let i = 0; i < raw.length; i += 5) {
    let bpm = rview.getUint8(i)
    if (bpm === 255) {
      bpm += rview.getUint8(++i)
    }
    const time = rview.getUint32(i + 1)
    data.push({ bpm, time })
  }
  return {
    format,
    data
  }
}

export function etcoFrame (buffer, version) {
  const view = new BufferView(buffer)
  const format = view.getUint8(0)
  const raw = view.getUint8(1, view.byteLength - 1)
  const rview = new BufferView(Array.isArray(raw) ? raw : [raw])
  const data = []
  for (let i = 0; i < raw.length; i += 5) {
    const event = rview.getUint8(i)
    const time = rview.getUint32(i + 1)
    data.push({ event, time })
  }
  return {
    format,
    data
  }
}

export function pcntFrame (buffer, version) {
  const view = new BufferView(buffer)
  const data = view.getUint8(0, view.byteLength)
  const dataArr = Array.isArray(data) ? data : [data]
  return bytesToLong(dataArr).toString()
}

export function popmFrame (buffer, version) {
  const view = new BufferView(buffer)
  const encoding = ENCODINGS[0]
  const email = view.getCString(0, encoding)
  const rating = view.getUint8(email.length)
  const counterOffset = email.length + 1
  const counterLimit = buffer.byteLength - counterOffset
  let counter = 0

  if (counterLimit > 0) {
    const counterBytes = view.getUint8(counterOffset, counterLimit)
    const counterBytesArr = Array.isArray(counterBytes) ? counterBytes : [counterBytes]
    counter = bytesToLong(counterBytesArr)
  }

  return { email: email.string, rating, counter }
}
