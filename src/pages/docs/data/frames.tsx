import type { ReactNode } from 'react'
import { REPOSITORY_URL } from '../../../config'

export const tagsProperties: Array<{ name: string, type: string, description: ReactNode }> = [
  { name: 'title', type: 'string', description: <>Returns <strong>ID3v2 TIT2</strong> or <strong>ID3v1 title</strong> or an empty string</> },
  { name: 'artist', type: 'string', description: <>Returns <strong>ID3v2 TPE1</strong> or <strong>ID3v1 artist</strong> or an empty string</> },
  { name: 'album', type: 'string', description: <>Returns <strong>ID3v2 TALB</strong> or <strong>ID3v1 album</strong> or an empty string</> },
  { name: 'year', type: 'string', description: <>Returns <strong>ID3v2 TYER or TDRC</strong> or <strong>ID3v1 year</strong> or an empty string</> },
  { name: 'comment', type: 'string', description: <>Returns <strong>ID3v2 COMM</strong> or <strong>ID3v1 comment</strong> or an empty string</> },
  { name: 'track', type: 'string', description: <>Returns <strong>ID3v2 TRCK</strong> or <strong>ID3v1 track</strong> or an empty string</> },
  { name: 'genre', type: 'string', description: <>Returns <strong>ID3v2 TCON</strong> or <strong>ID3v1 genre</strong> or an empty string</> },
  { name: 'v1', type: 'object | undefined', description: 'Contains all ID3v1 tags. Please refer below' },
  { name: 'v1Details', type: 'object | undefined', description: <>ID3v1 tag details object containing the <code>size</code> and <code>version</code></> },
  { name: 'v2', type: 'object | undefined', description: 'Contains all ID3v2 tags. Please refer below' },
  { name: 'v2Details', type: 'object | undefined', description: <>ID3v2 tag details object containing the <code>size</code>, <code>flags</code>, and <code>version</code></> }
]

export const v1Frames = ['title', 'artist', 'album', 'year', 'comment', 'track', 'genre']

export const ISO_639_2 = 'https://www.loc.gov/standards/iso639-2/php/code_list.php'
export const FRAME_REQUEST_URL = `${REPOSITORY_URL}/issues/new?assignees=eidoriantan&labels=enhancement%2C+frame-support&template=frame-request.md&title=%5BFRAME+ID%5D+Frame`

export interface Frame {
  id: string
  title: string
  frameId: string
  /** Compact frame ID(s) and title used by the page outline and search */
  short: [ids: string, title: string]
  type: string
  description: ReactNode
  code?: string
}

