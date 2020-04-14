
const importedFiles = []
let currentIndex = -1

const SEPARATOR = '; '
let imageBuffer = null
let imageType = ''
let mp3tag = null

const year = '(\\d{4})'
const month = '(0[1-9]|1[0-2])'
const day = '(0[1-9]|1\\d|2\\d|3[0-1])'
const hour = '(0\\d|1\\d|2[0-3])'
const minute = '(0\\d|1\\d|2\\d|3\\d|4\\d|5\\d)'
const second = minute
const timeRegex = new RegExp(
  `^(${year}(-${month}(-${day}(T${hour}(:${minute}(:${second})?)?)?)?)?)$`
)

const GENRES = [
  "Blues", "Classic Rock", "Country", "Dance", "Disco", "Funk", "Grunge",
  "Hip-Hop", "Jazz", "Metal", "New Age", "Oldies", "Other", "Pop", "R&B", "Rap",
  "Reggae", "Rock", "Techno", "Industrial", "Alternative", "Ska", "Death Metal",
  "Pranks", "Soundtrack", "Euro-Techno", "Ambient", "Trip-Hop", "Vocal",
  "Jazz+Funk", "Fusion", "Trance", "Classical", "Instrumental", "Acid", "House",
  "Game", "Sound Clip", "Gospel", "Noise", "Alt. Rock", "Bass", "Soul", "Punk",
  "Space", "Meditative", "Instrumental Pop", "Instrumental Rock", "Ethnic",
  "Gothic", "Darkwave", "Techno-Industrial", "Electronic", "Pop-Folk",
  "Eurodance", "Dream", "Southern Rock", "Comedy", "Cult", "Gangsta Rap",
  "Top 40", "Christian Rap", "Pop/Funk", "Jungle", "Native American", "Cabaret",
  "New Wave", "Psychedelic", "Rave", "Showtunes", "Trailer", "Lo-Fi", "Tribal",
  "Acid Punk", "Acid Jazz", "Polka", "Retro", "Musical", "Rock & Roll",
  "Hard Rock", "Folk", "Folk-Rock", "National Folk", "Swing", "Fast-Fusion",
  "Bebop", "Latin", "Revival", "Celtic", "Bluegrass", "Avantgarde",
  "Gothic Rock", "Progressive Rock", "Psychedelic Rock", "Symphonic Rock",
  "Slow Rock", "Big Band", "Chorus", "Easy Listening", "Acoustic", "Humour",
  "Speech", "Chanson", "Opera", "Chamber Music", "Sonata", "Symphony",
  "Booty Bass", "Primus", "Porn Groove", "Satire", "Slow Jam", "Club",
  "Tango", "Samba", "Folklore", "Ballad", "Power Ballad", "Rhythmic Soul",
  "Freestyle", "Duet", "Punk Rock", "Drum Solo", "A Cappella", "Euro-House",
  "Dance Hall", "Goa", "Drum & Bass", "Club-House", "Hardcore", "Terror",
  "Indie", "BritPop", "Afro-Punk", "Polsk Punk", "Beat",
  "Christian Gangsta Rap", "Heavy Metal", "Black Metal", "Crossover",
  "Contemporary Christian", "Christian Rock", "Merengue", "Salsa",
  "Thrash Metal", "Anime", "JPop", "Synthpop", "Abstract", "Art Rock",
  "Baroque", "Bhangra", "Big Beat", "Breakbeat", "Chillout", "Downtempo", "Dub",
  "EBM", "Eclectic", "Electro", "Electroclash", "Emo", "Experimental", "Garage",
  "Global", "IDM", "Illbient", "Industro-Goth", "Jam Band", "Krautrock",
  "Leftfield", "Lounge", "Math Rock", "New Romantic", "Nu-Breakz", "Post-Punk",
  "Post-Rock", "Psytrance", "Shoegaze", "Space Rock", "Trop Rock",
  "World Music", "Neoclassical", "Audiobook", "Audio Theatre",
  "Neue Deutsche Welle", "Podcast", "Indie Rock", "G-Funk", "Dubstep",
  "Garage Rock", "Psybient"
]

