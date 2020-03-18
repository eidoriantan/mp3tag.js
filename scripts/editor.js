
const importedFiles = []
let currentIndex = -1

const SEPARATOR = '; '
let imageBuffer = null
let mp3tag = null

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

  if (imageBuffer) {
    mp3tag.frames = [{
      id: 'APIC',
      value: {
        format: 'image/jpeg',
        type: 3,
        description: '',
        data: imageBuffer
      }
    }]
  }

  $.each(data, function () {
    const key = this.name
    const input = $(`#${key}`)
    const frameInfo = getFrame(key)

    if (this.value === '') return true
    switch (frameInfo.type) {
      case 'string':
        mp3tag.frames.push({
          id: frameInfo.id,
          value: this.value
        })
        break

      case 'array':
        mp3tag.frames.push({
          id: frameInfo.id,
          value: this.value.split(SEPARATOR)
        })
        break

      case 'set': {
        const set = this.value.split('/')
        mp3tag.frames.push({
          id: frameInfo.id,
          value: {
            position: parseInt(set[0]),
            total: parseInt(set[1])
          }
        })
        break
      }

      case 'integer':
        mp3tag.frames.push({
          id: frameInfo.id,
          value: parseInt(this.value)
        })
        break

      case 'descLang': {
        const lyrics = this.value.split('|')
        mp3tag.frames.push({
          id: frameInfo.id,
          value: {
            language: lyrics[0],
            descriptor: lyrics[1],
            text: lyrics[2]
          }
        })
        break
      }

      default:
        toast('Writing Error', `Unsupported frame type: ${frameInfo.type}`)
    }
  })

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

function getFrame (name) {
  const frame = { id: '', type: '' }

  switch (name) {
    case 'title':
      frame.id = 'TIT2'
      frame.type = 'string'
      break

    case 'artist':
      frame.id = 'TPE1'
      frame.type = 'array'
      break

    case 'album':
      frame.id = 'TALB'
      frame.type = 'string'
      break

    case 'language':
      frame.id = 'TLAN'
      frame.type = 'string'
      break

    case 'track':
      frame.id = 'TRCK'
      frame.type = 'set'
      break

    case 'genre':
      frame.id = 'TCON'
      frame.type = 'string'
      break

    case 'isrc':
      frame.id = 'TSRC'
      frame.type = 'string'
      break

    case 'year':
      frame.id = 'TYER'
      frame.type = 'integer'
      break

    case 'composer':
      frame.id = 'TCOM'
      frame.type = 'array'
      break

    case 'lyrics':
      frame.id = 'USLT'
      frame.type = 'descLang'
      break
  }

  return frame
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

          case 'TYER':
            $('#year').val(frame.value)
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

function resetForm () {
  currentIndex = -1
  mp3tag = null
  imageBuffer = null

  $('#edit-form').trigger('reset')
  $('#edit-form input, #edit-form button').attr('disabled', true)
  $('#download').attr({ href: null, download: null })
  $('#download').addClass('disabled')
  $('#cover-preview').attr('src', '/images/blank.jpg')
  $('#audio-list').find('.bg-primary').removeClass('bg-primary')
}
