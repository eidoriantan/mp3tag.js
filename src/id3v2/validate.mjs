
import BufferView from '../viewer.mjs'

import { timeRegex, year, month, day } from '../utils/date.mjs'
import { includes } from '../utils/objects.mjs'

const stringRegex = /^(.*)$/
const setRegex = /^([0-9]+)(\/[0-9]+)?$/
const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/
const langRegex = /^([a-z]{3}|XXX)$/
const imageRegex = /(image\/[a-z0-9!#$&.+\-^_]+){0,129}/
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
const syltRegex = /^((\[\d{1,}:\d{2}\.\d{3}\]) (.*))/

export function textFrame (value, version, strict) {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string')
  }

  if (strict && !value.match(stringRegex)) {
    throw new Error('Newlines are not allowed')
  }

  return true
}

export function setFrame (value, version, strict) {
  if (version === 2 || version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(set => {
    textFrame(set, version, strict)

    if (typeof set !== 'string' && typeof set !== 'number') {
      throw new Error('Value is not a string/number')
    }

    const match = set.match(setRegex)
    if (strict && typeof set === 'string') {
      if (match === null) throw new Error('Invalid format (eg. 1/2)')

      const position = parseInt(match[1])
      const total = match[2] ? parseInt(match[2].substring(1)) : null
      if (total !== null && position > total) {
        throw new Error('Position is greater then total')
      }
    }
  })

  return true
}

export function timeFrame (value, version, strict) {
  if (version === 2 || version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(time => {
    textFrame(time, version, strict)

    if (version === 3 && strict && !time.match(/^(\d{4})$/)) {
      throw new Error('Value is not 4 numeric characters')
    }

    if (version === 4 && strict && !time.match(timeRegex)) {
      throw new Error('Time frames must follow ISO 8601')
    }
  })

  return true
}

export function tkeyFrame (value, version, strict) {
  if (version === 2 || version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(tkey => {
    textFrame(tkey, version, strict)

    if (strict && !tkey.match(/^([A-Gb#mo]{1,3})$/)) {
      throw new Error('Invalid TKEY Format (eg Cbm)')
    }
  })

  return true
}

export function tlanFrame (value, version, strict) {
  if (version === 2 || version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(tlan => {
    textFrame(tlan, version, strict)

    if (strict && !tlan.match(langRegex)) {
      throw new Error('Language must follow ISO 639-2')
    }
  })

  return true
}

export function tsrcFrame (value, version, strict) {
  if (version === 2 || version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(tsrc => {
    textFrame(tsrc, version, strict)

    if (strict && !tsrc.match(/^([A-Z0-9]{12})$/)) {
      throw new Error('Invalid ISRC format')
    }
  })

  return true
}

export function urlFrame (value, version, strict) {
  textFrame(value, version, strict)
  if (strict && !value.match(urlRegex)) throw new Error('Invalid URL')

  return true
}

export function txxxFrame (values, version, strict) {
  const descriptions = []
  values.forEach(value => {
    textFrame(value.description, version, strict)
    textFrame(value.text, version, strict)

    if (strict && includes(descriptions, value.description)) {
      throw new Error('Description should not duplicate')
    } else descriptions.push(value.description)
  })

  return true
}

export function wxxxFrame (values, version, strict) {
  const descriptions = []
  values.forEach(value => {
    textFrame(value.description, version, strict)
    urlFrame(value.url, version, strict)

    if (strict && includes(descriptions, value.description)) {
      throw new Error('Description should not duplicate')
    } else descriptions.push(value.description)
  })

  return true
}

export function langDescFrame (values, version, strict) {
  const langDescs = []
  values.forEach(langDesc => {
    textFrame(langDesc.language, version, strict)
    textFrame(langDesc.descriptor, version, strict)

    if (typeof langDesc.text !== 'string') {
      throw new Error('Text is not a string')
    }

    if (strict && !langDesc.language.match(langRegex)) {
      throw new Error('Language must follow ISO 639-2')
    }

    const checkObj = {
      language: langDesc.language,
      descriptor: langDesc.descriptor
    }

    if (strict && includes(langDescs, checkObj)) {
      throw new Error('Language and descriptor should not duplicate')
    } else langDescs.push(checkObj)
  })

  return true
}

export function apicFrame (values, version, strict) {
  const descriptions = []
  values.forEach(apic => {
    textFrame(apic.format, version, strict)
    textFrame(apic.description, version, strict)

    if (typeof apic.type !== 'number') {
      throw new Error('Type is not a number')
    }

    if (apic.type > 255 || apic.type < 0) {
      throw new Error('Type should be in range of 0 - 255')
    }

    if (!BufferView.isViewable(apic.data)) {
      throw new Error('Image data should be viewable')
    }

    if (strict) {
      if (apic.type > 21 || apic.type < 0) {
        throw new Error('Type should be in range of 0 - 21')
      }

      if (!apic.format.match(imageRegex)) {
        throw new Error('Format should be an image MIME')
      }

      if (apic.description.length > 64) {
        throw new Error('Description should not exceed 64')
      }

      if (includes(descriptions, apic.description)) {
        throw new Error('Description should not duplicate')
      } else descriptions.push(apic.description)
    }
  })

  return true
}

export function geobFrame (values, version, strict) {
  const descriptions = []
  values.forEach(geob => {
    textFrame(geob.format, version, strict)
    textFrame(geob.filename, version, strict)
    textFrame(geob.description, version, strict)

    if (!BufferView.isViewable(geob.object)) {
      throw new Error('Object data should be viewable')
    }

    if (strict && includes(descriptions, geob.description)) {
      throw new Error('GEOB description should not duplicate')
    } else descriptions.push(geob.description)
  })

  return true
}

export function ufidFrame (values, version, strict) {
  const ownerIds = []
  values.forEach(ufid => {
    textFrame(ufid.ownerId, version, strict)

    if (!BufferView.isViewable(ufid.id)) {
      throw new Error('ID should be viewable')
    }

    if (strict) {
      if (ufid.ownerId === '') {
        throw new Error('ownerId should not be blank')
      }

      const idLength = ufid.id.byteLength || ufid.id.length || 0
      if (idLength > 64) {
        throw new Error('ID bytelength should not exceed 64 bytes')
      }

      if (includes(ownerIds, ufid.ownerId)) {
        throw new Error('ownerId should not duplicate')
      } else ownerIds.push(ufid.ownerId)
    }
  })

  return true
}

export function userFrame (values, version, strict) {
  values.forEach(user => {
    textFrame(user.language, version, strict)

    if (typeof user.text !== 'string') {
      throw new Error('Text is not a string')
    }

    if (strict && !user.language.match(langRegex)) {
      throw new Error('Language must follow ISO 639-2')
    }
  })

  return true
}

export function owneFrame (value, version, strict) {
  textFrame(value.date, version, strict)
  textFrame(value.seller, version, strict)
  textFrame(value.currencyCode, version, strict)
  textFrame(value.currencyPrice, version, strict)

  if (strict) {
    if (!value.date.match(`${year}${month}${day}`)) {
      throw new Error('Date is not valid (format: YYYYMMDD)')
    }

    if (!value.currencyCode.match(/^([A-Z]{3})$/)) {
      throw new Error('Currency code is not valid (eg. USD)')
    }

    if (!value.currencyPrice.match(/^(\d*)\.(\d+)$/)) {
      throw new Error('Currency price is not valid (eg. 2.00)')
    }
  }

  return true
}

export function privFrame (values, version, strict) {
  const contents = []
  values.forEach(priv => {
    textFrame(priv.ownerId, version, strict)

    if (!BufferView.isViewable(priv.data)) {
      throw new Error('Data should be viewable')
    }

    if (strict && includes(contents, priv.data)) {
      throw new Error('Data should not duplicate')
    } else contents.push(priv.data)
  })

  return true
}

function checkRvadData (object, props, limit, name) {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const data = object[prop]

    if (data) {
      if (!BufferView.isViewable(data)) {
        throw new Error(`${name}.${prop} must be viewable`)
      }

      const view = new BufferView(data)
      const length = view.byteLength
      if (length > limit) {
        throw new Error(`${name}.${prop} exceeds bits limit`)
      }
    }
  }
}

export function rvadFrame (values, version, strict) {
  if (typeof values !== 'object') {
    throw new Error('Values must be an object')
  }

  const volumechange = values.volumechange
  const peakvolume = values.peakvolume
  const bitsvolume = values.bitsvolume || 0x10
  const limit = Math.ceil(bitsvolume / 8)

  if (bitsvolume && (bitsvolume < 0 || bitsvolume > 255)) {
    throw new Error('Bits volume should be in the range of 0 - 255')
  }

  if (strict && bitsvolume === 0) {
    throw new Error('Bits used for volume description may not be 0')
  }

  const props = ['right', 'left', 'rightback', 'leftback', 'center', 'bass']
  if (volumechange) checkRvadData(volumechange, props, limit, 'volumechange')
  if (peakvolume) checkRvadData(peakvolume, props, limit, 'peakvolume')

  return true
}

export function rva2Frame (values, version, strict) {
  const frames = []
  values.forEach(value => {
    if (!Array.isArray(value.channels)) {
      throw new Error('Channels should be an array')
    }

    for (let i = 0; i < value.channels.length; i++) {
      const channel = value.channels[i]
      if (typeof channel.type !== 'number') {
        throw new Error('Type of channel should be a number')
      }

      if (strict && (channel.type < 0 || channel.type > 8)) {
        throw new Error('Type of channel should be in the range of 0 - 8')
      }

      if (typeof channel.volumeadjust !== 'number') {
        throw new Error('Volume adjustment should be a number')
      }

      if (typeof channel.bitspeak !== 'number') {
        throw new Error('Bits representing peak should be a number')
      }

      if (channel.bitspeak < 0 || channel.bitspeak > 255) {
        throw new Error('Bits representing peak should be in range of 0 - 255')
      }

      if (!BufferView.isViewable(channel.peakvolume)) {
        throw new Error('Peak volume must be viewable')
      }

      const view = new BufferView(channel.peakvolume)
      const length = view.byteLength
      const limit = Math.ceil(channel.bitspeak / 8)

      if (length > limit) {
        throw new Error('Peak volume exceeds bits limit')
      }
    }

    const checkObj = { identification: value.identification }
    if (strict && includes(frames, checkObj)) {
      throw new Error('RVA2 identification should be unique')
    } else frames.push(checkObj)
  })
}

export function signFrame (values, version, strict) {
  const signs = []
  values.forEach(sign => {
    if (typeof sign.group !== 'number') {
      throw new Error('Group ID is not a number')
    }

    if (sign.group < 0 || sign.group > 255) {
      throw new Error('Group ID should be in the range of 0 - 255')
    }

    if (!BufferView.isViewable(sign.signature)) {
      throw new Error('Signature should be viewable')
    }

    if (strict && includes(signs, sign)) {
      throw new Error('SIGN contents should not be identical to others')
    } else signs.push(sign)
  })

  return true
}

export function syltFrame (values, version, strict) {
  const sylts = []
  values.forEach(({ language, descriptor, type, format, lyrics, data }) => {
    textFrame(language, version, strict)
    textFrame(descriptor, version, strict)

    if (lyrics && typeof lyrics !== 'string') {
      throw new Error('Lyrics is not a string')
    }

    if (data) {
      for (const { time, line } of data) {
        if (typeof line !== 'string') {
          throw new Error('Line is not a string')
        }
        if (typeof time !== 'number') {
          throw new Error('Timestamp is not a number')
        }
      }
    }

    if (typeof type !== 'number') {
      throw new Error('Type is not a number')
    } else if (type > 255 || type < 0) {
      throw new Error('Type should be in range of 0 - 255')
    }

    if (typeof format !== 'number') {
      throw new Error('Format is not a number')
    } else if (format > 255 || format < 0) {
      throw new Error('Format should be in range of 0 - 255')
    }

    if (strict) {
      if (!language.match(langRegex)) {
        throw new Error('Language must follow ISO 639-2')
      }

      if (type > 6 || type < 0) {
        throw new Error('Type should be in range of 0 - 8')
      }

      if (format > 2 || format < 1) {
        throw new Error('Format should be either 1 or 2')
      }

      if (lyrics && !lyrics.split('\n').every(entry => !entry.length || syltRegex.test(entry))) {
        throw new Error('Lyrics must follow this format: [mm:ss.xxx]')
      }
      const checkObj = {
        language,
        descriptor
      }

      if (includes(sylts, checkObj)) {
        throw new Error('1 SYLT with same language and descriptor only')
      } else sylts.push(checkObj)
    }
  })

  return true
}

export function mcdiFrame (value, version, strict) {
  if (!BufferView.isViewable(value.data)) {
    throw new Error('Data should be viewable')
  }

  return true
}

export function sytcFrame (value, version, strict) {
  if (typeof value.format !== 'number') {
    throw new Error('Timestamp format is not a number')
  } else if (value.format > 255 || value.format < 0) {
    throw new Error('Timestamp format should be in range of 0 - 255')
  }

  if (strict && (value.format > 2 || value.format < 1)) {
    throw new Error('Invalid timestamp format (should be 1 or 2)')
  }

  for (const { bpm, time } of value.data) {
    if (typeof bpm !== 'number') {
      throw new Error('BPM is not a number')
    } else if (bpm > 510 || bpm < 0) {
      throw new Error('BPM should be in range of 0 - 510')
    }

    if (typeof time !== 'number') {
      throw new Error('Timestamp is not a number')
    }
  }
  return true
}

export function etcoFrame (value, version, strict) {
  if (typeof value.format !== 'number') {
    throw new Error('Format is not a number')
  } else if (value.format > 255 || value.format < 0) {
    throw new Error('Format should be in range of 0 - 255')
  }

  if (strict && (value.format > 2 || value.format < 1)) {
    throw new Error('Invalid timestamp format (should be 1 or 2)')
  }
  for (const { event, time } of value.data) {
    if (typeof event !== 'number') {
      throw new Error('Event is not a number')
    } else if (event > 255 || event < 0) {
      throw new Error('Event should be in range of 0 - 255')
    }

    if (typeof time !== 'number') {
      throw new Error('Timestamp is not a number')
    }
  }

  return true
}

export function pcntFrame (value, version, strict) {
  if (isNaN(value) || isNaN(parseFloat(value))) {
    throw new Error('Value is not numerical')
  }

  return true
}

export function popmFrame (values, version, strict) {
  const popms = []
  values.forEach(({ email, rating, counter }) => {
    textFrame(email, version, strict)

    if (typeof rating !== 'number') {
      throw new Error('Rating is not a number')
    } else if (rating > 255 || rating < 0) {
      throw new Error('Rating should be in range of 0 - 255')
    }

    if (typeof counter !== 'number') {
      throw new Error('Counter is not a number')
    }

    if (strict) {
      if (!email.match(emailRegex)) {
        throw new Error('Email is not a valid email')
      }

      const checkObj = { email }
      if (includes(popms, checkObj)) {
        throw new Error('1 POPM with same email only')
      } else popms.push(checkObj)
    }
  })

  return true
}

export function unsupportedFrame (values, version, strict) {
  values.forEach(value => {
    if (!Array.isArray(value)) {
      throw new Error('Unsupported frame is not an array')
    }
  })

  return true
}
