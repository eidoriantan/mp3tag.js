
![mp3tag.js Banner](./assets/mp3tag-banner.png)

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/eidoriantan/mp3tag.js/Node.js%20CI?label=GitHub%20Workflow)](https://github.com/eidoriantan/mp3tag.js/actions?query=workflow%3A%22Node.js+CI%22)
[![Build Status](https://img.shields.io/travis/com/eidoriantan/mp3tag.js/master?label=Travis%20CI)](https://travis-ci.com/eidoriantan/mp3tag.js)
![David](https://img.shields.io/david/dev/eidoriantan/mp3tag.js)
[![npm](https://img.shields.io/npm/v/mp3tag.js/latest?registry_uri=https%3A%2F%2Fregistry.npmjs.com%2Fmp3tag.js&label=mp3tag.js@latest)](https://npmjs.com/mp3tag.js)

**mp3tag.js** is an open sourced JavaScript library used to edit the metadata of
audio files. It currently can read both ID3v2.3 and ID3v2.4 tags, write tags and
remove tags.

Visit [https://mp3tag.js.org](https://mp3tag.js.org) to learn more about the
library and view it in action through an editor.

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

Please refer to [mp3tag.js.org](https://mp3tag.js.org) for documentations!

### Support
If you had found a bug or any unexpected behavior, you can submit an issue
through [GitHub issues](https://github.com/eidoriantan/mp3tag.js/issues).
