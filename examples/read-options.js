
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

// Read the buffer of an audio file
const buffer = fs.readFileSync('audio.mp3')

// Now, pass it to MP3Tag
const mp3tag = new MP3Tag(buffer, true)

// Read the ID3v2 tags only and exclude the ID3v1
mp3tag.read({ id3v1: false })

// Handle error if there's any
if (mp3tag.error !== '') throw new Error(mp3tag.error)
console.log(mp3tag.tags)
