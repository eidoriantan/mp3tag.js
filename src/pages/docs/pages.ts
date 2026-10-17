import { getPage } from '../../site'
import { tagsProperties, v1Frames, v2Frames } from './data/frames'
import { methods, properties, type Member } from './data/mp3tag'

export interface OutlineEntry {
  id: string
  /** Code identifier, e.g. a frame ID or member name */
  label: string
  /** Muted text after the label, e.g. a frame's short title */
  detail?: string
  /** Extra text matched by the search, e.g. a frame's full title */
  keywords?: string
}

export interface OutlineSection {
  id: string
  title: string
  entries: OutlineEntry[]
}

export interface DocPage {
  path: string
  title: string
  /** Source file name in src/pages/docs, used by the "Improve this page" link */
  file: string
  outline: OutlineSection[]
}

const memberEntry = (member: Member): OutlineEntry => ({
  id: member.id,
  label: member.short,
  detail: member.kind === 'Static Method' ? 'static' : undefined,
  keywords: member.name
})

export const docPages: DocPage[] = [
  {
    path: '/docs',
    title: getPage('/docs').title!,
    file: 'Installation.tsx',
    outline: [
      { id: 'integrating-from-v2-v3', title: 'Integrating from v2 - v3', entries: [] }
    ]
  },
  {
    path: '/docs/usage',
    title: getPage('/docs/usage').title!,
    file: 'Usage.tsx',
    outline: [
      { id: 'simple-usage', title: 'Simple Usage', entries: [] },
      { id: 'advanced-usage', title: 'Advanced Usage', entries: [] },
      { id: 'mp4-usage', title: 'MP4/M4A Usage', entries: [] },
      { id: 'aiff-usage', title: 'AIFF/AIFC Usage', entries: [] },
      { id: 'aac-usage', title: 'AAC/ADTS Usage', entries: [] }
    ]
  },
  {
    path: '/docs/mp3tag',
    title: getPage('/docs/mp3tag').title!,
    file: 'MP3TagClass.tsx',
    outline: [
      { id: 'properties', title: 'Properties', entries: properties.map(memberEntry) },
      { id: 'methods', title: 'Methods', entries: methods.map(memberEntry) }
    ]
  },
  {
    path: '/docs/frames',
    title: getPage('/docs/frames').title!,
    file: 'Frames.tsx',
    outline: [
      {
        id: 'tags',
        title: 'tags Properties',
        entries: tagsProperties.map((property) => ({
          id: `tags-${property.name.toLowerCase()}`,
          label: property.name
        }))
      },
      {
        id: 'v1',
        title: 'tags.v1 ID3v1 Frames',
        entries: v1Frames.map((name) => ({ id: `v1-${name}`, label: name }))
      },
      {
        id: 'v2',
        title: 'tags.v2 ID3v2 Frames',
        entries: v2Frames.map((frame) => ({
          id: frame.id,
          label: frame.short[0],
          detail: frame.short[1],
          keywords: `${frame.title} ${frame.frameId}`
        }))
      }
    ]
  }
]
