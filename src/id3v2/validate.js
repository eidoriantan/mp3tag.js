
import { mergeAsArray, includesArray } from '../utils/array'
import TagError from '../error'

const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/
const langRegex = /^([a-z]{3}|XXX)$/
const year = '(\\d{4})'
const month = '(0[1-9]|1[0-2])'
const day = '(0[1-9]|1\\d|2\\d|3[0-1])'
const hour = '(0\\d|1\\d|2[0-3])'
const minute = '(0\\d|1\\d|2\\d|3\\d|4\\d|5\\d)'
const second = minute
const timeRegex =
  `^(${year}(-${month}(-${day}(T${hour}(:${minute}(:${second})?)?)?)?)?)$`

function validateID (id) {
  if (!id.match(/^([a-zA-Z0-9]{4})$/)) {
    throw new TagError(203, 'ID is invalid')
  }

  return true
}

/**
 *  Validators
 *  @param {Object} frame - Frame to be validated
 *  @param {number} version - Frame will be validated with this version
 */

export function textFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    if (typeof elem !== 'string') {
      throw new TagError(203, `${frame.id} value is not a string`)
    }
  })

  return true
}

export function arrayFrame (frame, version) {
  validateID(frame.id)

  if (!Array.isArray(frame.value)) {
    throw new TagError(203, `${frame.id} value is not an array`)
  }

  frame.value.forEach(function (text) {
    if (typeof text !== 'string') {
      throw new TagError(203, `${frame.id} value is not a string`)
    }
  })

  return true
}

export function numberFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    if (typeof elem !== 'number') {
      throw new TagError(203, `${frame.id} value is not a number`)
    }
  })

  return true
}

export function setFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    if (typeof elem.position !== 'number' ||
      typeof elem.total !== 'number') {
      throw new TagError(203, `${frame.id} position/total is not a number`)
    }

    if (elem.position > elem.total) {
      throw new TagError(203, `${frame.id} position is greater than total`)
    }
  })

  return true
}

export function timeFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    switch (version) {
      case 3:
        if (!elem.toString().match(/^(\d{4})$/)) {
          throw new TagError(203, `${frame.id} is not 4 numeric characters`)
        }
        break

      case 4:
        if (typeof elem !== 'string') {
          throw new TagError(203, `${frame.id} value is not a string`)
        }

        if (!elem.match(timeRegex)) {
          throw new TagError(203,
            'Time Frames should follow ISO 8601')
        }
        break

      default:
        throw new TagError(201, version)
    }
  })

  return true
}

export function urlFrame (frame, version) {
  validateID(frame.id)

  if (typeof frame.value !== 'string') {
    throw new TagError(203, `${frame.id} value is not a string`)
  }

  if (!frame.value.match(urlRegex)) {
    throw new TagError(203, 'URL is not a valid URL')
  }

  return true
}

export function txxxFrame (frame) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  const descriptions = []

  array.forEach(function (elem) {
    if (typeof elem.description !== 'string' ||
      typeof elem.text !== 'string') {
      throw new TagError(203, 'User-defined text/description is not a string')
    }

    if (descriptions.includes(elem.description)) {
      throw new TagError(203, 'User-defined description should not duplicate')
    } else {
      descriptions.push(elem.description)
    }
  })

  return true
}

export function wxxxFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  const descriptions = []

  array.forEach(function (elem) {
    if (typeof elem.description !== 'string' || typeof elem.url !== 'string') {
      throw new TagError(203, 'User-defined text/description is not a string')
    }

    if (!elem.url.match(urlRegex)) {
      throw new TagError(203, 'User-defined URL is an invalid URL')
    }

    if (descriptions.includes(elem.description)) {
      throw new TagError(203, 'User-defined description should not duplicate')
    } else {
      descriptions.push(elem.description)
    }
  })

  return true
}

export function tkeyFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    if (typeof elem !== 'string') {
      throw new TagError(203, 'TKEY is not a string')
    }

    if (!elem.match(/^([A-Gb#mo]{3})$/)) {
      throw new TagError(203, 'Invalid TKEY Format (e.g. Cbm)')
    }
  })

  return true
}

export function tlanFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    if (typeof elem !== 'string') {
      throw new TagError(203, 'TLAN is not a string')
    }

    if (!elem.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }
  })

  return true
}

export function tsrcFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    if (typeof elem !== 'string') {
      throw new TagError(203, 'TSRC is not a string')
    }

    if (!elem.match(/^([a-zA-Z0-9]{12})$/)) {
      throw new TagError(203, 'Invalid ISRC format')
    }
  })

  return true
}

export function langDescFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  const descriptors = []

  array.forEach(function (elem) {
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

export function apicFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
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

    if (descriptions.includes(elem.description)) {
      throw new TagError(203, 'Cover description should not duplicate')
    } else {
      descriptions.push(elem.description)
    }

    if (elem.description.length > 64) {
      throw new TagError(203, 'Description should not exceed 64')
    }

    if (!elem.format.match(/(image\/[a-z0-9!#$&.+\-^_]+){0,129}/)) {
      throw new TagError(203, 'MIME type should be an image')
    }
  })

  return true
}

export function geobFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
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

export function ufidFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  const ownerIds = []

  array.forEach(function (elem) {
    if (typeof elem.ownerId !== 'string') {
      throw new TagError(203, 'UFID ownerId is not a string')
    }

    if (!(elem.id instanceof ArrayBuffer) && !Array.isArray(elem.id) &&
      !ArrayBuffer.isView(elem.id)) {
      throw new TagError(203, 'UFID id should be ArrayBuffer or an array')
    }

    const idLength = elem.id.byteLength || elem.id.length || 0
    if (idLength > 64) {
      throw new TagError(203, 'UFID id exceeds 64 bytes')
    }

    if (ownerIds.includes(elem.ownerId)) {
      throw new TagError(203, 'UFID ownerId should not duplicate')
    } else {
      ownerIds.push(elem.ownerId)
    }
  })

  return true
}

export function userFrame (frame, version) {
  validateID(frame.id)

  const array = mergeAsArray(frame.value)
  array.forEach(function (elem) {
    if (typeof elem.language !== 'string' || typeof elem.text !== 'string') {
      throw new TagError(203, 'USER language/text is not a string')
    }

    if (!elem.language.match(langRegex)) {
      throw new TagError(203, 'Language does not follow ISO 639-2')
    }
  })

  return true
}
