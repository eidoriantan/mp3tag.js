export interface DocPage {
  path: string
  title: string
  description: string
  /** Source file name in src/pages/docs, used by the "Edit this page" link */
  file: string
  sections: Array<{ id: string, title: string }>
}

export const docPages: DocPage[] = [
  {
    path: '/docs',
    title: 'Installation',
    description: 'JavaScript library documentations page. How to install the library',
    file: 'Installation.tsx',
    sections: [
      { id: 'integrating-from-v2-v3', title: 'Integrating from v2 - v3' }
    ]
  },
  {
    path: '/docs/usage',
    title: 'Usage',
    description: 'JavaScript library documentations page. How to use the library',
    file: 'Usage.tsx',
    sections: [
      { id: 'simple-usage', title: 'Simple Usage' },
      { id: 'advanced-usage', title: 'Advanced Usage' },
      { id: 'mp4-usage', title: 'MP4/M4A Usage' },
      { id: 'aiff-usage', title: 'AIFF/AIFC Usage' },
      { id: 'aac-usage', title: 'AAC/ADTS Usage' }
    ]
  },
  {
    path: '/docs/mp3tag',
    title: 'MP3Tag',
    description: 'JavaScript library documentations page. mp3tag.js exported class documentation',
    file: 'MP3TagClass.tsx',
    sections: [
      { id: 'properties', title: 'Properties' },
      { id: 'methods', title: 'Methods' }
    ]
  },
  {
    path: '/docs/frames',
    title: 'Tags and Frames',
    description: 'JavaScript library documentations page. Learn more about the frames objects in this library',
    file: 'Frames.tsx',
    sections: [
      { id: 'tags', title: 'tags Properties' },
      { id: 'v1', title: 'tags.v1 ID3v1 Frames' },
      { id: 'v2', title: 'tags.v2 ID3v2 Frames' }
    ]
  }
]
