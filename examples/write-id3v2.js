
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

const artworkPath = 'artwork.jpg'
const audioPath = 'audio.mp3'

// Read the buffer of an audio file
const buffer = fs.readFileSync(audioPath)

// Now, pass it to MP3Tag
const mp3tag = new MP3Tag(buffer, true)

// Read the audio tags if there's any
mp3tag.read()

// Read artwork's bytes
const artBuffer = fs.readFileSync(artworkPath)
const artBytes = new Uint8Array(artBuffer)

// Write the ID3v2 tags you wanted to write.
// See https://mp3tag.js.org/docs/frames.html for the list of supported ID3v2 frames

// Image metadata
mp3tag.tags.v2.APIC = [
  {
    format: 'image/jpeg',
    type: 3,
    description: 'Album image',
    data: artBytes
  }
]

mp3tag.tags.title = 'NEW TITLE'
mp3tag.tags.artist = 'NEW ARTIST'
mp3tag.tags.album = 'NEW ALBUM'

// Save the tags
mp3tag.save()

// Handle error if there's any
if (mp3tag.error !== '') throw new Error(mp3tag.error)

// Read the new buffer again
mp3tag.read()
console.log(mp3tag.tags)

// Write the new buffer to file
fs.writeFileSync(audioPath, mp3tag.buffer)
