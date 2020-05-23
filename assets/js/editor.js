
const importedFiles = []
let currentIndex = -1
let blankImage = ''

let imageBytes = null
let imageType = ''
let mp3tag = null

$(document).ready(function () {
  blankImage = $('#cover-preview').attr('src')
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

  $('#cover').on('change', async function () {
    const files = $(this).prop('files')
    if (files.length === 0) return false

    const file = files[0]
    const buffer = await loadFile(file)
    imageBytes = new Uint8Array(buffer)
    const url = imageURL(imageBytes, file.type)
    $('#cover-preview').attr('src', url)
  })

  $('#edit-form').submit(function (event) {
    event.preventDefault()
    if (currentIndex < 0) return false
    writeData()
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
  $('#blankslate').remove()
  $('#audio-list').parent().removeClass('d-none')

  const temp = $('#audio-item-template').prop('content')
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.match(/^(audio)\/([a-z0-9\-]+)$/)) {
      const audioItem = $(temp).clone()
      importedFiles.push(files[i])

      $(audioItem).find('[data-temp=\'filename\']').text(files[i].name)
      $(audioItem).find('[data-temp]').removeAttr('data-temp')
      $(audioItem).find('[data-audio]').click(audioView)

      $('#audio-list').append(audioItem)
    } else {
      const message = 'MIME/Type of a file is not supported. Skipped'
      toast(message, TOAST_WARNING)
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
  $(audioItem).addClass('flash')

  try {
    toast('Reading file and tags. Please wait...', TOAST_INFO)

    mp3tag = new MP3Tag(await loadFile(file))
    mp3tag.read()
    displayDetails()

    toast('Details was displayed', TOAST_SUCCESS)
  } catch (error) {
    toast(error.message, TOAST_DANGER)
    throw error
  }
}

function displayDetails () {
  const tags = mp3tag.tags
  $('#title').val(tags.title)
  $('#artist').val(tags.artist)
  $('#album').val(tags.album)
  $('#year').val(tags.year)
  $('#track').val(tags.track)
  $('#genre').val(tags.genre)

  if (tags.APIC) {
    imageBytes = tags.APIC[0].data
    imageType = tags.APIC[0].format
    $('#cover-preview').attr({ src: imageURL(imageBytes, imageType) })
  }

  if (tags.TRCK) $('#track').val(tags.TRCK)
  if (tags.TCOM) $('#composer').val(tags.TCOM)
  if (tags.USLT) {
    $('#lyrics').val(
      tags.USLT[0].language + '|' +
      tags.USLT[0].descriptor + '|' +
      tags.USLT[0].text
    )
  }

  if (mp3tag.errorCode > -1) throw new Error(mp3tag.error)
}

async function writeData () {
  try {
    toast('Writing the tags to file', TOAST_INFO)

    writeDetails()
    mp3tag.save({ strict: true })
    if (mp3tag.errorCode > -1) throw new Error(mp3tag.error)
  } catch (error) {
    toast(error.message, TOAST_DANGER)
    throw error
  }

  const file = importedFiles[currentIndex]
  const modifiedFile = new File([mp3tag.buffer], file.name, { type: file.type })

  importedFiles[currentIndex] = modifiedFile
  toast('Modified MP3 was saved and ready to download', TOAST_SUCCESS)
}

async function writeDetails () {
  mp3tag.tags.title = $('#title').val()
  mp3tag.tags.artist = $('#artist').val()
  mp3tag.tags.album = $('#album').val()
  mp3tag.tags.year = $('#year').val()
  mp3tag.tags.TRCK = $('#track').val()
  mp3tag.tags.genre = $('#genre').val()
  mp3tag.tags.TCOM = $('#composer').val()

  if (imageBytes !== null) {
    mp3tag.tags.APIC = [{
      format: imageType,
      type: 3,
      description: '',
      data: imageBytes
    }]
  }

  const lyrics = $('#lyrics').val()
  if (lyrics !== '') {
    const splitted = lyrics.split('|')
    mp3tag.tags.USLT = [{
      language: splitted[0],
      descriptor: splitted[1],
      text: splitted[2]
    }]
  }
}

function resetForm () {
  currentIndex = -1
  mp3tag = null
  imageBytes = null

  $('#edit-form').trigger('reset')
  $('#edit-form').find('input, textarea, select, button').attr('disabled', true)
  $('#download').attr({ href: null, download: null })
  $('#download').addClass('disabled')
  $('#cover-preview').attr('src', blankImage)
  $('#audio-list').find('.flash').removeClass('flash')
}
