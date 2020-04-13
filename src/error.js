
const E_CODES = {
  0: 'Unknown error',
  1: 'This format is not yet supported',
  100: 'This file is not an ID3v1',
  103: 'Frame validation failed',
  200: 'This file is not an ID3v2',
  201: 'Unsupported ID3v2 major version',
  202: 'Unsupported frame',
  203: 'Frame validation failed',
  204: 'Frame is not supported in this version of ID3v2'
}

export default class TagError extends Error {
  constructor (code, ...params) {
    super(E_CODES[code])
    this.name = 'TagError'
    this.code = code
    this.errorId = params[0]
    this.message = this.parseMessage()
  }

  parseMessage () {
    let string = ''
    switch (this.code) {
      case 100:
        string = `ID3v1 Error: ${E_CODES[this.code]}`
        break

      case 103:
        string = `ID3v1 Error: ${E_CODES[this.code]} "${this.errorId}"`
        break

      case 200:
        string = `ID3v2 Error: ${E_CODES[this.code]}`
        break

      case 201: case 202: case 203: case 204:
        string = `ID3v2 Error: ${E_CODES[this.code]} "${this.errorId}"`
        break

      default:
        string = `${E_CODES[this.code]}`
    }

    return string
  }
}
