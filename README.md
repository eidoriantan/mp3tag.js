
[![mp3tag.js Banner](./assets/mp3tag-banner.png)](https://mp3tag.js.org)

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
 * Supports reading unsynchronization flag
 * Input validation according to the standards

## Installation
You can download the built library at
[GitHub releases](https://github.com/eidoriantan/mp3tag.js/releases) or you can
build your own by cloning this repository using `git` then build it.

```shell
git clone https://github.com/eidoriantan/mp3tag.js

npm install
npm run build
```

You can also install this package by using `npm`:

```shell
npm install --save mp3tag.js
```

## Usage
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

Please refer to [mp3tag.js.org](https://mp3tag.js.org) for more documentations!

### Support
If you had found a bug or any unexpected behavior, you can submit an issue
through [GitHub issues](https://github.com/eidoriantan/mp3tag.js/issues).

You can also show your support by becoming a patron!

![Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)
