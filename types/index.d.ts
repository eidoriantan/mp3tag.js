
import type { MP3TagTags } from './tags';

export type MP3Buffer = Buffer | ArrayBuffer;

export type MP3TagV2Versions = 3 | 4;

export interface MP3TagDefaultReadOptions {
  id3v1: boolean;
  id3v2: boolean;
}

export interface MP3TagDefaultWriteOptions {
  strict: boolean;
  id3v1: {
    include: boolean;
  };
  id3v2: {
    include: boolean;
    unsynch: boolean;
    version: MP3TagV2Versions;
    padding: number;
    skipUnsupported: boolean;
  };
}

export type MP3TagReadOptions = Partial<MP3TagDefaultReadOptions>;
export type MP3TagWriteOptions = Partial<MP3TagDefaultWriteOptions>;

export class MP3Tag {
  readonly name: 'MP3Tag';
  readonly version: '3.8.0';

  verbose: boolean;
  buffer: MP3Buffer;
  tags: MP3TagTags;
  error: string;

  static readBuffer (buffer: MP3Buffer, options?: MP3TagReadOptions, verbose?: boolean): MP3TagTags;
  static writeBuffer (buffer: MP3Buffer, tags: MP3TagTags, options?: MP3TagWriteOptions, verbose?: boolean): MP3Buffer;
  static getAudioBuffer (buffer: MP3Buffer): MP3Buffer;

  constructor (buffer: MP3Buffer, verbose?: boolean);
  read (options?: MP3TagReadOptions): MP3TagTags;
  save (options?: MP3TagWriteOptions): MP3Buffer;
  remove (): boolean;
  getAudio (): MP3Buffer;
}

export default MP3Tag;
