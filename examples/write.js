
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

// Read the buffer of an audio file
const buffer = fs.readFileSync('audio.mp3')

// Now, pass it to MP3Tag
const mp3tag = new MP3Tag(buffer, true)

// Read the audio tags if there's any
mp3tag.read()

// Write the tags you wanted to write

mp3tag.tags.title = 'NEW TITLE' // title
mp3tag.tags.artist = 'NEW ARTIST' // artist
mp3tag.tags.album = 'NEW ALBUM' // album
mp3tag.tags.comment = 'COMMENT'
mp3tag.tags.track = '1'
mp3tag.tags.genre = 'Pop'

// Save the tags. This writes both ID3v1 and ID3v2
mp3tag.tags.save()

// Handle error if there's any
if (mp3tag.errorCode > -1) throw new Error(mp3tag.error)

// Read again the new buffer
mp3tag.read()
console.log(mp3tag.tags)
