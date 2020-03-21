
const importedFiles = []
let currentIndex = -1

const SEPARATOR = '; '
let imageBuffer = null
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

$(document).ready(function () {
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

function audioView (event) {
  event.stopPropagation()
  resetForm()

  currentIndex = $(this).index()
  const audioItem = $(this)
  const file = importedFiles[currentIndex]

  toast('Reading file', 'Reading file and tags. Please wait...', TOAST_INFO)
  loadFile(file, function (buffer) {
    $('#edit-form [disabled]').attr('disabled', null)
    $('#edit-form .disabled').removeClass('disabled')
    $(audioItem).addClass('bg-primary')

    mp3tag = new MP3Tag(buffer)
    try {
      mp3tag.read()
      mp3tag.frames.forEach(function (frame) {
        switch (frame.id) {
          case 'APIC':
            imageBuffer = frame.value.data
            $('#cover-preview').attr({
              src: imageDataURL(imageBuffer, frame.value.format)
            })
            break

          case 'TIT2':
            $('#title').val(frame.value)
            break

          case 'TPE1':
            $('#artist').val(frame.value.join(SEPARATOR))
            break

          case 'TALB':
            $('#album').val(frame.value)
            break

          case 'TLAN':
            $('#language').val(frame.value)
            break

          case 'TRCK':
            $('#track').val(frame.value.position + '/' + frame.value.total)
            break

          case 'TCON':
            $('#genre').val(frame.value)
            break

          case 'TSRC':
            $('#isrc').val(frame.value)
            break

          case 'TDRC': {
            const result = timeRegex.exec(frame.value)
            if (frame.value[2]) $('#year').val(result[2])
            if (frame.value[4]) $('#month').val(result[4])
            if (frame.value[6]) $('#day').val(result[6])
            break
          }

          case 'TYER':
            $('#year').val(frame.value)
            break

          case 'TDAT':
            $('#month').val(frame.value.substr(2, 2))
            $('#day').val(frame.value.substr(0, 2))
            break

          case 'TCOM':
            $('#composer').val(frame.value.join(SEPARATOR))
            break

          case 'USLT':
            $('#lyrics').val(frame.value.language + '|' +
              frame.value.descriptor + '|' + frame.value.text)
            break
        }
      })

      toast('Read Successfully', 'Details was displayed', TOAST_SUCCESS)
    } catch (e) {
      toast('Reading Error', e.message, TOAST_DANGER)
    }
  })
}

function writeData (data) {
  const cover = $('#cover').prop('files')
  if (cover.length > 0) {
    loadFile(cover[0], function (imageBuffer) {
      writeAudio(data, imageBuffer)
    })
  } else {
    writeAudio(data, imageBuffer)
  }
}

function writeAudio (data, imageBuffer) {
  toast('Writing', 'Writing the tags to file', TOAST_INFO)
  mp3tag.frames = []

  if (imageBuffer) {
    mp3tag.frames.push({
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        type: 3,
        description: '',
        data: imageBuffer
      }
    })
  }

  const date = {}
  $.each(data, function () {
    if (this.value === '') return true
    switch (this.name) {
      case 'album':
      case 'genre':
      case 'isrc':
      case 'language':
      case 'title':
        mp3tag.frames.push({
          id: getID(this.name),
          value: this.value
        })
        break

      case 'year':
      case 'month':
      case 'day':
        date[this.name] = this.value
        break

      case 'artist':
      case 'composer':
        mp3tag.frames.push({
          id: getID(this.name),
          value: this.value.split(SEPARATOR)
        })
        break

      case 'track': {
        const set = this.value.split('/')
        mp3tag.frames.push({
          id: getID(this.name),
          value: {
            position: parseInt(set[0]),
            total: parseInt(set[1])
          }
        })
        break
      }

      case 'lyrics': {
        const lyrics = this.value.split('|')
        mp3tag.frames.push({
          id: getID(this.name),
          value: {
            language: lyrics[0],
            descriptor: lyrics[1],
            text: lyrics[2]
          }
        })
        break
      }
    }
  })

  if (mp3tag.tagger.major === 3) {
    if (date.day && date.month) {
      mp3tag.frames.push({
        id: 'TDAT',
        value: date.day + date.month
      })
    }

    if (date.year) {
      mp3tag.frames.push({
        id: 'TYER',
        value: date.year
      })
    }
  } else if (mp3tag.tagger.major === 4) {
    let dateStr = ''
    if (date.year) dateStr += date.year
    if (date.year && date.month && date.day)
      dateStr += '-' + date.month + '-' + date.day

    if (dateStr !== '') {
      mp3tag.frames.push({
        id: 'TDRC',
        value: dateStr
      })
    }
  }

  mp3tag.save()
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

function getID (name) {
  let id = ''
  switch (name) {
    case 'title':
      id = 'TIT2'
      break

    case 'artist':
      id = 'TPE1'
      break

    case 'album':
      id = 'TALB'
      break

    case 'language':
      id = 'TLAN'
      break

    case 'track':
      id = 'TRCK'
      break

    case 'genre':
      id = 'TCON'
      break

    case 'isrc':
      id = 'TSRC'
      break

    case 'composer':
      id = 'TCOM'
      break

    case 'lyrics':
      id = 'USLT'
      break
  }

  return id
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
