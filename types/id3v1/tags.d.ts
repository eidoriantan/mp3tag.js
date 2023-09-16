
export interface MP3TagTagsV1Defined {
  v1: {
    title: string;
    artist: string;
    album: string;
    year: string;
    track?: string;
    comment: string;
    genre: string;
  };
  v1Details: {
    version: number;
    size: number;
  };
}

export type MP3TagTagsV1 = MP3TagTagsV1Defined | never;
