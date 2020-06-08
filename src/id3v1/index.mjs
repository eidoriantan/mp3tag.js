
import TagError from '../error.mjs'
import BufferView from '../viewer.mjs'

import { mergeBytes } from '../utils/bytes.mjs'
import { encodeString } from '../utils/strings.mjs'
import { isBuffer } from '../utils/types.mjs'

export const GENRES = [
  'Blues', 'Classic Rock', 'Country', 'Dance', 'Disco', 'Funk', 'Grunge',
  'Hip-Hop', 'Jazz', 'Metal', 'New Age', 'Oldies', 'Other', 'Pop', 'R&B',
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

function filter (tags) {
  tags.title = tags.TIT2 || tags.title || ''
  tags.artist = tags.TPE1 || tags.artist || ''
  tags.album = tags.TALB || tags.album || ''
  tags.year = tags.TYER || (tags.TDRC && tags.TDRC.substr(0, 4)) || tags.year ||
    ''
  tags.comment = (tags.COMM ? tags.COMM[0].text : '') || tags.comment || ''
  tags.track = (tags.TRCK ? tags.TRCK.split('/')[0] : '') || tags.track || ''
  tags.genre = tags.TCON || tags.genre || ''

  return tags
}

export function hasID3v1 (buffer) {
  if (!isBuffer(buffer)) throw new TypeError('buffer is not ArrayBuffer/Buffer')

  const offset = buffer.byteLength - 128
  if (offset > -1) {
    const view = new BufferView(buffer, offset)
    return view.getString(0, 3).string === 'TAG'
  } else return false
}

export function decode (buffer) {
  if (!hasID3v1(buffer)) throw new TagError(100)

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
  tags.v1Version = track ? 1 : 0
  tags.v1Size = 128

  return tags
}

export function validate (tags, strict) {
  const filtered = filter(tags)
  const { title, artist, album, year, comment, track, genre } = filtered

  if (typeof title !== 'string') {
    throw new TagError(102, 'Title is not a string')
  } else if (encodeString(title, 'utf-8').length > 30) {
    throw new TagError(102, 'Title length exceeds 30 characters')
  }

  if (typeof artist !== 'string') {
    throw new TagError(102, 'Artist is not a string')
  } else if (encodeString(artist, 'utf-8').length > 30) {
    throw new TagError(102, 'Artist length exceeds 30 characters')
  }

  if (typeof album !== 'string') {
    throw new TagError(102, 'Album is not a string')
  } else if (encodeString(album, 'utf-8').length > 30) {
    throw new TagError(102, 'Album length exceeds 30 characters')
  }

  if (typeof year !== 'string') {
    throw new TagError(102, 'Year is not a string')
  } else if (encodeString(year, 'utf-8').length > 4) {
    throw new TagError(102, 'Year length exceeds 4 characters')
  }

  if (typeof comment !== 'string') {
    throw new TagError(102, 'Comment is not a string')
  }

  if (typeof track !== 'string') {
    throw new TagError(102, 'Track is not a string')
  } else if (parseInt(track) > 255 || parseInt(track) < 0) {
    throw new TagError(102, 'Track should be in range 255 - 0')
  }

  if (track !== '') {
    if (encodeString(comment, 'utf-8').length > 28) {
      throw new TagError(102, 'Comment length exceeds 28 characters')
    }
  } else if (encodeString(comment, 'utf-8').length > 30) {
    throw new TagError(102, 'Comment length exceeds 30 characters')
  }

  if (typeof genre !== 'string') {
    throw new TagError(102, 'Genre is not a string')
  } else if (strict && (!GENRES.includes(genre) && genre !== '')) {
    throw new TagError(102, 'Unknown genre')
  }

  return true
}

export function encode (tags) {
  const filtered = filter(tags)
  let { title, artist, album, year, comment, track, genre } = filtered

  title = encodeString(title, 'utf-8')
  artist = encodeString(artist, 'utf-8')
  album = encodeString(album, 'utf-8')
  year = encodeString(year, 'utf-8')
  comment = encodeString(comment, 'utf-8')
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
