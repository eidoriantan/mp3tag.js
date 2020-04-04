
import { includes } from '../utils/object'
import TagError from '../error'

const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/
const langRegex = /^([a-z]{3}|XXX)$/
const stringRegex = /^(.*)$/

const year = '(\\d{4})'
const month = '(0[1-9]|1[0-2])'
const day = '(0[1-9]|1\\d|2\\d|3[0-1])'
const hour = '(0\\d|1\\d|2[0-3])'
const minute = '(0\\d|1\\d|2\\d|3\\d|4\\d|5\\d)'
const second = minute
const timeRegex = new RegExp(
  `^(${year}(-${month}(-${day}(T${hour}(:${minute}(:${second})?)?)?)?)?)$`
)

export function validateID (id) {
  if (!id.match(/^([A-Z0-9]{4})$/)) {
    throw new TagError(203, 'ID is invalid')
  }

  return true
}

/**
 *  Validators
 *  @param {any[]} values - Array of frame values
 *  @param {number} version - Frame will be validated according to this version
 */

export function textFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `T???` frames are not allowed')
  }

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    if (typeof value !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!value.match(stringRegex)) {
      throw new TagError(203, 'Newlines are not allowed')
    }
  })

  return true
}

export function numberFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `T???` frames are not allowed')
  }

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    if (typeof value !== 'number') {
      throw new TagError(203, 'Value is not a number')
    }
  })

  return true
}

export function setFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `T???` frames are not allowed')
  }

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    if (typeof value.position !== 'number') {
      throw new TagError(203, 'Position is not a number')
    }

    if (value.total && typeof value.total !== 'number') {
      throw new TagError(203, 'Total is not a number')
    }

    if (value.total && value.position > value.total) {
      throw new TagError(203, 'Position is greater than total')
    }
  })

  return true
}

export function timeFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `T???` frames are not allowed')
  }

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    switch (version) {
      case 3:
        if (!value.toString().match(/^(\d{4})$/)) {
          throw new TagError(203, 'Value is not 4 numeric characters')
        }
        break

      case 4:
        if (typeof value !== 'string') {
          throw new TagError(203, 'Value is not a string')
        }

        if (!value.match(timeRegex)) {
          throw new TagError(203, 'Time frames should follow ISO 8601')
        }
        break
    }
  })

  return true
}

export function urlFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `W???` frames are not allowed')
  }

  values.forEach(function (value) {
    if (typeof value !== 'string') {
      throw new TagError(203, 'URL is not a string')
    }

    if (!value.match(urlRegex)) {
      throw new TagError(203, 'URL is not a valid URL')
    }
  })

  return true
}

export function txxxFrame (values, verion) {
  const descriptions = []
  values.forEach(function (value) {
    if (typeof value.description !== 'string' ||
      typeof value.text !== 'string') {
      throw new TagError(203, 'Text/description is not a string')
    }

    if (!value.description.match(stringRegex) ||
      !value.text.match(stringRegex)) {
      throw new TagError('Newlines are not allowed')
    }

    if (descriptions.includes(value.description)) {
      throw new TagError(203, 'Description should not duplicate')
    } else {
      descriptions.push(value.description)
    }
  })

  return true
}

export function wxxxFrame (values, version) {
  const descriptions = []
  values.forEach(function (value) {
    if (typeof value.description !== 'string' ||
      typeof value.url !== 'string') {
      throw new TagError(203, 'Text/URL is not a string')
    }

    if (!value.description.match(stringRegex)) {
      throw new TagError(203, 'Newlines are not allowed')
    }

    if (!value.url.match(urlRegex)) {
      throw new TagError(203, 'URL is an invalid URL')
    }

    if (descriptions.includes(value.description)) {
      throw new TagError(203, 'Description should not duplicate')
    } else {
      descriptions.push(value.description)
    }
  })

  return true
}

export function tkeyFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `T???` frames are not allowed')
  }

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    if (typeof value !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!value.match(/^([A-Gb#mo]{3})$/)) {
      throw new TagError(203, 'Invalid TKEY Format (e.g. Cbm)')
    }
  })

  return true
}

