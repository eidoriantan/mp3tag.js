
import { mergeAsArray, includesArray } from '../utils/array'
import TagError from '../error'

const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/
const langRegex = /^([a-z]{3}|XXX)$/
const stringRegex = /^(.+)$/

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
  if (!id.match(/^([a-zA-Z0-9]{4})$/)) {
    throw new TagError(203, 'ID is invalid')
  }

  return true
}

/**
 *  Validators
 *  @param {*} frameValue - Value of a frame
 *  @param {number} version - Frame will be validated with this version
 */

export function textFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (string) {
    if (typeof string !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!string.match(stringRegex)) {
      throw new TagError(203, 'Newlines are not allowed')
    }
  })

  return true
}

export function arrayFrame (value, version) {
  if (!Array.isArray(value)) {
    throw new TagError(203, 'Value is not an array')
  }

  value.forEach(function (string) {
    if (typeof string !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!string.match(stringRegex)) {
      throw new TagError(203, 'Newlines are not allowed')
    }
  })

  return true
}

export function numberFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (number) {
    if (typeof number !== 'number') {
      throw new TagError(203, 'Value is not a number')
    }
  })

  return true
}

export function setFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (elem) {
    if (typeof elem.position !== 'number' ||
      typeof elem.total !== 'number') {
      throw new TagError(203, 'Value position/total is not a number')
    }

    if (elem.position > elem.total) {
      throw new TagError(203, 'Position is greater than total')
    }
  })

  return true
}

export function timeFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (elem) {
    switch (version) {
      case 3:
        if (!elem.toString().match(/^(\d{4})$/)) {
          throw new TagError(203, 'Value is not 4 numeric characters')
        }
        break

      case 4:
        if (typeof elem !== 'string') {
          throw new TagError(203, 'Value is not a string')
        }

        if (!elem.match(timeRegex)) {
          throw new TagError(203, 'Time frames should follow ISO 8601')
        }
        break
    }
  })

  return true
}

export function urlFrame (value, version) {
  if (typeof value !== 'string') {
    throw new TagError(203, 'Value is not a string')
  }

  if (!value.match(urlRegex)) {
    throw new TagError(203, 'Value is not a valid URL')
  }

  return true
}

export function txxxFrame (value, verion) {
  const array = mergeAsArray(value)
  const descriptions = []

  array.forEach(function (elem) {
    if (typeof elem.description !== 'string' ||
      typeof elem.text !== 'string') {
      throw new TagError(203, 'Text/description is not a string')
    }

    if (descriptions.includes(elem.description)) {
      throw new TagError(203, 'Description should not duplicate')
    } else {
      descriptions.push(elem.description)
    }
  })

  return true
}

export function wxxxFrame (value, version) {
  const array = mergeAsArray(value)
  const descriptions = []

  array.forEach(function (elem) {
    if (typeof elem.description !== 'string' || typeof elem.url !== 'string') {
      throw new TagError(203, 'Text/description is not a string')
    }

    if (!elem.url.match(urlRegex)) {
      throw new TagError(203, 'URL is an invalid URL')
    }

    if (descriptions.includes(elem.description)) {
      throw new TagError(203, 'Description should not duplicate')
    } else {
      descriptions.push(elem.description)
    }
  })

  return true
}

export function tkeyFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (string) {
    if (typeof string !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!string.match(/^([A-Gb#mo]{3})$/)) {
      throw new TagError(203, 'Invalid TKEY Format (e.g. Cbm)')
    }
  })

  return true
}

export function tlanFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (string) {
    if (typeof string !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!string.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }
  })

  return true
}

export function tsrcFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (string) {
    if (typeof string !== 'string') {
      throw new TagError(203, 'Value is not a string')
    }

    if (!string.match(/^([a-zA-Z0-9]{12})$/)) {
      throw new TagError(203, 'Invalid ISRC format')
    }
  })

  return true
}

export function langDescFrame (value, version) {
  const array = mergeAsArray(value)
  const descriptors = []

  array.forEach(function (elem) {
    if (typeof elem !== 'object') {
      throw new TagError(203, 'Value is not an object')
    }

    elem.language = elem.language || 'eng'
    elem.descriptor = elem.descriptor || ''

    if (typeof elem.language !== 'string' ||
      typeof elem.descriptor !== 'string' ||
      typeof elem.text !== 'string') {
      throw new TagError(203, 'Language/descriptor/text is not a string')
    }

    if (!elem.language.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }

    if (descriptors.includes(elem.descriptor)) {
      throw new TagError(203, 'Language/descriptor/text should not duplicate')
    } else {
      descriptors.push(elem.descriptor)
    }
  })

  return true
}

