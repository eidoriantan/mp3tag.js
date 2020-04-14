
import { encodeSynch, mergeBytes } from '../utils/bytes'
import { encodeString } from '../utils/strings'
import BufferView from '../viewer'

function getHeaderBytes (id, size, version) {
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

  return mergeBytes(idBytes, sizeView.getUint8(0, 4), 0, 0)
}

/**
 *  Frames writers
 *  @param {any[]} values - Validated frame of values array
 *  @param {number} version - Frame will be written according to this version
 */

export function textFrame (values, id, version) {
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

  const header = getHeaderBytes(id, strBytes.length + 1, version)
  return mergeBytes(header, encoding, strBytes)
}

export function asciiFrame (values, id, version) {
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

  const header = getHeaderBytes(id, strBytes.length + 1, version)
  return mergeBytes(header, 0, strBytes)
}

export function setFrame (values, id, version) {
  const strings = []

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    let string = value.position.toString()
    if (value.total) string += '/' + value.total.toString()
    strings.push(string)
  })

  return asciiFrame([strings], id, version)
}

export function urlFrame (values, id, version) {
  const strBytes = encodeString(values[0] + '\0', 'ascii')
  const header = getHeaderBytes(id, strBytes.length, version)

  return mergeBytes(header, strBytes)
}

export function txxxFrame (values, id, version) {
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

    const size = descBytes.length + strBytes.length + 1
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, encoding, descBytes, strBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function wxxxFrame (values, id, version) {
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

    const size = descBytes.length + strBytes.length + 1
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, encoding, descBytes, strBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function iplsFrame (values, id, version) {
  return textFrame(values, id, 4)
}

export function langDescFrame (values, id, version) {
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

    const size = descBytes.length + textBytes.length + 4
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, encoding, langBytes, descBytes, textBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function apicFrame (values, id, version) {
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

    const size = mimeBytes.length + strBytes.length + imageBytes.length + 2
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(
      header, encoding, mimeBytes, value.type, strBytes, imageBytes
    )

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function geobFrame (values, id, version) {
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

    const size = mime.length + filename.length + description.length +
      object.length + 1
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, encoding, mime, filename, description,
      object)

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function ufidFrame (values, id, version) {
  const bytes = []
  values.forEach(function (value) {
    const ownerBytes = encodeString(value.ownerId + '\0', 'ascii')
    const idBytes = new Uint8Array(value.id)
    const size = ownerBytes.length + idBytes.length
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, ownerBytes, idBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function userFrame (values, id, version) {
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

    const header = getHeaderBytes(id, textBytes.length + 4, version)
    const merged = mergeBytes(header, encoding, langBytes, textBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function owneFrame (values, id, version) {
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

    const size = priceBytes.length + sellerBytes.length + 12
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, encoding, codeBytes, priceBytes,
      dateBytes, sellerBytes)

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function privFrame (values, id, version) {
  const bytes = []
  values.forEach(function (value) {
    const ownerIdBytes = encodeString(value.ownerId, 'ascii')
    const data = new Uint8Array(value.data)
    const size = ownerIdBytes.length + data.length
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, ownerIdBytes, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function signFrame (values, id, version) {
  const bytes = []
  values.forEach(function (value) {
    const signature = new Uint8Array(value.signature)
    const size = signature.length + 1
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(header, value.group, signature)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function syltFrame (values, id, version) {
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

    const size = descBytes.length + lyricsBytes.length + 6
    const header = getHeaderBytes(id, size, version)
    const merged = mergeBytes(
      header, encoding, langBytes, value.format, value.type,
      descBytes, lyricsBytes
    )

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function mcdiFrame (values, id, version) {
  const bytes = []
  values.forEach(function (value) {
    const header = getHeaderBytes(id, value.length, version)
    const merged = mergeBytes(header, value)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function sytcFrame (values, id, version) {
  const bytes = []
  values.forEach(function (value) {
    const header = getHeaderBytes(id, value.data.length + 1, version)
    const merged = mergeBytes(header, value.format, value.data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}