export function tlanFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `T???` frames are not allowed')
  }

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    if (typeof value !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!value.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }
  })

  return true
}

export function tsrcFrame (values, version) {
  if (values.length > 1) {
    throw new TagError(203, 'Multiple `T???` frames are not allowed')
  }

  values = Array.isArray(values[0]) ? values[0] : [values[0]]
  values.forEach(function (value) {
    if (typeof value !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!value.match(/^([A-Z0-9]{12})$/)) {
      throw new TagError(203, 'Invalid ISRC format')
    }
  })

  return true
}

export function langDescFrame (values, version) {
  const langDescs = []
  values.forEach(function (value) {
    if (typeof value !== 'object') {
      throw new TagError(203, 'Value is not an object')
    }

    value.language = value.language || 'eng'
    if (typeof value.language !== 'string' ||
      typeof value.descriptor !== 'string' ||
      typeof value.text !== 'string') {
      throw new TagError(203, 'Language/descriptor/text is not a string')
    }

    if (!value.language.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }

    if (!value.descriptor.match(stringRegex)) {
      throw new TagError(203, 'Newlines are not allowed')
    }

    const checkObj = {
      language: value.language,
      descriptor: value.descriptor
    }

    if (includes(langDescs, checkObj)) {
      throw new TagError(203, 'Language and descriptor should not duplicate')
    } else {
      langDescs.push(checkObj)
    }
  })

  return true
}

