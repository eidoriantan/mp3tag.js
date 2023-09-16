
import type { MP3TagTagsV1 } from './id3v1/tags';
import type { MP3TagTagsV2 } from './id3v2/tags';

export interface MP3TagTagsCommon {
  title: string;
  artist: string;
  album: string;
  year: string;
  track: string;
  comment: string;
  genre: string;
}

export type MP3TagTags = MP3TagTagsCommon & Partial<MP3TagTagsV1> & Partial<MP3TagTagsV2>;
