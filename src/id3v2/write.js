
import { encodeSynch, mergeBytes } from '../utils/bytes'
import { toArray } from '../utils/object'
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
 *  @param {Object} frame - Frame id and its value
 *  @param {number} version - Frame will be written with this version
 */

export function textFrame (frame, version) {
  let encoding = 0
  let strBytes = []

  switch (version) {
    case 3:
      encoding = 1
      strBytes = encodeString(frame.value + '\0', 'utf-16')
      break

    case 4: {
      encoding = 3
      const array = toArray(frame.value)

      array.forEach(function (elem) {
        const encoded = encodeString(elem + '\0', 'utf-8')
        encoded.forEach(byte => strBytes.push(byte))
      })
      break
    }
  }

  const header = getHeaderBytes(frame.id, strBytes.length + 1, version)
  return mergeBytes(header, encoding, strBytes)
}

export function arrayFrame (frame, version) {
  switch (version) {
    case 3:
      frame.value = frame.value.join('/')
      break
  }

  return textFrame(frame, version)
}

export function asciiFrame (frame, version) {
  let strBytes = []

  switch (version) {
    case 3:
      strBytes = encodeString(frame.value.toString() + '\0', 'ascii')
      break

    case 4: {
      const array = toArray(frame.value)
      array.forEach(function (elem) {
        const encoded = encodeString(elem.toString() + '\0', 'ascii')
        encoded.forEach(byte => strBytes.push(byte))
      })
      break
    }
  }

  const header = getHeaderBytes(frame.id, strBytes.length + 1, version)
  return mergeBytes(header, 0, strBytes)
}

export function setFrame (frame, version) {
  switch (version) {
    case 3:
      frame.value = frame.value.position + '/' + frame.value.total
      break

    case 4: {
      const array = toArray(frame.value)
      frame.value = []

      array.forEach(function (elem) {
        frame.value.push(elem.position + '/' + elem.total)
      })
      break
    }
  }

  return asciiFrame(frame, version)
}

export function urlFrame (frame, version) {
  const strBytes = encodeString(frame.value + '\0', 'ascii')
  const header = getHeaderBytes(frame.id, strBytes.length, version)

  return mergeBytes(header, strBytes)
}

export function txxxFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    let descBytes, strBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(elem.description + '\0', 'utf-16')
        strBytes = encodeString(elem.text + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(elem.description + '\0', 'utf-8')
        strBytes = encodeString(elem.text + '\0', 'utf-8')
        break
    }

    const size = descBytes.length + strBytes.length + 1
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, descBytes, strBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function wxxxFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    let descBytes, strBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(elem.description + '\0', 'utf-16')
        strBytes = encodeString(elem.url, 'ascii')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(elem.description + '\0', 'utf-8')
        strBytes = encodeString(elem.url, 'ascii')
        break
    }

    const size = descBytes.length + strBytes.length + 1
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, descBytes, strBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function iplsFrame (frame, version) {
  const encoding = 1
  const strBytes = []

  switch (version) {
    case 3:
      frame.value.forEach(function (string) {
        const encoded = encodeString(string + '\0', 'utf-16')
        encoded.forEach(byte => strBytes.push(byte))
      })
      break
  }

  const size = strBytes.length + 1
  const header = getHeaderBytes(frame.id, size, version)
  return mergeBytes(header, encoding, strBytes)
}

export function langDescFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    const langBytes = encodeString(elem.language, 'ascii')
    let descBytes, textBytes

    switch (version) {
      case 3:
        encoding = 1
        descBytes = encodeString(elem.descriptor + '\0', 'utf-16')
        textBytes = encodeString(elem.text, 'utf-16')
        break

      case 4:
        encoding = 3
        descBytes = encodeString(elem.descriptor + '\0', 'utf-8')
        textBytes = encodeString(elem.text, 'utf-8')
        break
    }

    const size = descBytes.length + textBytes.length + 4
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, langBytes, descBytes, textBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function apicFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    const mimeBytes = encodeString(elem.format + '\0', 'ascii')
    const imageBytes = new Uint8Array(elem.data)
    let strBytes = []

    switch (version) {
      case 3:
        encoding = 1
        strBytes = encodeString(elem.description + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        strBytes = encodeString(elem.description + '\0', 'utf-8')
        break
    }

    const size = mimeBytes.length + strBytes.length + imageBytes.length + 2
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(
      header, encoding, mimeBytes, elem.type, strBytes, imageBytes
    )

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function geobFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    const mime = encodeString(elem.format + '\0', 'ascii')
    const object = new Uint8Array(elem.object)
    let encoding, filename, description

    switch (version) {
      case 3:
        encoding = 1
        filename = encodeString(elem.filename + '\0', 'utf-16')
        description = encodeString(elem.description + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        filename = encodeString(elem.filename + '\0', 'utf-8')
        description = encodeString(elem.description + '\0', 'utf-8')
        break
    }

    const size = mime.length + filename.length + description.length +
      object.length + 1
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, mime, filename, description,
      object)

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function ufidFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    const ownerBytes = encodeString(elem.ownerId + '\0', 'ascii')
    const idBytes = new Uint8Array(elem.id)
    const header = getHeaderBytes(frame.id, ownerBytes.length + idBytes.length,
      version)
    const merged = mergeBytes(header, ownerBytes, idBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function userFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    const langBytes = encodeString(elem.language, 'ascii')
    let textBytes

    switch (version) {
      case 3:
        encoding = 1
        textBytes = encodeString(elem.text + '\0', 'utf-16')
        break

      case 4:
        encoding = 3
        textBytes = encodeString(elem.text + '\0', 'utf-8')
        break
    }

    const header = getHeaderBytes(frame.id, textBytes.length + 4, version)
    const merged = mergeBytes(header, encoding, langBytes, textBytes)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function owneFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    let encoding = 0
    const codeBytes = encodeString(elem.currency.code, 'ascii')
    const priceBytes = encodeString(elem.currency.price + '\0', 'ascii')
    const dateBytes = encodeString(elem.date, 'ascii')
    let sellerBytes

    switch (version) {
      case 3:
        encoding = 1
        sellerBytes = encodeString(elem.seller, 'utf-16')
        break

      case 4:
        encoding = 3
        sellerBytes = encodeString(elem.seller, 'utf-8')
        break
    }

    const size = priceBytes.length + sellerBytes.length + 12
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, encoding, codeBytes, priceBytes,
      dateBytes, sellerBytes)

    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function privFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    const ownerIdBytes = encodeString(elem.ownerId, 'ascii')
    const data = new Uint8Array(elem.data)
    const size = ownerIdBytes.length + data.length
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, ownerIdBytes, data)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}

export function signFrame (frame, version) {
  const bytes = []
  const array = toArray(frame.value)

  array.forEach(function (elem) {
    const signature = new Uint8Array(elem.signature)
    const size = signature.length + 1
    const header = getHeaderBytes(frame.id, size, version)
    const merged = mergeBytes(header, elem.group, signature)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}
