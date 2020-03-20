
import * as parsers from './parse'
import * as validators from './validate'
import * as writers from './write'

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
  validate: validators.arrayFrame,
  write: writers.iplsFrame,
  version: [3]
}

export const TALB = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TBPM = {
  parse: parsers.numberFrame,
  validate: validators.numberFrame,
  write: writers.asciiFrame,
  version: [3, 4]
}

export const TCOM = {
  parse: parsers.arrayFrame,
  validate: validators.arrayFrame,
  write: writers.arrayFrame,
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
  parse: parsers.numberFrame,
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
  parse: parsers.numberFrame,
  validate: validators.numberFrame,
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
  write: writers.textFrame,
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
  write: writers.textFrame,
  version: [4]
}

export const TENC = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TEXT = {
  parse: parsers.arrayFrame,
  validate: validators.arrayFrame,
  write: writers.arrayFrame,
  version: [3, 4]
}

export const TFLT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

export const TIME = {
  parse: parsers.numberFrame,
  validate: validators.timeFrame,
  write: writers.asciiFrame,
  version: [3]
}

export const TIPL = {
  parse: parsers.arrayFrame,
  validate: validators.arrayFrame,
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
  parse: parsers.numberFrame,
  validate: validators.numberFrame,
  write: writers.asciiFrame,
  version: [3, 4]
}

export const TMCL = {
  parse: parsers.arrayFrame,
  validate: validators.arrayFrame,
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
  parse: parsers.arrayFrame,
  validate: validators.arrayFrame,
  write: writers.arrayFrame,
  version: [3, 4]
}

export const TOPE = {
  parse: parsers.arrayFrame,
  validate: validators.arrayFrame,
  write: writers.arrayFrame,
  version: [3, 4]
}

export const TORY = {
  parse: parsers.numberFrame,
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
  parse: parsers.arrayFrame,
  validate: validators.arrayFrame,
  write: writers.arrayFrame,
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
  parse: parsers.numberFrame,
  validate: validators.numberFrame,
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
  parse: parsers.numberFrame,
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
