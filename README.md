
[![mp3tag.js Banner](https://github.com/eidoriantan/mp3tag.js/raw/gh-pages/assets/images/banner.png)][homepage]

[![Node.js CI](https://github.com/eidoriantan/mp3tag.js/workflows/Node.js%20CI/badge.svg)](https://github.com/eidoriantan/mp3tag.js/actions?query=workflow%3A%22Node.js+CI%22)
[![Build Status](https://travis-ci.com/eidoriantan/mp3tag.js.svg?branch=master)](https://travis-ci.com/eidoriantan/mp3tag.js)
[![npm](https://img.shields.io/npm/v/mp3tag.js/latest?registry_uri=https%3A%2F%2Fregistry.npmjs.com%2Fmp3tag.js&label=mp3tag.js@latest)](https://npmjs.com/mp3tag.js)
[![GitHub](https://img.shields.io/github/license/eidoriantan/mp3tag.js)](https://github.com/eidoriantan/mp3tag.js/blob/master/LICENSE.txt)

**mp3tag.js** is an open sourced JavaScript library used to edit/view the
metadata of audio files. It currently supports ID3v1, ID3v2.3, and ID3v2.4 tags.

Visit [mp3tag.js.org][homepage] to learn more about the library or view it in
action through an [editor]. You can also explore the
[examples](https://github.com/eidoriantan/mp3tag.js/tree/master/examples)
directory for examples on how to use the library.

The website is also open sourced and can be viewed at
[gh-pages](https://github.com/eidoriantan/mp3tag.js/tree/gh-pages) branch.

### Features
 * Read ID3v1 and ID3v2 tags
 * Write ID3v1 and ID3v2 tags
 * Supports the [unsynchronisation scheme](https://id3.org/id3v2.3.0#The_unsynchronisation_scheme)
 * Standards compliant. See [id3.org](http://id3.org)

## Installation
You can download the ready-to-use script at
[GitHub releases](https://github.com/eidoriantan/mp3tag.js/releases). You can
also install this package by using [npm](https://www.npmjs.com/):

```shell
npm install --save mp3tag.js@latest
```

If you are using browser, you can just install the library through a CDN:

```
<script src="https://cdn.jsdelivr.net/npm/mp3tag.js@latest/dist/mp3tag.min.js">
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

    // MP3Tag Usage
    const mp3tag = new MP3Tag(buffer)
    mp3tag.read()
    console.log(mp3tag.tags)
  }

  if (this.files.length > 0) {
    reader.readAsArrayBuffer(this.files[0])
  }
}
</script>
```

If you want a detailed documentations, please visit the documentations page at
[mp3tag.js.org][docs].

### Support
If you had found a bug or any unexpected behavior, you can submit an issue
through [GitHub issues](https://github.com/eidoriantan/mp3tag.js/issues). If you
wanted to contribute to this repository, please refer to
[CONTRIBUTING.md](https://github.com/eidoriantan/mp3tag.js/blob/master/CONTRIBUTING.md).

You can also show your support by becoming a patron!

[![Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/eidoriantan)

[homepage]: https://mp3tag.js.org
[editor]: https://mp3tag.js.org/editor/
[docs]: https://mp3tag.js.org/docs/
