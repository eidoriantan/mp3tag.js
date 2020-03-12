
function imageDataURL (buffer, format) {
  let encoded = ''
  for (let i = 0; i < buffer.length; i++) {
    encoded += String.fromCharCode(buffer[i])
  }

  return `data:${format};base64,${btoa(encoded)}`
}

function loadFile (file, successFn, errorFn) {
  const reader = new FileReader()
  reader.onload = function () {
    successFn(this.result)
  }

  reader.onerror = function () {
    toast('File Error', 'Unable to read the file', TOAST_DANGER)
    this.abort()
  }

  reader.readAsArrayBuffer(file)
}
