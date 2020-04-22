
import * as parsers from './parse.mjs'
import * as validators from './validate.mjs'
import * as writers from './write.mjs'

export const APIC = {
  parse: parsers.apicFrame,
  validate: validators.apicFrame,
  write: writers.apicFrame,
  version: [3, 4]
}

export const COMM = {
  parse: parsers.langDescFrame,
  validate: validators.langDescFrame,
  write: writers.langDescFrame,
  version: [3, 4]
}

export const GEOB = {
  parse: parsers.geobFrame,
  validate: validators.geobFrame,
  write: writers.geobFrame,
  version: [3, 4]
}

export const IPLS = {
  parse: parsers.iplsFrame,
  validate: validators.textFrame,
  write: writers.iplsFrame,
  version: [3]
}

export const MCDI = {
  parse: parsers.mcdiFrame,
  validate: validators.mcdiFrame,
  write: writers.mcdiFrame,
  version: [3, 4]
}

export const OWNE = {
  parse: parsers.owneFrame,
  validate: validators.owneFrame,
  write: writers.owneFrame,
  version: [3, 4]
}

export const PRIV = {
  parse: parsers.privFrame,
  validate: validators.privFrame,
  write: writers.privFrame,
  version: [3, 4]
}

export const SEEK = {
  parse: parsers.seekFrame
}

export const SIGN = {
  parse: parsers.signFrame,
  validate: validators.signFrame,
  write: writers.signFrame,
  version: [4]
}

export const SYLT = {
  parse: parsers.syltFrame,
  validate: validators.syltFrame,
  write: writers.syltFrame,
  version: [3, 4]
}

export const SYTC = {
  parse: parsers.sytcFrame,
  validate: validators.sytcFrame,
  write: writers.sytcFrame,
  version: [3, 4]
}

export const TALB = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TBPM = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.asciiFrame,
  version: [3, 4]
}

export const TCOM = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TCON = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TCOP = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TDAT = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [3]
}

export const TDEN = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [4]
}

export const TDLY = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.asciiFrame,
  version: [3]
}

export const TDOR = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [4]
}

export const TDRC = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [4]
}

export const TDRL = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [4]
}

export const TDTG = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [4]
}

export const TENC = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TEXT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TFLT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TIME = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [3]
}

export const TIPL = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TIT1 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TIT2 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TIT3 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TKEY = {
  parse: parsers.textFrame,
  validate: validators.tkeyFrame,
  write: writers.asciiFrame,
  version: [3, 4]
}

export const TLAN = {
  parse: parsers.textFrame,
  validate: validators.tlanFrame,
  write: writers.asciiFrame,
  version: [3, 4]
}

export const TLEN = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.asciiFrame,
  version: [3, 4]
}

export const TMCL = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TMED = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TMOO = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TOAL = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TOFN = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TOLY = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TOPE = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TORY = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [3]
}

export const TOWN = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TPE1 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TPE2 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TPE3 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TPE4 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TPOS = {
  parse: parsers.setFrame,
  validate: validators.setFrame,
  write: writers.setFrame,
  version: [3, 4]
}

export const TPRO = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TPUB = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TRCK = {
  parse: parsers.setFrame,
  validate: validators.setFrame,
  write: writers.setFrame,
  version: [3, 4]
}

export const TRDA = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3]
}

export const TRSN = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TRSO = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TSIZ = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.asciiFrame,
  version: [3]
}

export const TSOA = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TSOC = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TSOP = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TSOT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TSRC = {
  parse: parsers.textFrame,
  validate: validators.tsrcFrame,
  write: writers.asciiFrame,
  version: [3, 4]
}

export const TSSE = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TSST = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [4]
}

export const TYER = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [3]
}

export const TXXX = {
  parse: parsers.txxxFrame,
  validate: validators.txxxFrame,
  write: writers.txxxFrame,
  version: [3, 4]
}

export const UFID = {
  parse: parsers.ufidFrame,
  validate: validators.ufidFrame,
  write: writers.ufidFrame,
  version: [3, 4]
}

export const USER = {
  parse: parsers.userFrame,
  validate: validators.userFrame,
  write: writers.userFrame,
  version: [3, 4]
}

export const USLT = {
  parse: parsers.langDescFrame,
  validate: validators.langDescFrame,
  write: writers.langDescFrame,
  version: [3, 4]
}

export const WCOM = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WCOP = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WOAF = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WOAR = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WOAS = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WORS = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WPAY = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WPUB = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [3, 4]
}

export const WXXX = {
  parse: parsers.wxxxFrame,
  validate: validators.wxxxFrame,
  write: writers.wxxxFrame,
  version: [3, 4]
}
