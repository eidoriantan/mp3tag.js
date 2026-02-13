
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

const audioPath = 'audio.m4a'

// Read the buffer of an MP4/M4A file
const buffer = fs.readFileSync(audioPath)

// Pass it to MP3Tag - MP4 containers are detected automatically
const mp3tag = new MP3Tag(buffer, true)

// Read the audio tags (ID3v2 from ID32 box)
mp3tag.read()

// Handle error if there's any
if (mp3tag.error !== '') throw new Error(mp3tag.error)

console.log('Current tags:', mp3tag.tags)
console.log('MP4 details:', mp3tag.tags.v2Details?.mp4)

// Modify tags
mp3tag.tags.v2 = mp3tag.tags.v2 || {}
mp3tag.tags.v2Details = mp3tag.tags.v2Details || { version: [3, 0] }

mp3tag.tags.v2.TIT2 = 'New Title'
mp3tag.tags.v2.TPE1 = 'New Artist'
mp3tag.tags.v2.TALB = 'New Album'

// Save the tags
// - padding: 0 is recommended for MP4 (padding is less useful in containers)
// - mp4.language: ISO-639-2/T code (default: 'und' = undetermined)
mp3tag.save({
  id3v2: { padding: 0 },
  mp4: { language: 'eng' }
})

if (mp3tag.error !== '') throw new Error(mp3tag.error)

// Write the modified buffer back to file
fs.writeFileSync(audioPath, Buffer.from(mp3tag.buffer))

// Verify by reading again
mp3tag.read()
console.log('Updated tags:', mp3tag.tags)
