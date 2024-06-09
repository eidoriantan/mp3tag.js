
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

export const ETCO = {
  parse: parsers.etcoFrame,
  validate: validators.etcoFrame,
  write: writers.etcoFrame,
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

export const PCNT = {
  parse: parsers.pcntFrame,
  validate: validators.pcntFrame,
  write: writers.pcntFrame,
  version: [3, 4]
}

export const POPM = {
  parse: parsers.popmFrame,
  validate: validators.popmFrame,
  write: writers.popmFrame,
  version: [3, 4]
}

export const PRIV = {
  parse: parsers.privFrame,
  validate: validators.privFrame,
  write: writers.privFrame,
  version: [3, 4]
}

export const RVAD = {
  parse: parsers.rvadFrame,
  validate: validators.rvadFrame,
  write: writers.rvadFrame,
  version: [3]
}

export const RVA2 = {
  parse: parsers.rva2Frame,
  validate: validators.rva2Frame,
  write: writers.rva2Frame,
  version: [4]
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
  write: writers.win1251Frame,
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
  write: writers.win1251Frame,
  version: [3]
}

export const TDEN = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
  version: [4]
}

export const TDLY = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
  version: [3]
}

export const TDOR = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
  version: [4]
}

export const TDRC = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
  version: [4]
}

export const TDRL = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
  version: [4]
}

export const TDTG = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
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
  write: writers.win1251Frame,
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
  write: writers.win1251Frame,
  version: [3, 4]
}

export const TLAN = {
  parse: parsers.textFrame,
  validate: validators.tlanFrame,
  write: writers.win1251Frame,
  version: [3, 4]
}

export const TLEN = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
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
  write: writers.win1251Frame,
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
  write: writers.win1251Frame,
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
  write: writers.win1251Frame,
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
  write: writers.win1251Frame,
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

/**
 *  Non-standard frames
 */
export const WFED = {
  parse: parsers.win1251Frame,
  validate: validators.urlFrame,
  write: writers.win1251Frame,
  version: [3, 4]
}

export const TGID = {
  parse: parsers.win1251Frame,
  validate: validators.urlFrame,
  write: writers.win1251Frame,
  version: [3, 4]
}

export const TSO2 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [3, 4]
}

/**
 *  ID3v2.2 Tags
 */
export const TT1 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TT2 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TT3 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TP1 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TP2 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TP3 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TP4 = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TCM = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TXT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TLA = {
  parse: parsers.textFrame,
  validate: validators.tlanFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TCO = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TAL = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TPA = {
  parse: parsers.setFrame,
  validate: validators.setFrame,
  write: writers.setFrame,
  version: [2]
}

export const TRK = {
  parse: parsers.setFrame,
  validate: validators.setFrame,
  write: writers.setFrame,
  version: [2]
}

export const TRC = {
  parse: parsers.textFrame,
  validate: validators.tsrcFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TYE = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TDA = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TIM = {
  parse: parsers.textFrame,
  validate: validators.timeFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TRD = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TMT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TFT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TBP = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TCR = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TPB = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TEN = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TSS = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TOF = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TLE = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TSI = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TDY = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TKE = {
  parse: parsers.textFrame,
  validate: validators.tkeyFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TOT = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TOA = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.textFrame,
  version: [2]
}

export const TOR = {
  parse: parsers.textFrame,
  validate: validators.textFrame,
  write: writers.win1251Frame,
  version: [2]
}

export const TXX = {
  parse: parsers.txxxFrame,
  validate: validators.txxxFrame,
  write: writers.txxxFrame,
  version: [2]
}

export const WAF = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [2]
}

export const WAR = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [2]
}

export const WAS = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [2]
}

export const WCM = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [2]
}

export const WCP = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [2]
}

export const WPB = {
  parse: parsers.urlFrame,
  validate: validators.urlFrame,
  write: writers.urlFrame,
  version: [2]
}

export const WXX = {
  parse: parsers.wxxxFrame,
  validate: validators.wxxxFrame,
  write: writers.wxxxFrame,
  version: [2]
}

export const IPL = {
  parse: parsers.iplsFrame,
  validate: validators.textFrame,
  write: writers.iplsFrame,
  version: [2]
}

export const MCI = {
  parse: parsers.mcdiFrame,
  validate: validators.mcdiFrame,
  write: writers.mcdiFrame,
  version: [2]
}

export const ETC = {
  parse: parsers.etcoFrame,
  validate: validators.etcoFrame,
  write: writers.etcoFrame,
  version: [2]
}

export const STC = {
  parse: parsers.sytcFrame,
  validate: validators.sytcFrame,
  write: writers.sytcFrame,
  version: [2]
}

export const ULT = {
  parse: parsers.langDescFrame,
  validate: validators.langDescFrame,
  write: writers.langDescFrame,
  version: [2]
}

export const SLT = {
  parse: parsers.syltFrame,
  validate: validators.syltFrame,
  write: writers.syltFrame,
  version: [2]
}

export const COM = {
  parse: parsers.langDescFrame,
  validate: validators.langDescFrame,
  write: writers.langDescFrame,
  version: [2]
}

export const RVA = {
  parse: parsers.rvadFrame,
  validate: validators.rvadFrame,
  write: writers.rvadFrame,
  version: [2]
}

export const PIC = {
  parse: parsers.apicFrame,
  validate: validators.apicFrame,
  write: writers.apicFrame,
  version: [2]
}

export const GEO = {
  parse: parsers.geobFrame,
  validate: validators.geobFrame,
  write: writers.geobFrame,
  version: [2]
}

export const CNT = {
  parse: parsers.pcntFrame,
  validate: validators.pcntFrame,
  write: writers.pcntFrame,
  version: [2]
}

export const POP = {
  parse: parsers.popmFrame,
  validate: validators.popmFrame,
  write: writers.popmFrame,
  version: [2]
}

export const unsupported = {
  validate: validators.unsupportedFrame,
  write: writers.unsupportedFrame
}