export function apicFrame (value, version) {
  const array = mergeAsArray(value)
  const descriptions = []

  array.forEach(function (elem) {
    if (typeof elem.format !== 'string' ||
      typeof elem.description !== 'string' ||
      typeof elem.type !== 'number') {
      throw new TagError(203, 'MIME, type, or description is invalid')
    }

    if (!(elem.data instanceof ArrayBuffer) && !Array.isArray(elem.data) &&
      !ArrayBuffer.isView(elem.data)) {
      throw new TagError(203, 'Image data should be ArrayBuffer or an array')
    }

    if (elem.description.length > 64) {
      throw new TagError(203, 'Description should not exceed 64')
    }

    if (descriptions.includes(elem.description)) {
      throw new TagError(203, 'Cover description should not duplicate')
    } else {
      descriptions.push(elem.description)
    }

    if (!elem.format.match(/(image\/[a-z0-9!#$&.+\-^_]+){0,129}/)) {
      throw new TagError(203, 'MIME type should be an image')
    }
  })

  return true
}

export function geobFrame (value, version) {
  const array = mergeAsArray(value)
  const descriptions = []
  const objects = []

  array.forEach(function (elem) {
    if (typeof elem.format !== 'string' || typeof elem.filename !== 'string' ||
      typeof elem.description !== 'string') {
      throw new TagError(203, 'GEOB MIME/Filename/description is not a string')
    }

    if (!(elem.object instanceof ArrayBuffer) && !Array.isArray(elem.object) &&
      !ArrayBuffer.isView(elem.object)) {
      throw new TagError(203, 'Object data should be ArrayBuffer or an array')
    }

    if (descriptions.includes(elem.description)) {
      throw new TagError(203, 'GEOB description should not duplicate')
    } else {
      descriptions.push(elem.description)
    }

    if (includesArray(objects, elem.object)) {
      throw new TagError(203, 'GEOB object should not duplicate')
    } else {
      objects.push(elem.object)
    }
  })

  return true
}

export function ufidFrame (value, version) {
  const array = mergeAsArray(value)
  const ownerIds = []

  array.forEach(function (elem) {
    if (typeof elem.ownerId !== 'string') {
      throw new TagError(203, 'ownerId is not a string')
    }

    if (!(elem.id instanceof ArrayBuffer) && !Array.isArray(elem.id) &&
      !ArrayBuffer.isView(elem.id)) {
      throw new TagError(203, 'id should be ArrayBuffer or an array')
    }

    const idLength = elem.id.byteLength || elem.id.length || 0
    if (idLength > 64) {
      throw new TagError(203, 'id should not exceed 64 bytes')
    }

    if (ownerIds.includes(elem.ownerId)) {
      throw new TagError(203, 'ownerId should not duplicate')
    } else {
      ownerIds.push(elem.ownerId)
    }
  })

  return true
}

export function userFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (elem) {
    if (typeof elem !== 'object') {
      throw new TagError(203, 'Value is not an object')
    }

    elem.language = elem.language || 'eng'
    if (typeof elem.language !== 'string' || typeof elem.text !== 'string') {
      throw new TagError(203, 'Language/text is not a string')
    }

    if (!elem.language.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }
  })

  return true
}

export function owneFrame (value, version) {
  const array = mergeAsArray(value)
  array.forEach(function (elem) {
    if (typeof elem !== 'object') {
      throw new TagError(203, 'Value is not an object')
    }

    if (typeof elem.currency !== 'object' || typeof elem.date !== 'string' ||
      typeof elem.seller !== 'string') {
      throw new TagError(203, 'Value is not valid')
    }

    if (typeof elem.currency.code !== 'string' ||
      typeof elem.currency.price !== 'string') {
      throw new TagError(203, 'Currency values are not valid')
    }

    if (!elem.currency.code.match(/^([A-Z]{3})$/)) {
      throw new TagError(203, 'Currency code is not valid')
    }

    if (!elem.currency.price.match(/^(\d*)\.(\d+)$/)) {
      throw new TagError(203, 'Currency price is not valid')
    }

    if (!elem.date.match(`${year}${month}${day}`)) {
      throw new TagError(203, 'Date must follow this format: YYYYMMDD')
    }
  })
}

export function privFrame (value, version) {
  const array = mergeAsArray(value)
  const contents = []

  array.forEach(function (elem) {
    if (typeof elem.ownerId !== 'string') {
      throw new TagError(203, 'ownerId is not a string')
    }

    if (!elem.ownerId.match(urlRegex)) {
      throw new TagError(203, 'ownerId is an invalid URL')
    }

    if (!(elem.data instanceof ArrayBuffer) && !Array.isArray(elem.data) &&
      !ArrayBuffer.isView(elem.data)) {
      throw new TagError(203, 'Data should be an ArrayBuffer or array')
    }

    if (includesArray(contents, elem.data)) {
      throw new TagError(203, 'Data should not duplicate')
    } else {
      contents.push(elem.data)
    }
  })

  return true
}

export function signFrame (value, version) {
  const array = mergeAsArray(value)
  const signs = []

  array.forEach(function (elem) {
    if (typeof elem.group !== 'number') {
      throw new TagError(203, 'Group ID is not a number')
    }

    if (elem.group < 0 || elem.group > 255) {
      throw new TagError(203, 'Group ID should be in the range of 0 - 255')
    }

    if (!(elem.signature instanceof ArrayBuffer) &&
      !Array.isArray(elem.signature) &&
      !ArrayBuffer.isView(elem.signature)) {
      throw new TagError(203, 'Signature should be an ArrayBuffer or array')
    }

    /**
     * @TODO: Define includesObject
     */
    // if (includesObject(signs, elem)) {
    //   throw new TagError(203, 'SIGN contents should be identical to others')
    // } else {
    //   signs.push(elem)
    // }
  }
  })

  return true
}
