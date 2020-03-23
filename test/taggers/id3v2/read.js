
const MP3Tag = require('../../../dist/mp3tag')
const assert = require('assert')

const v23Header = [73, 68, 51, 3, 0, 0]
const v24Header = [73, 68, 51, 4, 0, 0]
const mp3 = [0, 0, 0, 0, 0, 0, 0, 0, 255, 251, 176, 0, 0]

describe('Reading ID3v2 Frames', function () {
  it('Read array frames v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 41,
      84, 80, 69, 49, 0, 0, 0, 23, 0, 0,
      1, 255, 254, 65, 0, 82, 0, 84, 0, 49, 0, 47, 0,
      65, 0, 82, 0, 84, 0, 50, 0, 0, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TPE1')
    assert.deepStrictEqual(mp3tag.frames[0].value, ['ART1', 'ART2'])
  })

  it('Read array frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 29,
      84, 80, 69, 49, 0, 0, 0, 11, 0, 0,
      3, 65, 82, 84, 49, 0, 65, 82, 84, 50, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TPE1')
    assert.deepStrictEqual(mp3tag.frames[0].value, ['ART1', 'ART2'])
  })

  // ID3v2.3 does not support multiple-text frames with the same kind
  it('Read multiple-text frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 29,
      84, 73, 84, 50, 0, 0, 0, 11, 0, 0,
      3, 84, 73, 84, 49, 0, 84, 73, 84, 50, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TIT2')
    assert.deepStrictEqual(mp3tag.frames[0].value, ['TIT1', 'TIT2'])
  })

  it('Read numerical string frames v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 21,
      84, 83, 73, 90, 0, 0, 0, 3, 0, 0,
      0, 53, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TSIZ')
    assert.deepStrictEqual(mp3tag.frames[0].value, 5)
  })

  it('Read numerical string frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 24,
      84, 76, 69, 78, 0, 0, 0, 6, 0, 0,
      0, 53, 48, 48, 48, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TLEN')
    assert.deepStrictEqual(mp3tag.frames[0].value, 5000)
  })

  it('Read set frames v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 23,
      84, 82, 67, 75, 0, 0, 0, 5, 0, 0,
      0, 49, 47, 50, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TRCK')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      position: 1,
      total: 2
    })
  })

  it('Read set frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 23,
      84, 82, 67, 75, 0, 0, 0, 5, 0, 0,
      0, 49, 47, 50, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TRCK')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      position: 1,
      total: 2
    })
  })

  it('Read multiple set frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 27,
      84, 82, 67, 75, 0, 0, 0, 9, 0, 0,
      0, 49, 47, 50, 0, 49, 47, 51, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TRCK')
    assert.deepStrictEqual(mp3tag.frames[0].value, [{
      position: 1,
      total: 2
    }, {
      position: 1,
      total: 3
    }])
  })

  it('Read URL frames v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 36,
      87, 80, 85, 66, 0, 0, 0, 18, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'WPUB')
    assert.deepStrictEqual(mp3tag.frames[0].value, 'https://github.com')
  })

  it('Read URL frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 36,
      87, 80, 85, 66, 0, 0, 0, 18, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'WPUB')
    assert.deepStrictEqual(mp3tag.frames[0].value, 'https://github.com')
  })

  it('Read TXXX frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 43,
      84, 88, 88, 88, 0, 0, 0, 25, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 86, 0, 65, 0, 76, 0, 85, 0, 69, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      text: 'VALUE'
    })
  })

  it('Read multiple TXXX frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 80,
      84, 88, 88, 88, 0, 0, 0, 25, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 86, 0, 65, 0, 76, 0, 85, 0, 69, 0,
      84, 88, 88, 88, 0, 0, 0, 27, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      255, 254, 86, 0, 65, 0, 76, 0, 85, 0, 69, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      text: 'VALUE'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'TXXX')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      description: 'DESC2',
      text: 'VALUE'
    })
  })

  it('Read TXXX frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 30,
      84, 88, 88, 88, 0, 0, 0, 12, 0, 0,
      3, 68, 69, 83, 67, 0, 86, 65, 76, 85, 69, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      text: 'VALUE'
    })
  })

  it('Read multiple TXXX frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 51,
      84, 88, 88, 88, 0, 0, 0, 11, 0, 0,
      3, 68, 69, 83, 67, 0, 86, 65, 76, 85, 69,
      84, 88, 88, 88, 0, 0, 0, 12, 0, 0,
      3, 68, 69, 83, 67, 50, 0, 86, 65, 76, 85, 69,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'TXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      text: 'VALUE'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'TXXX')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      description: 'DESC2',
      text: 'VALUE'
    })
  })

  it('Read WXXX frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 49,
      87, 88, 88, 88, 0, 0, 0, 31, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'WXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      url: 'https://github.com'
    })
  })

  it('Read multiple WXXX frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 92,
      87, 88, 88, 88, 0, 0, 0, 31, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      87, 88, 88, 88, 0, 0, 0, 33, 0, 0,
      1, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'WXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      url: 'https://github.com'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'WXXX')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      description: 'DESC2',
      url: 'https://github.com'
    })
  })

  it('Read WXXX frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 42,
      87, 88, 88, 88, 0, 0, 0, 24, 0, 0,
      3, 68, 69, 83, 67, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'WXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      url: 'https://github.com'
    })
  })

  it('Read multiple WXXX frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 77,
      87, 88, 88, 88, 0, 0, 0, 24, 0, 0,
      3, 68, 69, 83, 67, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      87, 88, 88, 88, 0, 0, 0, 25, 0, 0,
      3, 68, 69, 83, 67, 50, 0,
      104, 116, 116, 112, 115, 58, 47, 47, 103,
      105, 116, 104, 117, 98, 46, 99, 111, 109,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'WXXX')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      description: 'DESC',
      url: 'https://github.com'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'WXXX')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      description: 'DESC2',
      url: 'https://github.com'
    })
  })

  it('Read ipls frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 35,
      73, 80, 76, 83, 0, 0, 0, 25, 0, 0,
      1, 255, 254, 80, 0, 69, 0, 82, 0, 49, 0, 0, 0,
      255, 254, 80, 0, 69, 0, 82, 0, 50, 0, 0, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'IPLS')
    assert.deepStrictEqual(mp3tag.frames[0].value, ['PER1', 'PER2'])
  })

  it('Read langDesc frames v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 48,
      85, 83, 76, 84, 0, 0, 0, 30, 0, 0,
      1, 101, 110, 103, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 76, 0, 89, 0, 82, 0, 73, 0, 67, 0, 83, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USLT')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      descriptor: 'DESC',
      text: 'LYRICS'
    })
  })

  it('Read multiple langDesc frames v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 84,
      85, 83, 76, 84, 0, 0, 0, 30, 0, 0,
      1, 101, 110, 103, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 254, 76, 0, 89, 0, 82, 0, 73, 0, 67, 0, 83, 0,
      85, 83, 76, 84, 0, 0, 0, 26, 0, 0,
      1, 106, 112, 110, 255, 254, 76, 107, 94, 138, 0, 0,
      255, 254, 76, 0, 89, 0, 82, 0, 73, 0, 67, 0, 83, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USLT')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      descriptor: 'DESC',
      text: 'LYRICS'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'USLT')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      language: 'jpn',
      descriptor: '歌詞',
      text: 'LYRICS'
    })
  })

  it('Read langDesc frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 33,
      85, 83, 76, 84, 0, 0, 0, 15, 0, 0,
      3, 101, 110, 103, 68, 69, 83, 67, 0,
      76, 89, 82, 73, 67, 83,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USLT')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      descriptor: 'DESC',
      text: 'LYRICS'
    })
  })

  it('Read multiple langDesc frames v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 60,
      85, 83, 76, 84, 0, 0, 0, 15, 0, 0,
      3, 101, 110, 103, 68, 69, 83, 67, 0,
      76, 89, 82, 73, 67, 83,
      85, 83, 76, 84, 0, 0, 0, 17, 0, 0,
      3, 106, 112, 110, 230, 173, 140, 232, 169, 158, 0,
      76, 89, 82, 73, 67, 83,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USLT')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      descriptor: 'DESC',
      text: 'LYRICS'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'USLT')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      language: 'jpn',
      descriptor: '歌詞',
      text: 'LYRICS'
    })
  })

  it('Read APIC frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 49,
      65, 80, 73, 67, 0, 0, 0, 31, 0, 0,
      1, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 216, 255, 226, 255, 217,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'APIC')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'image/jpeg',
      type: 3,
      description: 'DESC',
      data: [255, 216, 255, 226, 255, 217]
    })
  })

  it('Read multiple APIC frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 92,
      65, 80, 73, 67, 0, 0, 0, 31, 0, 0,
      1, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      255, 216, 255, 226, 255, 217,
      65, 80, 73, 67, 0, 0, 0, 33, 0, 0,
      1, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      0, 255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      255, 216, 255, 226, 255, 217,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'APIC')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'image/jpeg',
      type: 3,
      description: 'DESC',
      data: [255, 216, 255, 226, 255, 217]
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'APIC')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      format: 'image/jpeg',
      type: 0,
      description: 'DESC2',
      data: [255, 216, 255, 226, 255, 217]
    })
  })

  it('Read APIC frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 42,
      65, 80, 73, 67, 0, 0, 0, 24, 0, 0,
      3, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 68, 69, 83, 67, 0,
      255, 216, 255, 226, 255, 217,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'APIC')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'image/jpeg',
      type: 3,
      description: 'DESC',
      data: [255, 216, 255, 226, 255, 217]
    })
  })

  it('Read multiple APIC frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 77,
      65, 80, 73, 67, 0, 0, 0, 24, 0, 0,
      3, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      3, 68, 69, 83, 67, 0,
      255, 216, 255, 226, 255, 217,
      65, 80, 73, 67, 0, 0, 0, 25, 0, 0,
      3, 105, 109, 97, 103, 101, 47, 106, 112, 101, 103, 0,
      0, 68, 69, 83, 67, 50, 0,
      255, 216, 255, 226, 255, 217,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'APIC')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'image/jpeg',
      type: 3,
      description: 'DESC',
      data: [255, 216, 255, 226, 255, 217]
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'APIC')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      format: 'image/jpeg',
      type: 0,
      description: 'DESC2',
      data: [255, 216, 255, 226, 255, 217]
    })
  })

  it('Read GEOB frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 70,
      71, 69, 79, 66, 0, 0, 0, 52, 0, 0,
      1, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      255, 254, 102, 0, 105, 0, 108, 0, 101, 0,
      46, 0, 116, 0, 120, 0, 116, 0, 0, 0,
      255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'GEOB')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'text/plain',
      filename: 'file.txt',
      description: 'DESC',
      object: [1, 2, 3, 4, 5, 6, 7, 8]
    })
  })

  it('Read multiple GEOB frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 1, 6,
      71, 69, 79, 66, 0, 0, 0, 52, 0, 0,
      1, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      255, 254, 102, 0, 105, 0, 108, 0, 101, 0,
      46, 0, 116, 0, 120, 0, 116, 0, 0, 0,
      255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 0, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      71, 69, 79, 66, 0, 0, 0, 54, 0, 0,
      1, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      255, 254, 102, 0, 105, 0, 108, 0, 101, 0,
      46, 0, 116, 0, 120, 0, 116, 0, 0, 0,
      255, 254, 68, 0, 69, 0, 83, 0, 67, 0, 50, 0, 0, 0,
      9, 10, 11, 12, 13, 14, 15, 16,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'GEOB')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'text/plain',
      filename: 'file.txt',
      description: 'DESC',
      object: [1, 2, 3, 4, 5, 6, 7, 8]
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'GEOB')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      format: 'text/plain',
      filename: 'file.txt',
      description: 'DESC2',
      object: [9, 10, 11, 12, 13, 14, 15, 16]
    })
  })

  it('Read GEOB frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 52,
      71, 69, 79, 66, 0, 0, 0, 34, 0, 0,
      3, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      102, 105, 108, 101, 46, 116, 120, 116, 0,
      68, 69, 83, 67, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'GEOB')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'text/plain',
      filename: 'file.txt',
      description: 'DESC',
      object: [1, 2, 3, 4, 5, 6, 7, 8]
    })
  })

  it('Read multiple GEOB frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 97,
      71, 69, 79, 66, 0, 0, 0, 34, 0, 0,
      3, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      102, 105, 108, 101, 46, 116, 120, 116, 0,
      68, 69, 83, 67, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      71, 69, 79, 66, 0, 0, 0, 35, 0, 0,
      3, 116, 101, 120, 116, 47, 112, 108, 97, 105, 110, 0,
      102, 105, 108, 101, 46, 116, 120, 116, 0,
      68, 69, 83, 67, 50, 0,
      9, 10, 11, 12, 13, 14, 15, 16,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'GEOB')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      format: 'text/plain',
      filename: 'file.txt',
      description: 'DESC',
      object: [1, 2, 3, 4, 5, 6, 7, 8]
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'GEOB')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      format: 'text/plain',
      filename: 'file.txt',
      description: 'DESC2',
      object: [9, 10, 11, 12, 13, 14, 15, 16]
    })
  })

  it('Read UFID frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 33,
      85, 70, 73, 68, 0, 0, 0, 15, 0, 0,
      103, 105, 116, 104, 117, 98, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'UFID')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      ownerId: 'github',
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    })
  })

  it('Read multiple UFID frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 59,
      85, 70, 73, 68, 0, 0, 0, 15, 0, 0,
      103, 105, 116, 104, 117, 98, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      85, 70, 73, 68, 0, 0, 0, 16, 0, 0,
      103, 105, 116, 104, 117, 98, 50, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'UFID')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      ownerId: 'github',
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'UFID')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      ownerId: 'github2',
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    })
  })

  it('Read UFID frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 33,
      85, 70, 73, 68, 0, 0, 0, 15, 0, 0,
      103, 105, 116, 104, 117, 98, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'UFID')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      ownerId: 'github',
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    })
  })

  it('Read multiple UFID frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 59,
      85, 70, 73, 68, 0, 0, 0, 15, 0, 0,
      103, 105, 116, 104, 117, 98, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      85, 70, 73, 68, 0, 0, 0, 16, 0, 0,
      103, 105, 116, 104, 117, 98, 50, 0,
      1, 2, 3, 4, 5, 6, 7, 8,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'UFID')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      ownerId: 'github',
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'UFID')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      ownerId: 'github2',
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    })
  })

  it('Read USER frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 34,
      85, 83, 69, 82, 0, 0, 0, 16, 0, 0,
      1, 101, 110, 103, 255, 254, 84, 0, 69, 0, 88, 0, 84, 0, 0, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USER')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      text: 'TEXT'
    })
  })

  it('Read multiple USER frame v2.3', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v23Header, 0, 0, 0, 60,
      85, 83, 69, 82, 0, 0, 0, 16, 0, 0,
      1, 101, 110, 103, 255, 254, 84, 0, 69, 0, 88, 0, 84, 0, 0, 0,
      85, 83, 69, 82, 0, 0, 0, 16, 0, 0,
      1, 101, 110, 103, 255, 254, 84, 0, 69, 0, 88, 0, 84, 0, 0, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 3)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USER')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      text: 'TEXT'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'USER')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      language: 'eng',
      text: 'TEXT'
    })
  })

  it('Read USER frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 27,
      85, 83, 69, 82, 0, 0, 0, 9, 0, 0,
      3, 101, 110, 103, 84, 69, 88, 84, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USER')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      text: 'TEXT'
    })
  })

  it('Read multiple USER frame v2.4', function () {
    const mp3tag = new MP3Tag(new Uint8Array([
      ...v24Header, 0, 0, 0, 46,
      85, 83, 69, 82, 0, 0, 0, 9, 0, 0,
      3, 101, 110, 103, 84, 69, 88, 84, 0,
      85, 83, 69, 82, 0, 0, 0, 9, 0, 0,
      3, 101, 110, 103, 84, 69, 88, 84, 0,
      ...mp3
    ]).buffer)

    mp3tag.read()
    assert.deepStrictEqual(mp3tag.tagger.major, 4)
    assert.deepStrictEqual(mp3tag.frames[0].id, 'USER')
    assert.deepStrictEqual(mp3tag.frames[0].value, {
      language: 'eng',
      text: 'TEXT'
    })
    assert.deepStrictEqual(mp3tag.frames[1].id, 'USER')
    assert.deepStrictEqual(mp3tag.frames[1].value, {
      language: 'eng',
      text: 'TEXT'
    })
  })
})
