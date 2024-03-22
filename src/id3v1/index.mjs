
import BufferView from '../viewer.mjs'

import { mergeBytes } from '../utils/bytes.mjs'
import { encodeString } from '../utils/strings.mjs'

const GENRES = [
  'Blues', 'Classic Rock', 'Country', 'Dance', 'Disco', 'Funk', 'Grunge',
  'Hip-Hop', 'Jazz', 'Metal', 'New Age', 'Oldies', 'Other', 'Pop', 'R&B', 'Rap',
  'Reggae', 'Rock', 'Techno', 'Industrial', 'Alternative', 'Ska', 'Death Metal',
  'Pranks', 'Soundtrack', 'Euro-Techno', 'Ambient', 'Trip-Hop', 'Vocal',
  'Jazz+Funk', 'Fusion', 'Trance', 'Classical', 'Instrumental', 'Acid', 'House',
  'Game', 'Sound Clip', 'Gospel', 'Noise', 'Alt. Rock', 'Bass', 'Soul', 'Punk',
  'Space', 'Meditative', 'Instrumental Pop', 'Instrumental Rock', 'Ethnic',
  'Gothic', 'Darkwave', 'Techno-Industrial', 'Electronic', 'Pop-Folk',
  'Eurodance', 'Dream', 'Southern Rock', 'Comedy', 'Cult', 'Gangsta Rap',
  'Top 40', 'Christian Rap', 'Pop/Funk', 'Jungle', 'Native American', 'Cabaret',
  'New Wave', 'Psychedelic', 'Rave', 'Showtunes', 'Trailer', 'Lo-Fi', 'Tribal',
  'Acid Punk', 'Acid Jazz', 'Polka', 'Retro', 'Musical', 'Rock & Roll',
  'Hard Rock', 'Folk', 'Folk-Rock', 'National Folk', 'Swing', 'Fast-Fusion',
  'Bebop', 'Latin', 'Revival', 'Celtic', 'Bluegrass', 'Avantgarde',
  'Gothic Rock', 'Progressive Rock', 'Psychedelic Rock', 'Symphonic Rock',
  'Slow Rock', 'Big Band', 'Chorus', 'Easy Listening', 'Acoustic', 'Humour',
  'Speech', 'Chanson', 'Opera', 'Chamber Music', 'Sonata', 'Symphony',
  'Booty Bass', 'Primus', 'Porn Groove', 'Satire', 'Slow Jam', 'Club', 'Tango',
  'Samba', 'Folklore', 'Ballad', 'Power Ballad', 'Rhythmic Soul', 'Freestyle',
  'Duet', 'Punk Rock', 'Drum Solo', 'A Cappella', 'Euro-House', 'Dance Hall',
  'Goa', 'Drum & Bass', 'Club-House', 'Hardcore', 'Terror', 'Indie', 'BritPop',
  'Afro-Punk', 'Polsk Punk', 'Beat', 'Christian Gangsta Rap', 'Heavy Metal',
  'Black Metal', 'Crossover', 'Contemporary Christian', 'Christian Rock',
  'Merengue', 'Salsa', 'Thrash Metal', 'Anime', 'JPop', 'Synthpop', 'Abstract',
  'Art Rock', 'Baroque', 'Bhangra', 'Big Beat', 'Breakbeat', 'Chillout',
  'Downtempo', 'Dub', 'EBM', 'Eclectic', 'Electro', 'Electroclash', 'Emo',
  'Experimental', 'Garage', 'Global', 'IDM', 'Illbient', 'Industro-Goth',
  'Jam Band', 'Krautrock', 'Leftfield', 'Lounge', 'Math Rock', 'New Romantic',
  'Nu-Breakz', 'Post-Punk', 'Post-Rock', 'Psytrance', 'Shoegaze', 'Space Rock',
  'Trop Rock', 'World Music', 'Neoclassical', 'Audiobook', 'Audio Theatre',
  'Neue Deutsche Welle', 'Podcast', 'Indie Rock', 'G-Funk', 'Dubstep',
  'Garage Rock', 'Psybient'
]

export function hasID3v1 (buffer) {
  const offset = buffer.byteLength - 128
  if (offset > -1) {
    const view = new BufferView(buffer, offset)
    return view.getString(0, 3).string === 'TAG'
  } else return false
}

export function decode (buffer) {
  const view = new BufferView(buffer, buffer.byteLength - 128)

  const title = view.getString(3, 30, 'utf-8').string.replace(/\0/g, '')
  const artist = view.getString(33, 30, 'utf-8').string.replace(/\0/g, '')
  const album = view.getString(63, 30, 'utf-8').string.replace(/\0/g, '')
  const year = view.getString(93, 4, 'utf-8').string.replace(/\0/g, '')
  const track = view.getUint8(126).toString() || ''
  const comment = view.getString(97, track !== null ? 28 : 30, 'utf-8').string
    .replace(/\0/g, '')
  const genre = GENRES[view.getUint8(127)] || ''

  const tags = { title, artist, album, year, track, comment, genre }
  const details = { version: track ? 1 : 0, size: 128 }

  return { tags, details }
}

export function validate (tags, strict) {
  const { title, artist, album, year, comment, track, genre } = tags

  if (typeof title !== 'string') {
    throw new Error('Title is not a string')
  } else if (encodeString(title, 'utf-8').length > 30) {
    throw new Error('Title length exceeds 30 characters')
  }

  if (typeof artist !== 'string') {
    throw new Error('Artist is not a string')
  } else if (encodeString(artist, 'utf-8').length > 30) {
    throw new Error('Artist length exceeds 30 characters')
  }

  if (typeof album !== 'string') {
    throw new Error('Album is not a string')
  } else if (encodeString(album, 'utf-8').length > 30) {
    throw new Error('Album length exceeds 30 characters')
  }

  if (typeof year !== 'string') {
    throw new Error('Year is not a string')
  } else if (encodeString(year, 'utf-8').length > 4) {
    throw new Error('Year length exceeds 4 characters')
  }

  if (typeof comment !== 'string') {
    throw new Error('Comment is not a string')
  }

  if (typeof track !== 'string') {
    throw new Error('Track is not a string')
  } else if (parseInt(track) > 255 || parseInt(track) < 0) {
    throw new Error('Track should be in range 255 - 0')
  }

  if (track !== '') {
    if (encodeString(comment, 'utf-8').length > 28) {
      throw new Error('Comment length exceeds 28 characters')
    }
  } else if (encodeString(comment, 'utf-8').length > 30) {
    throw new Error('Comment length exceeds 30 characters')
  }

  if (typeof genre !== 'string') {
    throw new Error('Genre is not a string')
  } else if (strict && (!GENRES.includes(genre) && genre !== '')) {
    throw new Error('Unknown genre')
  }

  return true
}

export function encode (tags, encoding = 'utf-8') {
  let { title, artist, album, year, comment, track, genre } = tags

  title = encodeString(title, encoding)
  artist = encodeString(artist, encoding)
  album = encodeString(album, encoding)
  year = encodeString(year, encoding)
  comment = encodeString(comment, encoding)
  genre = GENRES.indexOf(genre)

  while (title.length < 30) title.push(0)
  while (artist.length < 30) artist.push(0)
  while (album.length < 30) album.push(0)
  while (year.length < 4) year.push(0)

  if (track !== '') {
    while (comment.length < 28) comment.push(0)
    comment.push(0, parseInt(track))
  } else {
    while (comment.length < 30) comment.push(0)
  }

  return mergeBytes(
    0x54, 0x41, 0x47, title, artist, album, year, comment,
    genre > -1 ? genre : 12
  ).buffer
}