$(document).ready(function () {
  $('#list-wrapper').on('dragenter', function (event) {
    event.preventDefault()
  })

  $('#list-wrapper').on('dragleave', function (event) {
    event.preventDefault()
  })

  $('#list-wrapper').on('dragover', function (event) {
    event.preventDefault()
  })

  $('#list-wrapper').on('drop', function (event) {
    event.preventDefault()
    importFiles(event.originalEvent.dataTransfer.files)
  })

  $('#file-audios').on('change', function () {
    const files = $(this).prop('files')
    importFiles(files)
    $(this).val('')
  })

  $('#list-wrapper').click(resetForm)

  $('#cover').on('change', function () {
    const file = $(this).prop('files')[0]
    loadFile(file, function (buffer) {
      const uint8array = new Uint8Array(buffer)
      const url = imageURL(uint8array, file.type)
      $('#cover-preview').attr('src', url)
    })
  })

  $('#month').on('change', function () {
    $('#day').find('option').attr('disabled', null)
    const month = $(this).val()
    const year = parseInt($('#year').val())
    const removeDays = function (...days) {
      $.each(days, function (index, day) {
        $('#day').find(`option[value='${day}']`).attr('disabled', true)
      })
    }

    switch (month) {
      case '04': case '06': case '09': case '11':
        removeDays(31)
        break

      case '02':
        removeDays(30, 31)
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          removeDays(29)
        }
        break
    }
  })

  $('#edit-form').submit(function (event) {
    event.preventDefault()
    if (currentIndex < 0) return false

    const data = $(this).serializeArray()
    writeData(data)
  })

  $('#download').click(function () {
    const file = importedFiles[currentIndex]
    $(this).attr({
      href: URL.createObjectURL(file),
      download: file.name
    })
  })
})

function importFiles (files) {
  $('#no-audio').remove()
  $('#audio-list').parent().removeClass('d-none')

  const temp = $('#audio-item-template').prop('content')
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.match(/^(audio)\/([a-z0-9\-]+)$/)) {
      const audioItem = $(temp).clone()
      importedFiles.push(files[i])
      const dateStr = new Date(files[i].lastModified).toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short'
      })

      $(audioItem).find('[data-temp=\'filename\']').text(files[i].name)
      $(audioItem).find('[data-temp=\'date\']').text(dateStr)
      $(audioItem).find('[data-temp]').removeAttr('data-temp')
      $(audioItem).find('tr').click(audioView)

      $('#audio-list').append(audioItem)
    } else {
      const message = 'MIME/Type of a file is not supported. Skipped'
      toast('Invalid MIME', message, TOAST_WARNING)
    }
  }
}

async function audioView (event) {
  event.stopPropagation()
  resetForm()

  currentIndex = $(this).index()
  const audioItem = $(this)
  const file = importedFiles[currentIndex]

  $('#edit-form [disabled]').attr('disabled', null)
  $('#edit-form .disabled').removeClass('disabled')
  $(audioItem).addClass('bg-primary')

  try {
    toast('Reading file', 'Reading file and tags. Please wait...', TOAST_INFO)
    mp3tag = new MP3Tag(await loadFile(file))
    displayDetails(mp3tag.read())
    toast('Read Successfully', 'Details was displayed', TOAST_SUCCESS)
  } catch (e) {
    toast('Reading Error', e.message, TOAST_DANGER)
  }
}

function displayDetails (tagger) {
  if (tagger.name === 'ID3v1') {
    $('#title').val(tagger.title)
    $('#artist').val(tagger.artist)
    $('#album').val(tagger.album)
    $('#year').val(tagger.year)
    $('#comment').val(tagger.comment)
    if (tagger.track) $('#track').val(tagger.track)
    $('#genre').val(GENRES[tagger.genre])
  } else if (tagger.name === 'ID3v2') {
    const frames = tagger.getFrames()
    for (const id in frames) {
      switch (id) {
        case 'APIC':
          imageBuffer = frames[id][0].data
          imageType = frames[id][0].format

          $('#cover-preview').attr({ src: imageURL(imageBuffer, imageType) })
          break

        case 'TIT2':
          $('#title').val(frames[id].join(SEPARATOR))
          break

        case 'TPE1':
          $('#artist').val(frames[id].join(SEPARATOR))
          break

        case 'TALB':
          $('#album').val(frames[id].join(SEPARATOR))
          break

        case 'TLAN':
          $('#language').val(frames[id].join(SEPARATOR))
          break

        case 'TRCK': {
          const tracks = []
          $.each(frames[id], function (index, value) {
            let string = value.position
            if (typeof value.total !== 'undefined') string += '/' + value.total
            tracks.push(string)
          })

          $('#track').val(tracks.join(SEPARATOR))
          break
        }

        case 'TCON':
          $('#genre').val(frames[id].join(SEPARATOR))
          break

        case 'TSRC':
          $('#isrc').val(frames[id].join(SEPARATOR))
          break

        case 'TDRC': {
          const result = timeRegex.exec(frames[id][0])
          if (result[2]) $('#year').val(result[2])
          if (result[4]) $('#month').val(result[4])
          if (result[6]) $('#day').val(result[6])
          break
        }

        case 'TYER':
          $('#year').val(frames[id].join(SEPARATOR))
          break

        case 'TDAT':
          $('#month').val(frames[id][0].substr(2, 2))
          $('#day').val(frames[id][0].substr(0, 2))
          break

        case 'TCOM':
          $('#composer').val(frames[id].join(SEPARATOR))
          break

        case 'USLT':
          $('#lyrics').val(
            frames[id][0].language + '|' +
            frames[id][0].descriptor + '|' +
            frames[id][0].text
          )
          break
      }
    }
  }
}

