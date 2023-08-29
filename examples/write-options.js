
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

const audioPath = 'audio.mp3'

// Read the buffer of an audio file
const buffer = fs.readFileSync(audioPath)

// Now, pass it to MP3Tag
const mp3tag = new MP3Tag(buffer, true)

// Read the audio tags if there's any
mp3tag.read()

// Write the tags you wanted to write
mp3tag.tags.title = 'NEW TITLE\r\n' // title and a newline which is invalid
mp3tag.tags.artist = 'NEW ARTIST' // artist
mp3tag.tags.album = 'NEW ALBUM' // album
mp3tag.tags.comment = 'COMMENT'
mp3tag.tags.track = '1'
mp3tag.tags.genre = 'Pop'

// Save the tags with strict mode enabled.
mp3tag.tags.save({ strict: true })

// There should be an error since newlines are not allowed in title
if (mp3tag.error !== '') {
  console.log(mp3tag.error)
  throw new Error('As expected')
}

// Read the new buffer again
mp3tag.read()
console.log(mp3tag.tags)

// Write the new buffer to file
fs.writeFileSync(audioPath, mp3tag.buffer)
