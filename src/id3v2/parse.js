
import { mergeAsArray } from '../utils/array'
import TagError from '../error'

export const ENCODINGS = ['ascii', 'utf-16', 'utf-16be', 'utf-8']

/**
 *  Frame Parsers
 *  @param {BufferView} view - View of the frame excluding the header
 *  @param {number} version - Frame will be parsed with this version
 */

export function textFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  let value

  switch (version) {
    case 3:
      value = view.getCString(1, encoding).string
      break

    case 4:
      value = view.getString(1, view.byteLength - 1, encoding)
        .string.split('\0')

      if (value.length === 1) value = value[0]
      break

    default:
      throw new TagError(201, version)
  }

  return value
}

export function arrayFrame (view, version) {
  const value = textFrame(view, version)
  let array = []

  switch (version) {
    case 3:
      array = value.split('/')
      break

    case 4:
      array = Array.isArray(value) ? value : [value]
      break

    default:
      throw new TagError(201, version)
  }

  return array
}

export function numberFrame (view, version) {
  const value = textFrame(view, version)
  return value.match && value.match(/^(\d+)$/) ? parseInt(value) : value
}

export function setFrame (view, version) {
  const value = textFrame(view, version)
  const mergedValue = mergeAsArray(value)
  const array = []

  mergedValue.forEach(function (elem) {
    const splitted = elem.split('/')
    array.push(elem.match(/^(\d+)\/(\d+)/) ? {
      position: parseInt(splitted[0]),
      total: parseInt(splitted[1])
    } : elem)
  })

  return array.length === 1 ? array[0] : array
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
  const imgOffset = mime.length + desc.length + 2
  const imgLength = view.byteLength - imgOffset
  const img = view.getUint8(imgOffset, imgLength)

  return {
    format: mime.string,
    type: type,
    description: desc.string,
    data: img
  }
}

export function geobFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const mime = view.getCString(1, 'ascii')
  const fname = view.getCString(mime.length + 1, encoding)
  const desc = view.getCString(fname.length + mime.length + 1, encoding)
  const binOffset = mime.length + fname.length + desc.length + 1
  const binLength = view.byteLength - binOffset
  const binObject = view.getUint8(binOffset, binLength)

  return {
    format: mime.string,
    filename: fname.string,
    description: desc.string,
    object: binObject
  }
}

export function ufidFrame (view, version) {
  const ownerId = view.getCString(0, 'ascii')
  const id = view.getUint8(ownerId.length, view.byteLength - ownerId.length)

  return {
    ownerId: ownerId.string,
    id: id
  }
}

export function userFrame (view, version) {
  const encoding = ENCODINGS[view.getUint8(0)]
  const text = view.getString(4, view.byteLength - 4, encoding)

  return {
    language: view.getString(1, 3, 'ascii').string,
    text: text.string
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
