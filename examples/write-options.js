
const MP3Tag = require('mp3tag.js')
const fs = require('fs')

// Read the buffer of an audio file
const buffer = fs.readFileSync('audio.mp3')

// Now, pass it to MP3Tag
const mp3tag = new MP3Tag(buffer, true)

// Read the audio tags if there's any
mp3tag.read()

// Write the tags you wanted to write

/**
 *  Please note that if `mp3tag.tags.TIT2` is set or not blank,
 *  mp3tag.tags.title will be overwritten by that. So it is recommended to
 *  set the `mp3tag.tags.TIT2` instead. This also goes the same for:
 *
 *    'artist' --> 'TPE1'
 *    'album' --> 'TALB'
 *    'year' --> 'TYER'
 *    'comment' --> 'COMM'
 *    'track' --> 'TRCK'
 *    'genre' --> 'TCON'
 */
mp3tag.tags.TIT2 = 'NEW TITLE\r\n' // title and a newline which is invalid
mp3tag.tags.TPE1 = 'NEW ARTIST' // artist
mp3tag.tags.TALB = 'NEW ALBUM' // album
mp3tag.tags.COMM = [{
  language: 'eng',
  descriptor: '',
  text: 'Comment'
}]
mp3tag.tags.TRCK = '1/2'
mp3tag.tags.TCON = 'Pop'

/**
 *  Save the tags with strict mode enabled and no ID3v1.
 *  This writes both ID3v1 and ID3v2
 */
mp3tag.tags.save({
  strict: true,
  id3v1: { include: false }
})

// There should be an error since newlines are not allowed in title
if (mp3tag.errorCode > -1) {
  console.log(mp3tag.error)
  throw new Error('As expected')
}

// Read again the new buffer
mp3tag.read()
console.log(mp3tag.tags)
