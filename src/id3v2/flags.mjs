
import { isBitSet } from '../utils/bytes.mjs'

export function getHeaderFlags (byte, version) {
  const flags = {
    unsynchronisation: isBitSet(byte, 7)
  }

  switch (version) {
    case 2:
      flags.compression = isBitSet(byte, 6)
      break

    case 3:
      flags.extendedHeader = isBitSet(byte, 6)
      flags.experimentalIndicator = isBitSet(byte, 5)
      break

    case 4:
      flags.extendedHeader = isBitSet(byte, 6)
      flags.experimentalIndicator = isBitSet(byte, 5)
      flags.footerPresent = isBitSet(byte, 4)
      break
  }

  return flags
}

export function getFrameFlags (bytes, version) {
  const flags = {}
  switch (version) {
    case 3:
      flags.tagAlterPreservation = isBitSet(bytes[0], 7)
      flags.fileAlterPreservation = isBitSet(bytes[0], 6)
      flags.readOnly = isBitSet(bytes[0], 5)
      flags.compression = isBitSet(bytes[1], 7)
      flags.encryption = isBitSet(bytes[1], 6)
      flags.groupingIdentity = isBitSet(bytes[1], 5)
      break

    case 4:
      flags.tagAlterPreservation = isBitSet(bytes[0], 6)
      flags.fileAlterPreservation = isBitSet(bytes[0], 5)
      flags.readOnly = isBitSet(bytes[0], 4)
      flags.groupingIdentity = isBitSet(bytes[1], 6)
      flags.compression = isBitSet(bytes[1], 3)
      flags.encryption = isBitSet(bytes[1], 2)
      flags.unsynchronisation = isBitSet(bytes[1], 1)
      flags.dataLengthIndicator = isBitSet(bytes[1], 0)
      break
  }

  return flags
}
