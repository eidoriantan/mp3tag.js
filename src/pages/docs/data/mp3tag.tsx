import type { ReactNode } from 'react'
import { Link } from 'react-router'

const bufferType = (
  <>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">ArrayBuffer</a>
    {' | '}
    <a href="https://nodejs.org/api/buffer.html">Buffer</a>
  </>
)

const readOptions = `
// Default Options
{
  id3v1: true, // include ID3v1
  id3v2: true, // include ID3v2
  mp4: true, // detect and read from MP4/M4A containers (ID32 box)
  aiff: true, // detect and read from AIFF/AIFC containers (ID3 chunk)
  aac: true, // detect and read from AAC/ADTS streams (prepended ID3v2)
  unsupported: false, // if true, parses unsupported frames as an array of bytes. Otherwise, skip
  encoding: 'utf-8' // encoding to use when parsing ID3v1 tags
}
`

const saveOptions = `
// Default Options
{
  strict: false, // Use strict mode when validating
  /**
   * Encoding to use when writing ID3v1 tags. Valid options are:
   * 'utf-8', 'utf8', 'utf16', 'utf-16', 'utf16be', 'utf-16be', 'windows1251', ''
   */
  encoding: 'utf-8',
  /**
   * If true, returns an empty buffer instead as an audio if no audio was detected.
   * Otherwise, returns the entire buffer.
   */
  emptyAudioNone: false,
  id3v1: {
    include: false,          // Add ID3v1 tags to buffer
    encoding: 'utf-8'
  },
  id3v2: {
    include: true,           // Add ID3v2 tags to buffer
    unsynch: false,          // Use unsynchronisation scheme
    version: defaultVersion, // ID3v2 major version
    padding: 2048,           // Number of null bytes added after ID3v2 tag
    unsupported: false,      // Whether to write unsupported frames to buffer. Otherwise, skips
    encoding: 'utf-8'
  },
  mp4: {
    language: 'und'          // ISO-639-2/T language code for ID32 box
  }
}
`

export interface Member {
  id: string
  kind: 'Property' | 'Method' | 'Static Method'
  /** Signature shown on the card */
  name: string
  /** Bare member name used by the page outline and search */
  short: string
  meta?: ReactNode[]
  code?: string
  description?: ReactNode
}

export const properties: Member[] = [
  {
    id: 'mp3tag-error',
    kind: 'Property',
    name: 'error',
    short: 'error',
    meta: ['Type: string'],
    description: (
      <p>
        If an error was thrown from the last operation such as <code>read</code>
        {' '}or <code>save</code>, this returns the error message. It is recommended
        to check this property every operation.
      </p>
    )
  },
  {
    id: 'mp3tag-buffer',
    kind: 'Property',
    name: 'buffer',
    short: 'buffer',
    meta: [<>Type: {bufferType}</>],
    description: <p>The current buffer saved on the class.</p>
  },
  {
    id: 'mp3tag-tags',
    kind: 'Property',
    name: 'tags',
    short: 'tags',
    meta: ['Type: object'],
    description: (
      <p>
        Tags object decoded from the Buffer. Please see{' '}
        <Link to="/docs/frames">Tags and Frames</Link> for the tags definitions.
      </p>
    )
  }
]

export const methods: Member[] = [
  {
    id: 'mp3tag-constructor',
    kind: 'Method',
    name: 'constructor(buffer[, verbose = false])',
    short: 'constructor'
  },
  {
    id: 'mp3tag-read',
    kind: 'Method',
    name: 'read(options = {})',
    short: 'read',
    meta: ['Return type: object'],
    code: readOptions,
    description: (
      <p>
        Reads the tags from the buffer. If the decoding was successful, this sets the{' '}
        <code>tags</code> with the decoded tags otherwise this sets the{' '}
        <code>error</code> property with error. This always returns the <code>tags</code>.
      </p>
    )
  },
  {
    id: 'mp3tag-readbuffer',
    kind: 'Static Method',
    name: 'readBuffer(buffer, options = {}, verbose = false)',
    short: 'readBuffer',
    meta: ['Return type: object'],
    description: (
      <p>
        This function is the same as the <code>read</code> except that this is a
        static function. If the decoding was unsuccessful, this throws an error.
      </p>
    )
  },
  {
    id: 'mp3tag-save',
    kind: 'Method',
    name: 'save(options = {})',
    short: 'save',
    meta: [<>Return type: {bufferType}</>],
    code: saveOptions,
    description: (
      <p>
        Writes the <code>tags</code> to the buffer. If the encoding was successful,
        this writes the tags to the buffer then returns it otherwise this sets the{' '}
        <code>error</code> property with error. This always returns the <code>buffer</code>.
      </p>
    )
  },
  {
    id: 'mp3tag-writebuffer',
    kind: 'Static Method',
    name: 'writeBuffer(buffer, tags, options = {}, verbose = false)',
    short: 'writeBuffer',
    meta: [<>Return type: {bufferType}</>],
    description: (
      <p>
        This function is the same as the <code>save</code> except that this is a
        static function. If the encoding was unsuccessful, this throws an error.
      </p>
    )
  },
  {
    id: 'mp3tag-remove',
    kind: 'Method',
    name: 'remove()',
    short: 'remove',
    meta: ['Return type: boolean'],
    description: <p>Removes all the tags from the buffer. This always return true.</p>
  },
  {
    id: 'mp3tag-getaudio',
    kind: 'Method',
    name: 'getAudio(emptyNone = false)',
    short: 'getAudio',
    meta: [<>Return type: {bufferType}</>],
    description: <p>Gets the audio buffer from the buffer. If <code>emptyNone</code> is false, this returns the entire buffer if no audio was detected. Otherwise, it returns an empty buffer.</p>
  },
  {
    id: 'mp3tag-getaudiobuffer',
    kind: 'Static Method',
    name: 'getAudioBuffer(buffer, emptyNone = false)',
    short: 'getAudioBuffer',
    meta: [<>Return type: {bufferType}</>],
    description: (
      <p>
        This function is the same as the <code>getAudio</code> except that this is
        a static function.
      </p>
    )
  }
]
