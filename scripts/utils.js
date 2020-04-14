
function imageURL (buffer, format) {
  let encoded = ''
  for (let i = 0; i < buffer.length; i++) {
    encoded += String.fromCharCode(buffer[i])
  }

  return `data:${format};base64,${btoa(encoded)}`
}

function loadFile (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}
