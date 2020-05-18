
const E_CODES = {
  0: 'Unknown error',
  100: 'ID3v1 Error: This file is not an ID3v1',
  101: 'ID3v1 Error: Malform tag',
  102: 'ID3v1 Error: Frame validation failed',
  200: 'ID3v2 Error: This file is not an ID3v2',
  201: 'ID3v2 Error: Malform tag',
  202: 'ID3v2 Error: Frame validation failed',
  203: 'ID3v2 Error: This frame is not existing in this version of ID3v2'
}

export default class TagError extends Error {
  constructor (code, extra = null) {
    super(E_CODES[code])
    this.name = 'MP3TagError'
    this.code = code
    this.extra = extra

    this.parseMessage()
  }

  parseMessage () {
    this.message = E_CODES[this.code]
    if (this.extra) this.message += ` "${this.extra}"`
  }
}
