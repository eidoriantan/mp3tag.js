import type { MP3TagTags } from './tags';

type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object | undefined ? RecursivePartial<T[P]> :
    T[P];
};

export type MP3Buffer = Buffer | ArrayBuffer;

export type MP3TagV2Versions = 2 | 3 | 4;

export type MP3TagEncodings =
  'utf8' | 'utf-8' | 'utf16' | 'utf16be' | 'utf-16' | 'utf-16be' |
  'windows1251' | 'windows-1251' | '';

export interface MP3TagDefaultReadOptions {
  id3v1: boolean;
  id3v2: boolean;
  unsupported: boolean;
}

export interface MP3TagDefaultWriteOptions {
  strict: boolean;
  encoding: MP3TagEncodings;
  id3v1: {
    include: boolean;
    encoding: MP3TagEncodings;
  };
  id3v2: {
    include: boolean;
    unsynch: boolean;
    version: MP3TagV2Versions;
    padding: number;
    unsupported: boolean;
    encoding: MP3TagEncodings;
  };
}

export type MP3TagReadOptions = RecursivePartial<MP3TagDefaultReadOptions>;
export type MP3TagWriteOptions = RecursivePartial<MP3TagDefaultWriteOptions>;

export class MP3Tag {
  readonly name = 'MP3Tag';
  readonly version = '3.11.2';

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
