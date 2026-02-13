
[![mp3tag.js Banner](https://mp3tag.js.org/assets/images/banner.png)](https://mp3tag.js.org)

[![Node.js CI](https://github.com/eidoriantan/mp3tag.js/workflows/Node.js%20CI/badge.svg)](https://github.com/eidoriantan/mp3tag.js/actions?query=workflow%3A%22Node.js+CI%22)
[![npm](https://img.shields.io/npm/v/mp3tag.js/latest?registry_uri=https%3A%2F%2Fregistry.npmjs.com%2Fmp3tag.js&label=mp3tag.js@latest)](https://npmjs.com/package/mp3tag.js)
![Maintenance](https://img.shields.io/maintenance/yes/2025)

**mp3tag.js** is an open-sourced JavaScript library used to edit the metadata of
audio files. It supports ID3v1, ID3v2.2, ID3v2.3, and ID3v2.4 tags for MP3 files,
as well as ID3v2 tags in MP4/M4A/M4V/MOV containers (ID32 box), AIFF/AIFC files
(ID3 chunk), and AAC/ADTS streams (prepended ID3v2).

Visit [https://mp3tag.js.org](https://mp3tag.js.org) to learn more about the
library and view it in action through an [editor](https://mp3tag.js.org/editor).
You can also explore the [examples](https://github.com/eidoriantan/mp3tag.js/tree/master/examples)
directory.

The website is also open-sourced and can be viewed at the
[gh-pages](https://github.com/eidoriantan/mp3tag.js/tree/gh-pages) branch.

### Features
* Read, write, and remove ID3 tags (Supports ID3v1, ID3v2.2, ID3v2.3, and ID3v2.4)
* Read and write ID3v2 tags in MP4/M4A/M4V/MOV containers (via ID32 box)
* Read and write ID3v2 tags in AIFF/AIFC files (via ID3 chunk)
* Read and write ID3v2 tags in AAC/ADTS streams (prepended ID3v2)
* Supports unsynchronisation
* Standards compliant. See ~~[id3.org](http://id3.org)~~
[mutagen-specs.readthedocs.io](https://mutagen-specs.readthedocs.io/en/latest/id3/index.html)

## Installation
You can download the ready-to-use script at
[GitHub releases](https://github.com/eidoriantan/mp3tag.js/releases) or you can
build your own by cloning this repository using `git` then build it.

```shell
git clone https://github.com/eidoriantan/mp3tag.js
cd ./mp3tag.js
npm install
npm run build
```

You can also install this package by using `npm`:

```shell
npm install --save mp3tag.js@latest
```

If you are using a browser, you can just install the library through a CDN:

```
<script src="https://cdn.jsdelivr.net/npm/mp3tag.js@latest/dist/mp3tag.min.js">
```

## Usage

For browsers:
```html
<input type="file" id="input-file" accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/aiff,audio/aac">
<script>
const inputFile = document.getElementById('input-file')
inputFile.addEventListener('change', function () {
  [...this.files].forEach(async (file) => {
    const buffer = await file.arrayBuffer()

    // MP3Tag Usage
    const mp3tag = new MP3Tag(buffer)
    mp3tag.read()

    // Handle error if there's any
    if (mp3tag.error !== '') throw new Error(mp3tag.error)
    else console.log(mp3tag.tags)
  })
})
</script>
```

```html
<input type="file" id="input-file" accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/aiff,audio/aac">
<script>
inputFile.addEventListener('change', function () {
  const reader = new FileReader()
  reader.onload = function () {
    const buffer = this.result

    // MP3Tag Usage
    const mp3tag = new MP3Tag(buffer)
    mp3tag.read()

    // Handle error if there's any
    if (mp3tag.error !== '') throw new Error(mp3tag.error)
    else console.log(mp3tag.tags)
  }

  if (this.files.length > 0) {
    reader.readAsArrayBuffer(this.files[0])
  }
})
</script>
```

For Node.js:
```javascript
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

const buffer = fs.readFileSync('/path/to/audio.mp3')
const mp3tag = new MP3Tag(buffer)

mp3tag.read()

// Handle error if there's any
if (mp3tag.error !== '') throw new Error(mp3tag.error)
else console.log(mp3tag.tags)
```

```javascript
import { openAsBlob } from 'node:fs'
import MP3Tag from 'mp3tag.js'

async function main () {
  const blob = await openAsBlob('/path/to/audio.mp3')
  const arrayBuffer = await blob.arrayBuffer()
  const mp3tag = new MP3Tag(arrayBuffer)
  mp3tag.read()

  if (mp3tag.error !== '') throw new Error(mp3tag.error)
  else console.log(mp3tag.tags)
}

main()
```

### MP4/M4A Support

mp3tag.js supports reading and writing ID3v2 tags embedded in MP4/M4A containers
using the ID32 box format. The library automatically detects MP4 files and handles
the container structure transparently.

```javascript
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

// Reading from MP4/M4A
const buffer = fs.readFileSync('/path/to/audio.m4a')
const mp3tag = new MP3Tag(buffer)
mp3tag.read()

if (mp3tag.error !== '') throw new Error(mp3tag.error)
console.log(mp3tag.tags.title)  // Works the same as MP3

// Writing to MP4/M4A
mp3tag.tags.v2.TIT2 = 'New Title'
mp3tag.tags.v2.TPE1 = 'New Artist'
mp3tag.save({
  id3v2: { padding: 0 },
  mp4: { language: 'eng' }  // Optional: ISO-639-2/T language code (default: 'und')
})

if (mp3tag.error !== '') throw new Error(mp3tag.error)
fs.writeFileSync('/path/to/audio.m4a', Buffer.from(mp3tag.buffer))
```

**Note:** MP4 support focuses on ID32 boxes containing ID3v2 data. Native iTunes
metadata (ilst atoms) is not supported.

### AIFF/AIFC Support

mp3tag.js supports reading and writing ID3v2 tags in AIFF and AIFC audio files.
Tags are stored in an "ID3 " chunk within the AIFF container structure.

```javascript
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

// Reading from AIFF
const buffer = fs.readFileSync('/path/to/audio.aiff')
const mp3tag = new MP3Tag(buffer)
mp3tag.read()

if (mp3tag.error !== '') throw new Error(mp3tag.error)
console.log(mp3tag.tags.title)  // Works the same as MP3

// Writing to AIFF
mp3tag.tags.v2.TIT2 = 'New Title'
mp3tag.tags.v2.TPE1 = 'New Artist'
mp3tag.save({ id3v2: { padding: 0 } })  // No padding recommended for AIFF

if (mp3tag.error !== '') throw new Error(mp3tag.error)
fs.writeFileSync('/path/to/audio.aiff', Buffer.from(mp3tag.buffer))
```

### AAC/ADTS Support

mp3tag.js supports reading and writing ID3v2 tags in raw AAC/ADTS audio streams.
Tags are prepended to the audio data, similar to MP3 files.

```javascript
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

// Reading from AAC
const buffer = fs.readFileSync('/path/to/audio.aac')
const mp3tag = new MP3Tag(buffer)
mp3tag.read()

if (mp3tag.error !== '') throw new Error(mp3tag.error)
console.log(mp3tag.tags.title)  // Works the same as MP3

// Writing to AAC
mp3tag.tags.v2.TIT2 = 'New Title'
mp3tag.tags.v2.TPE1 = 'New Artist'
mp3tag.save({ id3v2: { padding: 1024, unsynch: true } })  // Unsync recommended for AAC

if (mp3tag.error !== '') throw new Error(mp3tag.error)
fs.writeFileSync('/path/to/audio.aac', Buffer.from(mp3tag.buffer))
```

**Note:** AAC support is for raw ADTS streams (.aac files). For AAC audio in MP4
containers (.m4a files), see the MP4/M4A Support section above.

### Read Options

```javascript
mp3tag.read({
  id3v1: true,       // Read ID3v1 tags (default: true)
  id3v2: true,       // Read ID3v2 tags (default: true)
  mp4: true,         // Detect and read from MP4 containers (default: true)
  aiff: true,        // Detect and read from AIFF containers (default: true)
  aac: true,         // Detect and read from AAC/ADTS streams (default: true)
  unsupported: false // Parse unsupported frames as raw bytes (default: false)
})
```

### Write Options

```javascript
mp3tag.save({
  strict: false,        // Enable strict validation (default: false)
  id3v1: {
    include: false      // Write ID3v1 tags (default: false)
  },
  id3v2: {
    include: true,      // Write ID3v2 tags (default: true)
    version: 3,         // ID3v2 version: 2, 3, or 4 (default: from source or 3)
    padding: 2048,      // Padding bytes after tags (default: 2048, use 0 for MP4)
    unsynch: false,     // Use unsynchronisation (default: false)
    unsupported: false  // Write unsupported frames (default: false)
  },
  mp4: {
    language: 'und'     // ISO-639-2/T language code for ID32 box (default: 'und')
  }
})
```

If you want detailed documentation, please visit the documentations page at
[mp3tag.js.org](https://mp3tag.js.org/docs).

### Support
If you had found a bug or any unexpected behavior, you can submit an issue
through [GitHub issues](https://github.com/eidoriantan/mp3tag.js/issues). If you
 want to contribute to this repository, please refer to
[CONTRIBUTING.md](https://github.com/eidoriantan/mp3tag.js/blob/master/CONTRIBUTING.md).

