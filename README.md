
# mp3tag.js
![Travis](https://img.shields.io/travis/com/eidoriantan/mp3tag.js)
![npm](https://img.shields.io/npm/v/mp3tag.js/latest?registry_uri=https%3A%2F%2Fregistry.npmjs.com%2Fmp3tag.js)

**mp3tag.js** is an open sourced JavaScript library used to edit the metadata of
audio files. It currently can read both ID3v2.3 and ID3v2.4 tags, write tags and
remove tags.

Visit [https://mp3tag.js.org](https://mp3tag.js.org) to learn more about the
library and view it in action through an editor.

You can learn about the frames by visiting the
[Official ID3 site](http://id3.org)

### Features
 * Read ID3v2.3 and ID3v2.4 tags
 * Write ID3v2.3 and ID3v2.4 tags
 * Remove tags
 * Write multiple frames with the same kind
 * Supports reading unsynchronization flag
 * Input validation following the standards

## Installation

You can clone this repository by using `git`

```shell
git clone https://github.com/eidoriantan/mp3tag.js
```

You can also install this package by using `npm` to your projects by running
this command:

```shell
npm install --save mp3tag.js
```

## Usage
You should get the `ArrayBuffer` of the audio file you would like to modify.
You can achieve this by using `FileReader` on your scripts.

For example,
```html
<input type="file" id="input-file" accept="audio/mpeg">
<script>
const inputFile = document.getElementById('input-file')
inputFile.onchange = function () {
  const reader = new FileReader()
  reader.onload = function () {
    const buffer = this.result
    const mp3tag = new MP3Tag(buffer)
    mp3tag.read()
  }

  reader.readAsArrayBuffer(this.files[0])
}
</script>
```

#### Reading frames
You can read the frames of the audio files by accessing the property
`MP3tag.frames` before running the `read` method.

It is an array type and should follow this format for frames depending on its
type

##### Text Information and URL Frames
```js
[
  { id: 'TIT1', value: 'string' } // text
  { id: 'TYER', value: 2020 } // numerical strings
  { id: 'TPE1', value: ['artist'] } // arrays
  { id: 'TPOS', value: { position: 1, total: 10 }} // sets
]
```

##### User-defined Text Frames
```js
[{
  id: 'TXXX',
  value: {
    description: 'DESCRIPTION',
    text: 'TEXT'
  }
}]
```

##### User-defined URL frames
```js
[{
  id: 'WXXX',
  value: {
    description: 'DESCRIPTION',
    url: 'https://example.com'
  }
}]
```

##### Comments and Unsynced Lyrics Frames
```js
[{
  id: 'COMM',
  value: {
    language: 'eng',
    descriptor: 'descriptor',
    text: 'text'
  }
}]
```

##### Album Cover Frames
```js
[{
  id: 'APIC',
  value: {
    format: 'image/jpeg',
    type: 3,
    description: 'DESCRIPTION',
    data: [] // Uint8Array of image data
  }
}]
```

If you wanted a detailed descriptions of the frame, access the property
`MP3Tag.tagger.frames`. Frame objects include its size and flags.

#### Writing frames
You can edit, modify or add frames by changing the value of the property
`MP3Tag.frames`. It is then validated to make sure that you are following the
same format and standards of the frame.

```javascript
mp3tag.frames = [{
  id: 'TIT1',
  value: 'Title'
}]

mp3tag.frames.push({
  id: 'TPE1',
  value: ['ARTIST1']
})

mp3tag.save() // Returns the new audio bytes
// MP3Tag.buffer also returns the new audio bytes
```

#### Saving Audio
After you'd modified the audio file, you might want to download/save it. To
achieve this by getting the `Blob` object of the buffer, then save it.

Here's a script on how to save a `Blob` object
```javascript
// octet/stream so the browser downloads the file instead of playing it
// defaults to "audio/mpeg"
const blob = mp3tag.getBlob('octet/stream')
const url = URL.createObjectURL(blob)
const a = document.createElement('a')

a.style.display = 'none'
a.href = url
a.download = 'filename.mp3'
a.click()

URL.revokeObjectURL(url)
```

### Support
If you had found a bug or any unexpected behavior, you can submit an issue
through [GitHub issues](https://github.com/eidoriantan/mp3tag.js/issues).

### Contributing
This library is open to contributions from anyone who is interested. Just clone
this repository, make your changes, test your codes, then send a pull request.

```shell
npm run test
```

When committing a request, please also make sure that you are following the
[Convential Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Any contributions to this project is greatly appreciated.
