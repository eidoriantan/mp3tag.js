// Input element for file selection with ID 'input-file'
const inputFile = document.getElementById('input-file')

inputFile.addEventListener('change', function () {
  [...this.files].forEach(async (file) => {
    const buffer = await file.arrayBuffer()

    // MP3Tag Usage
    const mp3tag = new MP3Tag(buffer)
    mp3tag.read()

    // Handle error if there's any
    if (mp3tag.error !== '') throw new Error(mp3tag.error)
    else console.log(mp3tag.tags)
  })
})
