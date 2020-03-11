
export const ENCODINGS = ['ascii', 'utf-16', 'utf-16be', 'utf-8']

/**
 *  @see http://id3.org/id3v2.3.0
 */

/**
 *  Frame Parsers
 *  @param {BufferView} view - View of the entire frame including the header
 *  @this ID3v2 tagger class
 */

export function textFrame (view) {
  /**
   *  Text encoding   $xx
   *  Information     <text string according to encoding>
   */

  const encoding = ENCODINGS[view.getUint8(0)]
  return view.getCString(1, encoding).string
}

export function arrayFrame (view) {
  // Multiple-value text frames
  const text = textFrame.call(this, view)
  let value = []

  if (this.major === 3) value = text.split('/')
  /**
   *  @TODO: ID3v2.4 can now have multiple text frames with the same ID
   */
  else if (this.major === 4) value = text.split(';')

  return value
}

export function numberFrame (view) {
  // Text numerical string frames
  const text = textFrame.call(this, view)
  return text.match(/^(\d+)$/) ? parseInt(text) : text
}

export function setFrame (view) {
  // Set frames (e.g. "1/2")
  const text = textFrame.call(this, view)
  return text.match(/^(\d+)\/(\d+)/) ? {
    position: parseInt(text.split('/')[0]),
    total: parseInt(text.split('/')[1])
  } : text
}

export function urlFrame (view) {
  // URL   <text string>
  return view.getCString(0, 'ascii').string
}

export function txxxFrame (view) {
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

export function wxxxFrame (view) {
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

export function langDescFrame (view) {
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

export function apicFrame (view) {
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
