
import { setBit, encodeSynch, mergeBytes, unsynch } from '../utils/bytes'
import { encodeString } from '../utils/strings'
import BufferView from '../viewer'

function getHeaderBytes (id, size, version, flags) {
  const idBytes = encodeString(id, 'ascii')
  const sizeView = new BufferView(4)

  switch (version) {
    case 3:
      sizeView.setUint32(0, size)
      break

    case 4:
      sizeView.setUint32(0, encodeSynch(size))
      break
  }

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

/**
 *  Frames writers
 *  @param {any[]} values - Validated frame of values array
 *  @param {object} options - Options when writing
 */

export function textFrame (values, options) {
  const { id, version, unsynch } = options
  let encoding = 0
  let strBytes = []

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  switch (version) {
    case 3:
      encoding = 1
      strBytes = encodeString(values.join('/') + '\0', 'utf-16')
      break

    case 4:
      encoding = 3
      strBytes = encodeString(values.join('\0') + '\0', 'utf-8')
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

export function asciiFrame (values, options) {
  const { id, version, unsynch } = options
  let strBytes = []

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  switch (version) {
    case 3:
      strBytes = encodeString(values.join('/') + '\0', 'ascii')
      break

    case 4:
      strBytes = encodeString(values.join('\0') + '\0', 'ascii')
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

export function setFrame (values, options) {
  const strings = []

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    let string = value.position.toString()
    if (value.total) string += '/' + value.total.toString()
    strings.push(string)
  })

  return asciiFrame([strings], options)
}

export function urlFrame (values, options) {
  const { id, version, unsynch } = options
  const strBytes = encodeString(values[0] + '\0', 'ascii')

  let data = strBytes
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function txxxFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  values.forEach(function (value) {
    let encoding = 0
    let descBytes, strBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(value.description + '\0', 'utf-16')
        strBytes = encodeString(value.text + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(values.description + '\0', 'utf-8')
        strBytes = encodeString(values.text + '\0', 'utf-8')
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
  values.forEach(function (value) {
    let encoding = 0
    let descBytes, strBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(value.description + '\0', 'utf-16')
        strBytes = encodeString(value.url + '\0', 'ascii')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(value.description + '\0', 'utf-8')
        strBytes = encodeString(value.url + '\0', 'ascii')
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

export function iplsFrame (values, options) {
  options.version = 4
  return textFrame(values, options)
}

export function langDescFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  values.forEach(function (value) {
    value.language = value.language || 'eng'
    value.descriptor = value.descriptor || ''

    let encoding = 0
    const langBytes = encodeString(value.language, 'ascii')
    let descBytes, textBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(value.descriptor + '\0', 'utf-16')
        textBytes = encodeString(value.text + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(value.descriptor + '\0', 'utf-8')
        textBytes = encodeString(value.text + '\0', 'utf-8')
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
  values.forEach(function (value) {
    value.type = value.type || 3

    let encoding = 0
    const mimeBytes = encodeString(value.format + '\0', 'ascii')
    const imageBytes = new Uint8Array(value.data)
    let strBytes = []

    switch (version) {
      case 3:
        encoding = 1
        strBytes = encodeString(value.description + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        strBytes = encodeString(value.description + '\0', 'utf-8')
        break
    }

    let data = mergeBytes(encoding, mimeBytes, value.type, strBytes, imageBytes)
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
  values.forEach(function (value) {
    const mime = encodeString(value.format + '\0', 'ascii')
    const object = new Uint8Array(value.object)
    let encoding, filename, description

    switch (version) {
      case 3:
        encoding = 1
        filename = encodeString(value.filename + '\0', 'utf-16')
        description = encodeString(value.description + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        filename = encodeString(value.filename + '\0', 'utf-8')
        description = encodeString(value.description + '\0', 'utf-8')
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
  values.forEach(function (value) {
    const ownerBytes = encodeString(value.ownerId + '\0', 'ascii')
    const idBytes = new Uint8Array(value.id)

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

export function userFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  values.forEach(function (value) {
    value.language = value.language || 'eng'
    let encoding = 0
    const langBytes = encodeString(value.language, 'ascii')
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
  })

  return bytes
}

export function owneFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  values.forEach(function (value) {
    let encoding = 0
    const codeBytes = encodeString(value.currency.code, 'ascii')
    const priceBytes = encodeString(value.currency.price + '\0', 'ascii')
    const dateBytes = encodeString(value.date, 'ascii')
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

    let data = mergeBytes(
      encoding, codeBytes, priceBytes, dateBytes, sellerBytes
    )
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

export function privFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  values.forEach(function (value) {
    const ownerIdBytes = encodeString(value.ownerId, 'ascii')
    const privData = new Uint8Array(value.data)

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
  values.forEach(function (value) {
    const signature = new Uint8Array(value.signature)

    let data = mergeBytes(value.group, signature)
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
  values.forEach(function (value) {
    value.language = value.language || 'eng'
    value.descriptor = value.descriptor || ''
    value.type = value.type || 1

    let encoding = 0
    const langBytes = encodeString(value.language, 'ascii')
    let descBytes = []

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(value.descriptor + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(value.descriptor + '\0', 'utf-8')
        break
    }

    const regex = /^(\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)/
    let lyricsBytes = []
    value.lyrics.replace(/\r\n/, '\n').split('\n').forEach(function (line) {
      if (line !== '') {
        const result = regex.exec(line)
        const time = parseInt(result[1].replace(/[^0-9]/g, ''))
        const string = encodeString((result[2] || '') + '\n\0', 'ascii')
        const timeBytes = new BufferView(4)
        timeBytes.setUint32(0, time)
        lyricsBytes = mergeBytes(lyricsBytes, string, timeBytes.getUint8(0, 4))
      }
    })

    let data = mergeBytes(encoding, langBytes, value.format, value.type,
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

export function mcdiFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  values.forEach(function (value) {
    if (unsynch) value = unsynchData(value, version)

    const header = getHeaderBytes(id, value.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, value)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function sytcFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  values.forEach(function (value) {
    let data = mergeBytes(value.format, value.data)
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
