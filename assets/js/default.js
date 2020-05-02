---
---

const TOAST_SUCCESS = ['Toast--success', '{% octicon check aria-hidden:true %}']
const TOAST_INFO = ['', '{% octicon info aria-hidden:true %}']
const TOAST_DANGER = ['Toast--error', '{% octicon stop aria-hidden:true %}']
const TOAST_WARNING = ['Toast--warning', '{% octicon alert aria-hidden:true %}']
const TOAST_NONE = TOAST_INFO
let toastCounter = 0

function toast (message, type = TOAST_NONE) {
  const temp = $('#toast-template').prop('content')
  const toast = $(temp).clone()
  const id = toastCounter++

  $(toast).find('.Toast').attr('id', 'toast-' + id)
  $(toast).find('.Toast').addClass(type[0])
  $(toast).find('.Toast-icon').html(type[1])
  $(toast).find('.Toast-content').text(message)

  $('#toaster').append(toast)
  setTimeout(function () {
    $('#toast-' + id).remove()
  }, 3000)
}

function imageURL (bytes, format) {
  let encoded = ''
  bytes.forEach(function (byte) {
    encoded += String.fromCharCode(byte)
  })

  return `data:${format};base64,${btoa(encoded)}`
}

function loadFile (file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}
