import { openAsBlob } from 'node:fs'
import MP3Tag from 'mp3tag.js'

async function main () {
  const blob = await openAsBlob('/path/to/audio.mp3')
  const arrayBuffer = await blob.arrayBuffer()
  const mp3tag = new MP3Tag(arrayBuffer)
  mp3tag.read()

  if (mp3tag.error !== '') throw new Error(mp3tag.error)
  else console.log(mp3tag.tags)
}

main()
