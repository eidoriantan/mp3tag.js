
import BufferView from '../viewer.mjs'

import { setBit, encodeSynch, mergeBytes, unsynch } from '../utils/bytes.mjs'
import { encodeString } from '../utils/strings.mjs'

function getHeaderBytes (id, size, version, flags) {
  const idBytes = encodeString(id)
  const sizeView = new BufferView(4)

  sizeView.setUint32(0, version === 3 ? size : encodeSynch(size))

  const flagsBytes = [0, 0]
  if (version === 4 && flags.unsynchronisation) {
    flagsBytes[1] = setBit(flagsBytes[1], 1)
  }

  if (version === 4 && flags.dataLengthIndicator) {
    flagsBytes[1] = setBit(flagsBytes[1], 0)
  }

  return mergeBytes(idBytes, sizeView.getUint8(0, 4), flagsBytes)
}

function unsynchData (data, version) {
  const sizeView = new BufferView(4)
  const dataBytes = unsynch(data)
  const content = []

  if (version === 4) {
    sizeView.setUint32(0, encodeSynch(data.length))
    content.push(...sizeView.getUint8(0, 4))
  }

  dataBytes.forEach(byte => content.push(byte))
  return new Uint8Array(content)
}

export function textFrame (value, options) {
  const { id, version, unsynch } = options
  let encoding = 0
  let strBytes = []

  switch (version) {
    case 3:
      encoding = 1
      strBytes = encodeString(value.replace('\\\\', '/') + '\0', 'utf-16')
      break

    case 4:
      encoding = 3
      strBytes = encodeString(value.replace('\\\\', '\0') + '\0', 'utf-8')
      break
  }

  let data = mergeBytes(encoding, strBytes)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function win1251Frame (value, options) {
  const { id, version, unsynch } = options
  let strBytes = []

  switch (version) {
    case 3:
      strBytes = encodeString(value.replace('\\\\', '/') + '\0')
      break

    case 4:
      strBytes = encodeString(value.replace('\\\\', '\0') + '\0')
      break
  }

  let data = mergeBytes(0, strBytes)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function setFrame (value, options) {
  const { version } = options
  if (version === 3) value = value.toString().split('\\\\')[0]
  else if (version === 4) value = value.toString().replace('\\\\', '\0')

  return win1251Frame(value, options)
}

export function urlFrame (value, options) {
  const { id, version, unsynch } = options
  let strBytes = encodeString(value + '\0')
  if (unsynch) strBytes = unsynchData(strBytes, version)

  const header = getHeaderBytes(id, strBytes.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, strBytes)
}

export function txxxFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(txxx => {
    let encoding = 0
    let descBytes, strBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(txxx.description + '\0', 'utf-16')
        strBytes = encodeString(txxx.text + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(txxx.description + '\0', 'utf-8')
        strBytes = encodeString(txxx.text + '\0', 'utf-8')
        break
    }

    let data = mergeBytes(encoding, descBytes, strBytes)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function wxxxFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(wxxx => {
    let encoding = 0
    let descBytes, strBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(wxxx.description + '\0', 'utf-16')
        strBytes = encodeString(wxxx.url + '\0')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(wxxx.description + '\0', 'utf-8')
        strBytes = encodeString(wxxx.url + '\0')
        break
    }

    let data = mergeBytes(encoding, descBytes, strBytes)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function iplsFrame (value, options) {
  options.version = 4
  return textFrame(value, options)
}

export function langDescFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(langDesc => {
    let encoding = 0
    const langBytes = encodeString(langDesc.language)
    let descBytes, textBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(langDesc.descriptor + '\0', 'utf-16')
        textBytes = encodeString(langDesc.text + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(langDesc.descriptor + '\0', 'utf-8')
        textBytes = encodeString(langDesc.text + '\0', 'utf-8')
        break
    }

    let data = mergeBytes(encoding, langBytes, descBytes, textBytes)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function apicFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(apic => {
    let encoding = 0
    const mimeBytes = encodeString(apic.format + '\0')
    const imageBytes = new Uint8Array(apic.data)
    let strBytes = []

    switch (version) {
      case 3:
        encoding = 1
        strBytes = encodeString(apic.description + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        strBytes = encodeString(apic.description + '\0', 'utf-8')
        break
    }

    let data = mergeBytes(encoding, mimeBytes, apic.type, strBytes, imageBytes)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function geobFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(geob => {
    const mime = encodeString(geob.format + '\0')
    const object = new Uint8Array(geob.object)
    let encoding, filename, description

    switch (version) {
      case 3:
        encoding = 1
        filename = encodeString(geob.filename + '\0', 'utf-16')
        description = encodeString(geob.description + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        filename = encodeString(geob.filename + '\0', 'utf-8')
        description = encodeString(geob.description + '\0', 'utf-8')
        break
    }

    let data = mergeBytes(encoding, mime, filename, description, object)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function ufidFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(ufid => {
    const ownerBytes = encodeString(ufid.ownerId + '\0')
    const idBytes = new Uint8Array(ufid.id)

    let data = mergeBytes(ownerBytes, idBytes)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function userFrame (value, options) {
  const { id, version, unsynch } = options
  const bytes = []

  let encoding = 0
  const langBytes = encodeString(value.language)
  let textBytes

  switch (version) {
    case 3:
      encoding = 1
      textBytes = encodeString(value.text + '\0', 'utf-16')
      break

    case 4:
      encoding = 3
      textBytes = encodeString(value.text + '\0', 'utf-8')
      break
  }

  let data = mergeBytes(encoding, langBytes, textBytes)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  const merged = mergeBytes(header, data)
  merged.forEach(byte => bytes.push(byte))

  return bytes
}

export function owneFrame (value, options) {
  const { id, version, unsynch } = options
  let encoding = 0
  const codeBytes = encodeString(value.currencyCode)
  const priceBytes = encodeString(value.currencyPrice + '\0')
  const dateBytes = encodeString(value.date)
  let sellerBytes

  switch (version) {
    case 3:
      encoding = 1
      sellerBytes = encodeString(value.seller, 'utf-16')
      break

    case 4:
      encoding = 3
      sellerBytes = encodeString(value.seller, 'utf-8')
      break
  }

  let data = mergeBytes(encoding, codeBytes, priceBytes, dateBytes, sellerBytes)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function privFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(priv => {
    const ownerIdBytes = encodeString(priv.ownerId)
    const privData = new Uint8Array(priv.data)

    let data = mergeBytes(ownerIdBytes, privData)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function signFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(sign => {
    const signature = new Uint8Array(sign.signature)

    let data = mergeBytes(sign.group, signature)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function syltFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(sylt => {
    let encoding = 0
    const langBytes = encodeString(sylt.language)
    let descBytes = []

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(sylt.descriptor + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(sylt.descriptor + '\0', 'utf-8')
        break
    }

    const regex = /^(\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)/
    let lyricsBytes = []
    sylt.lyrics.replace(/\r\n/, '\n').split('\n').forEach(function (line) {
      if (line !== '') {
        const result = regex.exec(line)
        const time = parseInt(result[1].replace(/[^0-9]/g, ''))
        const string = encodeString((result[2] || '') + '\n\0')
        const timeBytes = new BufferView(4)
        timeBytes.setUint32(0, time)
        lyricsBytes = mergeBytes(lyricsBytes, string, timeBytes.getUint8(0, 4))
      }
    })

    let data = mergeBytes(encoding, langBytes, sylt.format, sylt.type,
      descBytes, lyricsBytes)
    if (unsynch) data = unsynchData(data, version)

    const header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function mcdiFrame (value, options) {
  const { id, version, unsynch } = options
  if (unsynch) value.data = unsynchData(value.data, version)

  const header = getHeaderBytes(id, value.data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, value.data)
}

export function sytcFrame (value, options) {
  const { id, version, unsynch } = options

  let data = mergeBytes(value.format, value.data)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}
