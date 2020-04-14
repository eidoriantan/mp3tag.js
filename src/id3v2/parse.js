
import BufferView from '../viewer'
import TagError from '../error'

const ENCODINGS = ['ascii', 'utf-16', 'utf-16be', 'utf-8']

/**
 *  Frame Parsers
 *  @param {BufferView} view - View of the frame excluding the header
 *  @param {number} version - Frame will be parsed according to this version
 */

export function textFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  let value

  switch (version) {
    case 3:
      value = view.getCString(1, encoding).string.split('/')
      break

    case 4:
      value = view.getString(1, view.byteLength - 1, encoding).string
        .split('\0')
      break

    default:
      throw new TagError(201, version)
  }

  return value.length === 1 ? value[0] : value
}

export function numberFrame (view, version) {
  const value = textFrame(view, version)
  const toNumber = function (string) {
    return string.match(/^(\d+)$/) !== null ? parseInt(string) : string
  }

  return Array.isArray(value) ? value.map(elem => toNumber(elem))
    : toNumber(value)
}

export function setFrame (view, version) {
  const value = textFrame(view, version)
  const toSet = function (object) {
    const set = {}
    const splitted = object.split('/')

    if (splitted[0]) set.position = parseInt(splitted[0])
    if (splitted[1]) set.total = parseInt(splitted[1])

    return set
  }

  return Array.isArray(value) ? value.map(elem => toSet(elem)) : toSet(value)
}

export function urlFrame (view, version) {
  return view.getCString(0, 'ascii').string
}

export function txxxFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const description = view.getCString(1, encoding)
  const valueOffset = description.length + 1
  const valueLength = view.byteLength - valueOffset
  const value = view.getString(valueOffset, valueLength, encoding)

  return { description: description.string, text: value.string }
}

export function wxxxFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const description = view.getCString(1, encoding)
  const urlOffset = description.length + 1
  const urlLength = view.byteLength - urlOffset
  const url = view.getString(urlOffset, urlLength, 'ascii')

  return { description: description.string, url: url.string }
}

export function iplsFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const people = []
  let length = 1

  while (length < view.byteLength) {
    const person = view.getCString(length, encoding)
    people.push(person.string)
    length += person.length
  }

  return people
}

export function langDescFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const descriptor = view.getCString(4, encoding)
  const textOffset = descriptor.length + 4
  const textLength = view.byteLength - textOffset
  const text = view.getString(textOffset, textLength, encoding)

  return {
    language: view.getString(1, 3, 'ascii').string,
    descriptor: descriptor.string,
    text: text.string
  }
}

export function apicFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const mime = view.getCString(1, 'ascii')
  const type = view.getUint8(mime.length + 1)
  const desc = view.getCString(mime.length + 2, encoding)
  const dataOffset = mime.length + desc.length + 2
  const dataLength = view.byteLength - dataOffset
  const data = view.getUint8(dataOffset, dataLength)

  return {
    format: mime.string,
    type,
    description: desc.string,
    data
  }
}

export function geobFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const mime = view.getCString(1, 'ascii')
  const fname = view.getCString(mime.length + 1, encoding)
  const desc = view.getCString(fname.length + mime.length + 1, encoding)
  const binOffset = mime.length + fname.length + desc.length + 1
  const binLength = view.byteLength - binOffset
  const object = view.getUint8(binOffset, binLength)

  return {
    format: mime.string,
    filename: fname.string,
    description: desc.string,
    object
  }
}

export function ufidFrame (view, version) {
  const ownerId = view.getCString(0, 'ascii')
  const id = view.getUint8(ownerId.length, view.byteLength - ownerId.length)

  return { ownerId: ownerId.string, id }
}

export function userFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]

  return {
    language: view.getString(1, 3, 'ascii').string,
    text: view.getString(4, view.byteLength - 4, encoding).string
  }
}

export function owneFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const currencyCode = view.getString(1, 3, 'ascii')
  const currency = view.getCString(4, 'ascii')
  const date = view.getString(currency.length + 4, 8, 'ascii')
  const sellerOffset = currency.length + date.length + 4
  const sellerLength = view.byteLength - sellerOffset
  const seller = view.getString(sellerOffset, sellerLength, encoding)

  return {
    currency: {
      code: currencyCode.string,
      price: currency.string
    },
    date: date.string,
    seller: seller.string
  }
}

export function privFrame (view, version) {
  const ownerId = view.getCString(0, 'ascii')
  const data = view.getUint8(ownerId.length, view.byteLength - ownerId.length)

  return { ownerId: ownerId.string, data }
}

export function signFrame (view, version) {
  return {
    group: view.getUint8,
    signature: view.getUint8(1, view.byteLength - 1)
  }
}

export function seekFrame (view, version) {
  return view.getUint32(0)
}

export function syltFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const language = view.getString(1, 3, 'ascii').string
  const format = view.getUint8(4)
  const type = view.getUint8(5)
  const descriptor = view.getCString(6, encoding)
  const lyricsOffset = descriptor.length + 6
  const lyricsLength = view.byteLength - lyricsOffset
  const lyrics = view.getUint8(lyricsOffset, lyricsLength)
  let text = ''

  for (let i = 0; i < lyrics.length; i += 4) {
    const lyricsView = new BufferView(lyrics)
    const line = lyricsView.getCString(i, 'ascii')
    const time = lyricsView.getUint32(i + line.length)
    const minutes = Math.floor(time / 60000).toString()
    let seconds = Math.floor(time % 60000 / 1000).toString()
    seconds = seconds.length === 1 ? '0' + seconds.length : seconds
    let ms = (time % 1000).toString()
    while (ms.length < 3) ms = '0' + ms
    text += `[${minutes}:${seconds}.${ms}] ${line.string}`
    i += line.length
  }

  return {
    language,
    format,
    type,
    descriptor: descriptor.string,
    lyrics: text
  }
}

export function mcdiFrame (view, version) {
  return view.getUint8(0, view.byteLength)
}

export function sytcFrame (view, version) {
  return {
    format: view.getUint8(0),
    data: view.getUint8(1, view.byteLength - 1)
  }
}
