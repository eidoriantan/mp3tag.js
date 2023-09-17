
export type MP3TagTextFrame = string;

export interface MP3TagLangDescFrame {
  language: string;
  descriptor: string;
  text: string;
}

export interface MP3TagAPICFrame {
  format: string;
  type: number;
  description: string;
  data: Array<number>;
}

export interface MP3TagETCOFrame {
  format: number;
  data: Array<{
    event: number;
    time: number;
  }>;
}

export interface MP3TagGEOBFrame {
  format: string;
  filename: string;
  description: string;
  object: Array<number>;
}

export interface MP3TagMCDIFRame {
  data: Array<number>;
}

export interface MP3TagOWNEFrame {
  currencyCode: string;
  currencyPrice: string;
  date: string;
  seller: string;
}

export interface MP3TagPOPMFrame {
  email: string;
  rating: number;
  counter: number;
}

export interface MP3TagPRIVFrame {
  ownerId: string;
  data: Array<number>;
}

export interface MP3TagRVADFrame {
  bitsvolume: number;
  incdec: {
    right: boolean;
    left: boolean;
    rightback: boolean;
    leftback: boolean;
    center: boolean;
    bass: boolean;
  },
  volumechange: {
    right: Array<number>;
    left: Array<number>;
    rightback: Array<number>;
    leftback: Array<number>;
    center: Array<number>;
    bass: Array<number>;
  },
  peakvolume: {
    right: Array<number>;
    left: Array<number>;
    rightback: Array<number>;
    leftback: Array<number>;
    center: Array<number>;
    bass: Array<number>;
  }
}

export interface MP3TagRVA2Frame {
  identification: string;
  channels: Array<{
    type: number;
    volumeadjust: number;
    bitspeak: number;
    peakvolume: Array<number>;
  }>;
}

export interface MP3TagSIGNFrame {
  group: number;
  signature: Array<number>;
}

export interface MP3TagSYLTFrameCommon {
  language: string;
  format: number;
  type: number;
  descriptor: string;
}

export interface MP3TagSYLTFrameLyrics {
  lyrics: string;
}

export interface MP3TagSYLTFrameData {
  data: Array<{
    line: string;
    time: number;
  }>;
}

export type MP3TagSYLTFrame =
  | (MP3TagSYLTFrameCommon & MP3TagSYLTFrameLyrics)
  | (MP3TagSYLTFrameCommon & MP3TagSYLTFrameData);

export interface MP3TagSYTCFrame {
  format: number;
  data: Array<{
    bpm: number;
    time: number;
  }>;
}

export interface MP3TagTXXXFrame {
  description: string;
  text: string;
}

export interface MP3TagUFIDFrame {
  ownerId: string;
  id: Array<number>;
}

export interface MP3TagUSERFrame {
  language: string;
  text: string;
}

export interface MP3TagWXXXFrame {
  description: string;
  url: string;
}
