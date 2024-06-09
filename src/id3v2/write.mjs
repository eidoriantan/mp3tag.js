
import BufferView from '../viewer.mjs'

import {
  setBit,
  encodeSynch,
  mergeBytes,
  unsynch,
  dataBlock,
  longToBytes
} from '../utils/bytes.mjs'
import { encodeString, ENCODINGS } from '../utils/strings.mjs'

function getHeaderBytes (id, size, version, flags) {
  const idBytes = encodeString(id)
  const sizeView = new BufferView(version === 2 ? 3 : 4)

  if (version === 2) sizeView.setUint24(0, size)
  else sizeView.setUint32(0, version === 3 ? size : encodeSynch(size))

  const flagsBytes = []
  if (version === 3 || version === 4) {
    flagsBytes.push(0, 0)
    if (version === 4 && flags.unsynchronisation) {
      flagsBytes[1] = setBit(flagsBytes[1], 1)
    }

    if (version === 4 && flags.dataLengthIndicator) {
      flagsBytes[1] = setBit(flagsBytes[1], 0)
    }
  }

  return mergeBytes(
    idBytes,
    sizeView.getUint8(0, version === 2 ? 3 : 4),
    flagsBytes
  )
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
    case 2:
    case 3:
      encoding = 1
      strBytes = encodeString(value.replace(/\\\\/g, '/') + '\0', 'utf-16')
      break

    case 4:
      encoding = 3
      strBytes = encodeString(value.replace(/\\\\/g, '\0') + '\0', 'utf-8')
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
    case 2:
    case 3:
      strBytes = encodeString(value.replace(/\\\\/g, '/') + '\0')
      break

    case 4:
      strBytes = encodeString(value.replace(/\\\\/g, '\0') + '\0')
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
  if (version === 2 || version === 3) value = value.toString().split('\\\\')[0]
  else if (version === 4) value = value.toString().replace(/\\\\/g, '\0')

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
      case 2:
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
      case 2:
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
      case 2:
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
      case 2:
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
      case 2:
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
    case 2:
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
    case 2:
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

export function rvadFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  const bitsvolume = values.bitsvolume || 0x10
  const limit = Math.ceil(bitsvolume / 8)
  let incdec = 0

  if (values.incdec) {
    if (values.incdec.right) incdec = setBit(incdec, 0)
    if (values.incdec.left) incdec = setBit(incdec, 1)
    if (values.incdec.rightback) incdec = setBit(incdec, 2)
    if (values.incdec.leftback) incdec = setBit(incdec, 3)
    if (values.incdec.center) incdec = setBit(incdec, 4)
    if (values.incdec.bass) incdec = setBit(incdec, 5)
  }

  bytes.push(incdec)
  bytes.push(bitsvolume)

  const volumechange = values.volumechange || {}
  const peakvolume = values.peakvolume || {}
  const rightChangeBlock = dataBlock(volumechange.right, limit)
  const leftChangeBlock = dataBlock(volumechange.left, limit)
  const rightPeakBlock = dataBlock(peakvolume.right, limit)
  const leftPeakBlock = dataBlock(peakvolume.left, limit)
  rightChangeBlock.forEach(byte => bytes.push(byte))
  leftChangeBlock.forEach(byte => bytes.push(byte))
  rightPeakBlock.forEach(byte => bytes.push(byte))
  leftPeakBlock.forEach(byte => bytes.push(byte))

  if (
    volumechange.rightback || volumechange.leftback ||
    peakvolume.rightback || peakvolume.leftback ||
    volumechange.center || peakvolume.center ||
    volumechange.bass || peakvolume.bass
  ) {
    const rightBackChangeBlock = dataBlock(volumechange.rightback, limit)
    const leftBackChangeBlock = dataBlock(volumechange.leftback, limit)
    const rightBackPeakBlock = dataBlock(peakvolume.rightback, limit)
    const leftBackPeakBlock = dataBlock(peakvolume.leftback, limit)
    rightBackChangeBlock.forEach(byte => bytes.push(byte))
    leftBackChangeBlock.forEach(byte => bytes.push(byte))
    rightBackPeakBlock.forEach(byte => bytes.push(byte))
    leftBackPeakBlock.forEach(byte => bytes.push(byte))
  }

  if (
    volumechange.center || peakvolume.center ||
    volumechange.bass || peakvolume.bass
  ) {
    const centerChangeBlock = dataBlock(volumechange.center, limit)
    const centerPeakBlock = dataBlock(peakvolume.center, limit)
    centerChangeBlock.forEach(byte => bytes.push(byte))
    centerPeakBlock.forEach(byte => bytes.push(byte))
  }

  if (volumechange.bass || peakvolume.bass) {
    const bassChangeBlock = dataBlock(volumechange.bass, limit)
    const bassPeakBlock = dataBlock(peakvolume.bass, limit)
    bassChangeBlock.forEach(byte => bytes.push(byte))
    bassPeakBlock.forEach(byte => bytes.push(byte))
  }

  const data = unsynch ? unsynchData(bytes) : bytes
  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function rva2Frame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(value => {
    const identification = encodeString(value.identification + '\0')
    let data = identification

    for (let i = 0; i < value.channels.length; i++) {
      const channel = value.channels[i]
      const type = channel.type
      const volumeadjust = new Int16Array([channel.volumeadjust])
      const volumeadjust8 = new Uint8Array(volumeadjust.buffer)
      const bitspeak = channel.bitspeak
      const limit = Math.ceil(bitspeak / 8)
      const peakvolume = dataBlock(channel.peakvolume, limit)

      data = mergeBytes(data, type, volumeadjust8, bitspeak, peakvolume)
    }

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

function timeBytes (time) {
  const timeBytes = new BufferView(4)
  timeBytes.setUint32(0, time)
  return timeBytes.getUint8(0, 4)
}

function parseLyrics (lyrics, encodingString) {
  const regex = /^\[(\d{1,}):(\d{2})\.(\d{3})\] ?(.*)/
  let lyricsBytes = []
  lyrics.replace(/\r\n/g, '\n').split('\n').forEach(line => {
    if (line !== '') {
      const result = regex.exec(line)
      const time = parseInt(result[1]) * 60000 + parseInt(result[2]) * 1000 + parseInt(result[3])
      const string = encodeString((result[4] || '') + '\0', encodingString)
      lyricsBytes = mergeBytes(lyricsBytes, string, timeBytes(time))
    }
  })
  return lyricsBytes
}

export function syltFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []
  const encoding = version === 3 || version === 2 ? 1 : version === 4 ? 3 : 0
  const encodingString = ENCODINGS[encoding]

  values.forEach(sylt => {
    const langBytes = encodeString(sylt.language)
    const descBytes = encodeString(sylt.descriptor + '\0', encodingString)

    let dataBytes = []
    if (sylt.data) {
      sylt.data.forEach(({ time, line }) => {
        const string = encodeString(line + '\0', encodingString)
        dataBytes = mergeBytes(dataBytes, string, timeBytes(time))
      })
    } else if (sylt.lyrics) {
      dataBytes = parseLyrics(sylt.lyrics, encodingString)
    }

    let data = mergeBytes(encoding, langBytes, sylt.format, sylt.type,
      descBytes, dataBytes)
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

  const array = value.data.flatMap(({ bpm, time }) => bpm >= 255 ? [255, bpm - 255, ...timeBytes(time)] : [bpm, ...timeBytes(time)])
  let data = mergeBytes(value.format, array)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function etcoFrame (value, options) {
  const { id, version, unsynch } = options

  const array = value.data.flatMap(({ event, time }) => [event, ...timeBytes(time)])
  let data = mergeBytes(value.format, array)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function pcntFrame (value, options) {
  const { id, version, unsynch } = options

  const count = parseInt(value)
  let data = longToBytes(count)

  while (data.length < 4) data.unshift(0)
  if (unsynch) data = unsynchData(data, version)

  const header = getHeaderBytes(id, data.length, version, {
    unsynchronisation: unsynch,
    dataLengthIndicator: unsynch
  })

  return mergeBytes(header, data)
}

export function popmFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(popm => {
    const emailBytes = encodeString(popm.email + '\0')
    const counterBytes = longToBytes(popm.counter)
    while (counterBytes.length < 4) counterBytes.unshift(0)

    let data = mergeBytes(emailBytes, popm.rating, counterBytes)
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

export function unsupportedFrame (values, options) {
  const { id, version, unsynch } = options
  const bytes = []

  values.forEach(value => {
    const header = getHeaderBytes(id, value.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    })

    const merged = mergeBytes(header, value)
    merged.forEach(byte => bytes.push(byte))
  })

  return bytes
}
