import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from 'react'
import { AudioLines, Download, ImagePlus, Save, Upload, X } from 'lucide-react'
import MP3Tag from 'mp3tag.js'
import { useToast } from '../components/Toaster'
import { usePageMeta } from '../hooks/usePageMeta'
import { bytesToURL, downloadFile, loadFile } from '../lib/files'

interface AudioItem {
  id: number
  file: File
}

interface TagValues {
  title: string
  artist: string
  album: string
  track: string
  genre: string
  year: string
  composer: string
  lyrics: string
}

const emptyValues: TagValues = {
  title: '',
  artist: '',
  album: '',
  track: '',
  genre: '',
  year: '',
  composer: '',
  lyrics: ''
}

export default function Editor () {
  usePageMeta('Editor', 'Edit your audio files easily with this mp3tagger!')
  const toast = useToast()

  const [files, setFiles] = useState<AudioItem[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [values, setValues] = useState<TagValues>(emptyValues)
  const [invalid, setInvalid] = useState<Partial<Record<keyof TagValues, boolean>>>({})
  const [coverURL, setCoverURL] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const nextId = useRef(0)
  const mp3tag = useRef<MP3Tag | null>(null)
  const cover = useRef<{ bytes: Uint8Array, type: string } | null>(null)
  const readToken = useRef(0)
  const dragDepth = useRef(0)
  const audioInput = useRef<HTMLInputElement>(null)
  const coverInput = useRef<HTMLInputElement>(null)

  const selected = files.find((item) => item.id === selectedId) ?? null

  useEffect(() => {
    if (coverURL === null) return
    return () => URL.revokeObjectURL(coverURL)
  }, [coverURL])

  function resetForm (): void {
    readToken.current++
    mp3tag.current = null
    cover.current = null
    setSelectedId(null)
    setValues(emptyValues)
    setInvalid({})
    setCoverURL(null)
    if (coverInput.current) coverInput.current.value = ''
  }

  function importFiles (list: FileList): void {
    const imported: AudioItem[] = []
    for (const file of Array.from(list)) {
      if (/^(audio)\/([a-z0-9-]+)$/.test(file.type)) {
        imported.push({ id: nextId.current++, file })
      } else {
        toast('MIME/Type of a file is not supported. Skipped', 'warning')
      }
    }

    if (imported.length > 0) setFiles((current) => [...current, ...imported])
  }

  async function selectAudio (item: AudioItem): Promise<void> {
    resetForm()
    setSelectedId(item.id)
    const token = readToken.current

    toast('Reading file and tags. Please wait...', 'info')
    const tagger = new MP3Tag(await loadFile(item.file))
    tagger.read()
    if (token !== readToken.current) return

    mp3tag.current = tagger
    if (tagger.error !== '') {
      toast(tagger.error, 'danger')
      return
    }

    const tags = tagger.tags
    const apic = tags.v2?.APIC?.[0]
    setValues({
      title: tags.title,
      artist: tags.artist,
      album: tags.album,
      track: tags.track,
      genre: tags.genre,
      year: tags.year,
      composer: tags.v2?.TCOM ?? '',
      lyrics: tags.v2?.USLT?.[0]?.text ?? ''
    })

    if (apic) setCoverURL(bytesToURL(apic.data, apic.format))
    toast('Details was displayed', 'success')
  }

  async function changeCover (event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0]
    if (!file) return

    const bytes = new Uint8Array(await loadFile(file))
    cover.current = { bytes, type: file.type }
    setCoverURL(bytesToURL(bytes, file.type))
  }

  function changeValue (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const name = event.target.name as keyof TagValues
    setValues((current) => ({ ...current, [name]: event.target.value }))
    if (name === 'track' || name === 'year') {
      setInvalid((current) => ({ ...current, [name]: !event.target.validity.valid }))
    }
  }

  function writeDetails (tagger: MP3Tag): void {
    const tags = tagger.tags
    tags.v1 ??= {} as NonNullable<typeof tags.v1>
    tags.v2 ??= {}

    tags.title = values.title
    tags.artist = values.artist
    tags.album = values.album
    tags.year = values.year
    tags.track = values.track
    tags.genre = values.genre
    tags.v2.TCOM = values.composer

    if (cover.current !== null) {
      tags.v2.APIC = [{
        format: cover.current.type,
        type: 3,
        description: '',
        data: Array.from(cover.current.bytes)
      }]
    }

    if (values.lyrics !== '') {
      tags.v2.USLT = [{
        language: 'eng',
        descriptor: '',
        text: values.lyrics
      }]
    }
  }

  function save (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const tagger = mp3tag.current
    if (tagger === null || selected === null) return

    toast('Writing the tags to file', 'info')
    writeDetails(tagger)
    tagger.save()

    if (tagger.error === '') {
      const { file } = selected
      const modified = new File([tagger.buffer as ArrayBuffer], file.name, { type: file.type })
      setFiles((current) => current.map((item) => item.id === selected.id ? { ...item, file: modified } : item))
      toast('MP3 was modified and ready to download', 'success')
    } else {
      toast(tagger.error, 'danger')
    }
  }

  function onDrag (event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    if (event.type === 'dragenter') dragDepth.current++
    if (event.type === 'dragleave') dragDepth.current--
    setDragging(dragDepth.current > 0)
  }

  function onDrop (event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    dragDepth.current = 0
    setDragging(false)
    importFiles(event.dataTransfer.files)
  }

  const importButton = (
    <>
      <input
        ref={audioInput}
        type="file"
        id="file-audios"
        accept="audio/mpeg"
        className="sr-only"
        multiple
        onChange={(event) => {
          if (event.target.files) importFiles(event.target.files)
          event.target.value = ''
        }}
      />
      <label htmlFor="file-audios" className="btn btn-secondary cursor-pointer">
        <Upload className="size-4" aria-hidden="true" />
        Import audio file
      </label>
    </>
  )

  return (
    <div
      className="relative flex flex-1 flex-col"
      onDragEnter={onDrag}
      onDragOver={onDrag}
      onDragLeave={onDrag}
      onDrop={onDrop}
    >
      {dragging && (
        <div className="pointer-events-none absolute inset-3 z-30 flex items-center justify-center rounded-2xl border-2 border-dashed border-accent bg-accent-soft/80 backdrop-blur-sm">
          <p className="flex items-center gap-2 font-medium text-accent">
            <Upload className="size-5" aria-hidden="true" />
            Drop audio files to import
          </p>
        </div>
      )}

      {files.length === 0
        ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="flex w-full max-w-lg flex-col items-center rounded-2xl border-2 border-dashed border-border px-6 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Upload className="size-6" aria-hidden="true" />
              </div>
              <h1 className="mt-5 text-lg font-semibold">No audio imported</h1>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                This editor doesn't use any data or internet connections and works
                offline. Everything is done through your browser.
              </p>
              <p className="mt-6 mb-3 text-sm text-muted">Drag and drop files here, or</p>
              {importButton}
            </div>
          </div>
          )
        : (
          <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[300px_1fr] lg:py-8">
            <aside className="flex flex-col lg:sticky lg:top-20 lg:max-h-[calc(100dvh-7rem)]">
              <div className="mb-3 flex items-center justify-between">
                <h1 className="text-sm font-semibold">
                  Files <span className="ml-1 font-normal text-muted">{files.length}</span>
                </h1>
              </div>

              <ul className="-mx-1 flex-1 space-y-0.5 overflow-y-auto px-1" aria-label="Imported audio files">
                {files.map((item) => {
                  const active = item.id === selectedId
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => { void selectAudio(item) }}
                        aria-current={active}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${active ? 'bg-accent-soft text-accent' : 'hover:bg-surface'}`}
                      >
                        <AudioLines className={`size-4 shrink-0 ${active ? '' : 'text-muted'}`} aria-hidden="true" />
                        <span className="truncate">{item.file.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-4 [&_label]:w-full">{importButton}</div>
              <p className="mt-2 text-center text-xs text-muted">or drop files anywhere</p>
            </aside>

            <section className="min-w-0 rounded-2xl border border-border">
              {selected === null
                ? (
                  <div className="flex h-full min-h-80 flex-col items-center justify-center p-8 text-center">
                    <AudioLines className="size-8 text-muted" aria-hidden="true" />
                    <p className="mt-3 font-medium">Select a file</p>
                    <p className="mt-1 text-sm text-muted">Choose an audio file from the list to edit its tags.</p>
                  </div>
                  )
                : (
                  <form id="edit-form" onSubmit={save}>
                    <header className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-3">
                      <h2 className="min-w-0 flex-1 truncate font-medium" title={selected.file.name}>{selected.file.name}</h2>
                      <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => downloadFile(selected.file)}>
                          <Download className="size-4" aria-hidden="true" />
                          Download
                        </button>
                        <button type="submit" className="btn btn-primary">
                          <Save className="size-4" aria-hidden="true" />
                          Save
                        </button>
                        <button type="button" className="btn btn-ghost btn-icon" onClick={resetForm} aria-label="Close file" title="Close">
                          <X className="size-4" />
                        </button>
                      </div>
                    </header>

                    <div className="grid gap-6 p-5 md:grid-cols-[160px_1fr]">
                      <div>
                        <span className="mb-1.5 block text-sm font-medium">Album Cover</span>
                        <label htmlFor="cover" className="group relative block size-40 cursor-pointer overflow-hidden rounded-xl border border-dashed border-border bg-surface focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
                          {coverURL === null
                            ? (
                              <span className="flex size-full flex-col items-center justify-center gap-1.5 text-xs text-muted transition-colors group-hover:text-fg">
                                <ImagePlus className="size-6" aria-hidden="true" />
                                Add cover
                              </span>
                              )
                            : (
                              <>
                                <img src={coverURL} alt="Album Cover Preview" width="160" height="160" className="size-full object-cover" />
                                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                                  <ImagePlus className="size-5" aria-hidden="true" />
                                  Change cover
                                </span>
                              </>
                              )}
                          <input ref={coverInput} type="file" id="cover" name="cover" accept="image/jpeg" className="sr-only" onChange={(event) => { void changeCover(event) }} />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Title" name="title">
                          <input type="text" id="title" name="title" value={values.title} onChange={changeValue} placeholder="Fade Into You" className="input" />
                        </Field>
                        <Field label="Artist" name="artist">
                          <input type="text" id="artist" name="artist" value={values.artist} onChange={changeValue} placeholder="Mazzy Star" className="input" />
                        </Field>
                        <Field label="Album" name="album">
                          <input type="text" id="album" name="album" value={values.album} onChange={changeValue} placeholder="So Tonight That I Might See" className="input" />
                        </Field>
                        <Field label="Genre" name="genre">
                          <input type="text" id="genre" name="genre" value={values.genre} onChange={changeValue} placeholder="Rock" className="input" />
                        </Field>
                        <Field label="Track" name="track" invalid={invalid.track}>
                          <input type="text" id="track" name="track" value={values.track} onChange={changeValue} placeholder="1/3" pattern="[0-9]+(\/[0-9]+)?" className="input" aria-invalid={invalid.track} aria-describedby="track-validation" />
                        </Field>
                        <Field label="Year" name="year" invalid={invalid.year}>
                          <input type="number" id="year" name="year" value={values.year} onChange={changeValue} placeholder="1993" min="1000" max="9999" className="input" aria-invalid={invalid.year} aria-describedby="year-validation" />
                        </Field>
                        <Field label="Composer" name="composer" wide>
                          <input type="text" id="composer" name="composer" value={values.composer} onChange={changeValue} placeholder="Hope Sandoval; David Roback" className="input" />
                        </Field>
                      </div>

                      <Field label="Lyrics" name="lyrics" wide>
                        <textarea id="lyrics" name="lyrics" value={values.lyrics} onChange={changeValue} placeholder="Lyrics" rows={6} className="input resize-y" />
                      </Field>
                    </div>
                  </form>
                  )}
            </section>
          </div>
          )}
    </div>
  )
}

interface FieldProps {
  label: string
  name: string
  invalid?: boolean
  wide?: boolean
  children: ReactNode
}

function Field ({ label, name, invalid = false, wide = false, children }: FieldProps) {
  return (
    <div className={`${wide ? 'sm:col-span-2 md:col-span-full' : ''} ${invalid ? '[&_.input]:border-danger [&_.input]:ring-danger/15' : ''}`}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      <p id={`${name}-validation`} className="mt-1 text-xs text-danger empty:hidden" aria-live="polite">
        {invalid ? 'Invalid value' : ''}
      </p>
    </div>
  )
}
