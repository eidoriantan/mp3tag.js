
import { mergeAsArray } from '../utils/array'
import TagError from '../error'

export const ENCODINGS = ['ascii', 'utf-16', 'utf-16be', 'utf-8']

/**
 *  @see http://id3.org/id3v2.3.0
 */

/**
 *  Frame Parsers
 *  @param {BufferView} view - View of the entire frame excluding the header
 *  @param {number} version - Frame will be parsed with this version
 */

export function textFrame (view, version) {
  /**
   *  Text encoding   $xx
   *  Information     <text string according to encoding>
   */

  const encoding = ENCODINGS[view.getUint8(0)]
  let value

  switch (version) {
    case 3:
      value = view.getCString(1, encoding).string
      break

    case 4:
      value = view.getString(1, view.byteLength - 1, encoding).split('\0')
      if (value.length === 1) value = value[0]
      break

    default:
      throw new TagError(201, version)
  }

  return value
}

export function arrayFrame (view, version) {
  // Multiple-value text frames
  const text = textFrame(view, version)
  let value = []

  switch (version) {
    case 3:
      value = text.split('/')
      break

    case 4:
      if (!Array.isArray(text)) value = [text]
      else value = text
      break

    default:
      throw new TagError(201, version)
  }

  return value
}

export function numberFrame (view, version) {
  // Text numerical string frames
  const text = textFrame(view, version)
  return text.match(/^(\d+)$/) ? parseInt(text) : text
}

export function setFrame (view, version) {
  // Set frames (e.g. "1/2")
  const text = textFrame(view, version)
  const array = mergeAsArray(text)
  const value = []

  array.forEach(function (elem) {
    const splitted = elem.split('/')
    value.push(elem.match(/^(\d+)\/(\d+)/) ? {
      position: parseInt(splitted[0]),
      total: parseInt(splitted[1])
    } : elem)
  })

  return value.length === 1 ? value[0] : value
}

export function urlFrame (view, version) {
  // URL   <text string>
  return view.getCString(0, 'ascii').string
}

export function txxxFrame (view, version) {
  /**
   *  Text encoding   $xx
   *  Description     <text string according to encoding> $00 (00)
   *  Value           <text string according to encoding>
   */

  const encoding = ENCODINGS[view.getUint8(0)]
  const description = view.getCString(1, encoding)
  const valueLength = view.byteLength - description.length - 1
  const value = view.getString(description.length + 1, valueLength, encoding)

  return { description: description.string, text: value }
}

export function wxxxFrame (view, version) {
  /**
   *  Text encoding   $xx
   *  Description     <text string according to encoding> $00 (00)
   *  URL             <text string>
   */

  const encoding = ENCODINGS[view.getUint8(0)]
  const description = view.getCString(1, encoding)
  const urlLength = view.byteLength - description.length - 1
  const url = view.getString(description.length + 1, urlLength, 'ascii')

  return { description: description.string, url: url }
}

export function iplsFrame (view, version) {
  /**
   *  <Header for 'Involved people list', ID: "IPLS">
   *  Text encoding         $xx
   *  People list strings  <text strings according to encoding>
   */

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
  /**
   *  Text encoding           $xx
   *  Language                $xx xx xx
   *  Short content descrip.  <text string according to encoding> $00 (00)
   *  The actual text         <full text string according to encoding>
   */

  const encoding = ENCODINGS[view.getUint8(0)]
  const description = view.getCString(4, encoding)
  const textLength = view.byteLength - description.length - 4
  const text = view.getString(description.length + 4, textLength, encoding)

  return {
    language: view.getString(1, 3, 'ascii'),
    descriptor: description.string,
    text: text
  }
}

export function apicFrame (view, version) {
  /**
   *  Text encoding   $xx
   *  MIME type       <text string> $00
   *  Picture type    $xx
   *  Description     <text string according to encoding> $00 (00)
   *  Picture data    <binary data>
   */

  const encoding = ENCODINGS[view.getUint8(0)]
  const mime = view.getCString(1, 'ascii')
  const type = view.getUint8(mime.length + 1)
  const desc = view.getCString(mime.length + 2, encoding)
  const imgLength = view.byteLength - mime.length - desc.length - 2
  const img = view.getUint8(mime.length + desc.length + 2, imgLength)

  return {
    format: mime.string,
    type: type,
    description: desc.string,
    data: img
  }
}