export function apicFrame (values, version) {
  const descriptions = []
  values.forEach(function (value) {
    if (typeof value.format !== 'string' ||
      typeof value.description !== 'string' ||
      typeof value.type !== 'number') {
      throw new TagError(203, 'Format/type/description is invalid')
    }

    if (!(value.data instanceof ArrayBuffer) && !Array.isArray(value.data) &&
      !ArrayBuffer.isView(value.data)) {
      throw new TagError(203, 'Image data should be ArrayBuffer or an array')
    }

    if (!value.format.match(/(image\/[a-z0-9!#$&.+\-^_]+){0,129}/)) {
      throw new TagError(203, 'Format should be an image')
    }

    if (value.type > 21 || value.type < 0) {
      throw new TagError(203, 'Type should be in the range of 0 - 21')
    }

    if (value.description.length > 64) {
      throw new TagError(203, 'Description should not exceed 64')
    }

    if (descriptions.includes(value.description)) {
      throw new TagError(203, 'Cover description should not duplicate')
    } else {
      descriptions.push(value.description)
    }
  })

  return true
}

export function geobFrame (values, version) {
  const descriptions = []
  values.forEach(function (value) {
    if (typeof value.format !== 'string' ||
      typeof value.filename !== 'string' ||
      typeof value.description !== 'string') {
      throw new TagError(203, 'Format/filename/description is not a string')
    }

    if (!(value.object instanceof ArrayBuffer) &&
      !Array.isArray(value.object) &&
      !ArrayBuffer.isView(value.object)) {
      throw new TagError(203, 'Object data should be ArrayBuffer or an array')
    }

    if (descriptions.includes(value.description)) {
      throw new TagError(203, 'GEOB description should not duplicate')
    } else {
      descriptions.push(value.description)
    }
  })

  return true
}

export function ufidFrame (values, version) {
  const ownerIds = []
  values.forEach(function (value) {
    if (typeof value.ownerId !== 'string') {
      throw new TagError(203, 'ownerId is not a string')
    }

    if (value.ownerId === '') {
      throw new TagError(203, 'ownerId should not be blank')
    }

    if (!(value.id instanceof ArrayBuffer) && !Array.isArray(value.id) &&
      !ArrayBuffer.isView(value.id)) {
      throw new TagError(203, 'id should be ArrayBuffer or an array')
    }

    const idLength = value.id.byteLength || value.id.length || 0
    if (idLength > 64) {
      throw new TagError(203, 'id should not exceed 64 bytes')
    }

    if (ownerIds.includes(value.ownerId)) {
      throw new TagError(203, 'ownerId should not duplicate')
    } else {
      ownerIds.push(value.ownerId)
    }
  })

  return true
}

export function userFrame (values, version) {
  values.forEach(function (value) {
    if (typeof value !== 'object') {
      throw new TagError(203, 'Value is not an object')
    }

    value.language = value.language || 'eng'
    if (typeof value.language !== 'string' || typeof value.text !== 'string') {
      throw new TagError(203, 'Language/text is not a string')
    }

    if (!value.language.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }
  })

  return true
}

export function owneFrame (values, version) {
  if (values.length > 1) {
    throw new TagError('Multiple `OWNE` frames are not allowed')
  }

  values.forEach(function (value) {
    if (typeof value !== 'object') {
      throw new TagError(203, 'Value is not an object')
    }

    if (typeof value.currency !== 'object' || typeof value.date !== 'string' ||
      typeof value.seller !== 'string') {
      throw new TagError(203, 'Value is not valid')
    }

    if (typeof value.currency.code !== 'string' ||
      typeof value.currency.price !== 'string') {
      throw new TagError(203, 'Currency values are not valid')
    }

    if (!value.currency.code.match(/^([A-Z]{3})$/)) {
      throw new TagError(203, 'Currency code is not valid')
    }

    if (!value.currency.price.match(/^(\d*)\.(\d+)$/)) {
      throw new TagError(203, 'Currency price is not valid')
    }

    if (!value.date.match(`${year}${month}${day}`)) {
      throw new TagError(203, 'Date must follow this format: YYYYMMDD')
    }
  })

  return true
}

export function privFrame (values, version) {
  const contents = []
  values.forEach(function (value) {
    if (typeof value.ownerId !== 'string') {
      throw new TagError(203, 'ownerId is not a string')
    }

    if (!value.ownerId.match(urlRegex)) {
      throw new TagError(203, 'ownerId is an invalid URL')
    }

    if (!(value.data instanceof ArrayBuffer) && !Array.isArray(value.data) &&
      !ArrayBuffer.isView(value.data)) {
      throw new TagError(203, 'Data should be an ArrayBuffer or array')
    }

    if (includes(contents, value.data)) {
      throw new TagError(203, 'Data should not duplicate')
    } else {
      contents.push(value.data)
    }
  })

  return true
}

export function signFrame (values, version) {
  const signs = []
  values.forEach(function (value) {
    if (typeof value.group !== 'number') {
      throw new TagError(203, 'Group ID is not a number')
    }

    if (value.group < 0 || value.group > 255) {
      throw new TagError(203, 'Group ID should be in the range of 0 - 255')
    }

    if (!(value.signature instanceof ArrayBuffer) &&
      !Array.isArray(value.signature) &&
      !ArrayBuffer.isView(value.signature)) {
      throw new TagError(203, 'Signature should be an ArrayBuffer or array')
    }

    if (includes(signs, value)) {
      throw new TagError(203, 'SIGN contents should be identical to others')
    } else {
      signs.push(value)
    }
  })

  return true
}

export function syltFrame (values, version) {
  const sylts = []
  values.forEach(function (value) {
    if (typeof value !== 'object') {
      throw new TagError('Value is not an object')
    }

    if (typeof value.language !== 'string' ||
      typeof value.type !== 'number' ||
      typeof value.descriptor !== 'string' ||
      typeof value.lyrics !== 'string') {
      throw new TagError('Language/Type/Descriptor is invalid')
    }

    if (!value.language.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }

    const regex = /^(\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)/
    const valid = value.lyrics.split('\n').every(entry => regex.test(entry))

    if (!valid) {
      throw new TagError(203, 'Lyrics do not follow format: [mm:ss.xxx] string')
    }

    const checkObj = {
      language: value.language,
      descriptor: value.descriptor
    }

    if (includes(sylts, checkObj)) {
      throw new TagError('1 SYLT with the same language and descriptor only')
    } else {
      sylts.push(checkObj)
    }
  })

  return true
}