export const v2Frames: Frame[] = [
  {
    id: 'v2-text',
    short: ['T000-TZZZ', 'Text information'],
    title: 'Text information frames',
    frameId: '"T000" - "TZZZ" excluding TXXX',
    type: 'string',
    description: (
      <>
        <p>
          Some of these frames have its own standards but are only applicable if the
          strict mode is enabled.
        </p>
        <ul>
          <li>
            <strong>Set frames</strong> such as "<i>TPOS</i>" and
            "<i>TRCK</i>" should follow this format: '1/2' or just '1' and can be
            separated '1/2\\1'.
          </li>
          <li>
            <strong>Time frames</strong> at ID3v2.3.0 such as
            "<i>TDAT</i>", "<i>TIME</i>", "<i>TORY</i>", and "<i>TYER</i>" should have
            4 numerical characters.
          </li>
          <li>
            <strong>Time frames</strong> at ID3v2.4.0 such as
            "<i>TDEN</i>", "<i>TDOR</i>", "<i>TDRC</i>", "<i>TDRL</i>", and
            "<i>TDTG</i>" should follow this format: yyyy-MM-ddTHH:mm:ss (year, "-",
            month, "-", day, "T", hour (out of 24), ":", minutes, ":", seconds), but
            the precision may be reduced by removing as many time indicators as wanted.
            Hence valid timestamps are <code>yyyy</code>, <code>yyyy-MM</code>,{' '}
            <code>yyyy-MM-dd</code>, <code>yyyy-MM-ddTHH</code>,{' '}
            <code>yyyy-MM-ddTHH:mm</code>, and <code>yyyy-MM-ddTHH:mm:ss</code>.
          </li>
          <li>
            <strong>"TKEY" frame</strong> is represented as a
            string with a maximum length of three characters. The ground keys are
            represented with "A","B","C","D","E", "F" and "G" and halfkeys represented
            with "b" and "#". Minor is represented as "m". Example "Cbm". Off key is
            represented with an "o" only.
          </li>
          <li>
            <strong>"TSRC" frame</strong> should have 12
            alphanumeric characters.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'v2-txxx',
    short: ['TXXX', 'User defined text'],
    title: 'User defined text information frame',
    frameId: 'TXXX',
    type: 'object[]',
    description: 'TXXX frames are parsed and must be saved as an array',
    code: `
      [
        {
          description: 'Text description',
          text: 'Any string here'
        }
      ]
    `
  },
  {
    id: 'v2-weburl',
    short: ['W000-WZZZ', 'URL links'],
    title: 'URL frames',
    frameId: '"W000" - "WZZZ" excluding WXXX',
    type: 'string',
    description: (
      <>
        If strict mode is enabled, all URLs are checked if its a valid URL.
        The current RegExp used is <code>{'/^(https?):\\/\\/[^\\s/$.?#]+\\.[^\\s]*/'}</code>
      </>
    )
  },
  {
    id: 'v2-wxxx',
    short: ['WXXX', 'User defined URL'],
    title: 'User defined URL link frame',
    frameId: 'WXXX',
    type: 'object[]',
    description: 'WXXX frames are parsed and must be saved as an array',
    code: `
      [
        {
          description: 'URL description',
          url: 'https://github.com'
        }
      ]
    `
  },
  {
    id: 'v2-usltcomm',
    short: ['COMM/USLT', 'Comment & lyrics'],
    title: 'Comment and Unsynchronised lyrics frames',
    frameId: 'COMM and USLT',
    type: 'object[]',
    description: (
      <>
        COMM and USLT frames are parsed and must be saved as an array. If the
        strict mode is enabled, there should only one frame with the same language
        and content descriptor.
      </>
    ),
    code: `
      [
        {
          language: 'eng',
          descriptor: 'Content description',
          text: 'Lyrics or comment goes here'
        }
      ]
    `
  },
  {
    id: 'v2-apic',
    short: ['APIC', 'Attached picture'],
    title: 'Attached picture frame',
    frameId: 'APIC',
    type: 'object[]',
    description: (
      <>
        APIC frame is parsed and must be saved as an array. If strict mode is
        enabled, there should only one frame with the same content descriptor, types
        should be in range of 0 - 21, format should be a valid MIME type
        (<code>{'/(image\\/[a-z0-9!#$&.+\\-^_]+){0,129}/'}</code>), and description
        should not exceed 64 characters.
      </>
    ),
    code: `
      [
        {
          format: 'image/jpeg',                // Image MIME
          type: 3,                             // See the APIC image types at id3.org
          description: 'Content description',
          data: [1, 2, 3, 4, 5, 6, 7, 8]       // Image bytes
        }
      ]
    `
  },
  {
    id: 'v2-chap',
    short: ['CHAP', 'Chapter'],
    title: 'Chapter frame',
    frameId: 'CHAP',
    type: 'object[]',
    description: (
      <>
        CHAP frame is parsed and must be saved as an array, one entry per chapter.
        Each chapter has a unique element ID, a start/end time in milliseconds and an
        optional start/end byte offset (<code>4294967295</code> /{' '}
        <code>0xFFFFFFFF</code> means "not set"). Embedded sub-frames (commonly{' '}
        <code>TIT2</code> for the chapter title) are stored in <code>subFrames</code>{' '}
        keyed by frame ID. Available for ID3v2.3 and ID3v2.4.
      </>
    ),
    code: `
      [
        {
          id: 'chp0',                  // Unique element ID
          startTime: 0,                // Start time in milliseconds
          endTime: 15000,              // End time in milliseconds
          startOffset: 4294967295,     // Start byte offset (0xFFFFFFFF = not set)
          endOffset: 4294967295,       // End byte offset (0xFFFFFFFF = not set)
          subFrames: {                 // Embedded sub-frames keyed by frame ID
            TIT2: 'Chapter title'
          }
        }
      ]
    `
  },
  {
    id: 'v2-ctoc',
    short: ['CTOC', 'Table of contents'],
    title: 'Table of contents frame',
    frameId: 'CTOC',
    type: 'object[]',
    description: (
      <>
        CTOC frame is parsed and must be saved as an array. It groups CHAP chapters
        into a table of contents. <code>topLevel</code> marks the root entry and{' '}
        <code>ordered</code> indicates whether the child elements are meant to be
        played in order. <code>childElementIds</code> lists the element IDs of the
        referenced CHAP (or nested CTOC) frames. Embedded sub-frames are stored in{' '}
        <code>subFrames</code>. Available for ID3v2.3 and ID3v2.4.
      </>
    ),
    code: `
      [
        {
          id: 'toc0',                        // Unique element ID
          topLevel: true,                    // Is this the top-level TOC?
          ordered: true,                     // Are the child elements ordered?
          childElementIds: ['chp0', 'chp1'], // Referenced CHAP/CTOC element IDs
          subFrames: {                       // Embedded sub-frames keyed by frame ID
            TIT2: 'Table of contents'
          }
        }
      ]
    `
  },
  {
    id: 'v2-ipls',
    short: ['IPLS', 'Involved people'],
    title: 'Involved People List frame',
    frameId: 'IPLS',
    type: 'string',
    description: 'IPLS frame is parsed and must be saved as a string'
  },
  {
    id: 'v2-geob',
    short: ['GEOB', 'Encapsulated object'],
    title: 'General encapsulated object frame',
    frameId: 'GEOB',
    type: 'object[]',
    description: (
      <>
        GEOB frame is parsed and must be saved as an array. If strict mode is
        enabled, there should only one frame with the same content descriptor.
      </>
    ),
    code: `
      [
        {
          format: 'application/octet-stream',  // Object MIME
          filename: 'filename.bin',
          description: 'Content description',
          object: [1, 2, 3, 4, 5, 6, 7, 8, 9]  // Object bytes
        }
      ]
    `
  },
  {
    id: 'v2-ufid',
    short: ['UFID', 'Unique file identifier'],
    title: 'Unique file identifier frame',
    frameId: 'UFID',
    type: 'object[]',
    description: (
      <>
        UFID frame is parsed and must be saved as an array. If strict mode is
        enabled, there should only one frame with the same Owner Identifier and it
        must be a non-empty string, and ID bytelength must not exceed 64 bytes.
      </>
    ),
    code: `
      [
        {
          ownerId: 'http://www.id3.org/dummy/ufid.html', // Non-empty owner ID
          id: [1, 2, 3, 4, 5, 6, 7]                      // Binary identifier
        }
      ]
    `
  },
  {
    id: 'v2-user',
    short: ['USER', 'Terms of use'],
    title: 'Terms of use frame',
    frameId: 'USER',
    type: 'object',
    description: 'USER frame is parsed and must be saved as an object.',
    code: `
      {
        language: 'eng',
        text: 'Text'
      }
    `
  },
  {
    id: 'v2-owne',
    short: ['OWNE', 'Ownership'],
    title: 'Ownership frame',
    frameId: 'OWNE',
    type: 'object',
    description: (
      <>
        OWNE frame is parsed and must be saved as an object. If strict mode is
        enabled, date must match the format <code>YYYYMMDD</code>, currencyCode must
        be encoded with{' '}
        <a href="https://www.xe.com/iso4217.php" target="_blank" rel="noreferrer">ISO 4217</a>, and
        the currencyPrice must follow the format <code>N.nn</code>.
      </>
    ),
    code: `
      {
        currencyCode: 'USD',
        currencyPrice: '2.00',
        date: '20200424',       // YYYYMMDD date format
        seller: 'Seller'        // Seller's name
      }
    `
  },
  {
    id: 'v2-pcnt',
    short: ['PCNT', 'Play count'],
    title: 'Play Count frame',
    frameId: 'PCNT',
    type: 'string',
    description: 'PCNT frame is parsed and must be saved as a numerical string'
  },
  {
    id: 'v2-popm',
    short: ['POPM', 'Popularimeter'],
    title: 'Popularimeter frame',
    frameId: 'POPM',
    type: 'object[]',
    description: (
      <>
        POPM frame is parsed and must be saved as an array. If strict mode is
        enabled, there should only one frame with the same email
      </>
    ),
    code: `
      [
        {
          email: 'john@example.com',
          rating: 255,                // 0 is unknown, 1 is worst, and 255 is best ratings
          counter: 0                  // number of times the user played this
        }
      ]
    `
  },
  {
    id: 'v2-priv',
    short: ['PRIV', 'Private'],
    title: 'Private frame',
    frameId: 'PRIV',
    type: 'object[]',
    description: (
      <>
        PRIV frame is parsed and must be saved as an array. If strict mode is
        enabled, there should only one frame with the same data.
      </>
    ),
    code: `
      [
        {
          ownerId: 'owner string',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9] // Data bytes
        }
      ]
    `
  },
  {
    id: 'v2-rvad',
    short: ['RVAD', 'Volume adjustment'],
    title: 'Relative Volume Adjustment frame',
    frameId: 'RVAD',
    type: 'object',
    description: (
      <>
        RVAD frame is only available in ID3v2.3.0. RVAD frame is parsed and must be
        saved as an object.
      </>
    ),
    code: `
      {
        bitsvolume: 16,
        incdec: {
          right: true,
          left: true,
          rightback: false,
          leftback: false,
          center: false,
          bass: false
        },
        volumechange: {
          right: [0, 1],
          left: [0, 1],
          rightback: [],
          leftback: [],
          center: [],
          bass: []
        },
        peakvolume: {
          right: [0, 1],
          left: [0, 1],
          rightback: [],
          leftback: [],
          center: [],
          bass: []
        }
      }
    `
  },
  {
    id: 'v2-rva2',
    short: ['RVA2', 'Volume adjustment 2'],
    title: 'Relative Volume Adjustment 2 frame',
    frameId: 'RVA2',
    type: 'object',
    description: (
      <>
        RVA2 frame is only available in ID3v2.4.0. RVAD frame is parsed and must be
        saved as an array. If strict mode is enabled, there should only one frame
        with the same identification string.
      </>
    ),
    code: `
      [{
        identification: 'identification',
        channels: [{
          type: 1,
          volumeadjust: 16,
          bitspeak: 16,
          peakvolume: [0, 1]
        }]
      }]
    `
  },
  {
    id: 'v2-sign',
    short: ['SIGN', 'Signature'],
    title: 'Signature frame',
    frameId: 'SIGN',
    type: 'object[]',
    description: (
      <>
        SIGN frame is only available in ID3v2.4.0. SIGN frame is parsed and must be
        saved as an array. If strict mode is enabled, all frames must be unique.
      </>
    ),
    code: `
      [
        {
          group: 1,
          signature: [1, 2, 3, 4, 5, 6, 7, 8, 9] // Signature bytes
        }
      ]
    `
  },
  {
    id: 'v2-sylt',
    short: ['SYLT', 'Synced lyrics'],
    title: 'Synchronised lyrics/text frame',
    frameId: 'SYLT',
    type: 'object[]',
    description: (
      <>
        SYLT frame is parsed and must be saved as an array. If strict mode is
        enabled, there should only one frame with the same language and content
        descriptor, language must be encoded with{' '}
        <a href={ISO_639_2} target="_blank" rel="noreferrer">ISO 639-2</a>,
        type should be in range of 0 - 6, format should be either 1 or 2, and lyrics
        must follow the format for each line: [mm:ss.xxx] String to display during
        the time
      </>
    ),
    code: `
      [
        {
          language: 'eng',
          format: 1,
          type: 1,
          descriptor: 'Descriptions',
          lyrics: '[mm:ss.xxx] Synced lyrics'
        }
      ]

      // OR

      [
        {
          language: 'eng',
          format: 1,
          type: 1,
          descriptor: 'Descriptions',
          data: [
            { line: 'LINE1', time: 200 },
            { line: 'LINE2', time: 10000 },
            { line: 'LINE3', time: 2000000 }
          ]
        }
      ]
    `
  },
  {
    id: 'v2-mcdi',
    short: ['MCDI', 'Music CD identifier'],
    title: 'Music CD identifier frame',
    frameId: 'MCDI',
    type: 'object',
    description: 'MCDI frame is parsed and must be saved as an object.',
    code: `
      {
        data: [1, 2, 3, 4, 5, 6, 7, 8] // Binary bytes
      }
    `
  },
  {
    id: 'v2-sytc',
    short: ['SYTC', 'Tempo codes'],
    title: 'Synchronised tempo codes frame',
    frameId: 'SYTC',
    type: 'object',
    description: (
      <>
        SYTC frame is parsed and must be saved as an object. If strict mode is
        enabled, format must be either 1 or 2.
      </>
    ),
    code: `
      {
        format: 1,
        data: [
          { bpm: 0, time: 200 },
          { bpm: 130, time: 10000 },
          { bpm: 260, time: 2000000 }
        ]
      }
    `
  },
  {
    id: 'v2-etco',
    short: ['ETCO', 'Event timing codes'],
    title: 'Event timing codes frame',
    frameId: 'ETCO',
    type: 'object',
    description: (
      <>
        ETCO frame is parsed and must be saved as an object. If strict mode is
        enabled, format must be either 1 or 2.
      </>
    ),
    code: `
      {
        format: 1,
        data: [
          { event: 0, time: 200 },
          { event: 130, time: 10000 },
          { event: 260, time: 2000000 }
        ]
      }
    `
  }
]
