
import TagError from '../error'

const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/
const langRegex = /^([a-z]{3})$/

function validateID (id) {
  if (typeof id !== 'string') {
    throw new TagError(203, 'ID is not a string')
  }

  if (!id.match(/^([a-zA-Z0-9]{4})$/)) {
    throw new TagError(203, 'ID is invalid')
  }

  return true
}

function noDuplicate (frames, frame, keys) {
  let duplicate = 0
  frames.forEach(function (compare) {
    let sameCount = 0
    keys.forEach(function (key) {
      if ((key === 'id' && frame[key] === compare[key]) ||
        (key !== 'id' && frame.id === compare.id &&
        frame.value[key] === compare.value[key])) sameCount++
    })

    duplicate += (sameCount === keys.length) ? 1 : 0
  })

  if (duplicate > 1) {
    const ks = keys.join(', ')
    throw new TagError(203, `There may only 1 ${frame.id} with the same ${ks}`)
  }
}

/**
 *  Validators
 *  @param {Object} frame - Frame to be validated
 *  @this ID3v2 tagger class
 */

export function textFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  if (typeof frame.value !== 'string') {
    throw new TagError(203, `${frame.id} value is not a string`)
  }

  return true
}

export function arrayFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  if (!Array.isArray(frame.value)) {
    throw new TagError(203, `${frame.id} value is not an array`)
  }

  return true
}

export function numberFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  if (typeof frame.value !== 'number') {
    throw new TagError(203, `${frame.id} value is not a number`)
  }

  return true
}

export function setFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  if (typeof frame.value.position !== 'number' ||
    typeof frame.value.total !== 'number') {
    throw new TagError(203, 'Set frame position/total is not a number')
  }

  if (frame.value.position > frame.value.total) {
    throw new TagError(203, 'Position is greater than total')
  }

  return true
}

export function timeFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  switch (this.major) {
    case 3:
      if (!frame.value.toString().match(/^([0-9]{4})$/)) {
        throw new TagError(203, 'Date Frame is not 4 numeric characters long')
      }
      break

    case 4:
      if (typeof frame.value !== 'string') {
        throw new TagError(203, 'Time Frames is not a string')
      }

      /**
       *  @TODO Improve regex matching the format
       */
      if (!frame.value.match(/^([0-9]{8})T([0-9]{6})$/)) {
        throw new TagError(203,
          'Time Frames should follow this format: YYYYMMDD\\THHMMSS')
      }
      break

    default:
      throw new TagError(201, this.major)
  }

  return true
}

export function urlFrame (frame) {
  validateID(frame.id)
  noDuplicate(this.frames, frame, ['id'])

  if (!frame.value.match(urlRegex)) {
    throw new TagError(203, 'URL is not a valid URL')
  }

  return true
}

export function txxxFrame (frame) {
  validateID(frame.id)
  noDuplicate(this.frames, frame, ['description'])

  if (typeof frame.value.description !== 'string' ||
    typeof frame.value.text !== 'string') {
    throw new TagError(203, 'User-defined text/description is not a string')
  }

  return true
}

export function wxxxFrame (frame) {
  validateID(frame.id)
  noDuplicate(this.frames, frame, ['description'])

  if (typeof frame.value.description !== 'string' ||
    typeof frame.value.url !== 'string') {
    throw new TagError(203, 'User-defined text/description is not a string')
  }

  if (!frame.value.url.match(urlRegex)) {
    throw new TagError(203, 'URL is not a valid URL')
  }

  return true
}

export function tkeyFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  if (typeof frame.value !== 'string') {
    throw new TagError(203, 'TKEY is not a string')
  }

  if (!frame.value.match(/^([A-Gb#mo]{3})$/)) {
    throw new TagError(203, 'Invalid TKEY Format (e.g. Cbm)')
  }

  return true
}

export function tlanFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  if (typeof frame.value !== 'string') {
    throw new TagError(203, 'TLAN is not a string')
  }

  if (!frame.value.toString().match(/^([a-z]{3})$/)) {
    throw new TagError(203, 'Language does not follow ISO 639-2')
  }

  return true
}

export function tsrcFrame (frame) {
  validateID(frame.id)
  if (this.major === 3) noDuplicate(this.frames, frame, ['id'])

  if (typeof frame.value !== 'string') {
    throw new TagError(203, 'TSRC is not a string')
  }

  if (!frame.value.match(/^([a-zA-Z0-9]{12})$/)) {
    throw new TagError(203, 'Invalid ISRC format')
  }

  return true
}

export function langDescFrame (frame) {
  validateID(frame.id)
  noDuplicate(this.frames, frame, ['language', 'descriptor'])

  frame.value.descriptor = frame.value.descriptor || ''
  if (typeof frame.value.language !== 'string' ||
    typeof frame.value.descriptor !== 'string' ||
    typeof frame.value.text !== 'string') {
    throw new TagError(203, 'Language/descriptor/text is not a string')
  }

  if (!frame.value.language.match(langRegex)) {
    throw new TagError(203, 'Language does not follow ISO 639-2')
  }

  return true
}

export function apicFrame (frame) {
  validateID(frame.id)
  noDuplicate(this.frames, frame, ['id', 'description'])

  if (typeof frame.value.format !== 'string' ||
    typeof frame.value.description !== 'string' ||
    typeof frame.value.type !== 'number') {
    throw new TagError(203, 'MIME, type, or description is not a string')
  }

  if (frame.value.format === 'png' || frame.value.format === 'jpeg') {
    frame.value.format = 'image/' + frame.value.format
  }

  if (!frame.value.format.match(/(image\/[a-z0-9!#$&.+\-^_]+){0,129}/)) {
    throw new TagError(203, 'MIME type should be an image')
  }

  if (frame.value.description.length > 64) {
    throw new TagError(203, 'Description should not exceed 64')
  }

  if (frame.value.data instanceof ArrayBuffer ||
    Array.isArray(frame.value.data) ||
    (ArrayBuffer.isView(frame.value.data) &&
    !(frame.value.data instanceof DataView))) {
  } else {
    throw new TagError(203, 'Image data should be ArrayBuffer or an array')
  }

  return true
}
