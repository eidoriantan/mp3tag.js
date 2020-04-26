
const importedFiles = []
let currentIndex = -1
let blankImage = ''

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
  $('#no-audio').remove()
  $('#audio-list').parent().removeClass('d-none')

  const temp = $('#audio-item-template').prop('content')
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.match(/^(audio)\/([a-z0-9\-]+)$/)) {
      const audioItem = $(temp).clone()
      importedFiles.push(files[i])

      $(audioItem).find('[data-temp=\'filename\']').text(files[i].name)
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
    mp3tag.read()
    displayDetails()

    toast('Read Successfully', 'Details was displayed', TOAST_SUCCESS)
  } catch (e) {
    toast('Reading Error', e.message, TOAST_DANGER)
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
    imageBuffer = tags.APIC[0].data
    imageType = tags.APIC[0].format
    $('#cover-preview').attr({ src: imageURL(imageBuffer, imageType) })
  }

  if (tags.TLAN) $('#language').val(tags.TLAN)
  if (tags.TRCK) $('#track').val(tags.TRCK)
  if (tags.TSRC) $('#isrc').val(tags.TSRC)
  if (tags.TDAT) {
    $('#month').val(tags.TDAT.substr(2, 4))
    $('#day').val(tags.TDAT.substr(0, 2))
  }
  if (tags.TYER) $('#year').val(tags.TYER)
  if (tags.TDRC) {
    const result = timeRegex.exec(tags.TDRC)
    if (result[2]) $('#year').val(result[2])
    if (result[4]) $('#month').val(result[4])
    if (result[6]) $('#day').val(result[6])
  }
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
    toast('Writing', 'Writing the tags to file', TOAST_INFO)

    writeDetails()
    mp3tag.save({ strict: true })
    if (mp3tag.errorCode > -1) throw new Error(mp3tag.error)
  } catch (e) {
    throw e
    toast('Writing Error', e.message, TOAST_DANGER)
  }

  const file = importedFiles[currentIndex]
  const modifiedFile = new File([mp3tag.buffer], file.name, { type: file.type })

  importedFiles[currentIndex] = modifiedFile
  toast('Saved!', 'Modified MP3 was saved and ready to download', TOAST_SUCCESS)
}

async function writeDetails () {
  delete mp3tag.tags.title
  delete mp3tag.tags.artist
  delete mp3tag.tags.album
  delete mp3tag.tags.year
  delete mp3tag.tags.comment
  delete mp3tag.tags.track
  delete mp3tag.tags.genre

  mp3tag.tags.TIT2 = $('#title').val()
  mp3tag.tags.TPE1 = $('#artist').val()
  mp3tag.tags.TALB = $('#album').val()
  mp3tag.tags.TYER = $('#year').val()
  mp3tag.tags.TDAT = $('#day').val() + $('#month').val()
  mp3tag.tags.TRCK = $('#track').val()
  mp3tag.tags.TCON = $('#genre').val()
  mp3tag.tags.TSRC = $('#isrc').val()
  mp3tag.tags.TLAN = $('#language').val()
  mp3tag.tags.TCOM = $('#composer').val()

  const cover = $('#cover').prop('files')
  if (cover.length > 0) {
    const imageFile = cover[0]
    imageBuffer = await loadFile(imageFile)
    imageType = imageFile.type
  }

  if (imageBuffer !== null) {
    mp3tag.tags.APIC = [{
      format: imageType,
      type: 3,
      description: '',
      data: imageBuffer
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
  imageBuffer = null

  $('#edit-form').trigger('reset')
  $('#edit-form').find('input, textarea, select, button').attr('disabled', true)
  $('#download').attr({ href: null, download: null })
  $('#download').addClass('disabled')
  $('#cover-preview').attr('src', blankImage)
  $('#audio-list').find('.bg-primary').removeClass('bg-primary')
}