async function writeData (data) {
  try {
    toast('Writing', 'Writing the tags to file', TOAST_INFO)
    const tagger = mp3tag.tagger
    writeDetails(tagger, data)
    mp3tag.save()
  } catch (e) {
    toast('Writing Error', e.message, TOAST_DANGER)
  }

  const file = importedFiles[currentIndex]
  const modifiedFile = new File([mp3tag.getBlob()], file.name, {
    type: file.type
  })

  const dateStr = new Date(modifiedFile.lastModified).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short'
  })

  importedFiles[currentIndex] = modifiedFile
  $('#audio-list').children().eq(currentIndex).children().eq(1).text(dateStr)
  toast('Saved!', 'Modified MP3 was saved and ready to download', TOAST_SUCCESS)
}

async function writeDetails (tagger, data) {
  if (tagger.name === 'ID3v1') {
    tagger.title = $('#title').val()
    tagger.artist = $('#artist').val()
    tagger.album = $('#album').val()
    tagger.year = $('#year').val()
    tagger.comment = ''
    tagger.track = $('#track').val()
    tagger.genre = GENRES.indexOf($('#genre').val())
  } else if (tagger.name === 'ID3v2') {
    const cover = $('#cover').prop('files')
    const date = {}

    if (cover.length > 0) {
      const imageFile = cover[0]
      imageBuffer = await loadFile(imageFile)
      imageType = imageFile.type
    }

    if (imageBuffer !== null) {
      tagger.editFrame('APIC', {
        format: imageType,
        type: 3,
        description: '',
        data: imageBuffer
      })
    }

    $.each(data, function () {
      switch (this.name) {
        case 'album':
          if (this.value !== '') {
            tagger.editFrame('TALB', this.value.split(SEPARATOR))
          } else tagger.removeFrame('TALB')
          break

        case 'genre':
          if (this.value !== '') {
            tagger.editFrame('TCON', this.value.split(SEPARATOR))
          } else tagger.removeFrame('TCON')
          break

        case 'isrc':
          if (this.value !== '') {
            tagger.editFrame('TSRC', this.value.split(SEPARATOR))
          } else tagger.removeFrame('TSRC')
          break

        case 'language':
          if (this.value !== '') {
            tagger.editFrame('TLAN', this.value.split(SEPARATOR))
          } else tagger.removeFrame('TLAN')
          break

        case 'title':
          if (this.value !== '') {
            tagger.editFrame('TIT2', this.value.split(SEPARATOR))
          } else tagger.removeFrame('TIT2')
          break

        case 'artist':
          if (this.value !== '') {
            tagger.editFrame('TPE1', this.value.split(SEPARATOR))
          } else tagger.removeFrame('TPE1')
          break

        case 'composer':
          if (this.value !== '') {
            tagger.editFrame('TCOM', this.value.split(SEPARATOR))
          } else tagger.removeFrame('TCOM')
          break

        case 'year':
        case 'month':
        case 'day':
          date[this.name] = this.value
          break

        case 'track': {
          if (this.value !== '') {
            /**
             *  const set = this.value.split(SEPARATOR)
             *  const value = []
             *
             *  https://github.com/eidoriantan/mp3tag.js/issues/11
             *  $.each(set, function (index, track) {
             *    track = track.split('/')
             *    value.push({
             *      position: parseInt(track[0]),
             *      total: parseInt(track[1])
             *    })
             *  })
             */

            const value = this.value.split('/')
            tagger.editFrame('TRCK', {
              position: parseInt(value[0]),
              total: parseInt(value[1])
            })
          } else tagger.removeFrame('TRCK')
          break
        }

        case 'lyrics': {
          if (this.value !== '') {
            const lyrics = this.value.split('|')
            tagger.editFrame('USLT', {
              language: lyrics[0],
              descriptor: lyrics[1],
              text: lyrics[2]
            })
          } else tagger.removeFrame('USLT')
          break
        }
      }
    })

    if (tagger.major === 3) {
      if (date.day !== '00' && date.month !== '00') {
        tagger.editFrame('TDAT', date.day + date.month)
      }

      if (date.year && date.year !== '') {
        tagger.editFrame('TYER', date.year)
      }
    } else if (tagger.major === 4) {
      if (date.year === '') return false

      let dateStr = date.year
      if (date.month !== '00' && date.day !== '00') {
        dateStr += '-' + date.month + '-' + date.day
      }

      tagger.editFrame('TDRC', dateStr)
    }
  }
}

function resetForm () {
  currentIndex = -1
  mp3tag = null
  imageBuffer = null

  $('#edit-form').trigger('reset')
  $('#edit-form').find('input, textarea, select, button').attr('disabled', true)
  $('#download').attr({ href: null, download: null })
  $('#download').addClass('disabled')
  $('#cover-preview').attr('src', '/images/blank.jpg')
  $('#audio-list').find('.bg-primary').removeClass('bg-primary')
}
